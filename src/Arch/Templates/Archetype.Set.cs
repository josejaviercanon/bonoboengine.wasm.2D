

using System;
using System.Runtime.CompilerServices;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;
public partial class Archetype
{
    internal void Set<T0, T1>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1>(slot.Index, in t0Component,in t1Component);
    }

    internal void Set<T0, T1, T2>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2>(slot.Index, in t0Component,in t1Component,in t2Component);
    }

    internal void Set<T0, T1, T2, T3>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component);
    }

    internal void Set<T0, T1, T2, T3, T4>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default,in T13? t13Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component,in t13Component);
    }

    internal void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(ref Slot slot, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default,in T13? t13Component = default,in T14? t14Component = default)
    {
        ref var chunk = ref GetChunk(slot.ChunkIndex);
        chunk.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(slot.Index, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component,in t13Component,in t14Component);
    }

}