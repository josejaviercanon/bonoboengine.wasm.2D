using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;

namespace Game.Wasm;

[SupportedOSPlatform("browser")]
public static partial class WasmInterop
{
    private static SimHost? _sims;
    private static readonly Dictionary<string, PinnedRenderBuffer> _buffers = new();

    internal static void Initialize(SimHost sims)
    {
        _sims = sims;
    }

    internal static void RegisterBuffer(string eventName, PinnedRenderBuffer buffer)
    {
        _buffers[eventName] = buffer;
    }

    internal static void Notify(string eventName)
    {
        if (_buffers.TryGetValue(eventName, out var buffer))
            NotifyRender(eventName, (int)buffer.Ptr, buffer.FloatCount);
    }

    [JSImport("notifyRender", "WasmInterop")]
    internal static partial void NotifyRender(string eventName, int bufferPtr, int floatCount);

    [JSExport]
    internal static int GetBufferPtr(string eventName)
    {
        return _buffers.TryGetValue(eventName, out var b) ? (int)b.Ptr : 0;
    }

    [JSExport]
    internal static int GetBufferLen(string eventName)
    {
        return _buffers.TryGetValue(eventName, out var b) ? b.FloatCount : 0;
    }

    [JSExport]
    internal static void SetSimulationPaused(bool paused)
    {
        _sims?.SetPaused(paused);
    }

    [JSExport]
    internal static void ConnectGame(string game)
    {
        _sims?.Connect(game);
    }

    [JSExport]
    internal static void StartGame(string game)
    {
        _sims?.Connect(game);
        _sims?.Start(game);
    }

    [JSExport]
    internal static void RestartGame(string game)
    {
        _sims?.Connect(game);
        _sims?.Restart(game);
    }

    [JSExport]
    internal static void TetrisInput(string command)
    {
        _sims?.Tetris.QueueInput(command);
    }

    [JSExport]
    internal static void SnakeInput(string direction)
    {
        _sims?.Snake.QueueDirection(direction);
    }

    [JSExport]
    internal static void PacmanInput(string direction)
    {
        _sims?.Pacman.QueueDirection(direction);
    }

    [JSExport]
    internal static void BreakoutInput(bool left, bool right, bool launch)
    {
        _sims?.Breakout.QueueInput(new BreakoutInputRequest(left, right, launch));
    }

    [JSExport]
    internal static void AsteroidsInput(bool thrust, bool left, bool right, bool fire, bool hyperspace)
    {
        _sims?.Asteroids.QueueInput(new AsteroidsInputRequest(thrust, left, right, fire, hyperspace));
    }

    [JSExport]
    internal static void RacerInput(bool left, bool right, bool faster, bool slower)
    {
        _sims?.Racer.QueueInput(new RacerInputRequest(left, right, faster, slower));
    }

    [JSExport]
    internal static void RacerConfig(int lanes, float roadWidth, float cameraHeight, int drawDistance, float fieldOfView, float fogDensity, float resolutionScale)
    {
        _sims?.Racer.ApplyConfig(new RacerConfigRequest(lanes, roadWidth, cameraHeight, drawDistance, fieldOfView, fogDensity, resolutionScale));
    }

    [JSExport]
    internal static void PauseGame(string game)
    {
        if (game == "racer")
            _sims?.Racer.Pause();
    }

    [JSExport]
    internal static void ResumeGame(string game)
    {
        if (game == "racer")
            _sims?.Racer.Resume();
    }

    [JSExport]
    internal static string ListExamples()
    {
        return Game.Examples.ExamplePayloadBuilder.ListExamples();
    }

    [JSExport]
    internal static string GetExamplePayload(string exampleId)
    {
        return Game.Examples.ExamplePayloadBuilder.Build(exampleId, _sims);
    }
}