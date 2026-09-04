varying vec4 vColor;
varying float vFog;
varying float vClipY;

void main() {
    // Apply fog
    vec4 color = mix(vColor, vec4(0.0, 0.3, 0.05, 1.0), vFog);
    gl_FragColor = color;
}