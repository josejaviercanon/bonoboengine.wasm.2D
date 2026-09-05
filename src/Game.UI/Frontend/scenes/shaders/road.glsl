#version 300 es
uniform vec4 uColors[4];
uniform vec4 uFogParams;

in vec2 aPosition;
in float aSegmentId;
in float aOffsetX;
in float aScale;
in float aColorIndex;
in float aY1;
in float aY2;
in float aCurve;
in float aClipY;

out vec4 vColor;
out float vFog;
out float vClipY;

void main() {
    float y = mix(aY1, aY2, (aPosition.y + 1.0) * 0.5);

    float worldX = aOffsetX + aPosition.x * aScale;
    float worldY = y;

    float fogDensity = uFogParams.x;
    float drawDistance = uFogParams.y;
    float depth = aSegmentId / drawDistance;
    float fog = 1.0 - exp(-fogDensity * depth * depth);

    vColor = uColors[int(aColorIndex)];
    vFog = fog;
    vClipY = aClipY;

    gl_Position = vec4(worldX, worldY, 0.0, 1.0);
}