

using System;
using System.Runtime.CompilerServices;
using System.Diagnostics.Contracts;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;

public partial struct Chunk
{

    [Pure]
    public void GetArray<T0, T1>(out T0[] t0Array,out T1[] t1Array)
    {
        Index<T0, T1>(out var t0Index,out var t1Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array)
    {
        Index<T0, T1, T2>(out var t0Index,out var t1Index,out var t2Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array)
    {
        Index<T0, T1, T2, T3>(out var t0Index,out var t1Index,out var t2Index,out var t3Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array)
    {
        Index<T0, T1, T2, T3, T4>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array)
    {
        Index<T0, T1, T2, T3, T4, T5>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array,out T9[] t9Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index,out var t9Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        t9Array = Unsafe.As<T9[]>(Unsafe.Add(ref arrays, t9Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array,out T9[] t9Array,out T10[] t10Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index,out var t9Index,out var t10Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        t9Array = Unsafe.As<T9[]>(Unsafe.Add(ref arrays, t9Index));
        t10Array = Unsafe.As<T10[]>(Unsafe.Add(ref arrays, t10Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array,out T9[] t9Array,out T10[] t10Array,out T11[] t11Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index,out var t9Index,out var t10Index,out var t11Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        t9Array = Unsafe.As<T9[]>(Unsafe.Add(ref arrays, t9Index));
        t10Array = Unsafe.As<T10[]>(Unsafe.Add(ref arrays, t10Index));
        t11Array = Unsafe.As<T11[]>(Unsafe.Add(ref arrays, t11Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array,out T9[] t9Array,out T10[] t10Array,out T11[] t11Array,out T12[] t12Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index,out var t9Index,out var t10Index,out var t11Index,out var t12Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        t9Array = Unsafe.As<T9[]>(Unsafe.Add(ref arrays, t9Index));
        t10Array = Unsafe.As<T10[]>(Unsafe.Add(ref arrays, t10Index));
        t11Array = Unsafe.As<T11[]>(Unsafe.Add(ref arrays, t11Index));
        t12Array = Unsafe.As<T12[]>(Unsafe.Add(ref arrays, t12Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array,out T9[] t9Array,out T10[] t10Array,out T11[] t11Array,out T12[] t12Array,out T13[] t13Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index,out var t9Index,out var t10Index,out var t11Index,out var t12Index,out var t13Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        t9Array = Unsafe.As<T9[]>(Unsafe.Add(ref arrays, t9Index));
        t10Array = Unsafe.As<T10[]>(Unsafe.Add(ref arrays, t10Index));
        t11Array = Unsafe.As<T11[]>(Unsafe.Add(ref arrays, t11Index));
        t12Array = Unsafe.As<T12[]>(Unsafe.Add(ref arrays, t12Index));
        t13Array = Unsafe.As<T13[]>(Unsafe.Add(ref arrays, t13Index));
        
    }

    [Pure]
    public void GetArray<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(out T0[] t0Array,out T1[] t1Array,out T2[] t2Array,out T3[] t3Array,out T4[] t4Array,out T5[] t5Array,out T6[] t6Array,out T7[] t7Array,out T8[] t8Array,out T9[] t9Array,out T10[] t10Array,out T11[] t11Array,out T12[] t12Array,out T13[] t13Array,out T14[] t14Array)
    {
        Index<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(out var t0Index,out var t1Index,out var t2Index,out var t3Index,out var t4Index,out var t5Index,out var t6Index,out var t7Index,out var t8Index,out var t9Index,out var t10Index,out var t11Index,out var t12Index,out var t13Index,out var t14Index);
        ref var arrays = ref Components.DangerousGetReference();
        t0Array = Unsafe.As<T0[]>(Unsafe.Add(ref arrays, t0Index));
        t1Array = Unsafe.As<T1[]>(Unsafe.Add(ref arrays, t1Index));
        t2Array = Unsafe.As<T2[]>(Unsafe.Add(ref arrays, t2Index));
        t3Array = Unsafe.As<T3[]>(Unsafe.Add(ref arrays, t3Index));
        t4Array = Unsafe.As<T4[]>(Unsafe.Add(ref arrays, t4Index));
        t5Array = Unsafe.As<T5[]>(Unsafe.Add(ref arrays, t5Index));
        t6Array = Unsafe.As<T6[]>(Unsafe.Add(ref arrays, t6Index));
        t7Array = Unsafe.As<T7[]>(Unsafe.Add(ref arrays, t7Index));
        t8Array = Unsafe.As<T8[]>(Unsafe.Add(ref arrays, t8Index));
        t9Array = Unsafe.As<T9[]>(Unsafe.Add(ref arrays, t9Index));
        t10Array = Unsafe.As<T10[]>(Unsafe.Add(ref arrays, t10Index));
        t11Array = Unsafe.As<T11[]>(Unsafe.Add(ref arrays, t11Index));
        t12Array = Unsafe.As<T12[]>(Unsafe.Add(ref arrays, t12Index));
        t13Array = Unsafe.As<T13[]>(Unsafe.Add(ref arrays, t13Index));
        t14Array = Unsafe.As<T14[]>(Unsafe.Add(ref arrays, t14Index));
        
    }


}


