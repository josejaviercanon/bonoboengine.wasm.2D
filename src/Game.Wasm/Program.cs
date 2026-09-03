using Game.Wasm;

[assembly: System.Runtime.Versioning.SupportedOSPlatform("browser")]

var sims = new SimHost();
WasmInterop.Initialize(sims);