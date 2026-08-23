

using System;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;
public static partial class EntityExtensions
{
#if !PURE_ECS
    public static void Set<T0, T1>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1>(entity, in t0Component,in t1Component);
    }

    public static void Set<T0, T1, T2>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2>(entity, in t0Component,in t1Component,in t2Component);
    }

    public static void Set<T0, T1, T2, T3>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3>(entity, in t0Component,in t1Component,in t2Component,in t3Component);
    }

    public static void Set<T0, T1, T2, T3, T4>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default,in T13? t13Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component,in t13Component);
    }

    public static void Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(this Entity entity, in T0? t0Component = default,in T1? t1Component = default,in T2? t2Component = default,in T3? t3Component = default,in T4? t4Component = default,in T5? t5Component = default,in T6? t6Component = default,in T7? t7Component = default,in T8? t8Component = default,in T9? t9Component = default,in T10? t10Component = default,in T11? t11Component = default,in T12? t12Component = default,in T13? t13Component = default,in T14? t14Component = default)
    {
        var world = World.Worlds[entity.WorldId];
        world.Set<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(entity, in t0Component,in t1Component,in t2Component,in t3Component,in t4Component,in t5Component,in t6Component,in t7Component,in t8Component,in t9Component,in t10Component,in t11Component,in t12Component,in t13Component,in t14Component);
    }

#endif
}
