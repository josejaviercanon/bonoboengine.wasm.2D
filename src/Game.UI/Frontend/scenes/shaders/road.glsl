#version 300 es
uniform vec4 uColors[4];
uniform vec4 uFogParams;
uniform vec2 uViewSize;

in vec2 aPosition;
in float aSegmentId;
in float aOffsetX;
in float aScale;
in float aColorIndex;
in float aY1;
in float aY2;
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

    // worldX/worldY are logical screen pixels (y down) — convert to GL NDC (y up)
    float ndcX = worldX * 2.0 / uViewSize.x;
    float ndcY = 1.0 - 2.0 * worldY / uViewSize.y;
    gl_Position = vec4(ndcX, ndcY, 0.0, 1.0);
}