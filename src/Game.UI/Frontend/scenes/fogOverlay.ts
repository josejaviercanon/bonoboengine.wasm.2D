import { Mesh, MeshGeometry, Shader } from 'pixi.js';
import fogVertWGSL from './shaders/fog.wgsl?raw';
import fogFragWGSL from './shaders/fog.frag?raw';
import fogVertGLSL from './shaders/fog.glsl?raw';

export interface FogParams {
    fogDensity: number;
    drawDistance: number;
    cameraDepth: number;
    cameraY: number;
    playerZ: number;
    segmentLength: number;
}

export class FogOverlay {
    private mesh: Mesh;
    private geometry: MeshGeometry;
    private shader: Shader;
    private uniformBuffer: Float32Array;
    
    constructor(app: any) {
        // Full-screen quad vertices (NDC coordinates)
        const vertices = new Float32Array([
            -1, -1,
             1, -1,
             1,  1,
            -1,  1,
        ]);
        
        const uvs = new Float32Array([
            0, 1,
            1, 1,
            1, 0,
            0, 0,
        ]);
        
        const indices = new Uint16Array([0, 1, 2, 2, 3, 0]);
        
        this.geometry = new MeshGeometry({
            attributes: {
                aPosition: { data: vertices, format: 'float32x2' },
                aUV: { data: uvs, format: 'float32x2' },
            },
            index: { data: indices, format: 'uint16' },
        });
        
        this.uniformBuffer = new Float32Array(6); // fogDensity, drawDistance, cameraDepth, cameraY, playerZ, segmentLength
        
        const isWebGPU = app.renderer.type === 'webgpu';
        
        if (isWebGPU) {
            this.shader = Shader.from({
                gpu: {
                    vertex: fogVertWGSL,
                    fragment: fogFragWGSL,
                },
                resources: {
                    uFogParams: { type: 'uniforms', value: this.uniformBuffer },
                },
            });
        } else {
            this.shader = Shader.from({
                gl: {
                    vertex: fogVertGLSL,
                    fragment: fogFragWGSL,
                },
                resources: {
                    uFogParams: { type: 'uniforms', value: this.uniformBuffer },
                },
            });
        }
        
        this.mesh = new Mesh({
            geometry: this.geometry,
            shader: this.shader,
        });
    }
    
    update(params: FogParams): void {
        this.uniformBuffer[0] = params.fogDensity;
        this.uniformBuffer[1] = params.drawDistance;
        this.uniformBuffer[2] = params.cameraDepth;
        this.uniformBuffer[3] = params.cameraY;
        this.uniformBuffer[4] = params.playerZ;
        this.uniformBuffer[5] = params.segmentLength;
    }
    
    getMesh(): Mesh {
        return this.mesh;
    }
    
    destroy(): void {
        this.mesh.destroy();
        this.geometry.destroy();
    }
}