using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;

namespace Game.Engine.ECS;

/// <summary>
///     Canonical shared-memory float32 signal layout — the C# half of the ADR-007
///     Phase 2/3 contract. The TypeScript half is <c>src/Game.UI/Frontend/scenes/bufferLayout.ts</c>;
///     both files MUST stay in sync (indices, extras order, entity stride).
///
///     Every signal buffer starts with a six-float standard header:
///         floats[0] seq, floats[1] epoch, floats[2] entityCount,
///         floats[3] stride, floats[4] stepMs, floats[5] tickMs
///     followed by scene-specific scalar extras, then entityCount × stride
///     entity records. Booleans are encoded as 0 / 1 (see <c>floatBool</c> in TS).
///     Ids ride in float32 — exact only up to 2^24, fine for these ECS id ranges.
/// </summary>
public static class SignalBuffer
{
    public const int HeaderLength = 6;
    public const int HeaderSeq = 0;
    public const int HeaderEpoch = 1;
    public const int HeaderEntityCount = 2;
    public const int HeaderStride = 3;
    public const int HeaderStepMs = 4;
    public const int HeaderTickMs = 5;

    public static void WriteHeader(
        Span<float> f, long seq, long epoch, int entityCount, int stride, double stepMs, double tickMs)
    {
        f[HeaderSeq] = seq;
        f[HeaderEpoch] = epoch;
        f[HeaderEntityCount] = entityCount;
        f[HeaderStride] = stride;
        f[HeaderStepMs] = (float)stepMs;
        f[HeaderTickMs] = (float)tickMs;
    }
}

/// <summary>
///     Per-game buffer geometry: scalar extras length and entity stride, one pair
///     per scene. Mirrors the <c>*_BUFFER_*</c> constants in the TypeScript scenes.
/// </summary>
public static class SignalBufferLayout
{
    // ecs (sprite-move): no extras, SpriteState record (id, x, y, r, g, b).
    public const int EcsStride = 6;

    // tetris extras: score, rows, level, gameOver, started, locked, linesCleared, pad(0).
    public const int TetrisExtras = 8;
    public const int TetrisStride = 6;

    // snake extras: score, gameOver, started, ate, foodSpawned, foodFalling.
    public const int SnakeExtras = 6;
    public const int SnakeStride = 11;

    // pacman extras: score, lives, level, pelletsRemaining, gameOver, started,
    // frightened, frightenedRemaining, frightenedDuration, frightFlashes,
    // fruitVisible, fruitItem, atePellet, atePowerPellet, ghostEaten, died,
    // levelUp, ateFruit.
    public const int PacmanExtras = 18;
    public const int PacmanStride = 16;

    // breakout extras: score, lives, level, gameOver, started, brickHit,
    // paddleHit, levelUp, loseLife.
    public const int BreakoutExtras = 9;
    public const int BreakoutStride = 8;

    // asteroids extras: score, highScore, lives, level, gameOver, started,
    // thrustOn, exploded, fired, saucerSpawned, levelUp, lifeGained.
    public const int AsteroidsExtras = 12;
    public const int AsteroidsStride = 11;

    // racer extras: player(9) + settings(7) + lapCompleted + collided.
    // Entities are traffic cars: (id, z, offset, speed, percent, spriteKind).
    public const int RacerExtras = 18;
    public const int RacerCarStride = 6;
}

/// <summary>
///     Encoders for every batched render signal into the shared-memory float32
///     layout consumed by <c>DirectRenderTransport</c> and the TypeScript
///     <c>SnapshotBuffer.ingestFromBuffer</c> decoders (ADR-007 Phase 2/3).
///     One <c>FloatLength</c> + <c>Encode</c> pair per signal type; the transport
///     sizes its buffer from <c>FloatLength</c> before calling <c>Encode</c>.
/// </summary>
public static class SignalBufferEncoders
{
    // ---- ECS (sprite-move) -------------------------------------------------

    public static int FloatLength(EcsRenderSignal s) =>
        SignalBuffer.HeaderLength + s.Sprites.Count * SignalBufferLayout.EcsStride;

    public static void Encode(EcsRenderSignal s, Span<float> f)
    {
        // EcsRenderSignal carries no StepMs/Epoch; the client's interpolation
        // header still expects them, so encode the fixed 60 Hz step and epoch 0.
        SignalBuffer.WriteHeader(f, s.Seq, 0, s.Sprites.Count,
            SignalBufferLayout.EcsStride, (1d / 60d) * 1000d, s.TickMs);
        WriteSprites(f, SignalBuffer.HeaderLength, s.Sprites, SignalBufferLayout.EcsStride,
            static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.R;
                dst[4] = sp.G;
                dst[5] = sp.B;
            });
    }

    // ---- Tetris (tetris-move) ----------------------------------------------

    public static int FloatLength(TetrisRenderSignal s) =>
        SignalBuffer.HeaderLength + SignalBufferLayout.TetrisExtras +
        s.Sprites.Count * SignalBufferLayout.TetrisStride;

    public static void Encode(TetrisRenderSignal s, Span<float> f)
    {
        SignalBuffer.WriteHeader(f, s.Seq, s.Epoch, s.Sprites.Count,
            SignalBufferLayout.TetrisStride, s.StepMs, s.TickMs);
        var e = SignalBuffer.HeaderLength;
        f[e] = s.Score;
        f[e + 1] = s.Rows;
        f[e + 2] = s.Level;
        f[e + 3] = Bool(s.GameOver);
        f[e + 4] = Bool(s.Started);
        f[e + 5] = Bool(s.Locked);
        f[e + 6] = s.LinesCleared;
        f[e + 7] = 0; // pad — keeps TetrisExtras at 8, matching tetris.ts
        WriteSprites(f, SignalBuffer.HeaderLength + SignalBufferLayout.TetrisExtras,
            s.Sprites, SignalBufferLayout.TetrisStride, static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.R;
                dst[4] = sp.G;
                dst[5] = sp.B;
            });
    }

    // ---- Snake (snake-move) -------------------------------------------------

    public static int FloatLength(SnakeRenderSignal s) =>
        SignalBuffer.HeaderLength + SignalBufferLayout.SnakeExtras +
        s.Sprites.Count * SignalBufferLayout.SnakeStride;

    public static void Encode(SnakeRenderSignal s, Span<float> f)
    {
        SignalBuffer.WriteHeader(f, s.Seq, s.Epoch, s.Sprites.Count,
            SignalBufferLayout.SnakeStride, s.StepMs, s.TickMs);
        var e = SignalBuffer.HeaderLength;
        f[e] = s.Score;
        f[e + 1] = Bool(s.GameOver);
        f[e + 2] = Bool(s.Started);
        f[e + 3] = Bool(s.Ate);
        f[e + 4] = Bool(s.FoodSpawned);
        f[e + 5] = Bool(s.FoodFalling);
        WriteSprites(f, SignalBuffer.HeaderLength + SignalBufferLayout.SnakeExtras,
            s.Sprites, SignalBufferLayout.SnakeStride, static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.PreviousX;
                dst[4] = sp.PreviousY;
                dst[5] = sp.VelocityX;
                dst[6] = sp.VelocityY;
                dst[7] = (float)sp.Kind;
                dst[8] = sp.R;
                dst[9] = sp.G;
                dst[10] = sp.B;
            });
    }

    // ---- Breakout (breakout-move) ---------------------------------------------

    public static int FloatLength(BreakoutRenderSignal s) =>
        SignalBuffer.HeaderLength + SignalBufferLayout.BreakoutExtras +
        s.Sprites.Count * SignalBufferLayout.BreakoutStride;

    public static void Encode(BreakoutRenderSignal s, Span<float> f)
    {
        SignalBuffer.WriteHeader(f, s.Seq, s.Epoch, s.Sprites.Count,
            SignalBufferLayout.BreakoutStride, s.StepMs, s.TickMs);
        var e = SignalBuffer.HeaderLength;
        f[e] = s.Score;
        f[e + 1] = s.Lives;
        f[e + 2] = s.Level;
        f[e + 3] = Bool(s.GameOver);
        f[e + 4] = Bool(s.Started);
        f[e + 5] = Bool(s.BrickHit);
        f[e + 6] = Bool(s.PaddleHit);
        f[e + 7] = Bool(s.LevelUp);
        f[e + 8] = Bool(s.LoseLife);
        WriteSprites(f, SignalBuffer.HeaderLength + SignalBufferLayout.BreakoutExtras,
            s.Sprites, SignalBufferLayout.BreakoutStride, static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.Width;
                dst[4] = sp.Height;
                dst[5] = sp.R;
                dst[6] = sp.G;
                dst[7] = sp.B;
            });
    }

    // ---- Pacman (pacman-move) ------------------------------------------------

    public static int FloatLength(PacmanRenderSignal s) =>
        SignalBuffer.HeaderLength + SignalBufferLayout.PacmanExtras +
        s.Sprites.Count * SignalBufferLayout.PacmanStride;

    public static void Encode(PacmanRenderSignal s, Span<float> f)
    {
        SignalBuffer.WriteHeader(f, s.Seq, s.Epoch, s.Sprites.Count,
            SignalBufferLayout.PacmanStride, s.StepMs, s.TickMs);
        var e = SignalBuffer.HeaderLength;
        f[e] = s.Score;
        f[e + 1] = s.Lives;
        f[e + 2] = s.Level;
        f[e + 3] = s.PelletsRemaining;
        f[e + 4] = Bool(s.GameOver);
        f[e + 5] = Bool(s.Started);
        f[e + 6] = Bool(s.Frightened);
        f[e + 7] = s.FrightenedRemaining;
        f[e + 8] = s.FrightenedDuration;
        f[e + 9] = s.FrightFlashes;
        f[e + 10] = Bool(s.FruitVisible);
        f[e + 11] = s.FruitItem;
        f[e + 12] = Bool(s.AtePellet);
        f[e + 13] = Bool(s.AtePowerPellet);
        f[e + 14] = Bool(s.GhostEaten);
        f[e + 15] = Bool(s.Died);
        f[e + 16] = Bool(s.LevelUp);
        f[e + 17] = Bool(s.AteFruit);
        WriteSprites(f, SignalBuffer.HeaderLength + SignalBufferLayout.PacmanExtras,
            s.Sprites, SignalBufferLayout.PacmanStride, static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.PreviousX;
                dst[4] = sp.PreviousY;
                dst[5] = sp.VelocityX;
                dst[6] = sp.VelocityY;
                dst[7] = sp.Rotation;
                dst[8] = (float)sp.Kind;
                dst[9] = (float)sp.Direction;
                dst[10] = (float)sp.Mode;
                dst[11] = Bool(sp.Visible);
                dst[12] = sp.R;
                dst[13] = sp.G;
                dst[14] = sp.B;
                dst[15] = sp.FruitItem;
            });
    }

    // ---- Asteroids (asteroids-move) ---------------------------------------------

    public static int FloatLength(AsteroidsRenderSignal s) =>
        SignalBuffer.HeaderLength + SignalBufferLayout.AsteroidsExtras +
        s.Sprites.Count * SignalBufferLayout.AsteroidsStride;

    public static void Encode(AsteroidsRenderSignal s, Span<float> f)
    {
        SignalBuffer.WriteHeader(f, s.Seq, s.Epoch, s.Sprites.Count,
            SignalBufferLayout.AsteroidsStride, s.StepMs, s.TickMs);
        var e = SignalBuffer.HeaderLength;
        f[e] = s.Score;
        f[e + 1] = s.HighScore;
        f[e + 2] = s.Lives;
        f[e + 3] = s.Level;
        f[e + 4] = Bool(s.GameOver);
        f[e + 5] = Bool(s.Started);
        f[e + 6] = Bool(s.ThrustOn);
        f[e + 7] = Bool(s.Exploded);
        f[e + 8] = Bool(s.Fired);
        f[e + 9] = Bool(s.SaucerSpawned);
        f[e + 10] = Bool(s.LevelUp);
        f[e + 11] = Bool(s.LifeGained);
        WriteSprites(f, SignalBuffer.HeaderLength + SignalBufferLayout.AsteroidsExtras,
            s.Sprites, SignalBufferLayout.AsteroidsStride, static (sp, dst) =>
            {
                dst[0] = sp.Id;
                dst[1] = sp.X;
                dst[2] = sp.Y;
                dst[3] = sp.Rotation;
                dst[4] = sp.VX;
                dst[5] = sp.VY;
                dst[6] = sp.Kind;
                dst[7] = sp.Size;
                dst[8] = sp.R;
                dst[9] = sp.G;
                dst[10] = sp.B;
            });
    }

    // ---- Racer (racer-move) -----------------------------------------------------

    public static int FloatLength(RacerRenderSignal s) =>
        SignalBuffer.HeaderLength + SignalBufferLayout.RacerExtras +
        s.Cars.Count * SignalBufferLayout.RacerCarStride;

    public static void Encode(RacerRenderSignal s, Span<float> f)
    {
        SignalBuffer.WriteHeader(f, s.Seq, s.Epoch, s.Cars.Count,
            SignalBufferLayout.RacerCarStride, s.StepMs, s.TickMs);
        var e = SignalBuffer.HeaderLength;
        var p = s.Player;
        f[e] = p.X;
        f[e + 1] = p.Z;
        f[e + 2] = p.Speed;
        f[e + 3] = p.CurrentLapTime;
        f[e + 4] = p.LastLapTime;
        f[e + 5] = p.FastLapTime;
        f[e + 6] = p.Lap;
        f[e + 7] = p.Steer;
        f[e + 8] = Bool(p.Uphill);
        var cfg = s.Settings;
        f[e + 9] = cfg.Lanes;
        f[e + 10] = cfg.RoadWidth;
        f[e + 11] = cfg.CameraHeight;
        f[e + 12] = cfg.DrawDistance;
        f[e + 13] = cfg.FieldOfView;
        f[e + 14] = cfg.FogDensity;
        f[e + 15] = cfg.ResolutionScale;
        f[e + 16] = Bool(s.LapCompleted);
        f[e + 17] = Bool(s.Collided);
        WriteSprites(f, SignalBuffer.HeaderLength + SignalBufferLayout.RacerExtras,
            s.Cars, SignalBufferLayout.RacerCarStride, static (car, dst) =>
            {
                dst[0] = car.Id;
                dst[1] = car.Z;
                dst[2] = car.Offset;
                dst[3] = car.Speed;
                dst[4] = car.Percent;
                dst[5] = car.SpriteKind;
            });
    }

    // ---- shared writer --------------------------------------------------------

    private static void WriteSprites<T>(
        Span<float> f, int entityBase, IReadOnlyList<T> sprites, int stride,
        WriteEntity<T> write)
    {
        for (var i = 0; i < sprites.Count; i++)
        {
            write(sprites[i], f.Slice(entityBase + i * stride, stride));
        }
    }

    private delegate void WriteEntity<in T>(T sprite, Span<float> destination);

    private static float Bool(bool value) => value ? 1f : 0f;
}
