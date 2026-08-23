using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;

namespace Game.Examples;

/// <summary>
///     Simulation access seam for the example pages (ADR-007 Phase 2).
///     <see cref="ExampleHost"/> only touches the game whose page is being
///     rendered, so a lazy implementation (the co-located Game.Wasm host, where
///     property access creates the sim and starts its timer) never pays for
///     unvisited games. The Game.Web host implements it over its always-on
///     server singletons — same rendering behavior as before.
/// </summary>
public interface IExampleSims
{
    EcsSimulation Ecs { get; }
    SnakeSimulation Snake { get; }
    TetrisSimulation Tetris { get; }
    BreakoutSimulation Breakout { get; }
    PacmanSimulation Pacman { get; }
    AsteroidsSimulation Asteroids { get; }
    RacerSimulation Racer { get; }
}
