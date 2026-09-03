import { R as e, j as t, l as n, n as r, r as i, v as a } from "./Geometry-DYsNE2Rs.js";
import { g as o } from "./RenderTargetSystem-BdHBY0GA.js";
import { m as s } from "./GCManagedHash-CXwB9kU7.js";
//#region node_modules/pixi.js/lib/rendering/high-shader/shader-bits/localUniformBit.mjs
var c = {
	name: "local-uniform-bit",
	vertex: {
		header: "\n\n            struct LocalUniforms {\n                uTransformMatrix:mat3x3<f32>,\n                uColor:vec4<f32>,\n                uRound:f32,\n            }\n\n            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;\n        ",
		main: "\n            vColor *= localUniforms.uColor;\n            modelMatrix *= localUniforms.uTransformMatrix;\n        ",
		end: "\n            if(localUniforms.uRound == 1)\n            {\n                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);\n            }\n        "
	}
}, l = {
	...c,
	vertex: {
		...c.vertex,
		header: c.vertex.header.replace("group(1)", "group(2)")
	}
}, u = {
	name: "local-uniform-bit",
	vertex: {
		header: "\n\n            uniform mat3 uTransformMatrix;\n            uniform vec4 uColor;\n            uniform float uRound;\n        ",
		main: "\n            vColor *= uColor;\n            modelMatrix = uTransformMatrix;\n        ",
		end: "\n            if(uRound == 1.)\n            {\n                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n            }\n        "
	}
}, d = {
	name: "texture-bit",
	vertex: {
		header: "\n\n        struct TextureUniforms {\n            uTextureMatrix:mat3x3<f32>,\n        }\n\n        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;\n        ",
		main: "\n            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;\n        "
	},
	fragment: {
		header: "\n            @group(2) @binding(0) var uTexture: texture_2d<f32>;\n            @group(2) @binding(1) var uSampler: sampler;\n\n\n        ",
		main: "\n            outColor = textureSample(uTexture, uSampler, vUV);\n        "
	}
}, f = {
	name: "texture-bit",
	vertex: {
		header: "\n            uniform mat3 uTextureMatrix;\n        ",
		main: "\n            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;\n        "
	},
	fragment: {
		header: "\n        uniform sampler2D uTexture;\n\n\n        ",
		main: "\n            outColor = texture(uTexture, vUV);\n        "
	}
};
//#endregion
//#region node_modules/pixi.js/lib/rendering/renderers/gl/shader/program/ensureAttributes.mjs
function p(e, t) {
	for (let n in e.attributes) {
		let r = e.attributes[n], i = t[n];
		i ? (r.format ??= i.format, r.offset ??= i.offset, r.instance ??= i.instance) : a(`Attribute ${n} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`);
	}
	m(e);
}
function m(e) {
	let { buffers: t, attributes: r } = e, i = {}, a = {};
	for (let e in t) {
		let n = t[e];
		i[n.uid] = 0, a[n.uid] = 0;
	}
	for (let e in r) {
		let t = r[e];
		i[t.buffer.uid] += n(t.format).stride;
	}
	for (let e in r) {
		let t = r[e];
		t.stride ??= i[t.buffer.uid], t.start ??= a[t.buffer.uid], a[t.buffer.uid] += n(t.format).stride;
	}
}
//#endregion
//#region node_modules/pixi.js/lib/rendering/renderers/gpu/state/GpuStencilModesToPixi.mjs
var h = [];
h[s.NONE] = void 0, h[s.DISABLED] = {
	stencilWriteMask: 0,
	stencilReadMask: 0
}, h[s.RENDERING_MASK_ADD] = {
	stencilFront: {
		compare: "equal",
		passOp: "increment-clamp"
	},
	stencilBack: {
		compare: "equal",
		passOp: "increment-clamp"
	}
}, h[s.RENDERING_MASK_REMOVE] = {
	stencilFront: {
		compare: "equal",
		passOp: "decrement-clamp"
	},
	stencilBack: {
		compare: "equal",
		passOp: "decrement-clamp"
	}
}, h[s.MASK_ACTIVE] = {
	stencilWriteMask: 0,
	stencilFront: {
		compare: "equal",
		passOp: "keep"
	},
	stencilBack: {
		compare: "equal",
		passOp: "keep"
	}
}, h[s.INVERSE_MASK_ACTIVE] = {
	stencilWriteMask: 0,
	stencilFront: {
		compare: "not-equal",
		passOp: "keep"
	},
	stencilBack: {
		compare: "not-equal",
		passOp: "keep"
	}
};
//#endregion
//#region node_modules/pixi.js/lib/rendering/renderers/shared/shader/UboSystem.mjs
var g = class {
	constructor(e) {
		this._syncFunctionHash = /* @__PURE__ */ Object.create(null), this._adaptor = e, this._systemCheck();
	}
	_systemCheck() {
		if (!o()) throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.");
	}
	ensureUniformGroup(e) {
		let t = this.getUniformGroupData(e);
		e.buffer ||= new r({
			data: new Float32Array(t.layout.size / 4),
			usage: i.UNIFORM | i.COPY_DST
		});
	}
	getUniformGroupData(e) {
		return this._syncFunctionHash[e._signature] || this._initUniformGroup(e);
	}
	_initUniformGroup(e) {
		let t = e._signature, n = this._syncFunctionHash[t];
		if (!n) {
			let r = Object.keys(e.uniformStructures).map((t) => e.uniformStructures[t]), i = this._adaptor.createUboElements(r), a = this._generateUboSync(i.uboElements);
			n = this._syncFunctionHash[t] = {
				layout: i,
				syncFunction: a
			};
		}
		return this._syncFunctionHash[t];
	}
	_generateUboSync(e) {
		return this._adaptor.generateUboSync(e);
	}
	syncUniformGroup(e, t, n) {
		let a = this.getUniformGroupData(e);
		e.buffer ||= new r({
			data: new Float32Array(a.layout.size / 4),
			usage: i.UNIFORM | i.COPY_DST
		});
		let o = null;
		return t || (t = e.buffer.data, o = e.buffer.dataInt32), n ||= 0, a.syncFunction(e.uniforms, t, o, n), !0;
	}
	updateUniformGroup(e) {
		if (e.isStatic && !e._dirtyId) return !1;
		e._dirtyId = 0;
		let t = this.syncUniformGroup(e);
		return e.buffer.update(), t;
	}
	destroy() {
		this._syncFunctionHash = null;
	}
}, _ = [
	{
		type: "mat3x3<f32>",
		test: (e) => e.value.a !== void 0,
		ubo: "\n            var matrix = uv[name].toArray(true);\n            data[offset] = matrix[0];\n            data[offset + 1] = matrix[1];\n            data[offset + 2] = matrix[2];\n            data[offset + 4] = matrix[3];\n            data[offset + 5] = matrix[4];\n            data[offset + 6] = matrix[5];\n            data[offset + 8] = matrix[6];\n            data[offset + 9] = matrix[7];\n            data[offset + 10] = matrix[8];\n        ",
		uniform: "\n            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));\n        "
	},
	{
		type: "vec4<f32>",
		test: (e) => e.type === "vec4<f32>" && e.size === 1 && e.value.width !== void 0,
		ubo: "\n            v = uv[name];\n            data[offset] = v.x;\n            data[offset + 1] = v.y;\n            data[offset + 2] = v.width;\n            data[offset + 3] = v.height;\n        ",
		uniform: "\n            cv = ud[name].value;\n            v = uv[name];\n            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {\n                cv[0] = v.x;\n                cv[1] = v.y;\n                cv[2] = v.width;\n                cv[3] = v.height;\n                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);\n            }\n        "
	},
	{
		type: "vec2<f32>",
		test: (e) => e.type === "vec2<f32>" && e.size === 1 && e.value.x !== void 0,
		ubo: "\n            v = uv[name];\n            data[offset] = v.x;\n            data[offset + 1] = v.y;\n        ",
		uniform: "\n            cv = ud[name].value;\n            v = uv[name];\n            if (cv[0] !== v.x || cv[1] !== v.y) {\n                cv[0] = v.x;\n                cv[1] = v.y;\n                gl.uniform2f(ud[name].location, v.x, v.y);\n            }\n        "
	},
	{
		type: "vec4<f32>",
		test: (e) => e.type === "vec4<f32>" && e.size === 1 && e.value.red !== void 0,
		ubo: "\n            v = uv[name];\n            data[offset] = v.red;\n            data[offset + 1] = v.green;\n            data[offset + 2] = v.blue;\n            data[offset + 3] = v.alpha;\n        ",
		uniform: "\n            cv = ud[name].value;\n            v = uv[name];\n            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {\n                cv[0] = v.red;\n                cv[1] = v.green;\n                cv[2] = v.blue;\n                cv[3] = v.alpha;\n                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);\n            }\n        "
	},
	{
		type: "vec3<f32>",
		test: (e) => e.type === "vec3<f32>" && e.size === 1 && e.value.red !== void 0,
		ubo: "\n            v = uv[name];\n            data[offset] = v.red;\n            data[offset + 1] = v.green;\n            data[offset + 2] = v.blue;\n        ",
		uniform: "\n            cv = ud[name].value;\n            v = uv[name];\n            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {\n                cv[0] = v.red;\n                cv[1] = v.green;\n                cv[2] = v.blue;\n                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);\n            }\n        "
	}
];
//#endregion
//#region node_modules/pixi.js/lib/rendering/renderers/shared/shader/utils/createUboSyncFunction.mjs
function v(e, t, n, r) {
	let i = ["\n        var v = null;\n        var v2 = null;\n        var t = 0;\n        var index = 0;\n        var name = null;\n        var arrayOffset = null;\n    "], a = 0;
	for (let o = 0; o < e.length; o++) {
		let s = e[o], c = s.data.name, l = !1, u = 0;
		for (let e = 0; e < _.length; e++) if (_[e].test(s.data)) {
			u = s.offset / 4, i.push(`name = "${c}";`, `offset += ${u - a};`, _[e][t] || _[e].ubo), l = !0;
			break;
		}
		if (!l) {
			if (s.data.size > 1) u = s.offset / 4, i.push(n(s, u - a));
			else {
				let e = r[s.data.type];
				u = s.offset / 4, i.push(`
                    v = uv.${c};
                    offset += ${u - a};
                    ${e};
                `);
			}
		}
		a = u;
	}
	let o = i.join("\n");
	return Function("uv", "data", "dataInt32", "offset", o);
}
//#endregion
//#region node_modules/pixi.js/lib/rendering/renderers/shared/shader/utils/uboSyncFunctions.mjs
function y(e, t) {
	return `
        for (let i = 0; i < ${e * t}; i++) {
            data[offset + (((i / ${e})|0) * 4) + (i % ${e})] = v[i];
        }
    `;
}
var b = {
	f32: "\n        data[offset] = v;",
	i32: "\n        dataInt32[offset] = v;",
	"vec2<f32>": "\n        data[offset] = v[0];\n        data[offset + 1] = v[1];",
	"vec3<f32>": "\n        data[offset] = v[0];\n        data[offset + 1] = v[1];\n        data[offset + 2] = v[2];",
	"vec4<f32>": "\n        data[offset] = v[0];\n        data[offset + 1] = v[1];\n        data[offset + 2] = v[2];\n        data[offset + 3] = v[3];",
	"vec2<i32>": "\n        dataInt32[offset] = v[0];\n        dataInt32[offset + 1] = v[1];",
	"vec3<i32>": "\n        dataInt32[offset] = v[0];\n        dataInt32[offset + 1] = v[1];\n        dataInt32[offset + 2] = v[2];",
	"vec4<i32>": "\n        dataInt32[offset] = v[0];\n        dataInt32[offset + 1] = v[1];\n        dataInt32[offset + 2] = v[2];\n        dataInt32[offset + 3] = v[3];",
	"mat2x2<f32>": "\n        data[offset] = v[0];\n        data[offset + 1] = v[1];\n        data[offset + 4] = v[2];\n        data[offset + 5] = v[3];",
	"mat3x3<f32>": "\n        data[offset] = v[0];\n        data[offset + 1] = v[1];\n        data[offset + 2] = v[2];\n        data[offset + 4] = v[3];\n        data[offset + 5] = v[4];\n        data[offset + 6] = v[5];\n        data[offset + 8] = v[6];\n        data[offset + 9] = v[7];\n        data[offset + 10] = v[8];",
	"mat4x4<f32>": "\n        for (let i = 0; i < 16; i++) {\n            data[offset + i] = v[i];\n        }",
	"mat3x2<f32>": y(3, 2),
	"mat4x2<f32>": y(4, 2),
	"mat2x3<f32>": y(2, 3),
	"mat4x3<f32>": y(4, 3),
	"mat2x4<f32>": y(2, 4),
	"mat3x4<f32>": y(3, 4)
}, x = {
	...b,
	"mat2x2<f32>": "\n        data[offset] = v[0];\n        data[offset + 1] = v[1];\n        data[offset + 2] = v[2];\n        data[offset + 3] = v[3];\n    "
}, S = class extends e {
	constructor({ buffer: e, offset: n, size: r }) {
		super(), this.uid = t("buffer"), this._resourceType = "bufferResource", this._touched = 0, this._resourceId = t("resource"), this._bufferResource = !0, this.destroyed = !1, this.buffer = e, this.offset = n | 0, this.size = r, this.buffer.on("change", this.onBufferChange, this);
	}
	onBufferChange() {
		this._resourceId = t("resource"), this.emit("change", this);
	}
	destroy(e = !1) {
		this.destroyed = !0, e && this.buffer.destroy(), this.emit("change", this), this.buffer = null, this.removeAllListeners();
	}
};
//#endregion
export { _ as a, p as c, c as d, u as f, v as i, d as l, b as n, g as o, l as p, x as r, h as s, S as t, f as u };

//# sourceMappingURL=BufferResource-D3fKdRii.js.map