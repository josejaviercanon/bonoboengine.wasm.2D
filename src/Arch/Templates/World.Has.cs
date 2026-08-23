

using System;
using System.Diagnostics.Contracts;
using Arch.Core.Utils;

namespace Arch.Core;
public partial class World
{
    
    [Pure]
    public bool Has<T0, T1>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>();
    }
    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(Entity entity)
    {
        var archetype = EntityInfo.GetArchetype(entity.Id);
        return archetype.Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>();
    }
    
    }
