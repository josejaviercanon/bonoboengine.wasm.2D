using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;
using Game.Examples;

namespace Game.Wasm;

/// <summary>
///     Lazily creates and caches the co-located simulations (ADR-007 Phase 2)
///     and implements <see cref="IExampleSims"/> for the example pages. Each sim
///     is constructed on first use — property access from the rendered example
///     page, a <c>/api/{game}/connect</c> command posted by the matching scene,
///     or any game command — and is wired to a
///     <see cref="DirectRenderTransport{TSignal}"/> that delivers float32 signal
///     buffers to the PixiJS scene. Unvisited games never spawn their 60 Hz
///     timers, so the WASM main thread only pays for the scenes the player
///     actually opens (this was the 60→2 FPS collapse: all seven sims ticking
///     in the interpreter from boot).
/// </summary>
public sealed class SimHost : IExampleSims, IDisposable
{
    private readonly WasmRenderBridge _bridge;
    private readonly object _sync = new();

    private EcsSimulation? _ecs;
    private TetrisSimulation? _tetris;
    private SnakeSimulation? _snake;
    private BreakoutSimulation? _breakout;
    private AsteroidsSimulation? _asteroids;
    private PacmanSimulation? _pacman;
    private RacerSimulation? _racer;

    public SimHost(WasmRenderBridge bridge)
    {
        _bridge = bridge;
    }

    public EcsSimulation Ecs => _ecs ??= new EcsSimulation(
        _bridge.Create<EcsRenderSignal>("sprite-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    public TetrisSimulation Tetris => _tetris ??= new TetrisSimulation(
        new Random(),
        _bridge.Create<TetrisRenderSignal>("tetris-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    public SnakeSimulation Snake => _snake ??= new SnakeSimulation(
        renderTransport: _bridge.Create<SnakeRenderSignal>("snake-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    public BreakoutSimulation Breakout => _breakout ??= new BreakoutSimulation(
        new Random(), startTimer: true,
        _bridge.Create<BreakoutRenderSignal>("breakout-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    public AsteroidsSimulation Asteroids => _asteroids ??= new AsteroidsSimulation(
        new Random(), startTimer: true,
        _bridge.Create<AsteroidsRenderSignal>("asteroids-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    public PacmanSimulation Pacman => _pacman ??= new PacmanSimulation(
        renderTransport: _bridge.Create<PacmanRenderSignal>("pacman-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    public RacerSimulation Racer => _racer ??= new RacerSimulation(
        new Random(), startTimer: true,
        _bridge.Create<RacerRenderSignal>("racer-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode));

    /// <summary>Creates the named simulation if not running ("connect" command).</summary>
    public void Connect(string game)
    {
        lock (_sync)
        {
            switch (game)
            {
                case "ecs":
                    _ = Ecs;
                    break;
                case "tetris":
                    _ = Tetris;
                    break;
                case "snake":
                    _ = Snake;
                    break;
                case "breakout":
                    _ = Breakout;
                    break;
                case "asteroids":
                    _ = Asteroids;
                    break;
                case "pacman":
                    _ = Pacman;
                    break;
                case "racer":
                    _ = Racer;
                    break;
            }
        }
    }

    public void Dispose()
    {
        lock (_sync)
        {
            _ecs?.Dispose();
            _tetris?.Dispose();
            _snake?.Dispose();
            _breakout?.Dispose();
            _asteroids?.Dispose();
            _pacman?.Dispose();
            _racer?.Dispose();
        }
    }
}
