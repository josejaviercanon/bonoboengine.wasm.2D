namespace Game.Engine.ECS.Pacman;

/// <summary>Fruit types that appear per level in the original Pac-Man.</summary>
public enum PacmanFruitItem : byte
{
    Cherry,
    Strawberry,
    Peach,
    Apple,
    Grape,
    Galaxian,
    Bell,
    Key,
}

/// <summary>Per-level gameplay parameters ported from the reference project's LevelStats table.</summary>
public readonly record struct PacmanLevelProps(
    PacmanFruitItem Fruit,
    int FruitPoints,
    float PacSpeedPct,
    float PacDotsSpeedPct,
    float GhostSpeedPct,
    float GhostTunnelSpeedPct,
    int Elroy1DotsLeft,
    float Elroy1SpeedPct,
    int Elroy2DotsLeft,
    float Elroy2SpeedPct,
    float FrightPacSpeedPct,
    float FrightPacDotsSpeedPct,
    float FrightGhostSpeedPct,
    float FrightSeconds,
    int FrightFlashes);

/// <summary>
/// Static 21-level stat table and helper constants ported from the reference
/// PacManBlazor project. Level numbers are 1-based (matching the original game).
/// </summary>
public static class PacmanLevels
{
    public const int MaxLevel = 21;
    public const float BaseSpeedPixelsPerSecond = 72f;
    public const float FruitShowSeconds = 10f;
    public const int FirstFruitAtDots = 70;
    public const int SecondFruitAtDots = 170;
    public const int ExtraLifeAtScore = 10_000;
    public const float HouseIdleTimeoutSeconds = 4f;

    /// <summary>Ghost house dot limits: [level-1, role] where role 0=Pinky,1=Inky,2=Clyde.</summary>
    public static int HouseDotLimit(int level, PacmanGhostRole role)
    {
        var idx = Math.Clamp(level, 1, MaxLevel) - 1;
        return role switch
        {
            PacmanGhostRole.Pinky => 0,
            PacmanGhostRole.Inky => idx == 0 ? 30 : 0,
            PacmanGhostRole.Clyde => idx == 0 ? 60 : idx == 1 ? 50 : 0,
            _ => 0,
        };
    }

    /// <summary>Scatter/chase mode durations for the given level (8 alternating phases).</summary>
    public static float[] ModePattern(int level)
    {
        var idx = Math.Clamp(level, 1, MaxLevel) - 1;
        if (idx == 0)
            return [7f, 20f, 7f, 20f, 5f, 20f, 5f, 9999f];
        if (idx <= 3)
            return [7f, 20f, 7f, 20f, 5f, 1033f, 0.017f, 9999f];
        return [5f, 20f, 7f, 20f, 5f, 1037f, 0.017f, 9999f];
    }

    /// <summary>Returns the level props, clamping to the 21-entry table.</summary>
    public static PacmanLevelProps ForLevel(int level)
    {
        var idx = Math.Clamp(level, 1, MaxLevel) - 1;
        return Table[idx];
    }

    /// <summary>Speed in pixels/second for the given percentage.</summary>
    public static float Speed(float pct) => pct * BaseSpeedPixelsPerSecond;

    private static readonly PacmanLevelProps[] Table =
    [
        // Level 1
        new(PacmanFruitItem.Cherry,     300,  .80f, .71f, .80f, .40f, 30, .90f, 15, .95f,  .90f, .79f, .50f, 6f, 5),
        // Level 2
        new(PacmanFruitItem.Strawberry, 300,  .90f, .79f, .85f, .45f, 30, .90f, 15, .95f,  .95f, .83f, .55f, 5f, 5),
        // Level 3
        new(PacmanFruitItem.Peach,      500,  .90f, .79f, .85f, .45f, 40, .90f, 20, .95f,  .95f, .83f, .55f, 4f, 5),
        // Level 4
        new(PacmanFruitItem.Peach,      500,  .90f, .79f, .85f, .45f, 40, .90f, 20, .95f,  .95f, .83f, .55f, 3f, 5),
        // Level 5
        new(PacmanFruitItem.Apple,      700,  1.0f, .87f, .95f, .50f, 40, 1.0f, 20, 1.05f, 1.0f, .87f, .60f, 2f, 5),
        // Level 6
        new(PacmanFruitItem.Apple,      700,  1.0f, .87f, .95f, .50f, 50, 1.0f, 25, 1.05f, 1.0f, .87f, .60f, 2f, 5),
        // Level 7
        new(PacmanFruitItem.Grape,      1000, 1.0f, .87f, .95f, .50f, 50, 1.0f, 25, 1.05f, 1.0f, .87f, .60f, 2f, 5),
        // Level 8
        new(PacmanFruitItem.Grape,      1000, 1.0f, .87f, .95f, .50f, 50, 1.0f, 25, 1.05f, 1.0f, .87f, .60f, 1f, 5),
        // Level 9
        new(PacmanFruitItem.Galaxian,   2000, 1.0f, .87f, .95f, .50f, 60, 1.0f, 30, 1.05f, 1.0f, .87f, .60f, 5f, 3),
        // Level 10
        new(PacmanFruitItem.Galaxian,   2000, 1.0f, .87f, .95f, .50f, 60, 1.0f, 30, 1.05f, 1.0f, .87f, .60f, 2f, 5),
        // Level 11
        new(PacmanFruitItem.Bell,       3000, 1.0f, .87f, .95f, .50f, 60, 1.0f, 30, 1.05f, 1.0f, .87f, .60f, 1f, 5),
        // Level 12
        new(PacmanFruitItem.Bell,       3000, 1.0f, .87f, .95f, .50f, 80, 1.0f, 40, 1.05f, 1.0f, .87f, .60f, 1f, 3),
        // Level 13
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 80, 1.0f, 40, 1.05f, 1.0f, .87f, .60f, 1f, 3),
        // Level 14
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 80, 1.0f, 40, 1.05f, 1.0f, .87f, .60f, 3f, 5),
        // Level 15
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 100, 1.0f, 50, 1.05f, 1.0f, .87f, .60f, 1f, 3),
        // Level 16
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 100, 1.0f, 50, 1.05f, 1.0f, .87f, .60f, 1f, 3),
        // Level 17 — no fright
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 100, 1.0f, 50, 1.05f, 0f, 0f, 0f, 0f, 0),
        // Level 18
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 100, 1.0f, 50, 1.05f, 1.0f, .87f, .60f, 1f, 3),
        // Level 19 — no fright
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 120, 1.0f, 60, 1.05f, 0f, 0f, 0f, 0f, 0),
        // Level 20 — no fright
        new(PacmanFruitItem.Key,        5000, 1.0f, .87f, .95f, .50f, 120, 1.0f, 60, 1.05f, 0f, 0f, 0f, 0f, 0),
        // Level 21 — slower pac, no fright
        new(PacmanFruitItem.Key,        5000,  .90f, .79f, .95f, .50f, 120, 1.0f, 60, 1.05f, 0f, 0f, 0f, 0f, 0),
    ];
}
