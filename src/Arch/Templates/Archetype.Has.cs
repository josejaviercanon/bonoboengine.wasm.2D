

//TODO: Improve source generation by extracting the stringbuilder stuff to own methods

using Arch.Core.Utils;

namespace Arch.Core;
public partial class Archetype
{
    public bool Has<T0, T1>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) ;
    }

    public bool Has<T0, T1, T2>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) ;
    }

    public bool Has<T0, T1, T2, T3>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) ;
    }

    public bool Has<T0, T1, T2, T3, T4>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) ;
    }

    public bool Has<T0, T1, T2, T3, T4, T5>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) ;
    }

    public bool Has<T0, T1, T2, T3, T4, T5, T6>()
    {
        var t0ComponentId = Component<T0>.ComponentType.Id;
        var t1ComponentId = Component<T1>.ComponentType.Id;
        var t2ComponentId = Component<T2>.ComponentType.Id;
        var t3ComponentId = Component<T3>.ComponentType.Id;
        var t4ComponentId = Component<T4>.ComponentType.Id;
        var t5ComponentId = Component<T5>.ComponentType.Id;
        var t6ComponentId = Component<T6>.ComponentType.Id;
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) && BitSet.IsSet(t9ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) && BitSet.IsSet(t9ComponentId) && BitSet.IsSet(t10ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) && BitSet.IsSet(t9ComponentId) && BitSet.IsSet(t10ComponentId) && BitSet.IsSet(t11ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) && BitSet.IsSet(t9ComponentId) && BitSet.IsSet(t10ComponentId) && BitSet.IsSet(t11ComponentId) && BitSet.IsSet(t12ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) && BitSet.IsSet(t9ComponentId) && BitSet.IsSet(t10ComponentId) && BitSet.IsSet(t11ComponentId) && BitSet.IsSet(t12ComponentId) && BitSet.IsSet(t13ComponentId) ;
    }

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
        
        return BitSet.IsSet(t0ComponentId) && BitSet.IsSet(t1ComponentId) && BitSet.IsSet(t2ComponentId) && BitSet.IsSet(t3ComponentId) && BitSet.IsSet(t4ComponentId) && BitSet.IsSet(t5ComponentId) && BitSet.IsSet(t6ComponentId) && BitSet.IsSet(t7ComponentId) && BitSet.IsSet(t8ComponentId) && BitSet.IsSet(t9ComponentId) && BitSet.IsSet(t10ComponentId) && BitSet.IsSet(t11ComponentId) && BitSet.IsSet(t12ComponentId) && BitSet.IsSet(t13ComponentId) && BitSet.IsSet(t14ComponentId) ;
    }

}
