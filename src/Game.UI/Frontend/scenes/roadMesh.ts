import { Mesh, Geometry, Shader, UniformGroup, Buffer } from 'pixi.js';
import roadVertWGSL from './shaders/road.wgsl?raw';
import roadFragWGSL from './shaders/road.frag?raw';
import roadVertGLSL from './shaders/road.glsl?raw';

export interface RoadViewParams {
    playerX: number;
    playerZ: number;
    cameraY: number;
    cameraDepth: number;
    width: number;
    height: number;
    roadWidth: number;
    drawDistance: number;
    fogDensity: number;
    segments: RacerSegmentState[];
    normalizedBaseIndex: number;
    x: number;
    dx: number;
}

export interface RacerSegmentState {
    index: number;
    p1WorldY: number;
    p2WorldY: number;
    curve: number;
    color: number;
}

const COLORS: Record<number, { road: number; grass: number; rumble: number; lane: number | null }> = {
    0: { road: 0x6b6b6b, grass: 0x10aa10, rumble: 0x555555, lane: 0xcccccc },
    1: { road: 0x696969, grass: 0x009a00, rumble: 0xbbbbbb, lane: null },
    2: { road: 0xffffff, grass: 0xffffff, rumble: 0xffffff, lane: null },
    3: { road: 0x000000, grass: 0x000000, rumble: 0x000000, lane: null },
};

const SEGMENT_LIGHT = 0;
const SEGMENT_DARK = 1;

export class RoadMesh {
    private mesh: Mesh;
    private geometry: Geometry;
    private uniforms!: UniformGroup;
    private uniforms!: UniformGroup;
    private maxSegments: number;
    private quadsPerSegment: number;
    private totalInstances: number;
    
    // Instance buffers
    private instanceSegmentId: Float32Array;
    private instanceOffsetX: Float32Array;
    private instanceScale: Float32Array;
    private instanceColorIndex: Float32Array;
    private instanceY1: Float32Array;
    private instanceY2: Float32Array;
    private instanceCurve: Float32Array;
    private instanceClipY: Float32Array;
    
    // Uniform buffers
    private colorUniform: Float32Array; // 4 colors * 4 components = 16 floats
    private fogUniform: Float32Array;   // fogDensity, drawDistance, cameraDepth, cameraY
    
    constructor(app: any, maxSegments: number = 400) {
        this.maxSegments = maxSegments;
        this.quadsPerSegment = 4; // grass, rumble-left, rumble-right, road
        this.totalInstances = maxSegments * this.quadsPerSegment;
        
        // Initialize instance buffers
        this.instanceSegmentId = new Float32Array(this.totalInstances);
        this.instanceOffsetX = new Float32Array(this.totalInstances);
        this.instanceScale = new Float32Array(this.totalInstances);
        this.instanceColorIndex = new Float32Array(this.totalInstances);
        this.instanceY1 = new Float32Array(this.totalInstances);
        this.instanceY2 = new Float32Array(this.totalInstances);
        this.instanceCurve = new Float32Array(this.totalInstances);
        this.instanceClipY = new Float32Array(this.totalInstances);
        
        // Initialize uniform buffers
        this.colorUniform = new Float32Array(16); // 4 colors * 4 components
        this.fogUniform = new Float32Array(4);
        
        // Create geometry
        this.geometry = this.createGeometry(app);
        
        // Create shader
        const shader = this.createShader(app);
        
        // Create mesh
        this.mesh = new Mesh({
            geometry: this.geometry,
            shader,
        });
    }
    
    private createGeometry(app: any): Geometry {
        const vertices = new Float32Array([
            -1, -1,  1, -1,  1,  1,  -1,  1,
        ]);
        const uvs = new Float32Array([
            0, 1,  1, 1,  1, 0,  0, 0,
        ]);
        const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
        
        const geometry = new Geometry();
        
        geometry.addAttribute('aPosition', new Buffer({ data: vertices, format: 'float32x2' }));
        geometry.addAttribute('aUV', new Buffer({ data: uvs, format: 'float32x2' }));
        geometry.addAttribute('aSegmentId', new Buffer({ data: this.instanceSegmentId, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aOffsetX', new Buffer({ data: this.instanceOffsetX, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aScale', new Buffer({ data: this.instanceScale, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aColorIndex', new Buffer({ data: this.instanceColorIndex, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aY1', new Buffer({ data: this.instanceY1, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aY2', new Buffer({ data: this.instanceY2, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aCurve', new Buffer({ data: this.instanceCurve, format: 'float32', instanceDivisor: 1 }));
        geometry.addAttribute('aClipY', new Buffer({ data: this.instanceClipY, format: 'float32', instanceDivisor: 1 }));
        
        geometry.addIndex(new Buffer({ data: indices, format: 'uint16' }));
        geometry.instanceCount = this.totalInstances;
        
        return geometry;
    }
    
    private createShader(app: any): Shader {
        const isWebGPU = app.renderer.type === 'webgpu';
        
        const uniforms = new UniformGroup({
            uColors: { value: this.colorUniform, type: 'vec4<f32>', size: 4 },
            uFogParams: { value: this.fogUniform, type: 'vec4<f32>' },
        });
        this.uniforms = uniforms;
        
        if (isWebGPU) {
            return Shader.from({
                gpu: {
                    vertex: { source: roadVertWGSL, entryPoint: 'vs_main' },
                    fragment: { source: roadVertWGSL, entryPoint: 'fs_main' },
                },
                resources: {
                    uniforms,
                },
            });
        } else {
            return Shader.from({
                gl: {
                    vertex: roadVertGLSL,
                    fragment: roadFragWGSL,
                },
                resources: {
                    uniforms,
                },
            });
        }
    }
    
    private hexToVec4(hex: number): [number, number, number, number] {
        return [
            ((hex >> 16) & 0xff) / 255,
            ((hex >> 8) & 0xff) / 255,
            (hex & 0xff) / 255,
            1.0,
        ];
    }
    
    update(params: RoadViewParams): void {
        const { 
            playerX, playerZ, cameraY, cameraDepth, 
            width, height, roadWidth, drawDistance, 
            fogDensity, segments, normalizedBaseIndex, x, dx 
        } = params;
        
        let instanceIdx = 0;
        let currentX = x;
        let currentDx = dx;
        let maxY = height;
        
        // Update fog uniform
        this.fogUniform[0] = fogDensity;
        this.fogUniform[1] = drawDistance;
        this.fogUniform[2] = cameraDepth;
        this.fogUniform[3] = cameraY;
        
        // Update color uniform - use light palette as default
        const lightPalette = COLORS[SEGMENT_LIGHT];
        const grass = this.hexToVec4(lightPalette.grass);
        const rumble = this.hexToVec4(lightPalette.rumble);
        const road = this.hexToVec4(lightPalette.road);
        const laneColor = lightPalette.lane ?? lightPalette.road;
        const lane = this.hexToVec4(laneColor);
        
        this.colorUniform[0] = grass[0]; this.colorUniform[1] = grass[1]; this.colorUniform[2] = grass[2]; this.colorUniform[3] = grass[3];
        this.colorUniform[4] = rumble[0]; this.colorUniform[5] = rumble[1]; this.colorUniform[6] = rumble[2]; this.colorUniform[7] = rumble[3];
        this.colorUniform[8] = road[0]; this.colorUniform[9] = road[1]; this.colorUniform[10] = road[2]; this.colorUniform[11] = road[3];
        this.colorUniform[12] = lane[0]; this.colorUniform[13] = lane[1]; this.colorUniform[14] = lane[2]; this.colorUniform[15] = lane[3];
        
        this.uniforms.update();
        
        const segmentLength = 200;
        
        // Build instances for visible segments
        for (let n = 0; n < drawDistance && instanceIdx < this.totalInstances; n++) {
            const segmentIdx = (normalizedBaseIndex + n) % segments.length;
            const segment = segments[segmentIdx];
            if (!segment) continue;
            
            const looped = segment.index < normalizedBaseIndex;
            const segmentZ = segment.index * segmentLength;
            
            // Project p1 and p2
            const cameraRelativeZ1 = segmentZ - (looped ? segments.length * segmentLength : 0) - playerZ;
            const cameraRelativeZ2 = (segmentZ + segmentLength) - (looped ? segments.length * segmentLength : 0) - playerZ;
            
            if (cameraRelativeZ1 <= cameraDepth) continue;
            
            const scale1 = cameraDepth / cameraRelativeZ1;
            const scale2 = cameraDepth / cameraRelativeZ2;
            
            const p1x = width / 2 + scale1 * (playerX - currentX) * width / 2;
            const p2x = width / 2 + scale2 * (playerX - currentX - currentDx) * width / 2;
            
            const p1y = height / 2 - scale1 * (segment.p1WorldY - cameraY) * height / 2;
            const p2y = height / 2 - scale2 * (segment.p2WorldY - cameraY) * height / 2;
            
            if (p2y >= p1y || p2y >= maxY) continue;
            
            maxY = p1y;
            
            const w1 = scale1 * roadWidth * width / 2;
            const w2 = scale2 * roadWidth * width / 2;
            
            const rumbleWidth1 = w1 / Math.max(6, 2 * 3); // 3 lanes default
            const rumbleWidth2 = w2 / Math.max(6, 2 * 3);
            const avgWidth = (w1 + w2) / 2;
            const avgRumbleWidth = (rumbleWidth1 + rumbleWidth2) / 2;
            
            // Instance 0: Grass (full width)
            if (p1y - p2y > 0 && instanceIdx < this.totalInstances) {
                this.instanceSegmentId[instanceIdx] = segment.index;
                this.instanceOffsetX[instanceIdx] = 0;
                this.instanceScale[instanceIdx] = avgWidth;
                this.instanceColorIndex[instanceIdx] = 0; // grass
                this.instanceY1[instanceIdx] = p2y;
                this.instanceY2[instanceIdx] = p1y;
                this.instanceCurve[instanceIdx] = segment.curve;
                this.instanceClipY[instanceIdx] = maxY;
                instanceIdx++;
            }
            
            // Instance 1: Left rumble
            if (instanceIdx < this.totalInstances) {
                this.instanceSegmentId[instanceIdx] = segment.index;
                this.instanceOffsetX[instanceIdx] = -avgWidth - avgRumbleWidth;
                this.instanceScale[instanceIdx] = avgRumbleWidth;
                this.instanceColorIndex[instanceIdx] = 1; // rumble
                this.instanceY1[instanceIdx] = p2y;
                this.instanceY2[instanceIdx] = p1y;
                this.instanceCurve[instanceIdx] = segment.curve;
                this.instanceClipY[instanceIdx] = maxY;
                instanceIdx++;
            }
            
            // Instance 2: Right rumble
            if (instanceIdx < this.totalInstances) {
                this.instanceSegmentId[instanceIdx] = segment.index;
                this.instanceOffsetX[instanceIdx] = avgWidth + avgRumbleWidth;
                this.instanceScale[instanceIdx] = avgRumbleWidth;
                this.instanceColorIndex[instanceIdx] = 1; // rumble
                this.instanceY1[instanceIdx] = p2y;
                this.instanceY2[instanceIdx] = p1y;
                this.instanceCurve[instanceIdx] = segment.curve;
                this.instanceClipY[instanceIdx] = maxY;
                instanceIdx++;
            }
            
            // Instance 3: Road surface
            if (instanceIdx < this.totalInstances) {
                this.instanceSegmentId[instanceIdx] = segment.index;
                this.instanceOffsetX[instanceIdx] = 0;
                this.instanceScale[instanceIdx] = avgWidth;
                this.instanceColorIndex[instanceIdx] = 2; // road
                this.instanceY1[instanceIdx] = p2y;
                this.instanceY2[instanceIdx] = p1y;
                this.instanceCurve[instanceIdx] = segment.curve;
                this.instanceClipY[instanceIdx] = maxY;
                instanceIdx++;
            }
            
            currentX += currentDx;
            currentDx += segment.curve;
        }
        
        // Mark unused instances as invisible (scale = 0)
        for (let i = instanceIdx; i < this.totalInstances; i++) {
            this.instanceScale[i] = 0;
        }
        
        // Update geometry buffers (mutated in place, update pushes to GPU)
        this.geometry.getBuffer('aSegmentId').update();
        this.geometry.getBuffer('aOffsetX').update();
        this.geometry.getBuffer('aScale').update();
        this.geometry.getBuffer('aColorIndex').update();
        this.geometry.getBuffer('aY1').update();
        this.geometry.getBuffer('aY2').update();
        this.geometry.getBuffer('aCurve').update();
        this.geometry.getBuffer('aClipY').update();
        
        this.geometry.instanceCount = instanceIdx;
    }
    
    getMesh(): Mesh {
        return this.mesh;
    }
    
    destroy(): void {
        this.mesh.destroy();
        this.geometry.destroy();
    }
}