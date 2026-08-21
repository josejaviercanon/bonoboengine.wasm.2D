using Game.Engine.ECS;
using Game.Engine.ECS.Asteroids;
using Game.Engine.ECS.Breakout;
using Game.Engine.ECS.Pacman;
using Game.Engine.ECS.Racer;
using Game.Engine.ECS.Snake;
using Game.Engine.ECS.Tetris;
using Game.Wasm;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// All sims default to ServerRenderTransport (same constructor as Game.Web).
// The App component subscribes to OnRenderSignal and delivers JSON to the JS
// provider via IJSRuntime — no per-sim transport override needed. Signals
// emitted before the provider is registered are dropped (the scene picks up
// from the first signal after connection; sims start paused).
builder.Services.AddSingleton<EcsSimulation>();
builder.Services.AddSingleton<SnakeSimulation>();
builder.Services.AddSingleton<TetrisSimulation>();
builder.Services.AddSingleton<BreakoutSimulation>();
builder.Services.AddSingleton<AsteroidsSimulation>();
builder.Services.AddSingleton<PacmanSimulation>();
builder.Services.AddSingleton<RacerSimulation>();

await builder.Build().RunAsync();
