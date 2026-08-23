

using System;
using System.Runtime.CompilerServices;
using System.Diagnostics.Contracts;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;

public partial struct Chunk
{

    [Pure]
    public Components<T0, T1> GetFirst<T0, T1>()
    {
        GetArray<T0, T1>(out var t0Array,out var t1Array);
        return new Components<T0, T1>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2> GetFirst<T0, T1, T2>()
    {
        GetArray<T0, T1, T2>(out var t0Array,out var t1Array,out var t2Array);
        return new Components<T0, T1, T2>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3> GetFirst<T0, T1, T2, T3>()
    {
        GetArray<T0, T1, T2, T3>(out var t0Array,out var t1Array,out var t2Array,out var t3Array);
        return new Components<T0, T1, T2, T3>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4> GetFirst<T0, T1, T2, T3, T4>()
    {
        GetArray<T0, T1, T2, T3, T4>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array);
        return new Components<T0, T1, T2, T3, T4>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5> GetFirst<T0, T1, T2, T3, T4, T5>()
    {
        GetArray<T0, T1, T2, T3, T4, T5>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array);
        return new Components<T0, T1, T2, T3, T4, T5>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6> GetFirst<T0, T1, T2, T3, T4, T5, T6>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference(),ref t9Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference(),ref t9Array.DangerousGetReference(),ref t10Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference(),ref t9Array.DangerousGetReference(),ref t10Array.DangerousGetReference(),ref t11Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array,out var t12Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference(),ref t9Array.DangerousGetReference(),ref t10Array.DangerousGetReference(),ref t11Array.DangerousGetReference(),ref t12Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array,out var t12Array,out var t13Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference(),ref t9Array.DangerousGetReference(),ref t10Array.DangerousGetReference(),ref t11Array.DangerousGetReference(),ref t12Array.DangerousGetReference(),ref t13Array.DangerousGetReference());
    }

    [Pure]
    public Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14> GetFirst<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>()
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array,out var t12Array,out var t13Array,out var t14Array);
        return new Components<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(ref t0Array.DangerousGetReference(),ref t1Array.DangerousGetReference(),ref t2Array.DangerousGetReference(),ref t3Array.DangerousGetReference(),ref t4Array.DangerousGetReference(),ref t5Array.DangerousGetReference(),ref t6Array.DangerousGetReference(),ref t7Array.DangerousGetReference(),ref t8Array.DangerousGetReference(),ref t9Array.DangerousGetReference(),ref t10Array.DangerousGetReference(),ref t11Array.DangerousGetReference(),ref t12Array.DangerousGetReference(),ref t13Array.DangerousGetReference(),ref t14Array.DangerousGetReference());
    }


}


