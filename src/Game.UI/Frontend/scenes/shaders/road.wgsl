@group(0) @binding(0) var<uniform> uColors: array<vec4<f32>, 4>;
@group(0) @binding(1) var<uniform> uFogParams: vec4<f32>;

struct InstanceInput {
    @location(0) aPosition: vec2<f32>,
    @location(1) aSegmentId: f32,
    @location(2) aOffsetX: f32,
    @location(3) aScale: f32,
    @location(4) aColorIndex: f32,
    @location(5) aY1: f32,
    @location(6) aY2: f32,
    @location(7) aCurve: f32,
    @location(8) aClipY: f32,
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) vColor: vec4<f32>,
    @location(1) vFog: f32,
    @location(2) vClipY: f32,
}

@vertex
fn vs_main(instance: InstanceInput) -> VertexOutput {
    let pos = instance.aPosition;
    let scale = instance.aScale;
    let offsetX = instance.aOffsetX;
    let y1 = instance.aY1;
    let y2 = instance.aY2;
    let clipY = instance.aClipY;

    let y = mix(y1, y2, (pos.y + 1.0) * 0.5);

    let worldX = offsetX + pos.x * scale;
    let worldY = y;

    let clipped = worldY < clipY ? 1.0 : 0.0;

    let fogDensity = uFogParams.x;
    let drawDistance = uFogParams.y;
    let depth = instance.aSegmentId / drawDistance;
    let fog = 1.0 - exp(-fogDensity * depth * depth);

    var output: VertexOutput;
    output.position = vec4<f32>(worldX, worldY, 0.0, 1.0);
    output.vColor = uColors[u32(instance.aColorIndex)];
    output.vFog = fog;
    output.vClipY = clipY;
    return output;
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
    let color = mix(input.vColor, vec4<f32>(0.0, 0.3, 0.05, 1.0), input.vFog);
    return color;
}