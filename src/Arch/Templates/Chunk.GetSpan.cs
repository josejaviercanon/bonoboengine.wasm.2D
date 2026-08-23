

using System;
using System.Runtime.CompilerServices;
using System.Diagnostics.Contracts;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;

public partial struct Chunk
{
    [Pure]
    public void GetSpan<T0, T1>(out Span<T0> t0Span,out Span<T1> t1Span)
    {
        GetArray<T0, T1>(out var t0Array,out var t1Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span)
    {
        GetArray<T0, T1, T2>(out var t0Array,out var t1Array,out var t2Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span)
    {
        GetArray<T0, T1, T2, T3>(out var t0Array,out var t1Array,out var t2Array,out var t3Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span)
    {
        GetArray<T0, T1, T2, T3, T4>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span,out Span<T9> t9Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        t9Span = new Span<T9>(t9Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span,out Span<T9> t9Span,out Span<T10> t10Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        t9Span = new Span<T9>(t9Array);
        t10Span = new Span<T10>(t10Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span,out Span<T9> t9Span,out Span<T10> t10Span,out Span<T11> t11Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        t9Span = new Span<T9>(t9Array);
        t10Span = new Span<T10>(t10Array);
        t11Span = new Span<T11>(t11Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span,out Span<T9> t9Span,out Span<T10> t10Span,out Span<T11> t11Span,out Span<T12> t12Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array,out var t12Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        t9Span = new Span<T9>(t9Array);
        t10Span = new Span<T10>(t10Array);
        t11Span = new Span<T11>(t11Array);
        t12Span = new Span<T12>(t12Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span,out Span<T9> t9Span,out Span<T10> t10Span,out Span<T11> t11Span,out Span<T12> t12Span,out Span<T13> t13Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array,out var t12Array,out var t13Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        t9Span = new Span<T9>(t9Array);
        t10Span = new Span<T10>(t10Array);
        t11Span = new Span<T11>(t11Array);
        t12Span = new Span<T12>(t12Array);
        t13Span = new Span<T13>(t13Array);
        
    }

    [Pure]
    public void GetSpan<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(out Span<T0> t0Span,out Span<T1> t1Span,out Span<T2> t2Span,out Span<T3> t3Span,out Span<T4> t4Span,out Span<T5> t5Span,out Span<T6> t6Span,out Span<T7> t7Span,out Span<T8> t8Span,out Span<T9> t9Span,out Span<T10> t10Span,out Span<T11> t11Span,out Span<T12> t12Span,out Span<T13> t13Span,out Span<T14> t14Span)
    {
        GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(out var t0Array,out var t1Array,out var t2Array,out var t3Array,out var t4Array,out var t5Array,out var t6Array,out var t7Array,out var t8Array,out var t9Array,out var t10Array,out var t11Array,out var t12Array,out var t13Array,out var t14Array);
        t0Span = new Span<T0>(t0Array);
        t1Span = new Span<T1>(t1Array);
        t2Span = new Span<T2>(t2Array);
        t3Span = new Span<T3>(t3Array);
        t4Span = new Span<T4>(t4Array);
        t5Span = new Span<T5>(t5Array);
        t6Span = new Span<T6>(t6Array);
        t7Span = new Span<T7>(t7Array);
        t8Span = new Span<T8>(t8Array);
        t9Span = new Span<T9>(t9Array);
        t10Span = new Span<T10>(t10Array);
        t11Span = new Span<T11>(t11Array);
        t12Span = new Span<T12>(t12Array);
        t13Span = new Span<T13>(t13Array);
        t14Span = new Span<T14>(t14Array);
        
    }

}


