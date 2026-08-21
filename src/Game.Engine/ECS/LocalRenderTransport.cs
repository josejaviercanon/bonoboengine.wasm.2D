using System.Text.Json;

namespace Game.Engine.ECS;

/// <summary>
///     Co-located single-player transport (ADR-007 Phase 2): signals are serialized
///     to JSON and delivered to a callback registered by the WASM host. The callback
///     typically bridges to the JavaScript side via <c>IJSRuntime.InvokeVoidAsync</c>.
///     Unlike <see cref="ServerRenderTransport{TSignal}"/>, there is no SSE/HTTP
///     boundary — the signal travels in-process from the simulation timer to the
///     browser's PixiJS scene.
/// </summary>
public sealed class LocalRenderTransport<TSignal> : IRenderTransport<TSignal>
{
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
    };

    private readonly Action<string, string> _deliver;
    private readonly string _eventName;

    /// <summary>
    ///     Creates a transport that delivers each signal as a JSON string via
    ///     <paramref name="deliver"/> (eventName, jsonPayload).
    /// </summary>
    /// <param name="deliver">
    ///     Callback that crosses the C#→JS boundary. Typically
    ///     <c>(name, json) =&gt; jsRuntime.InvokeVoidAsync("onRenderSignal", name, json)</c>.
    /// </param>
    /// <param name="eventName">
    ///     SSE event name the TypeScript scene listens for (e.g. <c>"tetris-move"</c>).
    /// </param>
    public LocalRenderTransport(Action<string, string> deliver, string eventName)
    {
        _deliver = deliver;
        _eventName = eventName;
    }

    /// <summary>Not used in the JSON-delivery path; the WASM host delivers via the callback.</summary>
    public event Action<TSignal>? OnSignal;

    /// <summary>
    ///     Serializes the signal to JSON and delivers it to the JavaScript side.
    ///     Called from the simulation timer thread (60 Hz).
    /// </summary>
    public void Push(TSignal signal)
    {
        OnSignal?.Invoke(signal);
        var json = JsonSerializer.Serialize(signal, JsonOptions);
        _deliver(_eventName, json);
    }
}
