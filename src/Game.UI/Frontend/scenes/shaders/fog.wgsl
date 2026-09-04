struct FogParams {
    fogDensity: f32,
    drawDistance: f32,
    cameraDepth: f32,
    cameraY: f32,
    playerZ: f32,
    segmentLength: f32,
    _pad1: f32,
    _pad2: f32,
}

@group(0) @binding(0) var<uniform> uFogParams: FogParams;

@vertex
fn vs_main(
    @location(0) aPosition: vec2<f32>,
    @location(1) aUV: vec2<f32>,
    @builtin(vertex_index) vertexIndex: u32,
) -> @builtin(position) vec4<f32> {
    return vec4<f32>(aPosition, 0.0, 1.0);
}

@fragment
fn fs_main(
    @builtin(position) position: vec4<f32>,
) -> @location(0) vec4<f32> {
    // Screen-space fog based on depth
    // For a full-screen quad, we can compute fog based on vertical position
    // Bottom of screen = near, top of screen = far
    let ndcY = position.y; // -1 to 1
    let screenDepth = (1.0 - ndcY) * 0.5; // 0 at top (far), 1 at bottom (near)
    
    // Exponential fog
    let fog = 1.0 - exp(-uFogParams.fogDensity * screenDepth * screenDepth);
    
    // Fog color: dark green
    let fogColor = vec4<f32>(0.0, 0.3, 0.05, 1.0);
    
    return vec4<f32>(fogColor.rgb, fog);
}