using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;
using Game.Examples;

namespace Game.Web;

/// <summary>
///     Server-host implementation of <see cref="IExampleSims"/> over the
///     always-on singleton simulations (behavior identical to the previous
///     direct @inject of each sim in ExampleHost).
/// </summary>
internal sealed class ServerExampleSims : IExampleSims
{
    public ServerExampleSims(
        EcsSimulation ecs,
        SnakeSimulation snake,
        TetrisSimulation tetris,
        BreakoutSimulation breakout,
        PacmanSimulation pacman,
        AsteroidsSimulation asteroids,
        RacerSimulation racer)
    {
        Ecs = ecs;
        Snake = snake;
        Tetris = tetris;
        Breakout = breakout;
        Pacman = pacman;
        Asteroids = asteroids;
        Racer = racer;
    }

    public EcsSimulation Ecs { get; }
    public SnakeSimulation Snake { get; }
    public TetrisSimulation Tetris { get; }
    public BreakoutSimulation Breakout { get; }
    public PacmanSimulation Pacman { get; }
    public AsteroidsSimulation Asteroids { get; }
    public RacerSimulation Racer { get; }
}
