uniform vec4 uColors[4];
uniform vec4 uFogParams; // fogDensity, drawDistance, cameraDepth, cameraY

attribute vec2 aPosition;        // base quad position (-1,-1) to (1,1)
attribute uint aSegmentId;       // segment index
attribute float aOffsetX;        // horizontal offset
attribute float aScale;          // perspective scale
attribute uint aColorIndex;      // 0=grass, 1=rumble, 2=road, 3=lane
attribute float aY1;             // segment start Y
attribute float aY2;             // segment end Y
attribute float aCurve;          // curve amount
attribute float aClipY;          // clip Y (maxY from previous segment)

varying vec4 vColor;
varying float vFog;
varying float vClipY;

void main() {
    vec2 pos = aPosition;
    float scale = aScale;
    float offsetX = aOffsetX;
    float y1 = aY1;
    float y2 = aY2;
    float clipY = aClipY;
    
    // Interpolate Y based on vertex position
    float y = mix(y1, y2, (pos.y + 1.0) * 0.5);
    
    // Apply perspective scaling and offset
    float worldX = offsetX + pos.x * scale;
    float worldY = y;
    
    // Fog calculation
    float fogDensity = uFogParams.x;
    float drawDistance = uFogParams.y;
    float depth = float(aSegmentId) / drawDistance;
    float fog = 1.0 - exp(-fogDensity * depth * depth);
    
    vColor = uColors[int(aColorIndex)];
    vFog = fog;
    vClipY = clipY;
    
    gl_Position = vec4(worldX, worldY, 0.0, 1.0);
}