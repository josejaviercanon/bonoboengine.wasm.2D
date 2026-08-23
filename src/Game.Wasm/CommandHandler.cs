using System.Text.Json;
using System.Text.Json.Serialization;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;
using Game.Examples;
using Microsoft.JSInterop;

namespace Game.Wasm;

/// <summary>
///     Source-generated JSON metadata for the command request bodies (AOT/trim
///     safe — no reflection deserialization on the mono-wasm interpreter path).
/// </summary>
[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(TetrisInputRequest))]
[JsonSerializable(typeof(SnakeInputRequest))]
[JsonSerializable(typeof(PacmanInputRequest))]
[JsonSerializable(typeof(BreakoutInputRequest))]
[JsonSerializable(typeof(AsteroidsInputRequest))]
[JsonSerializable(typeof(RacerInputRequest))]
[JsonSerializable(typeof(RacerConfigRequest))]
internal sealed partial class CommandJsonContext : JsonSerializerContext;

/// <summary>
///     Routes <c>postCommand</c> calls from the TypeScript scenes to the
///     authoritative simulation methods. Invoked from JS via
///     <c>DotNetObjectReference</c> — the provider's <c>postCommand</c> calls
///     <c>invokeMethodAsync('HandleCommand', path, bodyJson)</c>.
///     Each path maps to one game + action; the body is the JSON request the
///     scene would have POSTed to the Game.Web HTTP endpoint. Simulations are
///     created lazily by the <see cref="SimHost"/> — the scene's
///     <c>/api/{game}/connect</c> handshake creates the matching sim without
///     side effects, so unvisited games never start their 60 Hz timers.
/// </summary>
public sealed class CommandHandler
{
    private readonly SimHost _sims;

    public CommandHandler(SimHost sims)
    {
        _sims = sims;
    }

    [JSInvokable("HandleCommand")]
    public void HandleCommand(string path, string? bodyJson)
    {
        // Path format: /api/{game}/{action}
        var parts = path.Trim('/').Split('/');
        if (parts.Length < 3 || parts[0] != "api")
        {
            Console.WriteLine($"[Game.Wasm] unknown command path: {path}");
            return;
        }

        var game = parts[1];
        var action = parts[2];

        try
        {
            switch (game)
            {
                case "tetris":
                    HandleTetris(action, bodyJson);
                    break;
                case "snake":
                    HandleSnake(action, bodyJson);
                    break;
                case "breakout":
                    HandleBreakout(action, bodyJson);
                    break;
                case "asteroids":
                    HandleAsteroids(action, bodyJson);
                    break;
                case "pacman":
                    HandlePacman(action, bodyJson);
                    break;
                case "racer":
                    HandleRacer(action, bodyJson);
                    break;
                default:
                    Console.WriteLine($"[Game.Wasm] unknown game: {game}");
                    break;
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[Game.Wasm] command error ({path}): {ex.Message}");
        }
    }

    private void HandleTetris(string action, string? bodyJson)
    {
        switch (action)
        {
            case "connect":
                _sims.Connect("tetris");
                break;
            case "input":
                // bodyJson defaults to "{}" so Deserialize only returns null for a literal
                // "null" payload, which the TS signalSource never sends.
                var req = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.TetrisInputRequest)!;
                _sims.Tetris.QueueInput(req.Command);
                break;
            case "start":
                _sims.Tetris.Start();
                break;
            case "restart":
                _sims.Tetris.Reset();
                break;
        }
    }

    private void HandleSnake(string action, string? bodyJson)
    {
        switch (action)
        {
            case "connect":
                _sims.Connect("snake");
                break;
            case "input":
                var req = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.SnakeInputRequest)!;
                _sims.Snake.QueueDirection(req.Direction);
                break;
            case "start":
                _sims.Snake.Start();
                break;
            case "restart":
                _sims.Snake.Reset();
                break;
        }
    }

    private void HandleBreakout(string action, string? bodyJson)
    {
        switch (action)
        {
            case "connect":
                _sims.Connect("breakout");
                break;
            case "input":
                var req = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.BreakoutInputRequest);
                _sims.Breakout.QueueInput(req);
                break;
            case "start":
                _sims.Breakout.Start();
                break;
            case "restart":
                _sims.Breakout.Reset();
                break;
        }
    }

    private void HandleAsteroids(string action, string? bodyJson)
    {
        switch (action)
        {
            case "connect":
                _sims.Connect("asteroids");
                break;
            case "input":
                var req = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.AsteroidsInputRequest);
                _sims.Asteroids.QueueInput(req);
                break;
            case "start":
                _sims.Asteroids.Start();
                break;
            case "restart":
                _sims.Asteroids.Reset();
                break;
        }
    }

    private void HandlePacman(string action, string? bodyJson)
    {
        switch (action)
        {
            case "connect":
                _sims.Connect("pacman");
                break;
            case "input":
                var req = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.PacmanInputRequest)!;
                _sims.Pacman.QueueDirection(req.Direction);
                break;
            case "start":
                _sims.Pacman.Start();
                break;
            case "restart":
                _sims.Pacman.Reset();
                break;
        }
    }

    private void HandleRacer(string action, string? bodyJson)
    {
        switch (action)
        {
            case "connect":
                _sims.Connect("racer");
                break;
            case "input":
                var req = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.RacerInputRequest);
                _sims.Racer.QueueInput(req);
                break;
            case "config":
                var cfg = JsonSerializer.Deserialize(bodyJson ?? "{}", CommandJsonContext.Default.RacerConfigRequest);
                _sims.Racer.ApplyConfig(cfg);
                break;
            case "pause":
                _sims.Racer.Pause();
                break;
            case "resume":
                _sims.Racer.Resume();
                break;
            case "restart":
                _sims.Racer.Reset();
                break;
        }
    }
}
