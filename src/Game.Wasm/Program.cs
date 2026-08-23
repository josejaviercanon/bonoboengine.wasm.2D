using Game.Wasm;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// ADR-007 Phase 2: simulations are created lazily by SimHost (one per visited
// scene, each wired to a DirectRenderTransport that delivers float32 signal
// buffers to the PixiJS scene via WasmRenderBridge). Registering them eagerly
// here started all seven 60 Hz timers in the mono-wasm interpreter at boot —
// the cause of the 60→2 FPS collapse versus Game.Web.
builder.Services.AddSingleton<WasmRenderBridge>();
builder.Services.AddSingleton<SimHost>();
// Example pages access sims through the lazy host (ADR-007 Phase 2).
builder.Services.AddSingleton<Game.Examples.IExampleSims>(sp => sp.GetRequiredService<SimHost>());

await builder.Build().RunAsync();
