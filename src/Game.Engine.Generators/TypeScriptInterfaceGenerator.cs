using System;
using System.Collections.Immutable;
using System.IO;
using System.Text;
using System.Threading;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.CodeAnalysis.Text;

namespace Game.Engine.Generators;

/// <summary>
///     Emits the TypeScript half of the shared-memory float32 contract (ADR-007/008)
///     from the C# structs marked <c>[TypeScriptExport]</c>, and a fail-fast
///     <c>[ModuleInitializer]</c> that asserts the computed strides match
///     <c>Game.Engine.ECS.SignalBufferLayout</c> at WASM boot. Single source of truth:
///     the C# struct — the frontend can no longer drift from the backend layout.
/// </summary>
[Generator(LanguageNames.CSharp)]
public sealed class TypeScriptInterfaceGenerator : IIncrementalGenerator
{
    private static readonly DiagnosticDescriptor IoError = new DiagnosticDescriptor(
        "BNOBO099",
        "TypeScript generation failed",
        "Could not write generated TypeScript: {0}",
        "Generation", DiagnosticSeverity.Warning, isEnabledByDefault: true);

    public void Initialize(IncrementalGeneratorInitializationContext context)
    {
        context.RegisterPostInitializationOutput(static ctx =>
            ctx.AddSource("TypeScriptExportAttribute.g.cs",
                SourceText.From(InteropNames.AttributeSource, Encoding.UTF8)));

        var targets = context.SyntaxProvider
            .CreateSyntaxProvider(
                // record struct / struct / record — all are TypeDeclarationSyntax with attributes.
                static (node, _) => node is TypeDeclarationSyntax t && t.AttributeLists.Count > 0,
                static (ctx, ct) => GetExportTarget(ctx, ct))
            .Where(static t => t is not null)
            .Select(static (t, _) => t!);

        var projectDir = context.AnalyzerConfigOptionsProvider
            .Select(static (p, _) =>
            {
                var g = p.GlobalOptions;
                if (g.TryGetValue("build_property.projectdir", out var d) && !string.IsNullOrEmpty(d)) return d;
                if (g.TryGetValue("build_property.MSBuildProjectDirectory", out var d2) && !string.IsNullOrEmpty(d2)) return d2;
                return null;
            });

        context.RegisterSourceOutput(
            targets.Collect().Combine(projectDir),
            static (spc, pair) => Execute(pair.Left, pair.Right, spc));
    }

    private static ExportTarget? GetExportTarget(GeneratorSyntaxContext ctx, CancellationToken cancellationToken)
    {
        var typeSyntax = (TypeDeclarationSyntax)ctx.Node;
        if (ctx.SemanticModel.GetDeclaredSymbol(typeSyntax, cancellationToken) is not INamedTypeSymbol symbol)
            return null;
        if (symbol.TypeKind != TypeKind.Struct)
            return null;

        var declaredStride = 0;
        var hasAttribute = false;
        foreach (var ad in symbol.GetAttributes())
        {
            if (ad.AttributeClass is null) continue;
            if (ad.AttributeClass.ToDisplayString(SymbolDisplayFormat.FullyQualifiedFormat) !=
                InteropNames.AttributeFullyQualifiedName) continue;

            hasAttribute = true;
            if (ad.ConstructorArguments.Length > 0 && ad.ConstructorArguments[0].Value is int stride)
                declaredStride = stride;
            break;
        }

        if (!hasAttribute) return null;

        var members = StructLayoutInspector.GetMembers(symbol);
        var computed = 0;
        foreach (var m in members)
        {
            var width = StructLayoutInspector.FloatWidth(m.Type!);
            if (width > 0) computed += width;
        }

        return new ExportTarget
        {
            Name = symbol.Name,
            Namespace = symbol.ContainingNamespace.ToDisplayString(),
            DeclaredStride = declaredStride,
            ComputedStride = computed,
            Members = members
        };
    }

    private static void Execute(ImmutableArray<ExportTarget> targets, string? projectDir, SourceProductionContext ctx)
    {
        if (targets.IsDefaultOrEmpty) return;

        // 1. C# half: generated stride constants + module-initializer fail-fast.
        ctx.AddSource("GeneratedSignalLayout.g.cs", SourceText.From(BuildCSharp(targets), Encoding.UTF8));

        // 2. TypeScript half: interfaces + stride constants written to Game.UI's frontend tree.
        if (string.IsNullOrEmpty(projectDir)) return;
        try
        {
            var outDir = Path.GetFullPath(Path.Combine(projectDir, "..", "Game.UI", "Frontend", "scenes", "generated"));
            Directory.CreateDirectory(outDir);
            var outPath = Path.Combine(outDir, "signalLayout.ts");
            var ts = BuildTypeScript(targets);
            if (!File.Exists(outPath) || File.ReadAllText(outPath) != ts)
                File.WriteAllText(outPath, ts);
        }
        catch (Exception ex)
        {
            ctx.ReportDiagnostic(Diagnostic.Create(IoError, Location.None, ex.Message));
        }
    }

    private static string BuildCSharp(ImmutableArray<ExportTarget> targets)
    {
        var sb = new StringBuilder();
        sb.AppendLine("// <auto-generated/>");
        sb.AppendLine("// Generated by Game.Engine.Generators (TypeScriptInterfaceGenerator). Do not edit.");
        sb.AppendLine();
        sb.AppendLine("namespace " + InteropNames.EngineEcsNamespace);
        sb.AppendLine("{");
        sb.AppendLine("    public static class GeneratedSignalLayout");
        sb.AppendLine("    {");
        foreach (var t in targets)
            sb.AppendLine("        public const int " + t.Name + "Stride = " + t.ComputedStride + ";");
        sb.AppendLine("    }");
        sb.AppendLine();
        sb.AppendLine("    internal static class GeneratedLayoutStaticAssert");
        sb.AppendLine("    {");
        sb.AppendLine("        [global::System.Runtime.CompilerServices.ModuleInitializer]");
        sb.AppendLine("        internal static void ValidateSignalLayouts()");
        sb.AppendLine("        {");
        sb.AppendLine("            if (global::System.Runtime.CompilerServices.Unsafe.SizeOf<float>() != 4)");
        sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: sizeof(float) != 4; zero-copy Float32Array interop requires 4-byte floats.\");");
        foreach (var t in targets)
        {
            var constName = StructLayoutInspector.LayoutConstName(t.Name);
            sb.AppendLine("            if (GeneratedSignalLayout." + t.Name + "Stride != global::" + InteropNames.EngineEcsNamespace + ".SignalBufferLayout." + constName + "Stride)");
            sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: " + t.Name + " float-stride drifted from SignalBufferLayout." + constName + "Stride.\");");
        }
        sb.AppendLine("            if (GeneratedSignalLayout.SpriteStateStride != global::" + InteropNames.EngineEcsNamespace + ".SignalBufferLayout.TetrisStride)");
        sb.AppendLine("                throw new global::System.InvalidOperationException(\"MEMORY ALIGNMENT FATAL: SpriteState float-stride drifted from SignalBufferLayout.TetrisStride.\");");
        sb.AppendLine("        }");
        sb.AppendLine("    }");
        sb.AppendLine("}");
        return sb.ToString();
    }

    private static string BuildTypeScript(ImmutableArray<ExportTarget> targets)
    {
        var sb = new StringBuilder();
        sb.AppendLine("// <auto-generated />");
        sb.AppendLine("// Generated by Game.Engine.Generators (TypeScriptInterfaceGenerator). Do not edit.");
        sb.AppendLine("// Single source of truth: the C# [TypeScriptExport] structs and Game.Engine.ECS.SignalBufferLayout.");
        sb.AppendLine("// Regenerated on every `dotnet build` of Game.Engine.");
        sb.AppendLine();
        sb.AppendLine("/** Standard signal header: the first six floats of every signal buffer. */");
        sb.AppendLine("export interface BufferHeader {");
        sb.AppendLine("    seq: number;");
        sb.AppendLine("    epoch: number;");
        sb.AppendLine("    entityCount: number;");
        sb.AppendLine("    stride: number;");
        sb.AppendLine("    stepMs: number;");
        sb.AppendLine("    tickMs: number;");
        sb.AppendLine("}");
        sb.AppendLine();
        sb.AppendLine("export const BUFFER_HEADER_LENGTH = 6;");
        sb.AppendLine();
        foreach (var t in targets)
        {
            sb.AppendLine("export interface " + t.Name + " {");
            foreach (var m in t.Members)
                sb.AppendLine("    " + StructLayoutInspector.CamelCase(m.Name) + ": " + StructLayoutInspector.TsType(m.Type!) + ";");
            sb.AppendLine("}");
            sb.AppendLine("export const " + t.Name + "Stride = " + t.ComputedStride + ";");
            sb.AppendLine();
        }
        return sb.ToString();
    }
}
