using System.Runtime.InteropServices;

namespace Game.Engine.ECS;

public sealed class PinnedRenderBuffer : IDisposable
{
    private float[] _buffer;
    private GCHandle _handle;
    private Action<string>? _notify;

    public Action<string>? OnNotify { set => _notify = value; }

    public PinnedRenderBuffer(int initialCapacity)
    {
        _buffer = new float[initialCapacity];
        _handle = GCHandle.Alloc(_buffer, GCHandleType.Pinned);
    }

    public IntPtr Ptr => _handle.AddrOfPinnedObject();
    public int FloatCount { get; private set; }

    public Span<float> GetSpan(int floatCount)
    {
        EnsureCapacity(floatCount);
        FloatCount = floatCount;
        return _buffer.AsSpan(0, floatCount);
    }

    public void Commit(string eventName)
    {
        _notify?.Invoke(eventName);
    }

    private void EnsureCapacity(int needed)
    {
        if (needed <= _buffer.Length) return;
        _handle.Free();
        var newSize = Math.Max(needed, _buffer.Length * 2);
        _buffer = new float[newSize];
        _handle = GCHandle.Alloc(_buffer, GCHandleType.Pinned);
    }

    public void Dispose()
    {
        if (_handle.IsAllocated)
            _handle.Free();
    }
}