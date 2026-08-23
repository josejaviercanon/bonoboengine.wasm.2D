

using System;
using System.Diagnostics.Contracts;
using Arch.Core;
using Arch.Core.Utils;

namespace Arch.Core;

public partial struct Chunk
{
    
    [Pure]
    public bool Has<T0, T1>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        var t9ComponentId = Component<T9>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t9ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t9ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        var t9ComponentId = Component<T9>.ComponentType.Id;
        var t10ComponentId = Component<T10>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t9ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t10ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t9ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t10ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        var t9ComponentId = Component<T9>.ComponentType.Id;
        var t10ComponentId = Component<T10>.ComponentType.Id;
        var t11ComponentId = Component<T11>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t9ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t10ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t11ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t9ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t10ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t11ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        var t9ComponentId = Component<T9>.ComponentType.Id;
        var t10ComponentId = Component<T10>.ComponentType.Id;
        var t11ComponentId = Component<T11>.ComponentType.Id;
        var t12ComponentId = Component<T12>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t9ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t10ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t11ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t12ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t9ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t10ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t11ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t12ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        var t9ComponentId = Component<T9>.ComponentType.Id;
        var t10ComponentId = Component<T10>.ComponentType.Id;
        var t11ComponentId = Component<T11>.ComponentType.Id;
        var t12ComponentId = Component<T12>.ComponentType.Id;
        var t13ComponentId = Component<T13>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t9ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t10ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t11ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t12ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t13ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t9ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t10ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t11ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t12ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t13ComponentId] == -1) return false;
        

        return true;
    }

    
    [Pure]
    public bool Has<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        var t7ComponentId = Component<T7>.ComponentType.Id;
        var t8ComponentId = Component<T8>.ComponentType.Id;
        var t9ComponentId = Component<T9>.ComponentType.Id;
        var t10ComponentId = Component<T10>.ComponentType.Id;
        var t11ComponentId = Component<T11>.ComponentType.Id;
        var t12ComponentId = Component<T12>.ComponentType.Id;
        var t13ComponentId = Component<T13>.ComponentType.Id;
        var t14ComponentId = Component<T14>.ComponentType.Id;
        
        if (t0ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t1ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t2ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t3ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t4ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t5ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t6ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t7ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t8ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t9ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t10ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t11ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t12ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t13ComponentId >= ComponentIdToArrayIndex.Length) return false;
        if (t14ComponentId >= ComponentIdToArrayIndex.Length) return false;
        
        if (ComponentIdToArrayIndex[t0ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t1ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t2ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t3ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t4ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t5ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t6ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t7ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t8ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t9ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t10ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t11ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t12ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t13ComponentId] == -1) return false;
        if (ComponentIdToArrayIndex[t14ComponentId] == -1) return false;
        

        return true;
    }

    
    
    
    
    
    
    
    
    
    
    }
