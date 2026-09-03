using Game.Wasm;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using System.Runtime.InteropServices.JavaScript;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

#pragma warning disable CA1416
builder.Services.AddSingleton<SimHost>();
builder.Services.AddSingleton<Game.Examples.IExampleSims>(sp => sp.GetRequiredService<SimHost>());
#pragma warning restore CA1416

var host = builder.Build();

if (OperatingSystem.IsBrowser())
{
    await JSHost.ImportAsync("WasmInterop", "../js/wasm-interop.js");
    var sims = host.Services.GetRequiredService<SimHost>();
    WasmInterop.Initialize(sims);
}

await host.RunAsync();