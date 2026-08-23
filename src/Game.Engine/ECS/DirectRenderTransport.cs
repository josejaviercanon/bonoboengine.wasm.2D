using System.Runtime.InteropServices;

namespace Game.Engine.ECS;

/// <summary>
///     Co-located single-player transport (ADR-007 Phase 2): each batched render
///     signal is encoded into the canonical float32 layout (see
///     <see cref="SignalBufferEncoders"/>) inside a growable byte buffer and
///     delivered to a host callback as raw bytes — no JSON, no reflection, no
///     per-entity interop. The callback typically crosses into JavaScript as a
///     <c>Uint8Array</c> via Blazor's optimized byte-array JS interop, where the
///     provider wraps it in a <c>Float32Array</c> view and dispatches it to the
///     scene's buffer listener. <see cref="OnSignal"/> still fires first, keeping
///     the SSE host subscription contract (Game.Web) unchanged.
/// </summary>
/// <typeparam name="TSignal">Batched render-signal record emitted by the simulation.</typeparam>
public sealed class DirectRenderTransport<TSignal> : IRenderTransport<TSignal>
{
    private readonly string _eventName;
    private readonly Func<TSignal, int> _floatLength;
    private readonly Action<TSignal, Span<float>> _encode;
    private readonly Action<string, byte[], int> _deliver;

    // Scratch encode buffer (grows on demand) and an exact-size send buffer so
    // every interop call copies only the payload bytes, never spare capacity.
    private byte[] _work = new byte[16 * 1024];
    private byte[] _send = [];

    public DirectRenderTransport(
        string eventName,
        Func<TSignal, int> floatLength,
        Action<TSignal, Span<float>> encode,
        Action<string, byte[], int> deliver)
    {
        _eventName = eventName;
        _floatLength = floatLength;
        _encode = encode;
        _deliver = deliver;
    }

    /// <summary>Raised for every pushed signal; the SSE host endpoints subscribe here.</summary>
    public event Action<TSignal>? OnSignal;

    /// <summary>
    ///     Encodes one batched render signal into the shared-memory layout and
    ///     delivers it. Called from the simulation timer callback (mono-wasm main
    ///     thread in the co-located host).
    /// </summary>
    public void Push(TSignal signal)
    {
        OnSignal?.Invoke(signal);

        var floatCount = _floatLength(signal);
        var byteLength = floatCount * sizeof(float);
        if (_work.Length < byteLength)
        {
            var grown = Math.Max(byteLength, _work.Length * 2);
            Array.Resize(ref _work, grown);
        }

        var floats = MemoryMarshal.Cast<byte, float>(_work.AsSpan(0, byteLength));
        _encode(signal, floats);

        if (_send.Length != byteLength)
        {
            _send = new byte[byteLength];
        }
        Buffer.BlockCopy(_work, 0, _send, 0, byteLength);

        _deliver(_eventName, _send, floatCount);
    }
}
