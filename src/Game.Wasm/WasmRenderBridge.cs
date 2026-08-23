using Game.Engine.ECS;
using Microsoft.JSInterop;

namespace Game.Wasm;

/// <summary>
///     Bridges <see cref="DirectRenderTransport{TSignal}"/> deliveries into the
///     browser: raw signal bytes go to <c>window.onRenderSignalBuffer</c> via
///     Blazor's optimized byte-array JS interop (no JSON, no base64, no
///     reflection). Synchronous in-process invocation because the co-located
///     host runs on the mono-wasm main thread next to the JS event loop.
/// </summary>
public sealed class WasmRenderBridge
{
    private readonly IJSInProcessRuntime _js;

    public WasmRenderBridge(IJSRuntime js)
    {
        _js = (IJSInProcessRuntime)js;
    }

    /// <summary>Creates a direct transport that delivers to <c>onRenderSignalBuffer</c>.</summary>
    public DirectRenderTransport<TSignal> Create<TSignal>(
        string eventName,
        Func<TSignal, int> floatLength,
        Action<TSignal, Span<float>> encode) =>
        new(eventName, floatLength, encode, Deliver);

    private void Deliver(string eventName, byte[] payload, int floatCount) =>
        _js.InvokeVoid("onRenderSignalBuffer", eventName, payload, floatCount);
}
