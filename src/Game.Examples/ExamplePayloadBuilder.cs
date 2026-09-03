using System.Text.Json;
using System.Text.Json.Serialization;
using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;

namespace Game.Examples;

internal sealed record ExampleDto(string Id, string Title, string Group);

[JsonSourceGenerationOptions(PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase)]
[JsonSerializable(typeof(ExamplePayload))]
[JsonSerializable(typeof(List<ExampleDto>))]
internal partial class ExamplePayloadJsonContext : JsonSerializerContext;

public static class ExamplePayloadBuilder
{
    public static string ListExamples()
    {
        var items = ExamplesCatalog.All.Select(e => new ExampleDto(e.Id, e.Title, e.Group)).ToList();
        return JsonSerializer.Serialize(items, ExamplePayloadJsonContext.Default.ListExampleDto);
    }

    public static string Build(string exampleId, IExampleSims? sims)
    {
        var example = ExamplesCatalog.Find(exampleId);
        if (example is null)
            return "{}";

        var payload = BuildInternal(example, sims);
        return JsonSerializer.Serialize(payload, ExamplePayloadJsonContext.Default.ExamplePayload);
    }

    private static ExamplePayload BuildInternal(ExamplesCatalog.ExampleInfo example, IExampleSims? sims)
    {
        return example.Id switch
        {
            "ecs/sprites" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Sprites: sims?.Ecs.Snapshot(), StreamUrl: "/api/ecs/stream"),
            "games/snake" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Snake: new SnakeScenePayload(sims!.Snake.Snapshot(), sims.Snake.Score,
                    sims.Snake.IsGameOver, sims.Snake.IsStarted,
                    SnakeSimulation.GridWidth, SnakeSimulation.GridHeight, SnakeSimulation.CellSize,
                    "/api/snake/stream")),
            "games/tetris" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Tetris: new TetrisScenePayload(sims!.Tetris.Snapshot(), sims.Tetris.Score,
                    sims.Tetris.Rows, sims.Tetris.Level,
                    sims.Tetris.IsGameOver, sims.Tetris.IsStarted,
                    TetrisSimulation.GridWidth, TetrisSimulation.GridHeight, TetrisSimulation.CellSize,
                    "/api/tetris/stream")),
            "games/breakout" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Breakout: new BreakoutScenePayload(sims!.Breakout.Snapshot(), sims.Breakout.Score,
                    sims.Breakout.Lives, sims.Breakout.Level,
                    sims.Breakout.IsGameOver, sims.Breakout.IsStarted,
                    BreakoutConfig.CourtWidth, BreakoutConfig.CourtHeight, BreakoutConfig.ChunkSize,
                    "/api/breakout/stream")),
            "games/pacman" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Pacman: new PacmanScenePayload(sims!.Pacman.Snapshot(), sims.Pacman.MazeRows,
                    sims.Pacman.Score, sims.Pacman.Lives, sims.Pacman.Level,
                    sims.Pacman.PelletsRemaining, sims.Pacman.IsGameOver, sims.Pacman.IsStarted,
                    PacmanSimulation.MazeWidth, PacmanSimulation.MazeHeight, PacmanSimulation.CellSize,
                    "/api/pacman/stream")),
            "games/asteroids" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Asteroids: new AsteroidsScenePayload(sims!.Asteroids.Snapshot(), sims.Asteroids.Score,
                    sims.Asteroids.HighScore, sims.Asteroids.Lives, sims.Asteroids.Level,
                    sims.Asteroids.IsGameOver, sims.Asteroids.IsStarted,
                    AsteroidsConfig.CourtWidth, AsteroidsConfig.CourtHeight, "/api/asteroids/stream")),
            "games/racer" => new ExamplePayload(example.Id, example.Title, example.SourceUrl,
                Racer: new RacerScenePayload(sims!.Racer.TrackSnapshot(), sims.Racer.PlayerSnapshot(),
                    sims.Racer.SnapshotCars(), sims.Racer.Settings, "/api/racer/stream")),
            _ => new ExamplePayload(example.Id, example.Title, example.SourceUrl),
        };
    }
}