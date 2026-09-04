@group(0) @binding(0) var<uniform> uColors: array<vec4<f32>, 4>;
@group(0) @binding(1) var<uniform> uFogParams: vec4<f32>; // fogDensity, drawDistance, cameraDepth, cameraY

struct InstanceInput {
    @location(0) aPosition: vec2<f32>,      // base quad position (-1,-1) to (1,1)
    @location(1) aSegmentId: u32,           // segment index
    @location(2) aOffsetX: f32,             // horizontal offset
    @location(3) aScale: f32,               // perspective scale
    @location(4) aColorIndex: u32,          // 0=grass, 1=rumble, 2=road, 3=lane
    @location(5) aY1: f32,                  // segment start Y
    @location(6) aY2: f32,                  // segment end Y
    @location(7) aCurve: f32,               // curve amount
    @location(8) aClipY: f32,               // clip Y (maxY from previous segment)
}

struct VertexOutput {
    @builtin(position) position: vec4<f32>,
    @location(0) vColor: vec4<f32>,
    @location(1) vFog: f32,
    @location(2) vClipY: f32,
}

@vertex
fn vs_main(
    model: VertexOutput,
    instance: InstanceInput,
    @builtin(vertex_index) vertexIndex: u32,
    @builtin(instance_index) instanceIndex: u32,
) -> VertexOutput {
    let pos = instance.aPosition;
    let scale = instance.aScale;
    let offsetX = instance.aOffsetX;
    let y1 = instance.aY1;
    let y2 = instance.aY2;
    let clipY = instance.aClipY;
    
    // Interpolate Y based on vertex position (bottom vertices use y1, top use y2)
    let y = mix(y1, y2, (pos.y + 1.0) * 0.5);
    
    // Apply perspective scaling and offset
    let worldX = offsetX + pos.x * scale;
    let worldY = y;
    
    // Clip against maxY (hill occlusion)
    let clipped = worldY < clipY ? 1.0 : 0.0;
    
    // Fog calculation
    let fogDensity = uFogParams.x;
    let drawDistance = uFogParams.y;
    let depth = (instance.aSegmentId as f32) / drawDistance;
    let fog = 1.0 - exp(-fogDensity * depth * depth);
    
    var output: VertexOutput;
    output.position = vec4<f32>(worldX, worldY, 0.0, 1.0);
    output.vColor = uColors[instance.aColorIndex];
    output.vFog = fog;
    output.vClipY = clipY;
    return output;
}

@fragment
fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
    // Apply fog
    let color = mix(input.vColor, vec4<f32>(0.0, 0.3, 0.05, 1.0), input.vFog);
    return color;
}