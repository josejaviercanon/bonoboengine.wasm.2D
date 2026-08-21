using Arch.Core;
using Arch.Systems;

namespace Game.Engine.ECS.Pacman;

/// <summary>Consumes client suggestions and stores only validated direction data.</summary>
public sealed class PacmanInputSystem : BaseSystem<World, float>
{
    private readonly Queue<PacmanDirection> _pending;

    public PacmanInputSystem(World world, Queue<PacmanDirection> pending) : base(world)
    {
        _pending = pending;
    }

    public override void Update(in float t)
    {
        var player = FindPlayer();
        if (player == Entity.Null)
        {
            _pending.Clear();
            return;
        }

        if (_pending.Count == 0) return;

        var facing = World.Get<PacmanFacing>(player);
        while (_pending.Count > 0)
        {
            facing.Requested = (int)_pending.Dequeue();
        }

        World.Set(player, facing);
    }

    private Entity FindPlayer()
    {
        var entities = new Entity[World.Size];
        World.GetEntities(new QueryDescription(), entities.AsSpan());
        foreach (var entity in entities)
        {
            if (World.IsAlive(entity) && World.Has<PacmanPlayer>(entity)) return entity;
        }

        return Entity.Null;
    }
}

/// <summary>
/// Advances Pacman gameplay with level-driven speeds, ghost house dot counters,
/// fruit sessions, elroy/tunnel mechanics, and fright flashing.
/// </summary>
public sealed class PacmanStepSystem : BaseSystem<World, float>
{
    private static readonly PacmanDirection[] DecisionOrder =
    [
        PacmanDirection.Up,
        PacmanDirection.Left,
        PacmanDirection.Down,
        PacmanDirection.Right,
    ];

    private readonly Random _random;
    private Entity[] _entityBuffer = [];
    private readonly List<Entity> _ghostList = new(4);

    public PacmanStepSystem(World world, Random random) : base(world)
    {
        _random = random;
    }

    public override void Update(in float dt)
    {
        var statsEntity = FindStats();
        var player = FindPlayer();
        if (statsEntity == Entity.Null || player == Entity.Null) return;

        var stats = World.Get<PacmanStats>(statsEntity);
        if (!stats.Started || stats.GameOver) return;

        var level = PacmanLevels.ForLevel(stats.Level);

        BeginFrame();
        UpdateMode(ref stats, dt, level);
        UpdateFruit(ref stats, dt);
        UpdateHouse(ref stats, dt);
        MovePlayer(player, ref stats, dt, level);
        MoveGhosts(player, stats, dt, level);
        ConsumePellet(player, ref stats, level);
        HandleCollisions(player, ref stats, level);

        World.Set(statsEntity, stats);
    }

    public void ResetActors(in PacmanStats stats)
    {
        var player = FindPlayer();
        if (player != Entity.Null)
        {
            var start = PacmanMaze.CenterOf(new PacmanCell(14, 23));
            World.Set(player, new PacmanTransform(start.X, start.Y));
            World.Set(player, new PacmanMotion());
            World.Set(player, new PacmanFacing(PacmanDirection.Left));
        }

        foreach (var ghost in FindGhosts())
        {
            var state = World.Get<PacmanGhostState>(ghost);
            var home = PacmanMaze.CenterOf(state.HomeCell);
            World.Set(ghost, new PacmanTransform(home.X, home.Y));
            World.Set(ghost, new PacmanMotion());
            World.Set(ghost, new PacmanFacing(PacmanDirection.Left));
            state.Mode = (int)BaseMode(stats);
            state.InHouse = state.GhostRole != PacmanGhostRole.Blinky ? (byte)1 : (byte)0;
            state.DotCount = 0;
            World.Set(ghost, state);
        }
    }

    private void BeginFrame()
    {
        EnsureBuffer();
        World.GetEntities(new QueryDescription(), _entityBuffer.AsSpan(0, World.Size));
        for (var _i = 0; _i < World.Size; _i++)
        {
            var entity = _entityBuffer[_i];
            if (!World.IsAlive(entity) || !World.Has<PacmanTransform>(entity)) continue;
            var transform = World.Get<PacmanTransform>(entity);
            transform.PreviousX = transform.X;
            transform.PreviousY = transform.Y;
            World.Set(entity, transform);
        }
    }

    private void UpdateMode(ref PacmanStats stats, float dt, PacmanLevelProps level)
    {
        if (stats.Frightened)
        {
            stats.FrightenedRemaining -= dt;
            if (stats.FrightenedRemaining > 0f) return;

            stats.Frightened = false;
            stats.FrightenedRemaining = 0f;
            stats.FrightenedDuration = 0f;
            stats.FrightFlashes = 0;
            stats.GhostChain = 0;
            foreach (var ghost in FindGhosts())
            {
                var state = World.Get<PacmanGhostState>(ghost);
                if (state.GhostMode != PacmanGhostMode.Eyes)
                {
                    state.Mode = (int)BaseMode(stats);
                    World.Set(ghost, state);
                }
            }

            return;
        }

        var modePattern = PacmanLevels.ModePattern(stats.Level);
        stats.ModeRemaining -= dt;
        if (stats.ModeRemaining > 0f) return;

        if (stats.ModeIndex < modePattern.Length - 1)
        {
            stats.ModeIndex++;
            stats.ModeRemaining = modePattern[stats.ModeIndex];
            var newMode = BaseMode(stats);
            foreach (var ghost in FindGhosts())
            {
                var state = World.Get<PacmanGhostState>(ghost);
                if (state.GhostMode != PacmanGhostMode.Eyes)
                {
                    state.Mode = (int)newMode;
                    World.Set(ghost, state);

                    var facing = World.Get<PacmanFacing>(ghost);
                    facing.Current = (int)PacmanMaze.Opposite(facing.CurrentDirection);
                    World.Set(ghost, facing);
                }
            }
        }
        else
        {
            stats.ModeRemaining = 9999f;
        }
    }

    private void UpdateFruit(ref PacmanStats stats, float dt)
    {
        var fruitEntity = FindFruit();
        if (fruitEntity == Entity.Null) return;

        var fruit = World.Get<PacmanFruit>(fruitEntity);
        if (fruit.Visible)
        {
            fruit.RemainingSeconds -= dt;
            if (fruit.RemainingSeconds <= 0f)
            {
                fruit.Visible = false;
                fruit.RemainingSeconds = 0f;
            }
            World.Set(fruitEntity, fruit);
            return;
        }

        // Spawn fruit at 70 and 170 dots eaten
        if (stats.FruitShownCount < 2)
        {
            var threshold = stats.FruitShownCount == 0
                ? PacmanLevels.FirstFruitAtDots
                : PacmanLevels.SecondFruitAtDots;
            if (stats.DotsEaten >= threshold)
            {
                var lvl = PacmanLevels.ForLevel(stats.Level);
                fruit.Item = (int)lvl.Fruit;
                fruit.Visible = true;
                fruit.RemainingSeconds = PacmanLevels.FruitShowSeconds;
                stats.FruitShownCount++;
                World.Set(fruitEntity, fruit);
            }
        }
    }

    private void UpdateHouse(ref PacmanStats stats, float dt)
    {
        stats.HouseIdleSeconds += dt;
        if (stats.HouseIdleSeconds >= PacmanLevels.HouseIdleTimeoutSeconds)
        {
            stats.HouseIdleSeconds = 0f;
            ForceReleaseNextGhost();
        }
    }

    private void ForceReleaseNextGhost()
    {
        foreach (var ghost in FindGhosts())
        {
            var state = World.Get<PacmanGhostState>(ghost);
            if (!state.IsInHouse || state.GhostRole == PacmanGhostRole.Blinky) continue;
            state.InHouse = 0;
            World.Set(ghost, state);
            return;
        }
    }

    private void MovePlayer(Entity player, ref PacmanStats stats, float dt, PacmanLevelProps level)
    {
        var transform = World.Get<PacmanTransform>(player);
        var facing = World.Get<PacmanFacing>(player);
        var cell = PacmanMaze.CellFromPosition(transform.X, transform.Y);

        if (PacmanMaze.IsNearCenter(transform.X, transform.Y, cell))
        {
            var center = PacmanMaze.CenterOf(cell);
            transform.X = center.X;
            transform.Y = center.Y;

            var requested = facing.RequestedDirection;
            if (PacmanMaze.CanMove(cell, requested)) facing.Current = (int)requested;

            if (!PacmanMaze.CanMove(cell, facing.CurrentDirection))
            {
                facing.Current = (int)PacmanDirection.None;
            }
        }

        var direction = facing.CurrentDirection;
        if (direction == PacmanDirection.None)
        {
            World.Set(player, transform);
            World.Set(player, facing);
            return;
        }

        // Dots speed: slow down when about to eat a pellet
        var hasPellet = FindPelletAt(cell) != Entity.Null;
        var speedPct = stats.Frightened
            ? (hasPellet ? level.FrightPacDotsSpeedPct : level.FrightPacSpeedPct)
            : (hasPellet ? level.PacDotsSpeedPct : level.PacSpeedPct);
        var speed = PacmanLevels.Speed(speedPct);

        Advance(ref transform, direction, speed, dt, cell);
        World.Set(player, transform);
        World.Set(player, facing);
        World.Set(player, new PacmanMotion(PacmanMaze.VectorFor(direction).X * speed,
            PacmanMaze.VectorFor(direction).Y * speed, speed));
    }

    private void MoveGhosts(Entity player, in PacmanStats stats, float dt, PacmanLevelProps level)
    {
        var playerTransform = World.Get<PacmanTransform>(player);
        var playerCell = PacmanMaze.CellFromPosition(playerTransform.X, playerTransform.Y);
        var blinkyCell = playerCell;

        foreach (var ghost in FindGhosts())
        {
            var ghostState = World.Get<PacmanGhostState>(ghost);
            var transform = World.Get<PacmanTransform>(ghost);
            var facing = World.Get<PacmanFacing>(ghost);
            var cell = PacmanMaze.CellFromPosition(transform.X, transform.Y);
            var mode = ghostState.GhostMode;

            if (ghostState.GhostRole == PacmanGhostRole.Blinky)
            {
                blinkyCell = cell;
            }

            // In-house ghosts: don't move until released
            if (ghostState.IsInHouse)
            {
                World.Set(ghost, transform);
                World.Set(ghost, facing);
                World.Set(ghost, ghostState);
                World.Set(ghost, new PacmanMotion());
                continue;
            }

            if (PacmanMaze.IsNearCenter(transform.X, transform.Y, cell))
            {
                var center = PacmanMaze.CenterOf(cell);
                transform.X = center.X;
                transform.Y = center.Y;

                if (mode == PacmanGhostMode.Eyes && cell == ghostState.HomeCell)
                {
                    ghostState.Mode = (int)BaseMode(stats);
                    mode = ghostState.GhostMode;
                }

                var target = mode == PacmanGhostMode.Eyes
                    ? ghostState.HomeCell
                    : GetTarget(ghostState.GhostRole, cell, playerCell, blinkyCell,
                        World.Get<PacmanFacing>(player).CurrentDirection, mode);
                facing.Current = (int)PickDirection(cell, facing.CurrentDirection, target, mode);
            }

            var speed = GetGhostSpeed(ghostState, mode, stats, level, cell);

            Advance(ref transform, facing.CurrentDirection, speed, dt, cell);
            World.Set(ghost, transform);
            World.Set(ghost, facing);
            World.Set(ghost, ghostState);
            var vector = PacmanMaze.VectorFor(facing.CurrentDirection);
            World.Set(ghost, new PacmanMotion(vector.X * speed, vector.Y * speed, speed));
        }
    }

    private float GetGhostSpeed(
        PacmanGhostState state,
        PacmanGhostMode mode,
        in PacmanStats stats,
        PacmanLevelProps level,
        PacmanCell cell)
    {
        if (mode == PacmanGhostMode.Frightened)
            return PacmanLevels.Speed(level.FrightGhostSpeedPct);

        if (mode == PacmanGhostMode.Eyes)
            return PacmanConfig.EyesSpeed;

        // Tunnel slowdown
        if (PacmanMaze.IsTunnel(cell))
            return PacmanLevels.Speed(level.GhostTunnelSpeedPct);

        // Elroy: Blinky speeds up when few pellets remain
        if (state.GhostRole == PacmanGhostRole.Blinky)
        {
            if (stats.PelletsRemaining <= level.Elroy2DotsLeft)
                return PacmanLevels.Speed(level.Elroy2SpeedPct);
            if (stats.PelletsRemaining <= level.Elroy1DotsLeft)
                return PacmanLevels.Speed(level.Elroy1SpeedPct);
        }

        return PacmanLevels.Speed(level.GhostSpeedPct);
    }

    private void ConsumePellet(Entity player, ref PacmanStats stats, PacmanLevelProps level)
    {
        var transform = World.Get<PacmanTransform>(player);
        var cell = PacmanMaze.CellFromPosition(transform.X, transform.Y);
        if (!PacmanMaze.IsNearCenter(transform.X, transform.Y, cell)) return;

        // Fruit collision
        var fruitEntity = FindFruit();
        if (fruitEntity != Entity.Null)
        {
            var fruit = World.Get<PacmanFruit>(fruitEntity);
            if (fruit.Visible)
            {
                var fruitCell = PacmanMaze.CellFromPosition(
                    World.Get<PacmanTransform>(fruitEntity).X,
                    World.Get<PacmanTransform>(fruitEntity).Y);
                if (fruitCell == cell)
                {
                    stats.Score += level.FruitPoints;
                    stats.AteFruit = true;
                    fruit.Visible = false;
                    fruit.RemainingSeconds = 0f;
                    World.Set(fruitEntity, fruit);
                    AwardExtraLife(ref stats);
                }
            }
        }

        var pellet = FindPelletAt(cell);
        if (pellet == Entity.Null) return;

        var power = World.Get<PacmanPellet>(pellet).Power;
        World.Destroy(pellet);
        stats.PelletsRemaining--;
        stats.DotsEaten++;
        stats.Score += power ? PacmanConfig.PowerPelletScore : PacmanConfig.PelletScore;
        stats.AtePellet = !power;
        stats.AtePowerPellet = power;
        stats.HouseIdleSeconds = 0f;

        AwardExtraLife(ref stats);
        IncrementHouseDotCounters(ref stats);

        if (power)
        {
            if (level.FrightSeconds > 0f)
            {
                stats.Frightened = true;
                stats.FrightenedRemaining = level.FrightSeconds;
                stats.FrightenedDuration = level.FrightSeconds;
                stats.FrightFlashes = level.FrightFlashes;
                stats.GhostChain = 0;
                foreach (var ghost in FindGhosts())
                {
                    var state = World.Get<PacmanGhostState>(ghost);
                    if (state.GhostMode == PacmanGhostMode.Eyes) continue;
                    if (state.IsInHouse) continue;
                    state.Mode = (int)PacmanGhostMode.Frightened;
                    World.Set(ghost, state);
                    var gFacing = World.Get<PacmanFacing>(ghost);
                    gFacing.Current = (int)PacmanMaze.Opposite(gFacing.CurrentDirection);
                    World.Set(ghost, gFacing);
                }
            }
            else
            {
                foreach (var ghost in FindGhosts())
                {
                    var state = World.Get<PacmanGhostState>(ghost);
                    if (state.GhostMode == PacmanGhostMode.Eyes || state.IsInHouse) continue;
                    var gFacing = World.Get<PacmanFacing>(ghost);
                    gFacing.Current = (int)PacmanMaze.Opposite(gFacing.CurrentDirection);
                    World.Set(ghost, gFacing);
                }
            }
        }
    }

    private void AwardExtraLife(ref PacmanStats stats)
    {
        if (stats.ExtraLivesAwarded > 0) return;
        if (stats.Score >= PacmanLevels.ExtraLifeAtScore)
        {
            stats.Lives++;
            stats.ExtraLivesAwarded++;
        }
    }

    private void IncrementHouseDotCounters(ref PacmanStats stats)
    {
        if (stats.GlobalDotActive)
        {
            stats.GlobalDotCount++;
            PacmanGhostRole? releaseThreshold = stats.GlobalDotCount switch
            {
                7 => PacmanGhostRole.Pinky,
                17 => PacmanGhostRole.Inky,
                32 => PacmanGhostRole.Clyde,
                _ => null,
            };
            if (releaseThreshold.HasValue)
            {
                ReleaseGhostByRole(releaseThreshold.Value);
                if (stats.GlobalDotCount >= 32 && IsGhostInHouse(PacmanGhostRole.Clyde))
                {
                    stats.GlobalDotActive = false;
                }
            }
            return;
        }

        foreach (var ghost in FindGhosts())
        {
            var state = World.Get<PacmanGhostState>(ghost);
            if (!state.IsInHouse || state.GhostRole == PacmanGhostRole.Blinky) continue;

            state.DotCount++;
            var limit = PacmanLevels.HouseDotLimit(stats.Level, state.GhostRole);
            if (state.DotCount >= limit)
            {
                state.InHouse = 0;
            }
            World.Set(ghost, state);
            if (!state.IsInHouse) return;
        }
    }

    private void ReleaseGhostByRole(PacmanGhostRole role)
    {
        foreach (var ghost in FindGhosts())
        {
            var state = World.Get<PacmanGhostState>(ghost);
            if (state.GhostRole == role && state.IsInHouse)
            {
                state.InHouse = 0;
                World.Set(ghost, state);
                return;
            }
        }
    }

    private bool IsGhostInHouse(PacmanGhostRole role)
    {
        foreach (var ghost in FindGhosts())
        {
            var state = World.Get<PacmanGhostState>(ghost);
            if (state.GhostRole == role) return state.IsInHouse;
        }
        return false;
    }

    private void HandleCollisions(Entity player, ref PacmanStats stats, PacmanLevelProps level)
    {
        var playerTransform = World.Get<PacmanTransform>(player);
        var playerCell = PacmanMaze.CellFromPosition(playerTransform.X, playerTransform.Y);

        foreach (var ghost in FindGhosts())
        {
            var ghostState = World.Get<PacmanGhostState>(ghost);
            if (ghostState.IsInHouse) continue;

            var ghostTransform = World.Get<PacmanTransform>(ghost);
            if (PacmanMaze.CellFromPosition(ghostTransform.X, ghostTransform.Y) != playerCell) continue;

            if (ghostState.GhostMode == PacmanGhostMode.Eyes) continue;

            if (ghostState.GhostMode == PacmanGhostMode.Frightened)
            {
                var multiplier = 1 << Math.Min(stats.GhostChain, 3);
                stats.Score += PacmanConfig.GhostScore * multiplier;
                stats.GhostChain++;
                stats.GhostEaten = true;
                ghostState.Mode = (int)PacmanGhostMode.Eyes;
                World.Set(ghost, ghostState);
                AwardExtraLife(ref stats);
                continue;
            }

            stats.Lives--;
            stats.Died = true;
            stats.Frightened = false;
            stats.FrightenedRemaining = 0f;
            stats.FrightenedDuration = 0f;
            stats.FrightFlashes = 0;
            stats.GhostChain = 0;
            if (stats.Lives <= 0)
            {
                stats.Lives = 0;
                stats.GameOver = true;
                stats.Started = false;
            }
            else
            {
                stats.GlobalDotActive = true;
                stats.GlobalDotCount = 0;
                stats.HouseIdleSeconds = 0f;
                ResetActors(stats);
            }

            return;
        }
    }

    private PacmanDirection PickDirection(
        PacmanCell cell,
        PacmanDirection current,
        PacmanCell target,
        PacmanGhostMode mode)
    {
        var choices = new List<PacmanDirection>(4);
        foreach (var direction in DecisionOrder)
        {
            if (!PacmanMaze.CanMove(cell, direction)) continue;
            if (current != PacmanDirection.None && direction == PacmanMaze.Opposite(current)) continue;
            if (mode is PacmanGhostMode.Scatter or PacmanGhostMode.Chase &&
                PacmanMaze.IsSpecialIntersection(cell) && direction == PacmanDirection.Up)
            {
                continue;
            }

            choices.Add(direction);
        }

        if (choices.Count == 0)
        {
            var reverse = PacmanMaze.Opposite(current);
            return PacmanMaze.CanMove(cell, reverse) ? reverse : current;
        }

        if (mode == PacmanGhostMode.Frightened)
        {
            return choices[_random.Next(choices.Count)];
        }

        var best = choices[0];
        var bestDistance = PacmanMaze.DistanceSquared(PacmanMaze.NextCell(cell, best), target);
        for (var i = 1; i < choices.Count; i++)
        {
            var candidate = choices[i];
            var distance = PacmanMaze.DistanceSquared(PacmanMaze.NextCell(cell, candidate), target);
            if (distance < bestDistance)
            {
                best = candidate;
                bestDistance = distance;
            }
        }

        return best;
    }

    private static PacmanCell GetTarget(
        PacmanGhostRole role,
        PacmanCell ghostCell,
        PacmanCell playerCell,
        PacmanCell blinkyCell,
        PacmanDirection playerDirection,
        PacmanGhostMode mode)
    {
        if (mode == PacmanGhostMode.Frightened)
        {
            return role switch
            {
                PacmanGhostRole.Blinky => new PacmanCell(0, 0),
                PacmanGhostRole.Pinky => new PacmanCell(2, 0),
                PacmanGhostRole.Inky => new PacmanCell(PacmanMaze.Width - 2, PacmanMaze.Height - 1),
                _ => new PacmanCell(0, PacmanMaze.Height - 1),
            };
        }

        if (mode == PacmanGhostMode.Scatter)
        {
            return role switch
            {
                PacmanGhostRole.Blinky => new PacmanCell(25, 0),
                PacmanGhostRole.Pinky => new PacmanCell(2, 0),
                PacmanGhostRole.Inky => new PacmanCell(PacmanMaze.Width - 2, PacmanMaze.Height - 1),
                _ => new PacmanCell(0, PacmanMaze.Height - 1),
            };
        }

        return role switch
        {
            PacmanGhostRole.Blinky => playerCell,
            PacmanGhostRole.Pinky => FourAhead(playerCell, playerDirection),
            PacmanGhostRole.Inky => InkyTarget(playerCell, playerDirection, blinkyCell),
            PacmanGhostRole.Clyde => PacmanMaze.DistanceSquared(ghostCell, playerCell) >= 64
                ? playerCell
                : new PacmanCell(0, PacmanMaze.Height - 1),
            _ => playerCell,
        };
    }

    private static PacmanCell FourAhead(PacmanCell cell, PacmanDirection direction)
    {
        var vector = PacmanMaze.VectorFor(direction);
        var x = cell.X + (int)(vector.X * 4f);
        var y = cell.Y + (int)(vector.Y * 4f);
        if (direction == PacmanDirection.Up) x -= 4;
        return new PacmanCell(Math.Clamp(x, 0, PacmanMaze.Width - 1), Math.Clamp(y, 0, PacmanMaze.Height - 1));
    }

    private static PacmanCell InkyTarget(PacmanCell playerCell, PacmanDirection playerDirection, PacmanCell blinkyCell)
    {
        var vector = PacmanMaze.VectorFor(playerDirection);
        var twoAhead = new PacmanCell(
            Math.Clamp(playerCell.X + (int)(vector.X * 2f), 0, PacmanMaze.Width - 1),
            Math.Clamp(playerCell.Y + (int)(vector.Y * 2f), 0, PacmanMaze.Height - 1));
        return new PacmanCell(
            Math.Clamp(blinkyCell.X + ((twoAhead.X - blinkyCell.X) * 2), 0, PacmanMaze.Width - 1),
            Math.Clamp(blinkyCell.Y + ((twoAhead.Y - blinkyCell.Y) * 2), 0, PacmanMaze.Height - 1));
    }

    private static PacmanGhostMode BaseMode(in PacmanStats stats) =>
        stats.ModeIndex % 2 == 0 ? PacmanGhostMode.Scatter : PacmanGhostMode.Chase;

    private static void Advance(
        ref PacmanTransform transform,
        PacmanDirection direction,
        float speed,
        float dt,
        PacmanCell cell)
    {
        var vector = PacmanMaze.VectorFor(direction);
        transform.X += vector.X * speed * dt;
        transform.Y += vector.Y * speed * dt;

        if (PacmanMaze.IsTunnel(cell))
        {
            if (transform.X < 0f) transform.X += PacmanMaze.BoardWidth;
            if (transform.X >= PacmanMaze.BoardWidth) transform.X -= PacmanMaze.BoardWidth;
        }
    }

    private Entity FindStats()
    {
        EnsureBuffer();
        World.GetEntities(new QueryDescription(), _entityBuffer.AsSpan(0, World.Size));
        for (var _i = 0; _i < World.Size; _i++)
        {
            if (World.IsAlive(_entityBuffer[_i]) && World.Has<PacmanStats>(_entityBuffer[_i])) return _entityBuffer[_i];
        }
        return Entity.Null;
    }

    private Entity FindPlayer()
    {
        EnsureBuffer();
        World.GetEntities(new QueryDescription(), _entityBuffer.AsSpan(0, World.Size));
        for (var _i = 0; _i < World.Size; _i++)
        {
            if (World.IsAlive(_entityBuffer[_i]) && World.Has<PacmanPlayer>(_entityBuffer[_i])) return _entityBuffer[_i];
        }
        return Entity.Null;
    }

    private Entity[] FindGhosts()
    {
        EnsureBuffer();
        World.GetEntities(new QueryDescription(), _entityBuffer.AsSpan(0, World.Size));
        _ghostList.Clear();
        for (var _i = 0; _i < World.Size; _i++)
        {
            if (World.IsAlive(_entityBuffer[_i]) && World.Has<PacmanGhostState>(_entityBuffer[_i])) _ghostList.Add(_entityBuffer[_i]);
        }
        _ghostList.Sort((left, right) => World.Get<PacmanGhostState>(left).Role.CompareTo(World.Get<PacmanGhostState>(right).Role));
        return _ghostList.ToArray();
    }

    private Entity FindPelletAt(PacmanCell cell)
    {
        EnsureBuffer();
        World.GetEntities(new QueryDescription(), _entityBuffer.AsSpan(0, World.Size));
        for (var _i = 0; _i < World.Size; _i++)
        {
            var entity = _entityBuffer[_i];
            if (!World.IsAlive(entity) || !World.Has<PacmanPellet>(entity)) continue;
            var transform = World.Get<PacmanTransform>(entity);
            if (PacmanMaze.CellFromPosition(transform.X, transform.Y) == cell) return entity;
        }
        return Entity.Null;
    }

    private void EnsureBuffer()
    {
        if (_entityBuffer.Length < World.Size) _entityBuffer = new Entity[World.Size];
    }

    private Entity FindFruit()
    {
        EnsureBuffer();
        World.GetEntities(new QueryDescription(), _entityBuffer.AsSpan(0, World.Size));
        for (var _i = 0; _i < World.Size; _i++)
        {
            if (World.IsAlive(_entityBuffer[_i]) && World.Has<PacmanFruit>(_entityBuffer[_i])) return _entityBuffer[_i];
        }
        return Entity.Null;
    }
}
