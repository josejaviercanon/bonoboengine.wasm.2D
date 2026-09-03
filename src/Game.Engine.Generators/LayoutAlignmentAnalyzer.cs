using System.Collections.Immutable;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.Diagnostics;

namespace Game.Engine.Generators;

/// <summary>
///     Compile-time (IDE red-squiggle) validation of the zero-copy float32 layout
///     (ADR-007/008). Complements the load-time <c>[ModuleInitializer]</c> assert:
///     this analyzer runs during authoring, the module initializer guarantees the
///     final binary at WASM boot. Because <c>sizeof</c> of a custom struct is not a
///     compile-time constant, this analyzer sums the field float-widths (which the
///     <c>SignalBufferEncoders</c> also write one-per-float) and checks them against
///     the declared stride.
/// </summary>
[DiagnosticAnalyzer(LanguageNames.CSharp)]
public sealed class LayoutAlignmentAnalyzer : DiagnosticAnalyzer
{
    public const string StrideMismatchId = "BNOBO001";
    public const string UnsupportedTypeId = "BNOBO002";

    private static readonly DiagnosticDescriptor StrideMismatch = new DiagnosticDescriptor(
        StrideMismatchId,
        "Invalid Float32 layout stride",
        "Struct '{0}' computes a float32 stride of {1}, but its [TypeScriptExport] declares {2}. Fix the declared stride or the struct fields.",
        "Memory", DiagnosticSeverity.Error, isEnabledByDefault: true);

    private static readonly DiagnosticDescriptor UnsupportedType = new DiagnosticDescriptor(
        UnsupportedTypeId,
        "Unsupported field type for float32 interop",
        "Field '{0}' in struct '{1}' has type '{2}', which cannot be encoded into the shared-memory float32 buffer.",
        "Memory", DiagnosticSeverity.Error, isEnabledByDefault: true);

    public override ImmutableArray<DiagnosticDescriptor> SupportedDiagnostics =>
        ImmutableArray.Create(StrideMismatch, UnsupportedType);

    public override void Initialize(AnalysisContext context)
    {
        context.ConfigureGeneratedCodeAnalysis(GeneratedCodeAnalysisFlags.None);
        context.EnableConcurrentExecution();
        context.RegisterSymbolAction(AnalyzeStruct, SymbolKind.NamedType);
    }

    private static void AnalyzeStruct(SymbolAnalysisContext context)
    {
        var symbol = (INamedTypeSymbol)context.Symbol;
        if (symbol.TypeKind != TypeKind.Struct) return;

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

        if (!hasAttribute) return;

        var members = StructLayoutInspector.GetMembers(symbol);
        var computed = 0;
        foreach (var m in members)
        {
            var width = StructLayoutInspector.FloatWidth(m.Type!);
            if (width < 0)
            {
                var diag = Diagnostic.Create(UnsupportedType, symbol.Locations[0],
                    m.Name, symbol.Name, m.Type!.ToDisplayString());
                context.ReportDiagnostic(diag);
                continue;
            }
            computed += width;
        }

        if (declaredStride > 0 && computed != declaredStride)
        {
            var diag = Diagnostic.Create(StrideMismatch, symbol.Locations[0],
                symbol.Name, computed, declaredStride);
            context.ReportDiagnostic(diag);
        }
    }
}
