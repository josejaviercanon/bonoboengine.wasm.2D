#version 300 es
precision mediump float;

in vec4 vColor;
in float vFog;
in float vClipY;

out vec4 finalColor;

void main() {
    vec4 color = mix(vColor, vec4(0.0, 0.3, 0.05, 1.0), vFog);
    finalColor = color;
}