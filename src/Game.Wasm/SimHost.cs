using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;
using System.Runtime.Versioning;
using Game.Examples;

namespace Game.Wasm;

[SupportedOSPlatform("browser")]
public sealed class SimHost : IExampleSims, IDisposable
{
    private readonly object _sync = new();
    private string? _activeGame;

    private EcsSimulation? _ecs;
    private TetrisSimulation? _tetris;
    private SnakeSimulation? _snake;
    private BreakoutSimulation? _breakout;
    private AsteroidsSimulation? _asteroids;
    private PacmanSimulation? _pacman;
    private RacerSimulation? _racer;

    private static DirectRenderTransport<T> CreateTransport<T>(
        string eventName, Func<T, int> floatLength, Action<T, Span<float>> encode, int bufferCapacity)
    {
        var buffer = new PinnedRenderBuffer(bufferCapacity);
        buffer.OnNotify = name => WasmInterop.Notify(name);
        WasmInterop.RegisterBuffer(eventName, buffer);
        return new DirectRenderTransport<T>(eventName, floatLength, encode, buffer);
    }

    public EcsSimulation Ecs => _ecs ??= new EcsSimulation(
        CreateTransport<EcsRenderSignal>("sprite-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 128));

    public TetrisSimulation Tetris => _tetris ??= new TetrisSimulation(
        new Random(),
        CreateTransport<TetrisRenderSignal>("tetris-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 1024));

    public SnakeSimulation Snake => _snake ??= new SnakeSimulation(
        renderTransport: CreateTransport<SnakeRenderSignal>("snake-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 4096));

    public BreakoutSimulation Breakout => _breakout ??= new BreakoutSimulation(
        new Random(), startTimer: true,
        CreateTransport<BreakoutRenderSignal>("breakout-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 1024));

    public AsteroidsSimulation Asteroids => _asteroids ??= new AsteroidsSimulation(
        new Random(), startTimer: true,
        CreateTransport<AsteroidsRenderSignal>("asteroids-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 1024));

    public PacmanSimulation Pacman => _pacman ??= new PacmanSimulation(
        renderTransport: CreateTransport<PacmanRenderSignal>("pacman-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 8192));

    public RacerSimulation Racer => _racer ??= new RacerSimulation(
        new Random(), startTimer: true,
        CreateTransport<RacerRenderSignal>("racer-move", SignalBufferEncoders.FloatLength, SignalBufferEncoders.Encode, 512));

    public void SetPaused(bool paused)
    {
        // Reserved for future use — per-game Pause/Resume is the active path.
    }

    public void Connect(string game)
    {
        lock (_sync)
        {
            if (game == _activeGame) return;
            StopActiveLocked();
            switch (game)
            {
                case "ecs": _ = Ecs; break;
                case "tetris": _ = Tetris; break;
                case "snake": _ = Snake; break;
                case "breakout": _ = Breakout; break;
                case "asteroids": _ = Asteroids; break;
                case "pacman": _ = Pacman; break;
                case "racer": _ = Racer; break;
                default: break;
            }
            _activeGame = game;
        }
    }

    private void StopActiveLocked()
    {
        if (_activeGame == null) return;
        switch (_activeGame)
        {
            case "ecs": _ecs?.Dispose(); _ecs = null; WasmInterop.UnregisterBuffer("sprite-move"); break;
            case "tetris": _tetris?.Dispose(); _tetris = null; WasmInterop.UnregisterBuffer("tetris-move"); break;
            case "snake": _snake?.Dispose(); _snake = null; WasmInterop.UnregisterBuffer("snake-move"); break;
            case "breakout": _breakout?.Dispose(); _breakout = null; WasmInterop.UnregisterBuffer("breakout-move"); break;
            case "asteroids": _asteroids?.Dispose(); _asteroids = null; WasmInterop.UnregisterBuffer("asteroids-move"); break;
            case "pacman": _pacman?.Dispose(); _pacman = null; WasmInterop.UnregisterBuffer("pacman-move"); break;
            case "racer": _racer?.Dispose(); _racer = null; WasmInterop.UnregisterBuffer("racer-move"); break;
        }
        _activeGame = null;
    }

    public void Start(string game)
    {
        lock (_sync)
        {
            switch (game)
            {
                case "tetris": Tetris.Start(); break;
                case "snake": Snake.Start(); break;
                case "breakout": Breakout.Start(); break;
                case "asteroids": Asteroids.Start(); break;
                case "pacman": Pacman.Start(); break;
                case "racer": Racer.Resume(); break;
            }
        }
    }

    public void Restart(string game)
    {
        lock (_sync)
        {
            switch (game)
            {
                case "tetris": Tetris.Reset(); break;
                case "snake": Snake.Reset(); break;
                case "breakout": Breakout.Reset(); break;
                case "asteroids": Asteroids.Reset(); break;
                case "pacman": Pacman.Reset(); break;
                case "racer": Racer.Reset(); break;
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