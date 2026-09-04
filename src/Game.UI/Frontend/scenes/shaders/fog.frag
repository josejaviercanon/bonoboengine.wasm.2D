uniform float uFogDensity;
uniform float uDrawDistance;
uniform float uCameraDepth;
uniform float uCameraY;
uniform float uPlayerZ;
uniform float uSegmentLength;

varying vec2 vUV;

void main() {
    // Screen-space fog based on vertical position
    // vUV.y goes from 0 (top) to 1 (bottom)
    float screenDepth = 1.0 - vUV.y; // 0 at top (far), 1 at bottom (near)
    
    // Exponential fog
    float fog = 1.0 - exp(-uFogDensity * screenDepth * screenDepth);
    
    // Fog color: dark green
    vec3 fogColor = vec3(0.0, 0.3, 0.05);
    
    gl_FragColor = vec4(fogColor, fog);
}