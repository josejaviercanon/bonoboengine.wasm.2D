namespace Game.Engine.Generators;

/// <summary>Shared names and attribute source used by both the generator and the analyzer.</summary>
internal static class InteropNames
{
    /// <summary>Namespace the emitted attribute is registered under.</summary>
    public const string AttributeNamespace = "Game.Engine.Interop";

    /// <summary>Fully-qualified name of the attribute emitted into the consumer compilation.</summary>
    public const string AttributeFullyQualifiedName = "global::Game.Engine.Interop.TypeScriptExportAttribute";

    /// <summary>Namespace of <c>SignalBufferLayout</c> and the sprite-state structs.</summary>
    public const string EngineEcsNamespace = "Game.Engine.ECS";

    /// <summary>
    ///     Marker attribute emitted post-init (same pattern as Arch's <c>ComponentAttribute</c>).
    ///     <c>floatStride</c> is the number of floats the struct occupies in the shared-memory
    ///     buffer; 0 means "compute from fields, do not assert" (the module-initializer
    ///     still cross-checks the computed stride against <c>SignalBufferLayout</c>).
    /// </summary>
    public const string AttributeSource =
        "using System;\n" +
        "\n" +
        "namespace Game.Engine.Interop\n" +
        "{\n" +
        "    [AttributeUsage(AttributeTargets.Struct, Inherited = false, AllowMultiple = false)]\n" +
        "    public sealed class TypeScriptExportAttribute : Attribute\n" +
        "    {\n" +
        "        public TypeScriptExportAttribute(int floatStride = 0)\n" +
        "        {\n" +
        "            FloatStride = floatStride;\n" +
        "        }\n" +
        "\n" +
        "        public int FloatStride { get; }\n" +
        "    }\n" +
        "}\n";
}
