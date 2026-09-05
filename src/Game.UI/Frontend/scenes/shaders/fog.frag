#version 300 es
precision mediump float;

uniform vec4 uFogParams[2];

in vec2 vUV;

out vec4 finalColor;

void main() {
    float screenDepth = 1.0 - vUV.y;
    float fog = 1.0 - exp(-uFogParams[0].x * screenDepth * screenDepth);
    vec3 fogColor = vec3(0.0, 0.3, 0.05);
    finalColor = vec4(fogColor, fog);
}