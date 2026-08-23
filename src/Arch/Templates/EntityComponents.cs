

using System;
using System.Runtime.CompilerServices;
using CommunityToolkit.HighPerformance;
using Arch.Core.Utils;

namespace Arch.Core;


[SkipLocalsInit]
public ref struct EntityComponents<T0>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    public Ref<T9> t9;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    public ref T9 t9;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component,ref T9 t9Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    t9 = new Ref<T9>(ref t9Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    t9 = ref t9Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    public Ref<T9> t9;
    public Ref<T10> t10;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    public ref T9 t9;
    public ref T10 t10;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component,ref T9 t9Component,ref T10 t10Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    t9 = new Ref<T9>(ref t9Component);
    t10 = new Ref<T10>(ref t10Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    t9 = ref t9Component;
    t10 = ref t10Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    public Ref<T9> t9;
    public Ref<T10> t10;
    public Ref<T11> t11;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    public ref T9 t9;
    public ref T10 t10;
    public ref T11 t11;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component,ref T9 t9Component,ref T10 t10Component,ref T11 t11Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    t9 = new Ref<T9>(ref t9Component);
    t10 = new Ref<T10>(ref t10Component);
    t11 = new Ref<T11>(ref t11Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    t9 = ref t9Component;
    t10 = ref t10Component;
    t11 = ref t11Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    public Ref<T9> t9;
    public Ref<T10> t10;
    public Ref<T11> t11;
    public Ref<T12> t12;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    public ref T9 t9;
    public ref T10 t10;
    public ref T11 t11;
    public ref T12 t12;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component,ref T9 t9Component,ref T10 t10Component,ref T11 t11Component,ref T12 t12Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    t9 = new Ref<T9>(ref t9Component);
    t10 = new Ref<T10>(ref t10Component);
    t11 = new Ref<T11>(ref t11Component);
    t12 = new Ref<T12>(ref t12Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    t9 = ref t9Component;
    t10 = ref t10Component;
    t11 = ref t11Component;
    t12 = ref t12Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    public Ref<T9> t9;
    public Ref<T10> t10;
    public Ref<T11> t11;
    public Ref<T12> t12;
    public Ref<T13> t13;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    public ref T9 t9;
    public ref T10 t10;
    public ref T11 t11;
    public ref T12 t12;
    public ref T13 t13;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component,ref T9 t9Component,ref T10 t10Component,ref T11 t11Component,ref T12 t12Component,ref T13 t13Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    t9 = new Ref<T9>(ref t9Component);
    t10 = new Ref<T10>(ref t10Component);
    t11 = new Ref<T11>(ref t11Component);
    t12 = new Ref<T12>(ref t12Component);
    t13 = new Ref<T13>(ref t13Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    t9 = ref t9Component;
    t10 = ref t10Component;
    t11 = ref t11Component;
    t12 = ref t12Component;
    t13 = ref t13Component;
    
#endif
    }
}

[SkipLocalsInit]
public ref struct EntityComponents<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>
{

#if NETSTANDARD2_1 || NET6_0
    public ReadOnlyRef<Entity> Entity;
    public Ref<T0> t0;
    public Ref<T1> t1;
    public Ref<T2> t2;
    public Ref<T3> t3;
    public Ref<T4> t4;
    public Ref<T5> t5;
    public Ref<T6> t6;
    public Ref<T7> t7;
    public Ref<T8> t8;
    public Ref<T9> t9;
    public Ref<T10> t10;
    public Ref<T11> t11;
    public Ref<T12> t12;
    public Ref<T13> t13;
    public Ref<T14> t14;
    
#else
    public ref readonly Entity Entity;
    public ref T0 t0;
    public ref T1 t1;
    public ref T2 t2;
    public ref T3 t3;
    public ref T4 t4;
    public ref T5 t5;
    public ref T6 t6;
    public ref T7 t7;
    public ref T8 t8;
    public ref T9 t9;
    public ref T10 t10;
    public ref T11 t11;
    public ref T12 t12;
    public ref T13 t13;
    public ref T14 t14;
    
#endif

    [SkipLocalsInit]
    public EntityComponents(ref Entity entity, ref T0 t0Component,ref T1 t1Component,ref T2 t2Component,ref T3 t3Component,ref T4 t4Component,ref T5 t5Component,ref T6 t6Component,ref T7 t7Component,ref T8 t8Component,ref T9 t9Component,ref T10 t10Component,ref T11 t11Component,ref T12 t12Component,ref T13 t13Component,ref T14 t14Component){

#if NETSTANDARD2_1 || NET6_0
    Entity = new ReadOnlyRef<Entity>(in entity);
    t0 = new Ref<T0>(ref t0Component);
    t1 = new Ref<T1>(ref t1Component);
    t2 = new Ref<T2>(ref t2Component);
    t3 = new Ref<T3>(ref t3Component);
    t4 = new Ref<T4>(ref t4Component);
    t5 = new Ref<T5>(ref t5Component);
    t6 = new Ref<T6>(ref t6Component);
    t7 = new Ref<T7>(ref t7Component);
    t8 = new Ref<T8>(ref t8Component);
    t9 = new Ref<T9>(ref t9Component);
    t10 = new Ref<T10>(ref t10Component);
    t11 = new Ref<T11>(ref t11Component);
    t12 = new Ref<T12>(ref t12Component);
    t13 = new Ref<T13>(ref t13Component);
    t14 = new Ref<T14>(ref t14Component);
    
#else
    Entity = ref entity;
    t0 = ref t0Component;
    t1 = ref t1Component;
    t2 = ref t2Component;
    t3 = ref t3Component;
    t4 = ref t4Component;
    t5 = ref t5Component;
    t6 = ref t6Component;
    t7 = ref t7Component;
    t8 = ref t8Component;
    t9 = ref t9Component;
    t10 = ref t10Component;
    t11 = ref t11Component;
    t12 = ref t12Component;
    t13 = ref t13Component;
    t14 = ref t14Component;
    
#endif
    }
}


