

// TODO: Move query with T0 into world.cs?

namespace Arch.Core;
public partial class World
{
    public void ParallelQuery<T0>(in QueryDescription description, ForEach<T0> forEach)
    {
        var innerJob = new ForEachJob<T0>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1>(in QueryDescription description, ForEach<T0, T1> forEach)
    {
        var innerJob = new ForEachJob<T0, T1>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2>(in QueryDescription description, ForEach<T0, T1, T2> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3>(in QueryDescription description, ForEach<T0, T1, T2, T3> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

    public void ParallelQuery<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>(in QueryDescription description, ForEach<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14> forEach)
    {
        var innerJob = new ForEachJob<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11, T12, T13, T14>();
        innerJob.ForEach = forEach;

        InlineParallelChunkQuery(in description, innerJob);
    }

}
