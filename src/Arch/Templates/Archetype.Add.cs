

using System;
using System.Runtime.CompilerServices;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;
public partial class Archetype
{
    internal int Add<T0, T1>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default,in T13? t13Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component,in t13Component);
        return createdChunk;
    }

    internal int Add<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(Entity entity, out Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default,in T13? t13Component = default,in T14? t14Component = default)
    {
        var createdChunk = Add(entity, out var chunk, out slot);
        chunk.Set(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component,in t13Component,in t14Component);
        return createdChunk;
    }

}


