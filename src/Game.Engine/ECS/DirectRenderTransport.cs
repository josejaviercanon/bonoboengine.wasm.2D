namespace Game.Engine.ECS;

public sealed class DirectRenderTransport<TSignal> : IRenderTransport<TSignal>
{
    private readonly string _eventName;
    private readonly Func<TSignal, int> _floatLength;
    private readonly Action<TSignal, Span<float>> _encode;
    private readonly PinnedRenderBuffer _buffer;

    public DirectRenderTransport(
        string eventName,
        Func<TSignal, int> floatLength,
        Action<TSignal, Span<float>> encode,
        PinnedRenderBuffer buffer)
    {
        _eventName = eventName;
        _floatLength = floatLength;
        _encode = encode;
        _buffer = buffer;
    }

    public event Action<TSignal>? OnSignal;

    public void Push(TSignal signal)
    {
        OnSignal?.Invoke(signal);
        var floatCount = _floatLength(signal);
        var span = _buffer.GetSpan(floatCount);
        _encode(signal, span);
        _buffer.Commit(_eventName);
    }
}