using System.Text.Json;
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
///     Routes <c>postCommand</c> calls from the TypeScript scenes to the
///     authoritative simulation methods. Invoked from JS via
///     <c>DotNetObjectReference</c> — the provider's <c>postCommand</c> calls
///     <c>invokeMethodAsync('HandleCommand', path, bodyJson)</c>.
///     Each path maps to one game + action; the body is the JSON request the
///     scene would have POSTed to the Game.Web HTTP endpoint.
/// </summary>
public sealed class CommandHandler
{
    private readonly TetrisSimulation _tetris;
    private readonly SnakeSimulation _snake;
    private readonly BreakoutSimulation _breakout;
    private readonly AsteroidsSimulation _asteroids;
    private readonly PacmanSimulation _pacman;
    private readonly RacerSimulation _racer;

    private static readonly JsonSerializerOptions JsonOpts = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    public CommandHandler(
        TetrisSimulation tetris,
        SnakeSimulation snake,
        BreakoutSimulation breakout,
        AsteroidsSimulation asteroids,
        PacmanSimulation pacman,
        RacerSimulation racer)
    {
        _tetris = tetris;
        _snake = snake;
        _breakout = breakout;
        _asteroids = asteroids;
        _pacman = pacman;
        _racer = racer;
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
            case "input":
                var req = JsonSerializer.Deserialize<TetrisInputRequest>(bodyJson ?? "{}", JsonOpts);
                _tetris.QueueInput(req.Command);
                break;
            case "start":
                _tetris.Start();
                break;
            case "restart":
                _tetris.Reset();
                break;
        }
    }

    private void HandleSnake(string action, string? bodyJson)
    {
        switch (action)
        {
            case "input":
                var req = JsonSerializer.Deserialize<SnakeInputRequest>(bodyJson ?? "{}", JsonOpts);
                _snake.QueueDirection(req.Direction);
                break;
            case "start":
                _snake.Start();
                break;
            case "restart":
                _snake.Reset();
                break;
        }
    }

    private void HandleBreakout(string action, string? bodyJson)
    {
        switch (action)
        {
            case "input":
                var req = JsonSerializer.Deserialize<BreakoutInputRequest>(bodyJson ?? "{}", JsonOpts);
                _breakout.QueueInput(req);
                break;
            case "start":
                _breakout.Start();
                break;
            case "restart":
                _breakout.Reset();
                break;
        }
    }

    private void HandleAsteroids(string action, string? bodyJson)
    {
        switch (action)
        {
            case "input":
                var req = JsonSerializer.Deserialize<AsteroidsInputRequest>(bodyJson ?? "{}", JsonOpts);
                _asteroids.QueueInput(req);
                break;
            case "start":
                _asteroids.Start();
                break;
            case "restart":
                _asteroids.Reset();
                break;
        }
    }

    private void HandlePacman(string action, string? bodyJson)
    {
        switch (action)
        {
            case "input":
                var req = JsonSerializer.Deserialize<PacmanInputRequest>(bodyJson ?? "{}", JsonOpts);
                _pacman.QueueDirection(req.Direction);
                break;
            case "start":
                _pacman.Start();
                break;
            case "restart":
                _pacman.Reset();
                break;
        }
    }

    private void HandleRacer(string action, string? bodyJson)
    {
        switch (action)
        {
            case "input":
                var req = JsonSerializer.Deserialize<RacerInputRequest>(bodyJson ?? "{}", JsonOpts);
                _racer.QueueInput(req);
                break;
            case "config":
                var cfg = JsonSerializer.Deserialize<RacerConfigRequest>(bodyJson ?? "{}", JsonOpts);
                _racer.ApplyConfig(cfg);
                break;
            case "pause":
                _racer.Pause();
                break;
            case "resume":
                _racer.Resume();
                break;
            case "restart":
                _racer.Reset();
                break;
        }
    }
}
