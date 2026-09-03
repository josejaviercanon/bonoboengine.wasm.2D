import { B as e, D as t, E as n, F as r, M as i, O as a, P as o, R as s, T as c, a as l, b as u, c as d, h as f, i as p, k as m, l as h, n as g, o as _, p as v, r as y, s as b, t as x, u as S, v as C, w, x as T, y as E, z as D } from "./Geometry-DYsNE2Rs.js";
import { b as O, c as k, d as A, i as j, l as M, n as N, o as P, p as ee, r as F, s as I, t as L, x as R } from "./Filter-BsE1se_H.js";
import { a as z, c as B, i as te, n as ne, o as V, r as H, s as U, t as re } from "./getPo2TextureFromSource-BRMwBqWT.js";
import { r as ie, t as ae } from "./canvasUtils-CPkv009i.js";
import { n as W, t as G } from "./Cache-Bz6DDblo.js";
import { d as oe, f as se, i as ce, m as le, p as ue } from "./RenderTargetSystem-BdHBY0GA.js";
import { c as de, t as fe } from "./GraphicsContext-CzF_PbZG.js";
import { a as pe, c as me, d as he, g as ge, i as _e, l as ve, o as ye, p as be, r as xe, s as Se, t as Ce, u as we } from "./GCManagedHash-CXwB9kU7.js";
import { t as Te } from "./CanvasPool-CMynuo7E.js";
import { n as K } from "./CanvasRenderer-C18kW97e.js";
import { d as Ee, f as De } from "./BufferResource-D3fKdRii.js";
import { a as Oe, i as ke, n as Ae, o as je, r as Me, s as Ne } from "./BitmapFont-BxxQA8jj.js";
//#region node_modules/pixi.js/lib/environment-browser/browserExt.mjs
var Pe = {
	extension: {
		type: D.Environment,
		name: "browser",
		priority: -1
	},
	test: () => !0,
	load: async () => {
		await import("./browserAll-BpxEQdIZ.js");
	}
}, Fe = {
	extension: {
		type: D.Environment,
		name: "webworker",
		priority: 0
	},
	test: () => typeof self < "u" && self.WorkerGlobalScope !== void 0,
	load: async () => {
		await import("./webworkerAll-DCARKC3F.js");
	}
}, Ie;
function Le(e) {
	return Ie === void 0 && (Ie = (() => {
		let t = {
			stencil: !0,
			failIfMajorPerformanceCaveat: e ?? le.defaultOptions.failIfMajorPerformanceCaveat
		};
		try {
			if (!v.get().getWebGLRenderingContext()) return !1;
			let e = v.get().createCanvas().getContext("webgl", t), n = !!e?.getContextAttributes()?.stencil;
			if (e) {
				let t = e.getExtension("WEBGL_lose_context");
				t && t.loseContext();
			}
			return e = null, n;
		} catch {
			return !1;
		}
	})()), Ie;
}
//#endregion
//#region node_modules/pixi.js/lib/utils/browser/isWebGPUSupported.mjs
var Re;
async function ze(e = {}) {
	return Re === void 0 && (Re = await (async () => {
		let t = v.get().getNavigator().gpu;
		if (!t) return !1;
		try {
			return await (await t.requestAdapter(e)).requestDevice(), !0;
		} catch {
			return !1;
		}
	})()), Re;
}
//#endregion
//#region node_modules/pixi.js/lib/rendering/renderers/autoDetectRenderer.mjs
var Be = [
	"webgl",
	"webgpu",
	"canvas"
];
async function Ve(e) {
	let t = [];
	e.preference ? Array.isArray(e.preference) ? t = e.preference.slice() : (t.push(e.preference), Be.forEach((n) => {
		n !== e.preference && t.push(n);
	})) : t = Be.slice();
	let n, r = {};
	for (let i = 0; i < t.length; i++) {
		let a = t[i];
		if (a === "webgpu" && await ze()) {
			let { WebGPURenderer: t } = await import("./WebGPURenderer-DoA6scbm.js");
			n = t, r = {
				...e,
				...e.webgpu
			};
			break;
		}
		if (a === "webgl" && Le(e.failIfMajorPerformanceCaveat ?? le.defaultOptions.failIfMajorPerformanceCaveat)) {
			let { WebGLRenderer: t } = await import("./WebGLRenderer-Dn-DzGHH.js");
			n = t, r = {
				...e,
				...e.webgl
			};
			break;
		}
		if (a === "canvas") {
			let { CanvasRenderer: t } = await import("./CanvasRenderer-DHHGT3Ms.js");
			n = t, r = {
				...e,
				...e.canvasOptions
			};
			break;
		}
	}
	if (delete r.webgpu, delete r.webgl, delete r.canvasOptions, !n) throw Error("No available renderer for the current environment");
	let i = new n();
	return await i.init(r), i;
}
//#endregion
//#region node_modules/pixi.js/lib/app/ResizePlugin.mjs
var He = class {
	static init(e) {
		Object.defineProperty(this, "resizeTo", {
			configurable: !0,
			set(e) {
				globalThis.removeEventListener("resize", this.queueResize), this._resizeTo = e, e && (globalThis.addEventListener("resize", this.queueResize), this.resize());
			},
			get() {
				return this._resizeTo;
			}
		}), this.queueResize = () => {
			this._resizeTo && (this._cancelResize(), this._resizeId = requestAnimationFrame(() => this.resize()));
		}, this._cancelResize = () => {
			this._resizeId &&= (cancelAnimationFrame(this._resizeId), null);
		}, this.resize = () => {
			if (!this._resizeTo) return;
			this._cancelResize();
			let e, t;
			if (this._resizeTo === globalThis.window) e = globalThis.innerWidth, t = globalThis.innerHeight;
			else {
				let { clientWidth: n, clientHeight: r } = this._resizeTo;
				e = n, t = r;
			}
			this.renderer.resize(e, t), this.render();
		}, this._resizeId = null, this._resizeTo = null, this.resizeTo = e.resizeTo || null;
	}
	static destroy() {
		globalThis.removeEventListener("resize", this.queueResize), this._cancelResize(), this._cancelResize = null, this.queueResize = null, this.resizeTo = null, this.resize = null;
	}
};
He.extension = D.Application;
//#endregion
//#region node_modules/pixi.js/lib/app/TickerPlugin.mjs
var Ue = class {
	static init(e) {
		e = Object.assign({
			autoStart: !0,
			sharedTicker: !1
		}, e), Object.defineProperty(this, "ticker", {
			configurable: !0,
			set(e) {
				this._ticker && this._ticker.remove(this.render, this), this._ticker = e, e && e.add(this.render, this, j.LOW);
			},
			get() {
				return this._ticker;
			}
		}), this.stop = () => {
			this._ticker.stop();
		}, this.start = () => {
			this._ticker.start();
		}, this._ticker = null, this.ticker = e.sharedTicker ? F.shared : new F(), e.autoStart && this.start();
	}
	static destroy() {
		if (this._ticker) {
			let e = this._ticker;
			this.ticker = null, e.destroy();
		}
	}
};
Ue.extension = D.Application, e.add(He), e.add(Ue);
//#endregion
//#region node_modules/pixi.js/lib/app/Application.mjs
var We = class e {
	constructor(...e) {
		this.stage = new k(), e[0] !== void 0 && a(m, "Application constructor options are deprecated, please use Application.init() instead.");
	}
	async init(t) {
		t = { ...t }, this.stage ||= new k(), this.renderer = await Ve(t), e._plugins.forEach((e) => {
			e.init.call(this, t);
		});
	}
	render() {
		this.renderer.render({ container: this.stage });
	}
	get canvas() {
		return this.renderer.canvas;
	}
	get view() {
		return a(m, "Application.view is deprecated, please use Application.canvas instead."), this.renderer.canvas;
	}
	get screen() {
		return this.renderer.screen;
	}
	get domContainerRoot() {
		return this.renderer.renderPipes.dom?._domElement;
	}
	destroy(t = !1, n = !1) {
		let r = e._plugins.slice(0);
		r.reverse(), r.forEach((e) => {
			e.destroy.call(this);
		}), this.stage.destroy(n), this.stage = null, this.renderer.destroy(t), this.renderer = null;
	}
};
We._plugins = [];
var Ge = We;
e.handleByList(D.Application, Ge._plugins), e.add(ue);
//#endregion
//#region node_modules/pixi.js/lib/scene/text-bitmap/asset/bitmapFontTextParser.mjs
var Ke = {
	test(e) {
		return typeof e == "string" && e.startsWith("info face=");
	},
	parse(e) {
		let t = e.match(/^[a-z]+\s+.+$/gm), n = {
			info: [],
			common: [],
			page: [],
			char: [],
			chars: [],
			kerning: [],
			kernings: [],
			distanceField: []
		};
		for (let e in t) {
			let r = t[e].match(/^[a-z]+/gm)[0], i = t[e].match(/[a-zA-Z]+=([^\s"']+|"([^"]*)")/gm), a = {};
			for (let e in i) {
				let t = i[e].split("="), n = t[0], r = t[1].replace(/"/gm, ""), o = parseFloat(r);
				a[n] = isNaN(o) ? r : o;
			}
			n[r].push(a);
		}
		let r = {
			chars: {},
			pages: [],
			lineHeight: 0,
			fontSize: 0,
			fontFamily: "",
			distanceField: null,
			baseLineOffset: 0
		}, [i] = n.info, [a] = n.common, [o] = n.distanceField ?? [];
		o && (r.distanceField = {
			range: parseInt(o.distanceRange, 10),
			type: o.fieldType
		}), r.fontSize = parseInt(i.size, 10), r.fontFamily = i.face, r.lineHeight = parseInt(a.lineHeight, 10);
		let s = n.page;
		for (let e = 0; e < s.length; e++) r.pages.push({
			id: parseInt(s[e].id, 10) || 0,
			file: s[e].file
		});
		let c = {};
		r.baseLineOffset = r.lineHeight - parseInt(a.base, 10);
		let l = n.char;
		for (let e = 0; e < l.length; e++) {
			let t = l[e], n = parseInt(t.id, 10), i = t.letter ?? t.char ?? String.fromCharCode(n);
			i === "space" && (i = " "), c[n] = i, r.chars[i] = {
				id: n,
				page: parseInt(t.page, 10) || 0,
				x: parseInt(t.x, 10),
				y: parseInt(t.y, 10),
				width: parseInt(t.width, 10),
				height: parseInt(t.height, 10),
				xOffset: parseInt(t.xoffset, 10),
				yOffset: parseInt(t.yoffset, 10),
				xAdvance: parseInt(t.xadvance, 10),
				kerning: {}
			};
		}
		let u = n.kerning || [];
		for (let e = 0; e < u.length; e++) {
			let t = parseInt(u[e].first, 10), n = parseInt(u[e].second, 10), i = parseInt(u[e].amount, 10);
			r.chars[c[n]] && (r.chars[c[n]].kerning[c[t]] = i);
		}
		return r;
	}
}, qe = {
	test(e) {
		let t = e;
		return typeof t != "string" && "getElementsByTagName" in t && t.getElementsByTagName("page").length && t.getElementsByTagName("info")[0].getAttribute("face") !== null;
	},
	parse(e) {
		let t = {
			chars: {},
			pages: [],
			lineHeight: 0,
			fontSize: 0,
			fontFamily: "",
			distanceField: null,
			baseLineOffset: 0
		}, n = e.getElementsByTagName("info")[0], r = e.getElementsByTagName("common")[0], i = e.getElementsByTagName("distanceField")[0];
		i && (t.distanceField = {
			type: i.getAttribute("fieldType"),
			range: parseInt(i.getAttribute("distanceRange"), 10)
		});
		let a = e.getElementsByTagName("page"), o = e.getElementsByTagName("char"), s = e.getElementsByTagName("kerning");
		t.fontSize = parseInt(n.getAttribute("size"), 10), t.fontFamily = n.getAttribute("face"), t.lineHeight = parseInt(r.getAttribute("lineHeight"), 10);
		for (let e = 0; e < a.length; e++) t.pages.push({
			id: parseInt(a[e].getAttribute("id"), 10) || 0,
			file: a[e].getAttribute("file")
		});
		let c = {};
		t.baseLineOffset = t.lineHeight - parseInt(r.getAttribute("base"), 10);
		for (let e = 0; e < o.length; e++) {
			let n = o[e], r = parseInt(n.getAttribute("id"), 10), i = n.getAttribute("letter") ?? n.getAttribute("char") ?? String.fromCharCode(r);
			i === "space" && (i = " "), c[r] = i, t.chars[i] = {
				id: r,
				page: parseInt(n.getAttribute("page"), 10) || 0,
				x: parseInt(n.getAttribute("x"), 10),
				y: parseInt(n.getAttribute("y"), 10),
				width: parseInt(n.getAttribute("width"), 10),
				height: parseInt(n.getAttribute("height"), 10),
				xOffset: parseInt(n.getAttribute("xoffset"), 10),
				yOffset: parseInt(n.getAttribute("yoffset"), 10),
				xAdvance: parseInt(n.getAttribute("xadvance"), 10),
				kerning: {}
			};
		}
		for (let e = 0; e < s.length; e++) {
			let n = parseInt(s[e].getAttribute("first"), 10), r = parseInt(s[e].getAttribute("second"), 10), i = parseInt(s[e].getAttribute("amount"), 10);
			t.chars[c[r]] && (t.chars[c[r]].kerning[c[n]] = i);
		}
		return t;
	}
}, Je = {
	test(e) {
		return typeof e == "string" && e.match(/<font(\s|>)/) ? qe.test(v.get().parseXML(e)) : !1;
	},
	parse(e) {
		return qe.parse(v.get().parseXML(e));
	}
}, Ye = [".xml", ".fnt"], Xe = {
	extension: {
		type: D.CacheParser,
		name: "cacheBitmapFont"
	},
	test: (e) => !!e?.pages && !!e?.chars && typeof e?.fontFamily == "string" && e.fontFamily !== "",
	getCacheableAssets(e, t) {
		let n = {};
		return e.forEach((e) => {
			n[e] = t, n[`${e}-bitmap`] = t;
		}), n[`${t.fontFamily}-bitmap`] = t, n;
	}
}, Ze = {
	extension: {
		type: D.LoadParser,
		priority: V.Normal
	},
	name: "loadBitmapFont",
	id: "bitmap-font",
	test(e) {
		return Ye.includes(z.extname(e).toLowerCase());
	},
	async testParse(e) {
		return Ke.test(e) || Je.test(e);
	},
	async parse(e, t, n) {
		let r = Ke.test(e) ? Ke.parse(e) : Je.parse(e), { src: i } = t, { pages: a } = r, o = [], s = r.distanceField ? {
			scaleMode: "linear",
			alphaMode: "premultiply-alpha-on-upload",
			autoGenerateMipmaps: !1,
			resolution: 1
		} : {};
		for (let e = 0; e < a.length; ++e) {
			let t = a[e].file, n = z.join(z.dirname(i), t);
			n = ne(n, i), o.push({
				src: n,
				data: s
			});
		}
		let [c, { BitmapFont: l }] = await Promise.all([n.load(o), import("./BitmapFont-Olve-Pvt.js")]);
		return new l({
			data: r,
			textures: o.map((e) => c[e.src])
		}, i);
	},
	async load(e, t) {
		return await (await v.get().fetch(e)).text();
	},
	async unload(e, t, n) {
		await Promise.all(e.pages.map((e) => n.unload(e.texture.source._sourceOrigin))), e.destroy();
	}
}, Qe = class {
	constructor(e, t = !1) {
		this._loader = e, this._assetList = [], this._isLoading = !1, this._maxConcurrent = 1, this.verbose = t;
	}
	add(e) {
		e.forEach((e) => {
			this._assetList.push(e);
		}), this.verbose && console.log("[BackgroundLoader] assets: ", this._assetList), this._isActive && !this._isLoading && this._next();
	}
	async _next() {
		if (this._assetList.length && this._isActive) {
			this._isLoading = !0;
			let e = [], t = Math.min(this._assetList.length, this._maxConcurrent);
			for (let n = 0; n < t; n++) e.push(this._assetList.pop());
			await this._loader.load(e), this._isLoading = !1, this._next();
		}
	}
	get active() {
		return this._isActive;
	}
	set active(e) {
		this._isActive !== e && (this._isActive = e, e && !this._isLoading && this._next());
	}
}, $e = {
	extension: {
		type: D.CacheParser,
		name: "cacheTextureArray"
	},
	test: (e) => Array.isArray(e) && e.every((e) => e instanceof T),
	getCacheableAssets: (e, t) => {
		let n = {};
		return e.forEach((e) => {
			t.forEach((t, r) => {
				n[e + (r === 0 ? "" : r + 1)] = t;
			});
		}), n;
	}
};
//#endregion
//#region node_modules/pixi.js/lib/assets/detections/utils/testImageFormat.mjs
async function et(e) {
	if ("Image" in globalThis) return new Promise((t) => {
		let n = new Image();
		n.onload = () => {
			t(!0);
		}, n.onerror = () => {
			t(!1);
		}, n.src = e;
	});
	if ("createImageBitmap" in globalThis && "fetch" in globalThis) {
		try {
			let t = await (await fetch(e)).blob();
			await createImageBitmap(t);
		} catch {
			return !1;
		}
		return !0;
	}
	return !1;
}
//#endregion
//#region node_modules/pixi.js/lib/assets/detections/parsers/detectAvif.mjs
var tt = {
	extension: {
		type: D.DetectionParser,
		priority: 1
	},
	test: async () => et("data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A="),
	add: async (e) => [...e, "avif"],
	remove: async (e) => e.filter((e) => e !== "avif")
}, nt = [
	"png",
	"jpg",
	"jpeg"
], rt = {
	extension: {
		type: D.DetectionParser,
		priority: -1
	},
	test: () => Promise.resolve(!0),
	add: async (e) => [...e, ...nt],
	remove: async (e) => e.filter((e) => !nt.includes(e))
}, it = "WorkerGlobalScope" in globalThis && globalThis instanceof globalThis.WorkerGlobalScope;
function at(e) {
	return !it && document.createElement("video").canPlayType(e) !== "";
}
//#endregion
//#region node_modules/pixi.js/lib/assets/detections/parsers/detectMp4.mjs
var ot = {
	extension: {
		type: D.DetectionParser,
		priority: 0
	},
	test: async () => at("video/mp4"),
	add: async (e) => [
		...e,
		"mp4",
		"m4v"
	],
	remove: async (e) => e.filter((e) => e !== "mp4" && e !== "m4v")
}, st = {
	extension: {
		type: D.DetectionParser,
		priority: 0
	},
	test: async () => at("video/ogg"),
	add: async (e) => [...e, "ogv"],
	remove: async (e) => e.filter((e) => e !== "ogv")
}, ct = {
	extension: {
		type: D.DetectionParser,
		priority: 0
	},
	test: async () => at("video/webm"),
	add: async (e) => [...e, "webm"],
	remove: async (e) => e.filter((e) => e !== "webm")
}, lt = {
	extension: {
		type: D.DetectionParser,
		priority: 0
	},
	test: async () => et("data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA="),
	add: async (e) => [...e, "webp"],
	remove: async (e) => e.filter((e) => e !== "webp")
}, ut = class e {
	constructor() {
		this.loadOptions = { ...e.defaultOptions }, this._parsers = [], this._parsersValidated = !1, this.parsers = new Proxy(this._parsers, { set: (e, t, n) => (this._parsersValidated = !1, e[t] = n, !0) }), this.promiseCache = {};
	}
	reset() {
		this._parsersValidated = !1, this.promiseCache = {};
	}
	_getLoadPromiseAndParser(e, t) {
		let n = {
			promise: null,
			parser: null
		};
		return n.promise = (async () => {
			let r = null, i = null;
			if ((t.parser || t.loadParser) && (i = this._parserHash[t.parser || t.loadParser], t.loadParser && C(`[Assets] "loadParser" is deprecated, use "parser" instead for ${e}`), i || C(`[Assets] specified load parser "${t.parser || t.loadParser}" not found while loading ${e}`)), !i) {
				for (let n = 0; n < this.parsers.length; n++) {
					let r = this.parsers[n];
					if (r.load && r.test?.(e, t, this)) {
						i = r;
						break;
					}
				}
				if (!i) return C(`[Assets] ${e} could not be loaded as we don't know how to parse it, ensure the correct parser has been added`), null;
			}
			r = await i.load(e, t, this), n.parser = i;
			for (let e = 0; e < this.parsers.length; e++) {
				let i = this.parsers[e];
				i.parse && i.parse && await i.testParse?.(r, t, this) && (r = await i.parse(r, t, this) || r, n.parser = i);
			}
			return r;
		})(), n;
	}
	async load(t, n) {
		this._parsersValidated || this._validateParsers();
		let { onProgress: r, onError: i, strategy: a, retryCount: o, retryDelay: s } = typeof n == "function" ? {
			...e.defaultOptions,
			...this.loadOptions,
			onProgress: n
		} : {
			...e.defaultOptions,
			...this.loadOptions,
			...n || {}
		}, c = 0, l = {}, u = te(t), d = W(t, (e) => ({
			alias: [e],
			src: e,
			data: {}
		})), f = d.reduce((e, t) => e + (t.progressSize || 1), 0), p = d.map(async (e) => {
			let t = z.toAbsolute(e.src);
			l[e.src] || (await this._loadAssetWithRetry(t, e, {
				onProgress: r,
				onError: i,
				strategy: a,
				retryCount: o,
				retryDelay: s
			}, l), c += e.progressSize || 1, r && r(c / f));
		});
		return await Promise.all(p), u ? l[d[0].src] : l;
	}
	async unload(e) {
		let t = W(e, (e) => ({
			alias: [e],
			src: e
		})).map(async (e) => {
			let t = z.toAbsolute(e.src), n = this.promiseCache[t];
			if (n) {
				let r = await n.promise;
				delete this.promiseCache[t], await n.parser?.unload?.(r, e, this);
			}
		});
		await Promise.all(t);
	}
	_validateParsers() {
		this._parsersValidated = !0, this._parserHash = this._parsers.filter((e) => e.name || e.id).reduce((e, t) => (!t.name && !t.id ? C("[Assets] parser should have an id") : (e[t.name] || e[t.id]) && C(`[Assets] parser id conflict "${t.id}"`), e[t.name] = t, t.id && (e[t.id] = t), e), {});
	}
	async _loadAssetWithRetry(e, t, n, r) {
		let i = 0, { onError: a, strategy: o, retryCount: s, retryDelay: c } = n, l = (e) => new Promise((t) => setTimeout(t, e));
		for (;;) try {
			this.promiseCache[e] || (this.promiseCache[e] = this._getLoadPromiseAndParser(e, t)), r[t.src] = await this.promiseCache[e].promise;
			return;
		} catch (n) {
			if (delete this.promiseCache[e], delete r[t.src], i++, o === "retry" && !(o !== "retry" || i > s)) {
				a && a(n, t), await l(c);
				continue;
			}
			if (o === "skip") {
				a && a(n, t);
				return;
			}
			a && a(n, t);
			let u = /* @__PURE__ */ Error(`[Loader.load] Failed to load ${e}.
${n}`);
			throw n instanceof Error && n.stack && (u.stack = n.stack), u;
		}
	}
};
ut.defaultOptions = {
	onProgress: void 0,
	onError: void 0,
	strategy: "throw",
	retryCount: 3,
	retryDelay: 250
};
var dt = ut;
//#endregion
//#region node_modules/pixi.js/lib/assets/utils/checkDataUrl.mjs
function ft(e, t) {
	if (Array.isArray(t)) {
		for (let n of t) if (e.startsWith(`data:${n}`)) return !0;
		return !1;
	}
	return e.startsWith(`data:${t}`);
}
//#endregion
//#region node_modules/pixi.js/lib/assets/utils/checkExtension.mjs
function pt(e, t) {
	let n = e.split("?")[0], r = z.extname(n).toLowerCase();
	return Array.isArray(t) ? t.includes(r) : r === t;
}
//#endregion
//#region node_modules/pixi.js/lib/assets/loader/parsers/loadJson.mjs
var mt = ".json", ht = "application/json", gt = {
	extension: {
		type: D.LoadParser,
		priority: V.Low
	},
	name: "loadJson",
	id: "json",
	test(e) {
		return ft(e, ht) || pt(e, mt);
	},
	async load(e) {
		return await (await v.get().fetch(e)).json();
	}
}, _t = ".txt", vt = "text/plain", yt = {
	name: "loadTxt",
	id: "text",
	extension: {
		type: D.LoadParser,
		priority: V.Low,
		name: "loadTxt"
	},
	test(e) {
		return ft(e, vt) || pt(e, _t);
	},
	async load(e) {
		return await (await v.get().fetch(e)).text();
	}
}, bt = [
	"normal",
	"bold",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900"
], xt = [
	".ttf",
	".otf",
	".woff",
	".woff2"
], St = [
	"font/ttf",
	"font/otf",
	"font/woff",
	"font/woff2"
], Ct = /^(--|-?[A-Z_])[0-9A-Z_-]*$/i;
function wt(e) {
	let t = z.extname(e), n = z.basename(e, t).replace(/(-|_)/g, " ").toLowerCase().split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)), r = n.length > 0;
	for (let e of n) if (!e.match(Ct)) {
		r = !1;
		break;
	}
	let i = n.join(" ");
	return r || (i = `"${i.replace(/[\\"]/g, "\\$&")}"`), i;
}
var Tt = /^[0-9A-Za-z%:/?#\[\]@!\$&'()\*\+,;=\-._~]*$/;
function Et(e) {
	return Tt.test(e) ? e : encodeURI(e);
}
var Dt = {
	extension: {
		type: D.LoadParser,
		priority: V.Low
	},
	name: "loadWebFont",
	id: "web-font",
	test(e) {
		return ft(e, St) || pt(e, xt);
	},
	async load(e, t) {
		let n = v.get().getFontFaceSet();
		if (n) {
			let r = [], i = t.data?.family ?? wt(e), a = t.data?.weights?.filter((e) => bt.includes(e)) ?? ["normal"], o = t.data ?? {};
			for (let t = 0; t < a.length; t++) {
				let s = a[t], c = new FontFace(i, `url('${Et(e)}')`, {
					...o,
					weight: s
				});
				await c.load(), n.add(c), r.push(c);
			}
			return G.has(`${i}-and-url`) ? G.get(`${i}-and-url`).entries.push({
				url: e,
				faces: r
			}) : G.set(`${i}-and-url`, { entries: [{
				url: e,
				faces: r
			}] }), r.length === 1 ? r[0] : r;
		}
		return C("[loadWebFont] FontFace API is not supported. Skipping loading font"), null;
	},
	unload(e) {
		let t = Array.isArray(e) ? e : [e], n = t[0].family, r = G.get(`${n}-and-url`), i = r.entries.find((e) => e.faces.some((e) => t.indexOf(e) !== -1));
		i.faces = i.faces.filter((e) => t.indexOf(e) === -1), i.faces.length === 0 && (r.entries = r.entries.filter((e) => e !== i)), t.forEach((e) => {
			v.get().getFontFaceSet().delete(e);
		}), r.entries.length === 0 && G.remove(`${n}-and-url`);
	}
};
//#endregion
//#region node_modules/pixi.js/lib/utils/network/getResolutionOfUrl.mjs
function Ot(e, t = 1) {
	let n = H.RETINA_PREFIX?.exec(e);
	return n ? parseFloat(n[1]) : t;
}
//#endregion
//#region node_modules/pixi.js/lib/assets/loader/parsers/textures/utils/createTexture.mjs
function kt(e, t, n) {
	e.label = n, e._sourceOrigin = n;
	let r = new T({
		source: e,
		label: n
	}), i = () => {
		delete t.promiseCache[n], G.has(n) && G.remove(n);
	};
	return r.source.once("destroy", () => {
		t.promiseCache[n] && (C("[Assets] A TextureSource managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the TextureSource."), i());
	}), r.once("destroy", () => {
		e.destroyed || (C("[Assets] A Texture managed by Assets was destroyed instead of unloaded! Use Assets.unload() instead of destroying the Texture."), i());
	}), r;
}
//#endregion
//#region node_modules/pixi.js/lib/assets/loader/parsers/textures/loadSVG.mjs
var At = ".svg", jt = "image/svg+xml", Mt = {
	extension: {
		type: D.LoadParser,
		priority: V.Low,
		name: "loadSVG"
	},
	name: "loadSVG",
	id: "svg",
	config: {
		crossOrigin: "anonymous",
		parseAsGraphicsContext: !1
	},
	test(e) {
		return ft(e, jt) || pt(e, At);
	},
	async load(e, t, n) {
		return t.data?.parseAsGraphicsContext ?? this.config.parseAsGraphicsContext ? Pt(e) : Nt(e, t, n, this.config.crossOrigin);
	},
	unload(e) {
		e.destroy(!0);
	}
};
async function Nt(e, t, n, r) {
	let i = await v.get().fetch(e), a = v.get().createImage();
	a.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(await i.text())}`, a.crossOrigin = r, await a.decode();
	let o = t.data?.width ?? a.width, s = t.data?.height ?? a.height, c = t.data?.resolution || Ot(e), l = Math.ceil(o * c), u = Math.ceil(s * c), d = v.get().createCanvas(l, u), f = d.getContext("2d");
	f.imageSmoothingEnabled = !0, f.imageSmoothingQuality = "high", f.drawImage(a, 0, 0, o * c, s * c);
	let { parseAsGraphicsContext: p, ...m } = t.data ?? {};
	return kt(new ie({
		resource: d,
		alphaMode: "premultiply-alpha-on-upload",
		resolution: c,
		...m
	}), n, e);
}
async function Pt(e) {
	let t = await (await v.get().fetch(e)).text(), n = new fe();
	return n.svg(t), n;
}
//#endregion
//#region node_modules/pixi.js/lib/_virtual/checkImageBitmap.worker.mjs
var Ft = "(function () {\n    'use strict';\n\n    const WHITE_PNG = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=\";\n    async function checkImageBitmap() {\n      try {\n        if (typeof createImageBitmap !== \"function\") return false;\n        const response = await fetch(WHITE_PNG);\n        const imageBlob = await response.blob();\n        const imageBitmap = await createImageBitmap(imageBlob);\n        return imageBitmap.width === 1 && imageBitmap.height === 1;\n      } catch (_e) {\n        return false;\n      }\n    }\n    void checkImageBitmap().then((result) => {\n      self.postMessage(result);\n    });\n\n})();\n", It = null, Lt = class {
	constructor() {
		It ||= URL.createObjectURL(new Blob([Ft], { type: "application/javascript" })), this.worker = new Worker(It);
	}
};
Lt.revokeObjectURL = function() {
	It &&= (URL.revokeObjectURL(It), null);
};
//#endregion
//#region node_modules/pixi.js/lib/_virtual/loadImageBitmap.worker.mjs
var Rt = "(function () {\n    'use strict';\n\n    async function loadImageBitmap(url, alphaMode) {\n      const response = await fetch(url);\n      if (!response.ok) {\n        throw new Error(`[WorkerManager.loadImageBitmap] Failed to fetch ${url}: ${response.status} ${response.statusText}`);\n      }\n      const imageBlob = await response.blob();\n      return alphaMode === \"premultiplied-alpha\" ? createImageBitmap(imageBlob, { premultiplyAlpha: \"none\" }) : createImageBitmap(imageBlob);\n    }\n    self.onmessage = async (event) => {\n      try {\n        const imageBitmap = await loadImageBitmap(event.data.data[0], event.data.data[1]);\n        self.postMessage({\n          data: imageBitmap,\n          uuid: event.data.uuid,\n          id: event.data.id\n        }, [imageBitmap]);\n      } catch (e) {\n        self.postMessage({\n          error: e,\n          uuid: event.data.uuid,\n          id: event.data.id\n        });\n      }\n    };\n\n})();\n", zt = null, Bt = class {
	constructor() {
		zt ||= URL.createObjectURL(new Blob([Rt], { type: "application/javascript" })), this.worker = new Worker(zt);
	}
};
Bt.revokeObjectURL = function() {
	zt &&= (URL.revokeObjectURL(zt), null);
};
//#endregion
//#region node_modules/pixi.js/lib/assets/loader/workers/WorkerManager.mjs
var Vt = 0, Ht, Ut = new class {
	constructor() {
		this._initialized = !1, this._createdWorkers = 0, this._workerPool = [], this._queue = [], this._resolveHash = {};
	}
	isImageBitmapSupported() {
		return this._isImageBitmapSupported === void 0 && (this._isImageBitmapSupported = new Promise((e) => {
			let { worker: t } = new Lt();
			t.addEventListener("message", (n) => {
				t.terminate(), Lt.revokeObjectURL(), e(n.data);
			});
		})), this._isImageBitmapSupported;
	}
	loadImageBitmap(e, t) {
		return this._run("loadImageBitmap", [e, t?.data?.alphaMode]);
	}
	async _initWorkers() {
		this._initialized ||= !0;
	}
	_getWorker() {
		Ht === void 0 && (Ht = navigator.hardwareConcurrency || 4);
		let e = this._workerPool.pop();
		return !e && this._createdWorkers < Ht && (this._createdWorkers++, e = new Bt().worker, e.addEventListener("message", (e) => {
			this._complete(e.data), this._returnWorker(e.target), this._next();
		})), e;
	}
	_returnWorker(e) {
		this._workerPool.push(e);
	}
	_complete(e) {
		this._resolveHash[e.uuid] && (e.error === void 0 ? this._resolveHash[e.uuid].resolve(e.data) : this._resolveHash[e.uuid].reject(e.error), delete this._resolveHash[e.uuid]);
	}
	async _run(e, t) {
		await this._initWorkers();
		let n = new Promise((n, r) => {
			this._queue.push({
				id: e,
				arguments: t,
				resolve: n,
				reject: r
			});
		});
		return this._next(), n;
	}
	_next() {
		if (!this._queue.length) return;
		let e = this._getWorker();
		if (!e) return;
		let t = this._queue.pop(), n = t.id;
		this._resolveHash[Vt] = {
			resolve: t.resolve,
			reject: t.reject
		}, e.postMessage({
			data: t.arguments,
			uuid: Vt++,
			id: n
		});
	}
	reset() {
		this._workerPool.forEach((e) => e.terminate()), this._workerPool.length = 0, Object.values(this._resolveHash).forEach(({ reject: e }) => {
			e?.(/* @__PURE__ */ Error("WorkerManager has been reset before completion"));
		}), this._resolveHash = {}, this._queue.length = 0, this._initialized = !1, this._createdWorkers = 0;
	}
}(), Wt = [
	".jpeg",
	".jpg",
	".png",
	".webp",
	".avif"
], Gt = [
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/avif"
];
async function Kt(e, t) {
	let n = await v.get().fetch(e);
	if (!n.ok) throw Error(`[loadImageBitmap] Failed to fetch ${e}: ${n.status} ${n.statusText}`);
	let r = await n.blob();
	return t?.data?.alphaMode === "premultiplied-alpha" ? createImageBitmap(r, { premultiplyAlpha: "none" }) : createImageBitmap(r);
}
var qt = {
	name: "loadTextures",
	id: "texture",
	extension: {
		type: D.LoadParser,
		priority: V.High,
		name: "loadTextures"
	},
	config: {
		preferWorkers: !0,
		preferCreateImageBitmap: !0,
		crossOrigin: "anonymous"
	},
	test(e) {
		return ft(e, Gt) || pt(e, Wt);
	},
	async load(e, t, n) {
		let r = null;
		return r = globalThis.createImageBitmap && this.config.preferCreateImageBitmap ? this.config.preferWorkers && await Ut.isImageBitmapSupported() ? await Ut.loadImageBitmap(e, t) : await Kt(e, t) : await new Promise((t, n) => {
			r = v.get().createImage(), r.crossOrigin = this.config.crossOrigin, r.src = e, r.complete ? t(r) : (r.onload = () => {
				t(r);
			}, r.onerror = n);
		}), kt(new ie({
			resource: r,
			alphaMode: "premultiply-alpha-on-upload",
			resolution: t.data?.resolution || Ot(e),
			...t.data
		}), n, e);
	},
	unload(e) {
		e.destroy(!0);
	}
}, Jt = [
	".mp4",
	".m4v",
	".webm",
	".ogg",
	".ogv",
	".h264",
	".avi",
	".mov"
], Yt, Xt;
function Zt(e, t, n) {
	n === void 0 && !t.startsWith("data:") ? e.crossOrigin = $t(t) : n !== !1 && (e.crossOrigin = typeof n == "string" ? n : "anonymous");
}
function Qt(e) {
	return new Promise((t, n) => {
		e.addEventListener("canplaythrough", r), e.addEventListener("error", i), e.load();
		function r() {
			a(), t();
		}
		function i(e) {
			a(), n(e);
		}
		function a() {
			e.removeEventListener("canplaythrough", r), e.removeEventListener("error", i);
		}
	});
}
function $t(e, t = globalThis.location) {
	if (e.startsWith("data:")) return "";
	t ||= globalThis.location;
	let n = new URL(e, document.baseURI);
	return n.hostname !== t.hostname || n.port !== t.port || n.protocol !== t.protocol ? "anonymous" : "";
}
function en() {
	let e = [], t = [];
	for (let n of Jt) {
		let r = U.MIME_TYPES[n.substring(1)] || `video/${n.substring(1)}`;
		at(r) && (e.push(n), t.includes(r) || t.push(r));
	}
	return {
		validVideoExtensions: e,
		validVideoMime: t
	};
}
var tn = {
	name: "loadVideo",
	id: "video",
	extension: {
		type: D.LoadParser,
		name: "loadVideo"
	},
	test(e) {
		if (!Yt || !Xt) {
			let { validVideoExtensions: e, validVideoMime: t } = en();
			Yt = e, Xt = t;
		}
		let t = ft(e, Xt), n = pt(e, Yt);
		return t || n;
	},
	async load(e, t, n) {
		let r = {
			...U.defaultOptions,
			resolution: t.data?.resolution || Ot(e),
			alphaMode: t.data?.alphaMode || await B(),
			...t.data
		}, i = document.createElement("video"), a = {
			preload: r.autoLoad === !1 ? void 0 : "auto",
			"webkit-playsinline": r.playsinline === !1 ? void 0 : "",
			playsinline: r.playsinline === !1 ? void 0 : "",
			muted: r.muted === !0 ? "" : void 0,
			loop: r.loop === !0 ? "" : void 0,
			autoplay: r.autoPlay === !1 ? void 0 : ""
		};
		Object.keys(a).forEach((e) => {
			let t = a[e];
			t !== void 0 && i.setAttribute(e, t);
		}), r.muted === !0 && (i.muted = !0), Zt(i, e, r.crossorigin);
		let o = document.createElement("source"), s;
		if (r.mime) s = r.mime;
		else if (e.startsWith("data:")) s = e.slice(5, e.indexOf(";"));
		else if (!e.startsWith("blob:")) {
			let t = e.split("?")[0].slice(e.lastIndexOf(".") + 1).toLowerCase();
			s = U.MIME_TYPES[t] || `video/${t}`;
		}
		return o.src = e, s && (o.type = s), new Promise((a, s) => {
			r.preload && !r.autoPlay && i.load(), i.addEventListener("canplay", c), i.addEventListener("error", l), o.addEventListener("error", l), i.appendChild(o);
			async function c() {
				let o = new U({
					...r,
					resource: i
				});
				u(), t.data.preload && await Qt(i), a(kt(o, n, e));
			}
			function l(e) {
				u(), s(e);
			}
			function u() {
				i.removeEventListener("canplay", c), i.removeEventListener("error", l), o.removeEventListener("error", l);
			}
		});
	},
	unload(e) {
		e.destroy(!0);
	}
}, nn = {
	extension: {
		type: D.ResolveParser,
		name: "resolveTexture"
	},
	test: qt.test,
	parse: (e) => ({
		resolution: parseFloat(H.RETINA_PREFIX.exec(e)?.[1] ?? "1"),
		format: e.split(".").pop(),
		src: e
	})
}, rn = {
	extension: {
		type: D.ResolveParser,
		priority: -2,
		name: "resolveJson"
	},
	test: (e) => H.RETINA_PREFIX.test(e) && e.endsWith(".json"),
	parse: nn.parse
}, q = new class {
	constructor() {
		this._detections = [], this._initialized = !1, this.resolver = new H(), this.loader = new dt(), this.cache = G, this._backgroundLoader = new Qe(this.loader), this._backgroundLoader.active = !0, this.reset();
	}
	async init(e = {}) {
		if (this._initialized) {
			C("[Assets]AssetManager already initialized, did you load before calling this Assets.init()?");
			return;
		}
		if (this._initialized = !0, e.defaultSearchParams && this.resolver.setDefaultSearchParams(e.defaultSearchParams), e.basePath && (this.resolver.basePath = e.basePath), e.bundleIdentifier && this.resolver.setBundleIdentifier(e.bundleIdentifier), e.manifest) {
			let t = e.manifest;
			typeof t == "string" && (t = await this.load(t)), this.resolver.addManifest(t);
		}
		let t = e.texturePreference?.resolution ?? 1, n = typeof t == "number" ? [t] : t, r = await this._detectFormats({
			preferredFormats: e.texturePreference?.format,
			skipDetections: e.skipDetections,
			detections: this._detections
		});
		this.resolver.prefer({ params: {
			format: r,
			resolution: n
		} }), e.preferences && this.setPreferences(e.preferences), e.loadOptions && (this.loader.loadOptions = {
			...this.loader.loadOptions,
			...e.loadOptions
		});
	}
	add(e) {
		this.resolver.add(e);
	}
	async load(e, t) {
		this._initialized || await this.init();
		let n = te(e), r = W(e).map((e) => {
			if (typeof e != "string") {
				let t = this.resolver.getAlias(e);
				return t.some((e) => !this.resolver.hasKey(e)) && this.add(e), Array.isArray(t) ? t[0] : t;
			}
			return this.resolver.hasKey(e) || this.add({
				alias: e,
				src: e
			}), e;
		}), i = this.resolver.resolve(r), a = await this._mapLoadToResolve(i, t);
		return n ? a[r[0]] : a;
	}
	addBundle(e, t) {
		this.resolver.addBundle(e, t);
	}
	async loadBundle(e, t) {
		this._initialized || await this.init();
		let n = !1;
		typeof e == "string" && (n = !0, e = [e]);
		let r = this.resolver.resolveBundle(e), i = {}, a = Object.keys(r), o = 0, s = [], c = () => {
			t?.(s.reduce((e, t) => e + t, 0) / o);
		}, l = a.map((e, t) => {
			let n = r[e], a = Object.values(n), l = [...new Set(a.flat())].reduce((e, t) => e + (t.progressSize || 1), 0);
			return s.push(0), o += l, this._mapLoadToResolve(n, (e) => {
				s[t] = e * l, c();
			}).then((t) => {
				i[e] = t;
			});
		});
		return await Promise.all(l), n ? i[e[0]] : i;
	}
	async backgroundLoad(e) {
		this._initialized || await this.init(), typeof e == "string" && (e = [e]);
		let t = this.resolver.resolve(e);
		this._backgroundLoader.add(Object.values(t));
	}
	async backgroundLoadBundle(e) {
		this._initialized || await this.init(), typeof e == "string" && (e = [e]);
		let t = this.resolver.resolveBundle(e);
		Object.values(t).forEach((e) => {
			this._backgroundLoader.add(Object.values(e));
		});
	}
	reset() {
		this.resolver.reset(), this.loader.reset(), this.cache.reset(), this._initialized = !1;
	}
	get(e) {
		if (typeof e == "string") return G.get(e);
		let t = {};
		for (let n = 0; n < e.length; n++) t[n] = G.get(e[n]);
		return t;
	}
	async _mapLoadToResolve(e, t) {
		let n = [...new Set(Object.values(e))];
		this._backgroundLoader.active = !1;
		let r = await this.loader.load(n, t);
		this._backgroundLoader.active = !0;
		let i = {};
		return n.forEach((e) => {
			let t = r[e.src], n = [e.src];
			e.alias && n.push(...e.alias), n.forEach((e) => {
				i[e] = t;
			}), G.set(n, t);
		}), i;
	}
	async unload(e) {
		this._initialized || await this.init();
		let t = W(e).map((e) => typeof e == "string" ? e : e.src), n = this.resolver.resolve(t);
		await this._unloadFromResolved(n);
	}
	async unloadBundle(e) {
		this._initialized || await this.init(), e = W(e);
		let t = this.resolver.resolveBundle(e), n = Object.keys(t).map((e) => this._unloadFromResolved(t[e]));
		await Promise.all(n);
	}
	async _unloadFromResolved(e) {
		let t = Object.values(e);
		t.forEach((e) => {
			G.remove(e.src);
		}), await this.loader.unload(t);
	}
	async _detectFormats(e) {
		let t = [];
		e.preferredFormats && (t = Array.isArray(e.preferredFormats) ? e.preferredFormats : [e.preferredFormats]);
		for (let n of e.detections) e.skipDetections || await n.test() ? t = await n.add(t) : e.skipDetections || (t = await n.remove(t));
		return t = t.filter((e, n) => t.indexOf(e) === n), t;
	}
	get detections() {
		return this._detections;
	}
	setPreferences(e) {
		this.loader.parsers.forEach((t) => {
			t.config && Object.keys(t.config).filter((t) => t in e).forEach((n) => {
				t.config[n] = e[n];
			});
		});
	}
}();
e.handleByList(D.LoadParser, q.loader.parsers).handleByList(D.ResolveParser, q.resolver.parsers).handleByList(D.CacheParser, q.cache.parsers).handleByList(D.DetectionParser, q.detections), e.add($e, rt, tt, lt, ot, st, ct, gt, yt, Dt, Mt, qt, tn, Ze, Xe, nn, rn);
var an = {
	loader: D.LoadParser,
	resolver: D.ResolveParser,
	cache: D.CacheParser,
	detection: D.DetectionParser
};
e.handle(D.Asset, (t) => {
	let n = t.ref;
	Object.entries(an).filter(([e]) => !!n[e]).forEach(([t, r]) => e.add(Object.assign(n[t], { extension: n[t].extension ?? r })));
}, (t) => {
	let n = t.ref;
	Object.keys(an).filter((e) => !!n[e]).forEach((t) => e.remove(n[t]));
});
//#endregion
//#region node_modules/pixi.js/lib/maths/point/pointInTriangle.mjs
function on(e, t, n, r, i, a, o, s) {
	let c = o - n, l = s - r, u = i - n, d = a - r, f = e - n, p = t - r, m = c * c + l * l, h = c * u + l * d, g = c * f + l * p, _ = u * u + d * d, v = u * f + d * p, y = 1 / (m * _ - h * h), b = (_ * g - h * v) * y, x = (m * v - h * g) * y;
	return b >= 0 && x >= 0 && b + x < 1;
}
//#endregion
//#region node_modules/pixi.js/lib/filters/defaults/blur/const.mjs
var sn = {
	5: [
		.153388,
		.221461,
		.250301
	],
	7: [
		.071303,
		.131514,
		.189879,
		.214607
	],
	9: [
		.028532,
		.067234,
		.124009,
		.179044,
		.20236
	],
	11: [
		.0093,
		.028002,
		.065984,
		.121703,
		.175713,
		.198596
	],
	13: [
		.002406,
		.009255,
		.027867,
		.065666,
		.121117,
		.174868,
		.197641
	],
	15: [
		489e-6,
		.002403,
		.009246,
		.02784,
		.065602,
		.120999,
		.174697,
		.197448
	]
}, cn = [
	"in vec2 vBlurTexCoords[%size%];",
	"uniform sampler2D uTexture;",
	"out vec4 finalColor;",
	"void main(void)",
	"{",
	"    %blur%",
	"}"
].join("\n");
function ln(e) {
	let t = sn[e], n = t.length, r = "";
	for (let i = 0; i < e; i++) {
		let a = i === 0 ? "finalColor = " : "    + ", o = i < n ? i : e - i - 1, s = "texture(uTexture, vBlurTexCoords[%index%]) * %value%".replace("%index%", i.toString()).replace("%value%", t[o].toString());
		r += `${a}${s}
`;
	}
	return cn.replace("%blur%", `${r};`).replace("%size%", e.toString());
}
//#endregion
//#region node_modules/pixi.js/lib/filters/defaults/blur/gl/generateBlurVertSource.mjs
var un = "\n    in vec2 aPosition;\n\n    uniform float uStrength;\n\n    out vec2 vBlurTexCoords[%size%];\n\n    uniform vec4 uInputSize;\n    uniform vec4 uOutputFrame;\n    uniform vec4 uOutputTexture;\n\n    vec4 filterVertexPosition( void )\n{\n    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\n    vec2 filterTextureCoord( void )\n    {\n        return aPosition * (uOutputFrame.zw * uInputSize.zw);\n    }\n\n    void main(void)\n    {\n        gl_Position = filterVertexPosition();\n\n        float pixelStrength = uInputSize.%dimension% * uStrength;\n\n        vec2 textureCoord = filterTextureCoord();\n        %blur%\n    }";
function dn(e, t) {
	let n = Math.ceil(e / 2), r = un, i = "", a;
	a = t ? "vBlurTexCoords[%index%] =  textureCoord + vec2(%sampleIndex% * pixelStrength, 0.0);" : "vBlurTexCoords[%index%] =  textureCoord + vec2(0.0, %sampleIndex% * pixelStrength);";
	for (let t = 0; t < e; t++) {
		let e = a.replace("%index%", t.toString());
		e = e.replace("%sampleIndex%", `${t - (n - 1)}.0`), i += e, i += "\n";
	}
	return r = r.replace("%blur%", i), r = r.replace("%size%", e.toString()), r = r.replace("%dimension%", t ? "z" : "w"), r;
}
//#endregion
//#region node_modules/pixi.js/lib/filters/defaults/blur/gl/generateBlurGlProgram.mjs
function fn(e, t) {
	let n = dn(t, e), r = ln(t);
	return S.from({
		vertex: n,
		fragment: r,
		name: `blur-${e ? "horizontal" : "vertical"}-pass-filter`
	});
}
//#endregion
//#region node_modules/pixi.js/lib/filters/defaults/blur/gpu/blur-template.wgsl.mjs
var pn = "\n\nstruct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\nstruct BlurUniforms {\n  uStrength:f32,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n@group(0) @binding(1) var uTexture: texture_2d<f32>;\n@group(0) @binding(2) var uSampler : sampler;\n\n@group(1) @binding(0) var<uniform> blurUniforms : BlurUniforms;\n\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    %blur-struct%\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);\n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.uGlobalFrame.zw;\n}\n\n\n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>,\n) -> VSOutput {\n\n  let filteredCord = filterTextureCoord(aPosition);\n\n  let pixelStrength = gfu.uInputSize.%dimension% * blurUniforms.uStrength;\n\n  return VSOutput(\n   filterVertexPosition(aPosition),\n    %blur-vertex-out%\n  );\n}\n\n@fragment\nfn mainFragment(\n  @builtin(position) position: vec4<f32>,\n  %blur-fragment-in%\n) -> @location(0) vec4<f32> {\n\n    var   finalColor = vec4(0.0);\n\n    %blur-sampling%\n\n    return finalColor;\n}\n";
//#endregion
//#region node_modules/pixi.js/lib/filters/defaults/blur/gpu/generateBlurProgram.mjs
function mn(e, t) {
	let n = sn[t], r = n.length, i = [], a = [], o = [];
	for (let s = 0; s < t; s++) {
		i[s] = `@location(${s}) offset${s}: vec2<f32>,`, e ? a[s] = `filteredCord + vec2(${s - r + 1} * pixelStrength, 0.0),` : a[s] = `filteredCord + vec2(0.0, ${s - r + 1} * pixelStrength),`;
		let c = n[s < r ? s : t - s - 1].toString();
		o[s] = `finalColor += textureSample(uTexture, uSampler, offset${s}) * ${c};`;
	}
	let s = i.join("\n"), c = a.join("\n"), l = o.join("\n"), u = pn.replace("%blur-struct%", s).replace("%blur-vertex-out%", c).replace("%blur-fragment-in%", s).replace("%blur-sampling%", l).replace("%dimension%", e ? "z" : "w");
	return d.from({
		vertex: {
			source: u,
			entryPoint: "mainVertex"
		},
		fragment: {
			source: u,
			entryPoint: "mainFragment"
		}
	});
}
//#endregion
//#region node_modules/pixi.js/lib/filters/defaults/blur/BlurFilterPass.mjs
var hn = class e extends L {
	constructor(t) {
		t = {
			...e.defaultOptions,
			...t
		};
		let n = fn(t.horizontal, t.kernelSize), r = mn(t.horizontal, t.kernelSize);
		super({
			glProgram: n,
			gpuProgram: r,
			resources: { blurUniforms: { uStrength: {
				value: 0,
				type: "f32"
			} } },
			...t
		}), this.horizontal = t.horizontal, this.legacy = t.legacy ?? !1, this._quality = 0, this.quality = t.quality, this.blur = t.strength, this._blurUniforms = this.resources.blurUniforms, this._uniforms = this._blurUniforms.uniforms;
	}
	apply(e, t, n, r) {
		this.legacy ? this._applyLegacy(e, t, n, r) : this._applyOptimized(e, t, n, r);
	}
	_applyLegacy(e, t, n, r) {
		if (this._uniforms.uStrength = this.strength / this.passes, this.passes === 1) e.applyFilter(this, t, n, r);
		else {
			let i = A.getSameSizeTexture(t), a = t, o = i;
			this._state.blend = !1;
			let s = e.renderer.type === l.WEBGPU;
			for (let t = 0; t < this.passes - 1; t++) {
				e.applyFilter(this, a, o, t === 0 || s);
				let n = o;
				o = a, a = n;
			}
			this._state.blend = !0, e.applyFilter(this, a, n, r), A.returnTexture(i);
		}
	}
	_applyOptimized(e, t, n, r) {
		if (this._uniforms.uStrength = this._calculateInitialStrength(), this.passes === 1) e.applyFilter(this, t, n, r);
		else {
			let i = A.getSameSizeTexture(t), a = t, o = i;
			this._state.blend = !1;
			let s = e.renderer, c = s.type === l.WEBGPU, u = c ? s.renderPipes.uniformBatch : null;
			for (let t = 0; t < this.passes - 1; t++) {
				u && this.groups[1].setResource(u.getUboResource(this._blurUniforms), 0), e.applyFilter(this, a, o, c);
				let t = o;
				o = a, a = t, this._uniforms.uStrength *= .5;
			}
			u && this.groups[1].setResource(u.getUboResource(this._blurUniforms), 0), this._state.blend = !0, e.applyFilter(this, a, n, r), A.returnTexture(i);
		}
	}
	_calculateInitialStrength() {
		let e = 1, t = .5;
		for (let n = 1; n < this.passes; n++) e += t * t, t *= .5;
		return this.strength / Math.sqrt(e);
	}
	get blur() {
		return this.strength;
	}
	set blur(e) {
		this.padding = 1 + Math.abs(e) * 2, this.strength = e;
	}
	get quality() {
		return this._quality;
	}
	set quality(e) {
		this._quality = e, this.passes = e;
	}
};
hn.defaultOptions = {
	strength: 8,
	quality: 4,
	kernelSize: 5,
	legacy: !1
};
var gn = hn, _n = class extends L {
	constructor(...e) {
		let t = e[0] ?? {};
		typeof t == "number" && (a(m, "BlurFilter constructor params are now options object. See params: { strength, quality, resolution, kernelSize }"), t = { strength: t }, e[1] !== void 0 && (t.quality = e[1]), e[2] !== void 0 && (t.resolution = e[2] || "inherit"), e[3] !== void 0 && (t.kernelSize = e[3])), t = {
			...gn.defaultOptions,
			...t
		};
		let { strength: n, strengthX: r, strengthY: i, quality: o, ...s } = t;
		super({
			...s,
			compatibleRenderers: l.BOTH,
			resources: {}
		}), this._repeatEdgePixels = !1, this.blurXFilter = new gn({
			horizontal: !0,
			...t
		}), this.blurYFilter = new gn({
			horizontal: !1,
			...t
		}), this.quality = o, this.strengthX = r ?? n, this.strengthY = i ?? n, this.repeatEdgePixels = !1;
	}
	apply(e, t, n, r) {
		let i = Math.abs(this.blurXFilter.strength), a = Math.abs(this.blurYFilter.strength);
		if (i && a) {
			let i = A.getSameSizeTexture(t);
			this.blurXFilter.blendMode = "normal", this.blurXFilter.apply(e, t, i, !0), this.blurYFilter.blendMode = this.blendMode, this.blurYFilter.apply(e, i, n, r), A.returnTexture(i);
		} else a ? (this.blurYFilter.blendMode = this.blendMode, this.blurYFilter.apply(e, t, n, r)) : (this.blurXFilter.blendMode = this.blendMode, this.blurXFilter.apply(e, t, n, r));
	}
	updatePadding() {
		this.padding = this._repeatEdgePixels ? 0 : Math.max(Math.abs(this.blurXFilter.blur), Math.abs(this.blurYFilter.blur)) * 2;
	}
	get strength() {
		if (this.strengthX !== this.strengthY) throw Error("BlurFilter's strengthX and strengthY are different");
		return this.strengthX;
	}
	set strength(e) {
		this.blurXFilter.blur = this.blurYFilter.blur = e, this.updatePadding();
	}
	get quality() {
		return this.blurXFilter.quality;
	}
	set quality(e) {
		this.blurXFilter.quality = this.blurYFilter.quality = e;
	}
	get strengthX() {
		return this.blurXFilter.blur;
	}
	set strengthX(e) {
		this.blurXFilter.blur = e, this.updatePadding();
	}
	get strengthY() {
		return this.blurYFilter.blur;
	}
	set strengthY(e) {
		this.blurYFilter.blur = e, this.updatePadding();
	}
	get blur() {
		return a("8.3.0", "BlurFilter.blur is deprecated, please use BlurFilter.strength instead."), this.strength;
	}
	set blur(e) {
		a("8.3.0", "BlurFilter.blur is deprecated, please use BlurFilter.strength instead."), this.strength = e;
	}
	get blurX() {
		return a("8.3.0", "BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."), this.strengthX;
	}
	set blurX(e) {
		a("8.3.0", "BlurFilter.blurX is deprecated, please use BlurFilter.strengthX instead."), this.strengthX = e;
	}
	get blurY() {
		return a("8.3.0", "BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."), this.strengthY;
	}
	set blurY(e) {
		a("8.3.0", "BlurFilter.blurY is deprecated, please use BlurFilter.strengthY instead."), this.strengthY = e;
	}
	get repeatEdgePixels() {
		return this._repeatEdgePixels;
	}
	set repeatEdgePixels(e) {
		this._repeatEdgePixels = e, this.updatePadding();
	}
};
_n.defaultOptions = {
	strength: 8,
	quality: 4,
	kernelSize: 5,
	legacy: !1
};
//#endregion
//#region node_modules/pixi.js/lib/scene/mesh/shared/MeshGeometry.mjs
var vn = class e extends x {
	constructor(...t) {
		let n = t[0] ?? {};
		n instanceof Float32Array && (a(m, "use new MeshGeometry({ positions, uvs, indices }) instead"), n = {
			positions: n,
			uvs: t[1],
			indices: t[2]
		}), n = {
			...e.defaultOptions,
			...n
		};
		let r = n.positions || new Float32Array([
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			1
		]), i = n.uvs;
		i ||= n.positions ? new Float32Array(r.length) : new Float32Array([
			0,
			0,
			1,
			0,
			1,
			1,
			0,
			1
		]);
		let o = n.indices || new Uint32Array([
			0,
			1,
			2,
			0,
			2,
			3
		]), s = n.shrinkBuffersToFit, c = new g({
			data: r,
			label: "attribute-mesh-positions",
			shrinkToFit: s,
			usage: y.VERTEX | y.COPY_DST
		}), l = new g({
			data: i,
			label: "attribute-mesh-uvs",
			shrinkToFit: s,
			usage: y.VERTEX | y.COPY_DST
		}), u = new g({
			data: o,
			label: "index-mesh-buffer",
			shrinkToFit: s,
			usage: y.INDEX | y.COPY_DST
		});
		super({
			attributes: {
				aPosition: {
					buffer: c,
					format: "float32x2",
					stride: 8,
					offset: 0
				},
				aUV: {
					buffer: l,
					format: "float32x2",
					stride: 8,
					offset: 0
				}
			},
			indexBuffer: u,
			topology: n.topology
		}), this.batchMode = "auto";
	}
	get positions() {
		return this.attributes.aPosition.buffer.data;
	}
	set positions(e) {
		this.attributes.aPosition.buffer.data = e;
	}
	get uvs() {
		return this.attributes.aUV.buffer.data;
	}
	set uvs(e) {
		this.attributes.aUV.buffer.data = e;
	}
	get indices() {
		return this.indexBuffer.data;
	}
	set indices(e) {
		this.indexBuffer.data = e;
	}
};
vn.defaultOptions = {
	topology: "triangle-list",
	shrinkBuffersToFit: !1
};
var yn = vn, bn = class {
	constructor() {
		this.batcherName = "default", this.packAsQuad = !1, this.indexOffset = 0, this.attributeOffset = 0, this.roundPixels = 0, this._batcher = null, this._batch = null, this._textureMatrixUpdateId = -1, this._uvUpdateId = -1;
	}
	get blendMode() {
		return this.renderable.groupBlendMode;
	}
	get topology() {
		return this._topology || this.geometry.topology;
	}
	set topology(e) {
		this._topology = e;
	}
	reset() {
		this.renderable = null, this.texture = null, this._batcher = null, this._batch = null, this.geometry = null, this._uvUpdateId = -1, this._textureMatrixUpdateId = -1;
	}
	setTexture(e) {
		this.texture !== e && (this.texture = e, this._textureMatrixUpdateId = -1);
	}
	get uvs() {
		let e = this.geometry.getBuffer("aUV"), t = e.data, n = t, r = this.texture.textureMatrix;
		return r.isSimple || (n = this._transformedUvs, (this._textureMatrixUpdateId !== r._updateID || this._uvUpdateId !== e._updateID) && ((!n || n.length < t.length) && (n = this._transformedUvs = new Float32Array(t.length)), this._textureMatrixUpdateId = r._updateID, this._uvUpdateId = e._updateID, r.multiplyUvs(t, n))), n;
	}
	get positions() {
		return this.geometry.positions;
	}
	get indices() {
		return this.geometry.indices;
	}
	get color() {
		return this.renderable.groupColorAlpha;
	}
	get groupTransform() {
		return this.renderable.groupTransform;
	}
	get attributeSize() {
		return this.geometry.positions.length / 2;
	}
	get indexSize() {
		return this.geometry.indices.length;
	}
}, xn = class {
	destroy() {}
}, Sn = class {
	constructor(e, t) {
		this.localUniforms = new b({
			uTransformMatrix: {
				value: new o(),
				type: "mat3x3<f32>"
			},
			uColor: {
				value: new Float32Array([
					1,
					1,
					1,
					1
				]),
				type: "vec4<f32>"
			},
			uRound: {
				value: 0,
				type: "f32"
			}
		}), this.localUniformsBindGroup = new _({ 0: this.localUniforms }), this.renderer = e, this._adaptor = t, this._adaptor.init();
	}
	validateRenderable(e) {
		let t = this._getMeshData(e), n = t.batched, r = e.batched;
		if (t.batched = r, n !== r) return !0;
		if (r) {
			let n = e._geometry;
			if (n.indices.length !== t.indexSize || n.positions.length !== t.vertexSize) return t.indexSize = n.indices.length, t.vertexSize = n.positions.length, !0;
			let r = this._getBatchableMesh(e);
			return r.texture.uid !== e._texture.uid && (r._textureMatrixUpdateId = -1), !r._batcher.checkAndUpdateTexture(r, e._texture);
		}
		return !1;
	}
	addRenderable(e, t) {
		let n = this.renderer.renderPipes.batch, r = this._getMeshData(e);
		if (e.didViewUpdate && (r.indexSize = e._geometry.indices?.length, r.vertexSize = e._geometry.positions?.length), r.batched) {
			let r = this._getBatchableMesh(e);
			r.setTexture(e._texture), r.geometry = e._geometry, n.addToBatch(r, t);
		} else n.break(t), t.add(e);
	}
	updateRenderable(e) {
		if (e.batched) {
			let t = this._getBatchableMesh(e);
			t.setTexture(e._texture), t.geometry = e._geometry, t._batcher.updateElement(t);
		}
	}
	execute(e) {
		if (!e.isRenderable) return;
		e.state.blendMode = be(e.groupBlendMode, e.texture._source);
		let t = this.localUniforms;
		t.uniforms.uTransformMatrix = e.groupTransform, t.uniforms.uRound = this.renderer._roundPixels | e._roundPixels, t.update(), se(e.groupColorAlpha, t.uniforms.uColor, 0), this._adaptor.execute(this, e);
	}
	_getMeshData(e) {
		var t, n;
		return (t = e._gpuData)[n = this.renderer.uid] || (t[n] = new xn()), e._gpuData[this.renderer.uid].meshData || this._initMeshData(e);
	}
	_initMeshData(e) {
		return e._gpuData[this.renderer.uid].meshData = {
			batched: e.batched,
			indexSize: 0,
			vertexSize: 0
		}, e._gpuData[this.renderer.uid].meshData;
	}
	_getBatchableMesh(e) {
		var t, n;
		return (t = e._gpuData)[n = this.renderer.uid] || (t[n] = new xn()), e._gpuData[this.renderer.uid].batchableMesh || this._initBatchableMesh(e);
	}
	_initBatchableMesh(e) {
		let t = new bn();
		return t.renderable = e, t.setTexture(e._texture), t.transform = e.groupTransform, t.roundPixels = this.renderer._roundPixels | e._roundPixels, e._gpuData[this.renderer.uid].batchableMesh = t, t;
	}
	destroy() {
		this.localUniforms = null, this.localUniformsBindGroup = null, this._adaptor.destroy(), this._adaptor = null, this.renderer = null;
	}
};
//#endregion
//#region node_modules/pixi.js/lib/scene/mesh/init.mjs
Sn.extension = {
	type: [D.WebGLPipes, D.WebGPUPipes],
	name: "mesh"
}, e.add(Sn);
//#endregion
//#region node_modules/pixi.js/lib/scene/mesh/shared/Mesh.mjs
var Cn = class extends I {
	constructor(...e) {
		let t = e[0];
		t instanceof x && (a(m, "Mesh: use new Mesh({ geometry, shader }) instead"), t = {
			geometry: t,
			shader: e[1]
		}, e[3] && (a(m, "Mesh: drawMode argument has been removed, use geometry.topology instead"), t.geometry.topology = e[3]));
		let { geometry: n, shader: r, texture: i, roundPixels: o, state: s, ...c } = t;
		super({
			label: "Mesh",
			...c
		}), this.renderPipeId = "mesh", this._shader = null, this.allowChildren = !1, this.shader = r ?? null, this.texture = i ?? r?.texture ?? T.WHITE, this.state = s ?? N.for2d(), this._geometry = n, this._geometry.on("update", this.onViewUpdate, this), this.roundPixels = o ?? !1;
	}
	get material() {
		return a(m, "mesh.material property has been removed, use mesh.shader instead"), this._shader;
	}
	set shader(e) {
		this._shader !== e && (this._shader = e, this.onViewUpdate());
	}
	get shader() {
		return this._shader;
	}
	set geometry(e) {
		this._geometry !== e && (this._geometry?.off("update", this.onViewUpdate, this), e.on("update", this.onViewUpdate, this), this._geometry = e, this.onViewUpdate());
	}
	get geometry() {
		return this._geometry;
	}
	set texture(e) {
		e ||= T.EMPTY;
		let t = this._texture;
		t !== e && (t && t.dynamic && t.off("update", this.onViewUpdate, this), e.dynamic && e.on("update", this.onViewUpdate, this), this.shader && (this.shader.texture = e), this._texture = e, this.onViewUpdate());
	}
	get texture() {
		return this._texture;
	}
	get batched() {
		return this._shader || this.state.data & 12 ? !1 : this._geometry instanceof yn ? this._geometry.batchMode === "auto" ? this._geometry.positions.length / 2 <= 100 : this._geometry.batchMode === "batch" : !1;
	}
	get bounds() {
		return this._geometry.bounds;
	}
	updateBounds() {
		this._bounds = this._geometry.bounds;
	}
	containsPoint(e) {
		let { x: t, y: n } = e;
		if (!this.bounds.containsPoint(t, n)) return !1;
		let r = this.geometry.getBuffer("aPosition").data, i = this.geometry.topology === "triangle-strip" ? 3 : 1;
		if (this.geometry.getIndex()) {
			let e = this.geometry.getIndex().data, a = e.length;
			for (let o = 0; o + 2 < a; o += i) {
				let i = e[o] * 2, a = e[o + 1] * 2, s = e[o + 2] * 2;
				if (on(t, n, r[i], r[i + 1], r[a], r[a + 1], r[s], r[s + 1])) return !0;
			}
		} else {
			let e = r.length / 2;
			for (let a = 0; a + 2 < e; a += i) {
				let e = a * 2, i = (a + 1) * 2, o = (a + 2) * 2;
				if (on(t, n, r[e], r[e + 1], r[i], r[i + 1], r[o], r[o + 1])) return !0;
			}
		}
		return !1;
	}
	destroy(e) {
		if (super.destroy(e), typeof e == "boolean" ? e : e?.texture) {
			let t = typeof e == "boolean" ? e : e?.textureSource;
			this._texture.destroy(t);
		}
		this._geometry?.off("update", this.onViewUpdate, this), this._texture = null, this._geometry = null, this._shader = null;
	}
}, wn = class e extends P {
	constructor(...e) {
		let t = e[0];
		Array.isArray(e[0]) && (t = {
			textures: e[0],
			autoUpdate: e[1]
		});
		let { animationSpeed: n = 1, autoPlay: r = !1, autoUpdate: i = !0, loop: a = !0, onComplete: o = null, onFrameChange: s = null, onLoop: c = null, textures: l, updateAnchor: u = !1, ...d } = t, [f] = l;
		super({
			...d,
			texture: f instanceof T ? f : f.texture
		}), this._textures = null, this._durations = null, this._autoUpdate = i, this._isConnectedToTicker = !1, this.animationSpeed = n, this.loop = a, this.updateAnchor = u, this.onComplete = o, this.onFrameChange = s, this.onLoop = c, this._currentTime = 0, this._playing = !1, this._previousFrame = null, this.textures = l, r && this.play();
	}
	stop() {
		this._playing && (this._playing = !1, this._autoUpdate && this._isConnectedToTicker && (F.shared.remove(this.update, this), this._isConnectedToTicker = !1));
	}
	play() {
		this._playing || (this._playing = !0, this._autoUpdate && !this._isConnectedToTicker && (F.shared.add(this.update, this, j.HIGH), this._isConnectedToTicker = !0));
	}
	gotoAndStop(e) {
		this.stop(), this.currentFrame = e;
	}
	gotoAndPlay(e) {
		this.currentFrame = e, this.play();
	}
	update(e) {
		if (!this._playing) return;
		let t = e.deltaTime, n = this.animationSpeed * t, r = this.currentFrame;
		if (this._durations !== null) {
			let e = this._currentTime % 1 * this._durations[this.currentFrame];
			for (e += n / 60 * 1e3; e < 0;) this._currentTime--, e += this._durations[this.currentFrame];
			let r = Math.sign(this.animationSpeed * t);
			for (this._currentTime = Math.floor(this._currentTime); e >= this._durations[this.currentFrame];) e -= this._durations[this.currentFrame] * r, this._currentTime += r;
			this._currentTime += e / this._durations[this.currentFrame];
		} else this._currentTime += n;
		this._currentTime < 0 && !this.loop ? (this.gotoAndStop(0), this.onComplete && this.onComplete()) : this._currentTime >= this._textures.length && !this.loop ? (this.gotoAndStop(this._textures.length - 1), this.onComplete && this.onComplete()) : r !== this.currentFrame && (this.loop && this.onLoop && (this.animationSpeed > 0 && this.currentFrame < r || this.animationSpeed < 0 && this.currentFrame > r) && this.onLoop(), this._updateTexture());
	}
	_updateTexture() {
		let e = this.currentFrame;
		this._previousFrame !== e && (this._previousFrame = e, this.texture = this._textures[e], this.updateAnchor && this.texture.defaultAnchor && this.anchor.copyFrom(this.texture.defaultAnchor), this.onFrameChange && this.onFrameChange(this.currentFrame));
	}
	destroy(e = !1) {
		if (typeof e == "boolean" ? e : e?.texture) {
			let t = typeof e == "boolean" ? e : e?.textureSource;
			this._textures.forEach((e) => {
				this.texture !== e && e.destroy(t);
			});
		}
		this._textures = [], this._durations = null, this.stop(), super.destroy(e), this.onComplete = null, this.onFrameChange = null, this.onLoop = null;
	}
	static fromFrames(t) {
		let n = [];
		for (let e = 0; e < t.length; ++e) n.push(T.from(t[e]));
		return new e(n);
	}
	static fromImages(t) {
		let n = [];
		for (let e = 0; e < t.length; ++e) n.push(T.from(t[e]));
		return new e(n);
	}
	get totalFrames() {
		return this._textures.length;
	}
	get textures() {
		return this._textures;
	}
	set textures(e) {
		if (e[0] instanceof T) this._textures = e, this._durations = null;
		else {
			this._textures = [], this._durations = [];
			for (let t = 0; t < e.length; t++) this._textures.push(e[t].texture), this._durations.push(e[t].time);
		}
		this._previousFrame = null, this.gotoAndStop(0), this._updateTexture();
	}
	get currentFrame() {
		let e = Math.floor(this._currentTime) % this._textures.length;
		return e < 0 && (e += this._textures.length), e;
	}
	set currentFrame(e) {
		if (e < 0 || e > this.totalFrames - 1) throw Error(`[AnimatedSprite]: Invalid frame index value ${e}, expected to be between 0 and totalFrames ${this.totalFrames}.`);
		let t = this.currentFrame;
		this._currentTime = e, t !== this.currentFrame && this._updateTexture();
	}
	get playing() {
		return this._playing;
	}
	get autoUpdate() {
		return this._autoUpdate;
	}
	set autoUpdate(e) {
		e !== this._autoUpdate && (this._autoUpdate = e, !this._autoUpdate && this._isConnectedToTicker ? (F.shared.remove(this.update, this), this._isConnectedToTicker = !1) : this._autoUpdate && !this._isConnectedToTicker && this._playing && (F.shared.add(this.update, this), this._isConnectedToTicker = !0));
	}
}, Tn = class {
	constructor({ matrix: e, observer: t } = {}) {
		this.dirty = !0, this._matrix = e ?? new o(), this.observer = t, this.position = new R(this, 0, 0), this.scale = new R(this, 1, 1), this.pivot = new R(this, 0, 0), this.skew = new R(this, 0, 0), this._rotation = 0, this._cx = 1, this._sx = 0, this._cy = 0, this._sy = 1;
	}
	get matrix() {
		let e = this._matrix;
		return this.dirty ? (e.a = this._cx * this.scale.x, e.b = this._sx * this.scale.x, e.c = this._cy * this.scale.y, e.d = this._sy * this.scale.y, e.tx = this.position.x - (this.pivot.x * e.a + this.pivot.y * e.c), e.ty = this.position.y - (this.pivot.x * e.b + this.pivot.y * e.d), this.dirty = !1, e) : e;
	}
	_onUpdate(e) {
		this.dirty = !0, e === this.skew && this.updateSkew(), this.observer?._onUpdate(this);
	}
	updateSkew() {
		this._cx = Math.cos(this._rotation + this.skew.y), this._sx = Math.sin(this._rotation + this.skew.y), this._cy = -Math.sin(this._rotation - this.skew.x), this._sy = Math.cos(this._rotation - this.skew.x), this.dirty = !0;
	}
	toString() {
		return `[pixi.js/math:Transform position=(${this.position.x}, ${this.position.y}) rotation=${this.rotation} scale=(${this.scale.x}, ${this.scale.y}) skew=(${this.skew.x}, ${this.skew.y}) ]`;
	}
	setFromMatrix(e) {
		e.decompose(this), this.dirty = !0;
	}
	get rotation() {
		return this._rotation;
	}
	set rotation(e) {
		this._rotation !== e && (this._rotation = e, this._onUpdate(this.skew));
	}
}, En = new o(), Dn = new o(), On = [
	new r(),
	new r(),
	new r(),
	new r()
], kn = class {
	constructor(e) {
		this._renderer = e;
	}
	validateRenderable(e) {
		return !1;
	}
	addRenderable(e, t) {
		this._renderer.renderPipes.batch.break(t), t.add(e);
	}
	updateRenderable(e) {}
	execute(e) {
		let t = this._renderer, n = t.canvasContext, r = n.activeContext;
		r.save(), n.setBlendMode(e.groupBlendMode);
		let i = t.globalUniforms.globalUniformData?.worldColor ?? 4294967295, a = e.groupColorAlpha, o = (i >>> 24 & 255) / 255, s = (a >>> 24 & 255) / 255, c = t.filter?.alphaMultiplier ?? 1, l = o * s * c;
		if (l <= 0) {
			r.restore();
			return;
		}
		r.globalAlpha = l;
		let u = i & 16777215, d = a & 16777215, p = ee(f(d, u)), m = e.texture, h = ae.getTintedPattern(m, p), g = e.width, _ = e.height, v = e.groupTransform, y = m.source._resolution ?? m.source.resolution ?? 1;
		Dn.copyFrom(e._tileTransform.matrix), e.applyAnchorToTexture || Dn.translate(-e.anchor.x * g, -e.anchor.y * _);
		let b = Dn.tx, x = Dn.ty;
		Dn.scale(1 / y, 1 / y), Dn.tx = b, Dn.ty = x, En.identity(), En.prepend(Dn), En.prepend(v);
		let S = t._roundPixels | e._roundPixels;
		n.setContextTransform(En, S === 1), r.fillStyle = h;
		let C = e.anchor.x * -g, w = e.anchor.y * -_;
		On[0].set(C, w), On[1].set(C + g, w), On[2].set(C + g, w + _), On[3].set(C, w + _);
		for (let e = 0; e < 4; e++) Dn.applyInverse(On[e], On[e]);
		r.beginPath(), r.moveTo(On[0].x, On[0].y);
		for (let e = 1; e < 4; e++) r.lineTo(On[e].x, On[e].y);
		r.closePath(), r.fill(), r.restore();
	}
	destroy() {
		this._renderer = null;
	}
};
kn.extension = {
	type: [D.CanvasPipes],
	name: "tilingSprite"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/sprite-tiling/shader/tilingBit.mjs
var An = {
	name: "tiling-bit",
	vertex: {
		header: "\n            struct TilingUniforms {\n                uMapCoord:mat3x3<f32>,\n                uClampFrame:vec4<f32>,\n                uClampOffset:vec2<f32>,\n                uTextureTransform:mat3x3<f32>,\n                uSizeAnchor:vec4<f32>\n            };\n\n            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;\n            @group(2) @binding(1) var uTexture: texture_2d<f32>;\n            @group(2) @binding(2) var uSampler: sampler;\n        ",
		main: "\n            uv = (tilingUniforms.uTextureTransform * vec3(uv, 1.0)).xy;\n\n            position = (position - tilingUniforms.uSizeAnchor.zw) * tilingUniforms.uSizeAnchor.xy;\n        "
	},
	fragment: {
		header: "\n            struct TilingUniforms {\n                uMapCoord:mat3x3<f32>,\n                uClampFrame:vec4<f32>,\n                uClampOffset:vec2<f32>,\n                uTextureTransform:mat3x3<f32>,\n                uSizeAnchor:vec4<f32>\n            };\n\n            @group(2) @binding(0) var<uniform> tilingUniforms: TilingUniforms;\n            @group(2) @binding(1) var uTexture: texture_2d<f32>;\n            @group(2) @binding(2) var uSampler: sampler;\n        ",
		main: "\n\n            var coord = vUV + ceil(tilingUniforms.uClampOffset - vUV);\n            coord = (tilingUniforms.uMapCoord * vec3(coord, 1.0)).xy;\n            var unclamped = coord;\n            coord = clamp(coord, tilingUniforms.uClampFrame.xy, tilingUniforms.uClampFrame.zw);\n\n            var bias = 0.;\n\n            if(unclamped.x == coord.x && unclamped.y == coord.y)\n            {\n                bias = -32.;\n            }\n\n            outColor = textureSampleBias(uTexture, uSampler, coord, bias);\n        "
	}
}, jn = {
	name: "tiling-bit",
	vertex: {
		header: "\n            uniform mat3 uTextureTransform;\n            uniform vec4 uSizeAnchor;\n\n        ",
		main: "\n            uv = (uTextureTransform * vec3(aUV, 1.0)).xy;\n\n            position = (position - uSizeAnchor.zw) * uSizeAnchor.xy;\n        "
	},
	fragment: {
		header: "\n            uniform sampler2D uTexture;\n            uniform mat3 uMapCoord;\n            uniform vec4 uClampFrame;\n            uniform vec2 uClampOffset;\n        ",
		main: "\n\n        vec2 coord = vUV + ceil(uClampOffset - vUV);\n        coord = (uMapCoord * vec3(coord, 1.0)).xy;\n        vec2 unclamped = coord;\n        coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n        outColor = texture(uTexture, coord, unclamped == coord ? 0.0 : -32.0);// lod-bias very negative to force lod 0\n\n        "
	}
}, Mn, Nn, Pn = class extends p {
	constructor() {
		Mn ??= he({
			name: "tiling-sprite-shader",
			bits: [
				Ee,
				An,
				_e
			]
		}), Nn ??= we({
			name: "tiling-sprite-shader",
			bits: [
				De,
				jn,
				pe
			]
		});
		let e = new b({
			uMapCoord: {
				value: new o(),
				type: "mat3x3<f32>"
			},
			uClampFrame: {
				value: new Float32Array([
					0,
					0,
					1,
					1
				]),
				type: "vec4<f32>"
			},
			uClampOffset: {
				value: new Float32Array([0, 0]),
				type: "vec2<f32>"
			},
			uTextureTransform: {
				value: new o(),
				type: "mat3x3<f32>"
			},
			uSizeAnchor: {
				value: new Float32Array([
					100,
					100,
					.5,
					.5
				]),
				type: "vec4<f32>"
			}
		});
		super({
			glProgram: Nn,
			gpuProgram: Mn,
			resources: {
				localUniforms: new b({
					uTransformMatrix: {
						value: new o(),
						type: "mat3x3<f32>"
					},
					uColor: {
						value: new Float32Array([
							1,
							1,
							1,
							1
						]),
						type: "vec4<f32>"
					},
					uRound: {
						value: 0,
						type: "f32"
					}
				}),
				tilingUniforms: e,
				uTexture: T.EMPTY.source,
				uSampler: T.EMPTY.source.style
			}
		});
	}
	updateUniforms(e, t, n, r, i, a) {
		let o = this.resources.tilingUniforms, s = a.width, c = a.height, l = a.textureMatrix, u = o.uniforms.uTextureTransform;
		u.set(n.a * s / e, n.b * s / t, n.c * c / e, n.d * c / t, n.tx / e, n.ty / t), u.invert(), o.uniforms.uMapCoord = l.mapCoord, o.uniforms.uClampFrame = l.uClampFrame, o.uniforms.uClampOffset = l.uClampOffset, o.uniforms.uTextureTransform = u, o.uniforms.uSizeAnchor[0] = e, o.uniforms.uSizeAnchor[1] = t, o.uniforms.uSizeAnchor[2] = r, o.uniforms.uSizeAnchor[3] = i, a && (this.resources.uTexture = a.source, this.resources.uSampler = a.source.style);
	}
}, Fn = class extends yn {
	constructor() {
		super({
			positions: new Float32Array([
				0,
				0,
				1,
				0,
				1,
				1,
				0,
				1
			]),
			uvs: new Float32Array([
				0,
				0,
				1,
				0,
				1,
				1,
				0,
				1
			]),
			indices: new Uint32Array([
				0,
				1,
				2,
				0,
				2,
				3
			])
		});
	}
};
//#endregion
//#region node_modules/pixi.js/lib/scene/sprite-tiling/utils/setPositions.mjs
function In(e, t) {
	let n = e.anchor.x, r = e.anchor.y;
	t[0] = -n * e.width, t[1] = -r * e.height, t[2] = (1 - n) * e.width, t[3] = -r * e.height, t[4] = (1 - n) * e.width, t[5] = (1 - r) * e.height, t[6] = -n * e.width, t[7] = (1 - r) * e.height;
}
//#endregion
//#region node_modules/pixi.js/lib/scene/sprite-tiling/utils/applyMatrix.mjs
function Ln(e, t, n, r) {
	let i = 0, a = e.length / (t || 2), o = r.a, s = r.b, c = r.c, l = r.d, u = r.tx, d = r.ty;
	for (n *= t; i < a;) {
		let r = e[n], a = e[n + 1];
		e[n] = o * r + c * a + u, e[n + 1] = s * r + l * a + d, n += t, i++;
	}
}
//#endregion
//#region node_modules/pixi.js/lib/scene/sprite-tiling/utils/setUvs.mjs
function Rn(e, t) {
	let n = e.texture, r = n.frame.width, i = n.frame.height, a = 0, s = 0;
	e.applyAnchorToTexture && (a = e.anchor.x, s = e.anchor.y), t[0] = t[6] = -a, t[2] = t[4] = 1 - a, t[1] = t[3] = -s, t[5] = t[7] = 1 - s;
	let c = e._tileTransform.matrix, l = o.shared;
	l.set(c.a * r / e.width, c.b * r / e.height, c.c * i / e.width, c.d * i / e.height, c.tx / e.width, c.ty / e.height), l.invert(), Ln(t, 2, 0, l);
}
//#endregion
//#region node_modules/pixi.js/lib/scene/sprite-tiling/TilingSpritePipe.mjs
var zn = new Fn(), Bn = class {
	constructor() {
		this.canBatch = !0, this.geometry = new yn({
			indices: zn.indices.slice(),
			positions: zn.positions.slice(),
			uvs: zn.uvs.slice()
		});
	}
	destroy() {
		this.geometry.destroy(), this.shader?.destroy();
	}
}, Vn = class {
	constructor(e) {
		this._state = N.default2d, this._renderer = e, this._managedTilingSprites = new Ce({
			renderer: e,
			type: "renderable",
			name: "tilingSprite"
		});
	}
	validateRenderable(e) {
		let t = this._getTilingSpriteData(e), n = t.canBatch;
		this._updateCanBatch(e);
		let r = t.canBatch;
		if (r && r === n) {
			let { batchableMesh: n } = t;
			return !n._batcher.checkAndUpdateTexture(n, e.texture);
		}
		return n !== r;
	}
	addRenderable(e, t) {
		let n = this._renderer.renderPipes.batch;
		this._updateCanBatch(e);
		let r = this._getTilingSpriteData(e), { geometry: i, canBatch: a } = r;
		if (a) {
			r.batchableMesh ||= new bn();
			let a = r.batchableMesh;
			e.didViewUpdate && (this._updateBatchableMesh(e), a.geometry = i, a.renderable = e, a.transform = e.groupTransform, a.setTexture(e._texture)), a.roundPixels = this._renderer._roundPixels | e._roundPixels, n.addToBatch(a, t);
		} else n.break(t), r.shader ||= new Pn(), this.updateRenderable(e), t.add(e);
	}
	execute(e) {
		let t = this._renderer, { shader: n } = this._getTilingSpriteData(e);
		n.groups[0] = t.globalUniforms.bindGroup;
		let r = n.resources.localUniforms.uniforms;
		r.uTransformMatrix = e.groupTransform, r.uRound = t._roundPixels | e._roundPixels, se(e.groupColorAlpha, r.uColor, 0), this._state.blendMode = be(e.groupBlendMode, e.texture._source), t.encoder.draw({
			geometry: zn,
			shader: n,
			state: this._state
		});
	}
	updateRenderable(e) {
		let t = this._getTilingSpriteData(e), { canBatch: n } = t;
		if (n) {
			let { batchableMesh: n } = t;
			e.didViewUpdate && this._updateBatchableMesh(e), n._batcher.updateElement(n);
		} else if (e.didViewUpdate) {
			let { shader: n } = t;
			n.updateUniforms(e.width, e.height, e._tileTransform.matrix, e.anchor.x, e.anchor.y, e.texture);
		}
	}
	_getTilingSpriteData(e) {
		return e._gpuData[this._renderer.uid] || this._initTilingSpriteData(e);
	}
	_initTilingSpriteData(e) {
		let t = new Bn();
		return t.renderable = e, e._gpuData[this._renderer.uid] = t, this._managedTilingSprites.add(e), t;
	}
	_updateBatchableMesh(e) {
		let { geometry: t } = this._getTilingSpriteData(e), n = e.texture.source.style;
		n.addressMode !== "repeat" && (n.addressMode = "repeat", n.update()), Rn(e, t.uvs), In(e, t.positions);
	}
	destroy() {
		this._managedTilingSprites.destroy(), this._renderer = null;
	}
	_updateCanBatch(e) {
		let t = this._getTilingSpriteData(e), n = e.texture, r = !0;
		return this._renderer.type === l.WEBGL && (r = this._renderer.context.supports.nonPowOf2wrapping), t.canBatch = n.textureMatrix.isSimple && (r || n.source.isPowerOfTwo), t.canBatch;
	}
};
Vn.extension = {
	type: [D.WebGLPipes, D.WebGPUPipes],
	name: "tilingSprite"
}, e.add(kn), e.add(Vn);
//#endregion
//#region node_modules/pixi.js/lib/scene/sprite-tiling/TilingSprite.mjs
var Hn = class e extends I {
	constructor(...t) {
		let n = t[0] || {};
		n instanceof T && (n = { texture: n }), t.length > 1 && (a(m, "use new TilingSprite({ texture, width:100, height:100 }) instead"), n.width = t[1], n.height = t[2]), n = {
			...e.defaultOptions,
			...n
		};
		let { texture: r, anchor: i, tilePosition: o, tileScale: s, tileRotation: c, width: l, height: u, applyAnchorToTexture: d, roundPixels: f, ...p } = n ?? {};
		super({
			label: "TilingSprite",
			...p
		}), this.renderPipeId = "tilingSprite", this.batched = !0, this.allowChildren = !1, this._anchor = new R({ _onUpdate: () => {
			this.onViewUpdate();
		} }), this.applyAnchorToTexture = d, this.texture = r, this._width = l ?? r.width, this._height = u ?? r.height, this._tileTransform = new Tn({ observer: { _onUpdate: () => this.onViewUpdate() } }), i && (this.anchor = i), this.tilePosition = o, this.tileScale = s, this.tileRotation = c, this.roundPixels = f ?? !1;
	}
	static from(t, n = {}) {
		return typeof t == "string" ? new e({
			texture: G.get(t),
			...n
		}) : new e({
			texture: t,
			...n
		});
	}
	get uvRespectAnchor() {
		return a(m, "uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"), this.applyAnchorToTexture;
	}
	set uvRespectAnchor(e) {
		a(m, "uvRespectAnchor is deprecated, please use applyAnchorToTexture instead"), this.applyAnchorToTexture = e;
	}
	get clampMargin() {
		return this._texture.textureMatrix.clampMargin;
	}
	set clampMargin(e) {
		this._texture.textureMatrix.clampMargin = e;
	}
	get anchor() {
		return this._anchor;
	}
	set anchor(e) {
		typeof e == "number" ? this._anchor.set(e) : this._anchor.copyFrom(e);
	}
	get tilePosition() {
		return this._tileTransform.position;
	}
	set tilePosition(e) {
		this._tileTransform.position.copyFrom(e);
	}
	get tileScale() {
		return this._tileTransform.scale;
	}
	set tileScale(e) {
		typeof e == "number" ? this._tileTransform.scale.set(e) : this._tileTransform.scale.copyFrom(e);
	}
	set tileRotation(e) {
		this._tileTransform.rotation = e;
	}
	get tileRotation() {
		return this._tileTransform.rotation;
	}
	get tileTransform() {
		return this._tileTransform;
	}
	set texture(e) {
		e ||= T.EMPTY;
		let t = this._texture;
		t !== e && (t && t.dynamic && t.off("update", this.onViewUpdate, this), e.dynamic && e.on("update", this.onViewUpdate, this), this._texture = e, this.onViewUpdate());
	}
	get texture() {
		return this._texture;
	}
	set width(e) {
		this._width = e, this.onViewUpdate();
	}
	get width() {
		return this._width;
	}
	set height(e) {
		this._height = e, this.onViewUpdate();
	}
	get height() {
		return this._height;
	}
	setSize(e, t) {
		typeof e == "object" && (t = e.height ?? e.width, e = e.width), this._width = e, this._height = t ?? e, this.onViewUpdate();
	}
	getSize(e) {
		return e ||= {}, e.width = this._width, e.height = this._height, e;
	}
	updateBounds() {
		let e = this._bounds, t = this._anchor, n = this._width, r = this._height;
		e.minX = -t._x * n, e.maxX = e.minX + n, e.minY = -t._y * r, e.maxY = e.minY + r;
	}
	containsPoint(e) {
		let t = this._width, n = this._height, r = -t * this._anchor._x, i = 0;
		return e.x >= r && e.x <= r + t && (i = -n * this._anchor._y, e.y >= i && e.y <= i + n);
	}
	destroy(e = !1) {
		if (super.destroy(e), this._anchor = null, this._tileTransform = null, this._bounds = null, typeof e == "boolean" ? e : e?.texture) {
			let t = typeof e == "boolean" ? e : e?.textureSource;
			this._texture.destroy(t);
		}
		this._texture = null;
	}
};
Hn.defaultOptions = {
	texture: T.EMPTY,
	anchor: {
		x: 0,
		y: 0
	},
	tilePosition: {
		x: 0,
		y: 0
	},
	tileScale: {
		x: 1,
		y: 1
	},
	tileRotation: 0,
	applyAnchorToTexture: !1
};
var Un = Hn, Wn = class extends I {
	constructor(e, t) {
		let { text: n, resolution: r, style: i, anchor: a, width: o, height: s, roundPixels: c, ...l } = e;
		super({ ...l }), this.batched = !0, this._resolution = null, this._autoResolution = !0, this._didTextUpdate = !0, this._styleClass = t, this.text = n ?? "", this.style = i, this.resolution = r ?? null, this.allowChildren = !1, this._anchor = new R({ _onUpdate: () => {
			this.onViewUpdate();
		} }), a && (this.anchor = a), this.roundPixels = c ?? !1, o !== void 0 && (this.width = o), s !== void 0 && (this.height = s);
	}
	get anchor() {
		return this._anchor;
	}
	set anchor(e) {
		typeof e == "number" ? this._anchor.set(e) : this._anchor.copyFrom(e);
	}
	set text(e) {
		e = e.toString(), this._text !== e && (this._text = e, this.onViewUpdate());
	}
	get text() {
		return this._text;
	}
	set resolution(e) {
		this._autoResolution = e === null, this._resolution = e, this.onViewUpdate();
	}
	get resolution() {
		return this._resolution;
	}
	get style() {
		return this._style;
	}
	set style(e) {
		e ||= {}, this._style?.off("update", this.onViewUpdate, this), this._style = e instanceof this._styleClass ? e : new this._styleClass(e), this._style.on("update", this.onViewUpdate, this), this.onViewUpdate();
	}
	get width() {
		return Math.abs(this.scale.x) * this.bounds.width;
	}
	set width(e) {
		this._setWidth(e, this.bounds.width);
	}
	get height() {
		return Math.abs(this.scale.y) * this.bounds.height;
	}
	set height(e) {
		this._setHeight(e, this.bounds.height);
	}
	getSize(e) {
		return e ||= {}, e.width = Math.abs(this.scale.x) * this.bounds.width, e.height = Math.abs(this.scale.y) * this.bounds.height, e;
	}
	setSize(e, t) {
		typeof e == "object" ? (t = e.height ?? e.width, e = e.width) : t ??= e, e !== void 0 && this._setWidth(e, this.bounds.width), t !== void 0 && this._setHeight(t, this.bounds.height);
	}
	containsPoint(e) {
		let t = this.bounds.width, n = this.bounds.height, r = -t * this.anchor.x, i = 0;
		return e.x >= r && e.x <= r + t && (i = -n * this.anchor.y, e.y >= i && e.y <= i + n);
	}
	onViewUpdate() {
		this.didViewUpdate || (this._didTextUpdate = !0), super.onViewUpdate();
	}
	destroy(e = !1) {
		super.destroy(e), this.owner = null, this._bounds = null, this._anchor = null, (typeof e == "boolean" ? e : e?.style) && this._style.destroy(e), this._style = null, this._text = null;
	}
	get styleKey() {
		return `${this._text}:${this._style.styleKey}:${this._resolution}`;
	}
};
function Gn(e, t) {
	let n = e[0] ?? {};
	return (typeof n == "string" || e[1]) && (a(m, `use new ${t}({ text: "hi!", style }) instead`), n = {
		text: n,
		style: e[1]
	}), n;
}
//#endregion
//#region node_modules/pixi.js/lib/utils/canvas/getCanvasBoundingBox.mjs
var Kn = null, qn = null;
function Jn(e, n) {
	Kn || (Kn = v.get().createCanvas(256, 128), qn = Kn.getContext("2d", { willReadFrequently: !0 }), qn.globalCompositeOperation = "copy", qn.globalAlpha = 1), (Kn.width < e || Kn.height < n) && (Kn.width = t(e), Kn.height = t(n));
}
function Yn(e, t, n) {
	for (let r = 0, i = 4 * n * t; r < t; ++r, i += 4) if (e[i + 3] !== 0) return !1;
	return !0;
}
function Xn(e, t, n, r, i) {
	let a = 4 * t;
	for (let t = r, o = r * a + 4 * n; t <= i; ++t, o += a) if (e[o + 3] !== 0) return !1;
	return !0;
}
function Zn(...e) {
	let t = e[0];
	t.canvas || (t = {
		canvas: e[0],
		resolution: e[1]
	});
	let { canvas: n } = t, r = Math.min(t.resolution ?? 1, 1), a = t.width ?? n.width, o = t.height ?? n.height, s = t.output;
	if (Jn(a, o), !qn) throw TypeError("Failed to get canvas 2D context");
	qn.drawImage(n, 0, 0, a, o, 0, 0, a * r, o * r);
	let c = qn.getImageData(0, 0, a, o).data, l = 0, u = 0, d = a - 1, f = o - 1;
	for (; u < o && Yn(c, a, u);) ++u;
	if (u === o) return i.EMPTY;
	for (; Yn(c, a, f);) --f;
	for (; Xn(c, a, l, u, f);) ++l;
	for (; Xn(c, a, d, u, f);) --d;
	return ++d, ++f, qn.globalCompositeOperation = "source-over", qn.strokeRect(l, u, d - l, f - u), qn.globalCompositeOperation = "copy", s ??= new i(), s.set(l / r, u / r, (d - l) / r, (f - u) / r), s;
}
//#endregion
//#region node_modules/pixi.js/lib/scene/text/canvas/CanvasTextGenerator.mjs
var Qn = new i();
function $n(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) e.charCodeAt(n) === 32 && t++;
	return t;
}
var er = new class {
	getCanvasAndContext(e) {
		let { text: t, style: n, resolution: r = 1 } = e, i = n._getFinalPadding(), a = Ne.measureText(t || " ", n), o = Math.ceil(Math.ceil(Math.max(1, a.width) + i * 2) * r), s = Math.ceil(Math.ceil(Math.max(1, a.height) + i * 2) * r), c = Te.getOptimalCanvasAndContext(o, s);
		return this._renderTextToCanvas(n, i, r, c, a), {
			canvasAndContext: c,
			frame: n.trim ? Zn({
				canvas: c.canvas,
				width: o,
				height: s,
				resolution: 1,
				output: Qn
			}) : Qn.set(0, 0, o, s)
		};
	}
	returnCanvasAndContext(e) {
		Te.returnCanvasAndContext(e);
	}
	_renderTextToCanvas(e, t, n, r, i) {
		if (i.runsByLine && i.runsByLine.length > 0) {
			this._renderTaggedTextToCanvas(i, e, t, n, r);
			return;
		}
		let { canvas: a, context: o } = r, s = je(e), c = i.lines, l = i.lineHeight, u = i.lineWidths, d = i.maxLineWidth, f = i.fontProperties, p = a.height;
		if (o.resetTransform(), o.scale(n, n), o.textBaseline = e.textBaseline, e._stroke?.width) {
			let t = e._stroke;
			o.lineWidth = t.width, o.miterLimit = t.miterLimit, o.lineJoin = t.join, o.lineCap = t.cap;
		}
		o.font = s;
		let m, h, g = e.dropShadow ? 2 : 1, _ = (e._stroke?.width ?? 0) / 2, v = (l - f.fontSize) / 2;
		l - f.fontSize < 0 && (v = 0);
		for (let a = 0; a < g; ++a) {
			let s = e.dropShadow && a === 0, g = s ? Math.ceil(Math.max(1, p) + t * 2) : 0, y = g * n;
			if (s) this._setupDropShadow(o, e, n, y);
			else {
				let n = e._gradientBounds, r = e._gradientOffset;
				if (n) {
					let a = {
						width: n.width,
						height: n.height,
						lineHeight: n.height,
						lines: i.lines
					};
					this._setFillAndStrokeStyles(o, e, a, t, _, r?.x ?? 0, r?.y ?? 0);
				} else r ? this._setFillAndStrokeStyles(o, e, i, t, _, r.x, r.y) : this._setFillAndStrokeStyles(o, e, i, t, _);
				o.shadowColor = "rgba(0,0,0,0)";
			}
			for (let n = 0; n < c.length; n++) {
				m = _, h = _ + n * l + f.ascent + v, m += this._getAlignmentOffset(u[n], d, e.align);
				let i = 0;
				if (e.align === "justify" && e.wordWrap && n < c.length - 1) {
					let e = $n(c[n]);
					e > 0 && (i = (d - u[n]) / e);
				}
				e._stroke?.width && this._drawLetterSpacing(c[n], e, r, m + t, h + t - g, !0, i), e._fill !== void 0 && this._drawLetterSpacing(c[n], e, r, m + t, h + t - g, !1, i);
			}
		}
	}
	_renderTaggedTextToCanvas(e, t, n, r, i) {
		let { canvas: a, context: o } = i, { runsByLine: s, lineWidths: c, maxLineWidth: l, lineAscents: u, lineHeights: d, hasDropShadow: f } = e, p = a.height;
		o.resetTransform(), o.scale(r, r), o.textBaseline = t.textBaseline;
		let m = f ? 2 : 1, h = t._stroke?.width ?? 0;
		for (let e of s) for (let t of e) {
			let e = t.style._stroke?.width ?? 0;
			e > h && (h = e);
		}
		let g = h / 2, _ = [];
		for (let e = 0; e < s.length; e++) {
			let t = s[e], n = [];
			for (let e of t) {
				let t = je(e.style);
				o.font = t, n.push({
					width: Ne._measureText(e.text, e.style.letterSpacing, o),
					font: t
				});
			}
			_.push(n);
		}
		for (let e = 0; e < m; ++e) {
			let a = f && e === 0, m = a ? Math.ceil(Math.max(1, p) + n * 2) : 0, h = m * r;
			a || (o.shadowColor = "rgba(0,0,0,0)");
			let v = g;
			for (let e = 0; e < s.length; e++) {
				let f = s[e], p = c[e], y = u[e], b = d[e], x = _[e], S = g;
				S += this._getAlignmentOffset(p, l, t.align);
				let C = 0;
				if (t.align === "justify" && t.wordWrap && e < s.length - 1) {
					let e = 0;
					for (let t of f) e += $n(t.text);
					e > 0 && (C = (l - p) / e);
				}
				let w = v + y, T = S + n;
				for (let e = 0; e < f.length; e++) {
					let t = f[e], { width: s, font: c } = x[e];
					if (o.font = c, o.textBaseline = t.style.textBaseline, t.style._stroke?.width) {
						let e = t.style._stroke;
						if (o.lineWidth = e.width, o.miterLimit = e.miterLimit, o.lineJoin = e.join, o.lineCap = e.cap, a) {
							if (t.style.dropShadow) this._setupDropShadow(o, t.style, r, h);
							else {
								let e = $n(t.text);
								T += s + e * C;
								continue;
							}
						} else {
							let r = Ne.measureFont(c), i = t.style.lineHeight || r.fontSize, a = {
								width: s,
								height: i,
								lineHeight: i,
								lines: [t.text]
							};
							o.strokeStyle = Oe(e, o, a, n * 2, T - n, v);
						}
						this._drawLetterSpacing(t.text, t.style, i, T, w + n - m, !0, C);
					}
					let l = $n(t.text);
					T += s + l * C;
				}
				T = S + n;
				for (let e = 0; e < f.length; e++) {
					let t = f[e], { width: s, font: c } = x[e];
					if (o.font = c, o.textBaseline = t.style.textBaseline, t.style._fill !== void 0) {
						if (a) {
							if (t.style.dropShadow) this._setupDropShadow(o, t.style, r, h);
							else {
								let e = $n(t.text);
								T += s + e * C;
								continue;
							}
						} else {
							let e = Ne.measureFont(c), r = t.style.lineHeight || e.fontSize, i = {
								width: s,
								height: r,
								lineHeight: r,
								lines: [t.text]
							};
							o.fillStyle = Oe(t.style._fill, o, i, n * 2, T - n, v);
						}
						this._drawLetterSpacing(t.text, t.style, i, T, w + n - m, !1, C);
					}
					let l = $n(t.text);
					T += s + l * C;
				}
				v += b;
			}
		}
	}
	_setFillAndStrokeStyles(e, t, n, r, i, a = 0, o = 0) {
		if (e.fillStyle = t._fill ? Oe(t._fill, e, n, r * 2, a, o) : null, t._stroke?.width) {
			let s = i + r * 2;
			e.strokeStyle = Oe(t._stroke, e, n, s, a, o);
		}
	}
	_setupDropShadow(e, t, n, r) {
		e.fillStyle = "black", e.strokeStyle = "black";
		let i = t.dropShadow, a = i.color, o = i.alpha;
		e.shadowColor = E.shared.setValue(a).setAlpha(o).toRgbaString();
		let s = i.blur * n, c = i.distance * n;
		e.shadowBlur = s, e.shadowOffsetX = Math.cos(i.angle) * c, e.shadowOffsetY = Math.sin(i.angle) * c + r;
	}
	_getAlignmentOffset(e, t, n) {
		return n === "right" ? t - e : n === "center" ? (t - e) / 2 : 0;
	}
	_drawLetterSpacing(e, t, n, r, i, a = !1, o = 0) {
		let { context: s } = n, c = t.letterSpacing, l = !1;
		if (Ne.experimentalLetterSpacingSupported && (Ne.experimentalLetterSpacing ? (s.letterSpacing = `${c}px`, s.textLetterSpacing = `${c}px`, l = !0) : (s.letterSpacing = "0px", s.textLetterSpacing = "0px")), (c === 0 || l) && o === 0) {
			a ? s.strokeText(e, r, i) : s.fillText(e, r, i);
			return;
		}
		if (o !== 0 && (c === 0 || l)) {
			let t = e.split(" "), n = r, c = s.measureText(" ").width;
			for (let e = 0; e < t.length; e++) a ? s.strokeText(t[e], n, i) : s.fillText(t[e], n, i), n += s.measureText(t[e]).width + c + o;
			return;
		}
		let u = r, d = Ne.graphemeSegmenter(e), f = s.measureText(e).width, p = 0;
		for (let e = 0; e < d.length; ++e) {
			let t = d[e];
			a ? s.strokeText(t, u, i) : s.fillText(t, u, i);
			let n = "";
			for (let t = e + 1; t < d.length; ++t) n += d[t];
			p = s.measureText(n).width, u += f - p + c, t === " " && (u += o), f = p;
		}
	}
}();
//#endregion
//#region node_modules/pixi.js/lib/scene/text/utils/updateTextBounds.mjs
function tr(e, t) {
	let { texture: n, bounds: r } = e, i = t._style._getFinalPadding();
	O(r, t._anchor, n);
	let a = t._anchor._x * i * 2, o = t._anchor._y * i * 2;
	r.minX -= i - a, r.minY -= i - o, r.maxX -= i - a, r.maxY -= i - o;
}
//#endregion
//#region node_modules/pixi.js/lib/scene/text/canvas/BatchableText.mjs
var nr = class extends oe {}, rr = class {
	constructor(e) {
		this._renderer = e, e.runners.resolutionChange.add(this), this._managedTexts = new Ce({
			renderer: e,
			type: "renderable",
			onUnload: this.onTextUnload.bind(this),
			name: "canvasText"
		});
	}
	resolutionChange() {
		for (let e in this._managedTexts.items) {
			let t = this._managedTexts.items[e];
			t?._autoResolution && t.onViewUpdate();
		}
	}
	validateRenderable(e) {
		let t = this._getGpuText(e), n = e.styleKey;
		return t.currentKey !== n || e._didTextUpdate;
	}
	addRenderable(e, t) {
		let n = this._getGpuText(e);
		if (e._didTextUpdate) {
			let t = e._autoResolution ? this._renderer.resolution : e.resolution;
			(n.currentKey !== e.styleKey || e._resolution !== t) && this._updateGpuText(e), e._didTextUpdate = !1, tr(n, e);
		}
		this._renderer.renderPipes.batch.addToBatch(n, t);
	}
	updateRenderable(e) {
		let t = this._getGpuText(e);
		t._batcher.updateElement(t);
	}
	_updateGpuText(e) {
		let t = this._getGpuText(e);
		t.texture && this._renderer.canvasText.decreaseReferenceCount(t.currentKey), e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution, t.texture = this._renderer.canvasText.getManagedTexture(e), t.currentKey = e.styleKey;
	}
	_getGpuText(e) {
		return e._gpuData[this._renderer.uid] || this.initGpuText(e);
	}
	initGpuText(e) {
		let t = new nr();
		return t.currentKey = "--", t.renderable = e, t.transform = e.groupTransform, t.bounds = {
			minX: 0,
			maxX: 1,
			minY: 0,
			maxY: 0
		}, t.roundPixels = this._renderer._roundPixels | e._roundPixels, e._gpuData[this._renderer.uid] = t, this._managedTexts.add(e), t;
	}
	onTextUnload(e) {
		let t = e._gpuData[this._renderer.uid];
		if (!t) return;
		let { canvasText: n } = this._renderer;
		n.getReferenceCount(t.currentKey) > 0 ? n.decreaseReferenceCount(t.currentKey) : t.texture && n.returnTexture(t.texture);
	}
	destroy() {
		this._managedTexts.destroy(), this._renderer = null;
	}
};
rr.extension = {
	type: [
		D.WebGLPipes,
		D.WebGPUPipes,
		D.CanvasPipes
	],
	name: "text"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/text/shared/AbstractTextSystem.mjs
var ir = class {
	constructor(e, t) {
		this._activeTextures = {}, this._renderer = e, this._retainCanvasContext = t;
	}
	getTexture(e, t, n, r) {
		typeof e == "string" && (a("8.0.0", "CanvasTextSystem.getTexture: Use object TextOptions instead of separate arguments"), e = {
			text: e,
			style: n,
			resolution: t
		}), e.style instanceof ke || (e.style = new ke(e.style)), e.textureStyle instanceof c || (e.textureStyle = new c(e.textureStyle)), typeof e.text != "string" && (e.text = e.text.toString());
		let { text: i, style: o, textureStyle: s, autoGenerateMipmaps: l } = e, u = e.resolution ?? this._renderer.resolution, { frame: d, canvasAndContext: f } = er.getCanvasAndContext({
			text: i,
			style: o,
			resolution: u
		}), p = re(f.canvas, d.width, d.height, u, l);
		if (s && (p.source.style = s), o.trim && (d.pad(o.padding), p.frame.copyFrom(d), p.frame.scale(1 / u), p.updateUvs()), o.filters) {
			let e = this._applyFilters(p, o.filters);
			return this.returnTexture(p), er.returnCanvasAndContext(f), e;
		}
		return this._renderer.texture.initSource(p._source), this._retainCanvasContext || er.returnCanvasAndContext(f), p;
	}
	returnTexture(e) {
		let t = e.source, n = t.resource;
		if (this._retainCanvasContext && n?.getContext) {
			let e = n.getContext("2d");
			e && er.returnCanvasAndContext({
				canvas: n,
				context: e
			});
		}
		t.resource = null, t.uploadMethodId = "unknown", t.alphaMode = "no-premultiply-alpha", A.returnTexture(e, !0);
	}
	renderTextToCanvas() {
		a("8.10.0", "CanvasTextSystem.renderTextToCanvas: no longer supported, use CanvasTextSystem.getTexture instead");
	}
	getManagedTexture(e) {
		e._resolution = e._autoResolution ? this._renderer.resolution : e.resolution;
		let t = e.styleKey;
		if (this._activeTextures[t]) return this._increaseReferenceCount(t), this._activeTextures[t].texture;
		let n = this.getTexture({
			text: e.text,
			style: e.style,
			resolution: e._resolution,
			textureStyle: e.textureStyle,
			autoGenerateMipmaps: e.autoGenerateMipmaps
		});
		return this._activeTextures[t] = {
			texture: n,
			usageCount: 1
		}, n;
	}
	decreaseReferenceCount(e) {
		let t = this._activeTextures[e];
		t && (t.usageCount--, t.usageCount === 0 && (this.returnTexture(t.texture), this._activeTextures[e] = null));
	}
	getReferenceCount(e) {
		return this._activeTextures[e]?.usageCount ?? 0;
	}
	_increaseReferenceCount(e) {
		this._activeTextures[e].usageCount++;
	}
	_applyFilters(e, t) {
		let n = this._renderer.renderTarget.renderTarget, r = this._renderer.filter.generateFilteredTexture({
			texture: e,
			filters: t
		});
		return this._renderer.renderTarget.bind(n, !1), r;
	}
	destroy() {
		this._renderer = null;
		for (let e in this._activeTextures) this._activeTextures[e] && this.returnTexture(this._activeTextures[e].texture);
		this._activeTextures = null;
	}
}, ar = class extends ir {
	constructor(e) {
		super(e, !0);
	}
};
ar.extension = {
	type: [D.CanvasSystem],
	name: "canvasText"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/text/shared/GpuTextSystem.mjs
var or = class extends ir {
	constructor(e) {
		super(e, !1);
	}
};
or.extension = {
	type: [D.WebGLSystem, D.WebGPUSystem],
	name: "canvasText"
}, e.add(ar), e.add(or), e.add(rr);
//#endregion
//#region node_modules/pixi.js/lib/scene/text/Text.mjs
var J = class extends Wn {
	constructor(...e) {
		let t = Gn(e, "Text");
		super(t, ke), this.renderPipeId = "text", t.textureStyle && (this.textureStyle = t.textureStyle instanceof c ? t.textureStyle : new c(t.textureStyle)), this.autoGenerateMipmaps = t.autoGenerateMipmaps ?? w.defaultOptions.autoGenerateMipmaps;
	}
	updateBounds() {
		let e = this._bounds, t = this._anchor, n = 0, r = 0;
		if (this._style.trim) {
			let { frame: e, canvasAndContext: t } = er.getCanvasAndContext({
				text: this.text,
				style: this._style,
				resolution: 1
			});
			er.returnCanvasAndContext(t), n = e.width, r = e.height;
		} else {
			let e = Ne.measureText(this._text, this._style);
			n = e.width, r = e.height;
		}
		e.minX = -t._x * n, e.maxX = e.minX + n, e.minY = -t._y * r, e.maxY = e.minY + r;
	}
}, sr = class extends K {
	destroy() {
		this.context.customShader && this.context.customShader.destroy(), super.destroy();
	}
}, cr = class {
	constructor(e) {
		this._renderer = e, this._managedBitmapTexts = new Ce({
			renderer: e,
			type: "renderable",
			priority: -2,
			name: "bitmapText"
		});
	}
	validateRenderable(e) {
		let t = this._getGpuBitmapText(e);
		return this._renderer.renderPipes.graphics.validateRenderable(t);
	}
	addRenderable(e, t) {
		let n = this._getGpuBitmapText(e);
		lr(e, n), e._didTextUpdate && (e._didTextUpdate = !1, this._updateContext(e, n)), this._renderer.renderPipes.graphics.addRenderable(n, t), n.context.customShader && this._updateDistanceField(e);
	}
	updateRenderable(e) {
		let t = this._getGpuBitmapText(e);
		lr(e, t), this._renderer.renderPipes.graphics.updateRenderable(t), t.context.customShader && this._updateDistanceField(e);
	}
	_updateContext(e, t) {
		let { context: n } = t, r = Ae.getFont(e.text, e._style);
		if (n.clear(), r.distanceField.type !== "none") {
			let e = this.getSdfShader();
			e && (n.customShader ||= e);
		}
		let i = Ne.graphemeSegmenter(e.text), a = e._style, o = r.baseLineOffset, s = Me(i, a, r, !0), c = a.padding, l = s.scale, u = s.width, d = s.height + s.offsetY;
		a._stroke && (u += a._stroke.width / l, d += a._stroke.width / l), n.translate(-e._anchor._x * u - c, -e._anchor._y * d - c).scale(l, l);
		let f = r.applyFillAsTint ? a._fill.color : 16777215, p = r.fontMetrics.fontSize, m = r.lineHeight;
		a.lineHeight && (p = a.fontSize / l, m = a.lineHeight / l);
		let h = (m - p) / 2;
		h - r.baseLineOffset < 0 && (h = 0);
		for (let e = 0; e < s.lines.length; e++) {
			let t = s.lines[e];
			for (let e = 0; e < t.charPositions.length; e++) {
				let i = t.chars[e], a = r.chars[i];
				if (a?.texture) {
					let r = a.texture;
					n.texture(r, f, Math.round(t.charPositions[e] + a.xOffset), Math.round(o + a.yOffset + h), r.orig.width, r.orig.height);
				}
			}
			o += m;
		}
	}
	_getGpuBitmapText(e) {
		return e._gpuData[this._renderer.uid] || this.initGpuText(e);
	}
	initGpuText(e) {
		let t = new sr();
		return e._gpuData[this._renderer.uid] = t, this._updateContext(e, t), this._managedBitmapTexts.add(e), t;
	}
	_updateDistanceField(e) {
		let t = this._getGpuBitmapText(e).context, n = e._style.fontFamily, r = G.get(`${n}-bitmap`), { a: i, b: a, c: o, d: s } = e.groupTransform, c = Math.sqrt(i * i + a * a), l = Math.sqrt(o * o + s * s), u = (Math.abs(c) + Math.abs(l)) / 2, d = r.baseRenderedFontSize / e._style.fontSize, f = u * r.distanceField.range * (1 / d);
		t.customShader.resources.localUniforms.uniforms.uDistance = f;
	}
	destroy() {
		this._managedBitmapTexts.destroy(), this._renderer = null, this._managedBitmapTexts = null;
	}
};
function lr(e, t) {
	t.groupTransform = e.groupTransform, t.groupColorAlpha = e.groupColorAlpha, t.groupColor = e.groupColor, t.groupBlendMode = e.groupBlendMode, t.globalDisplayStatus = e.globalDisplayStatus, t.groupTransform = e.groupTransform, t.localDisplayStatus = e.localDisplayStatus, t.groupAlpha = e.groupAlpha, t._roundPixels = e._roundPixels;
}
//#endregion
//#region node_modules/pixi.js/lib/scene/text-bitmap/CanvasBitmapTextPipe.mjs
var ur = class extends cr {
	getSdfShader() {
		return null;
	}
};
ur.extension = {
	type: [D.CanvasPipes],
	name: "bitmapText"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/text/sdfShader/shader-bits/localUniformMSDFBit.mjs
var dr = {
	name: "local-uniform-msdf-bit",
	vertex: {
		header: "\n            struct LocalUniforms {\n                uColor:vec4<f32>,\n                uTransformMatrix:mat3x3<f32>,\n                uDistance: f32,\n                uRound:f32,\n            }\n\n            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;\n        ",
		main: "\n            vColor *= localUniforms.uColor;\n            modelMatrix *= localUniforms.uTransformMatrix;\n        ",
		end: "\n            if(localUniforms.uRound == 1)\n            {\n                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);\n            }\n        "
	},
	fragment: {
		header: "\n            struct LocalUniforms {\n                uColor:vec4<f32>,\n                uTransformMatrix:mat3x3<f32>,\n                uDistance: f32\n            }\n\n            @group(2) @binding(0) var<uniform> localUniforms : LocalUniforms;\n         ",
		main: "\n            outColor = vec4<f32>(calculateMSDFAlpha(outColor, vColor, localUniforms.uDistance));\n        "
	}
}, fr = {
	name: "local-uniform-msdf-bit",
	vertex: {
		header: "\n            uniform mat3 uTransformMatrix;\n            uniform vec4 uColor;\n            uniform float uRound;\n        ",
		main: "\n            vColor *= uColor;\n            modelMatrix *= uTransformMatrix;\n        ",
		end: "\n            if(uRound == 1.)\n            {\n                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n            }\n        "
	},
	fragment: {
		header: "\n            uniform float uDistance;\n         ",
		main: "\n            outColor = vec4(calculateMSDFAlpha(outColor, vColor, uDistance));\n        "
	}
}, pr = {
	name: "msdf-bit",
	fragment: { header: "\n            fn calculateMSDFAlpha(msdfColor:vec4<f32>, shapeColor:vec4<f32>, distance:f32) -> f32 {\n\n                // MSDF\n                var median = msdfColor.r + msdfColor.g + msdfColor.b -\n                    min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -\n                    max(msdfColor.r, max(msdfColor.g, msdfColor.b));\n\n                // SDF\n                median = min(median, msdfColor.a);\n\n                var screenPxDistance = distance * (median - 0.5);\n                var alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\n                if (median < 0.01) {\n                    alpha = 0.0;\n                } else if (median > 0.99) {\n                    alpha = 1.0;\n                }\n\n                // Gamma correction for coverage-like alpha\n                var luma: f32 = dot(shapeColor.rgb, vec3<f32>(0.299, 0.587, 0.114));\n                var gamma: f32 = mix(1.0, 1.0 / 2.2, luma);\n                var coverage: f32 = pow(shapeColor.a * alpha, gamma);\n\n                return coverage;\n\n            }\n        " }
}, mr = {
	name: "msdf-bit",
	fragment: { header: "\n            float calculateMSDFAlpha(vec4 msdfColor, vec4 shapeColor, float distance) {\n\n                // MSDF\n                float median = msdfColor.r + msdfColor.g + msdfColor.b -\n                                min(msdfColor.r, min(msdfColor.g, msdfColor.b)) -\n                                max(msdfColor.r, max(msdfColor.g, msdfColor.b));\n\n                // SDF\n                median = min(median, msdfColor.a);\n\n                float screenPxDistance = distance * (median - 0.5);\n                float alpha = clamp(screenPxDistance + 0.5, 0.0, 1.0);\n\n                if (median < 0.01) {\n                    alpha = 0.0;\n                } else if (median > 0.99) {\n                    alpha = 1.0;\n                }\n\n                // Gamma correction for coverage-like alpha\n                float luma = dot(shapeColor.rgb, vec3(0.299, 0.587, 0.114));\n                float gamma = mix(1.0, 1.0 / 2.2, luma);\n                float coverage = pow(shapeColor.a * alpha, gamma);\n\n                return coverage;\n            }\n        " }
}, hr, gr, _r = class extends p {
	constructor(e) {
		let t = new b({
			uColor: {
				value: new Float32Array([
					1,
					1,
					1,
					1
				]),
				type: "vec4<f32>"
			},
			uTransformMatrix: {
				value: new o(),
				type: "mat3x3<f32>"
			},
			uDistance: {
				value: 4,
				type: "f32"
			},
			uRound: {
				value: 0,
				type: "f32"
			}
		});
		hr ??= he({
			name: "sdf-shader",
			bits: [
				me,
				ye(e),
				dr,
				pr,
				_e
			]
		}), gr ??= we({
			name: "sdf-shader",
			bits: [
				ve,
				Se(e),
				fr,
				mr,
				pe
			]
		}), super({
			glProgram: gr,
			gpuProgram: hr,
			resources: {
				localUniforms: t,
				batchSamplers: xe(e)
			}
		});
	}
}, vr = class extends cr {
	getSdfShader() {
		return new _r(this._renderer.limits.maxBatchableTextures);
	}
};
vr.extension = {
	type: [D.WebGLPipes, D.WebGPUPipes],
	name: "bitmapText"
}, e.add(ur), e.add(vr);
//#endregion
//#region node_modules/pixi.js/lib/scene/text-bitmap/BitmapText.mjs
var yr = class extends Wn {
	constructor(...e) {
		var t;
		let n = Gn(e, "BitmapText");
		n.style ??= n.style || {}, (t = n.style).fill ?? (t.fill = 16777215), super(n, ke), this.renderPipeId = "bitmapText";
	}
	_onTouch(e) {
		this._gcLastUsed = e;
		for (let t in this._gpuData) this._gpuData[t]?._onTouch(e);
	}
	updateBounds() {
		let e = this._bounds, t = this._anchor, n = Ae.measureText(this.text, this._style), r = n.scale, i = n.offsetY * r, a = n.width * r, o = n.height * r, s = this._style._stroke;
		s && (a += s.width, o += s.width), e.minX = -t._x * a, e.maxX = e.minX + a, e.minY = -t._y * (o + i), e.maxY = e.minY + o;
	}
	set resolution(e) {
		e !== null && C("[BitmapText] dynamically updating the resolution is not supported. Resolution should be managed by the BitmapFont.");
	}
	get resolution() {
		return this._resolution;
	}
}, br = class e extends yn {
	constructor(t) {
		let { width: n, points: r, textureScale: i } = {
			...e.defaultOptions,
			...t
		};
		super({
			positions: new Float32Array(r.length * 4),
			uvs: new Float32Array(r.length * 4),
			indices: new Uint32Array((r.length - 1) * 6)
		}), this.points = r, this._width = n, this.textureScale = i, this._build();
	}
	get width() {
		return this._width;
	}
	_build() {
		let e = this.points;
		if (!e) return;
		let t = this.getBuffer("aPosition"), n = this.getBuffer("aUV"), r = this.getIndex();
		if (e.length < 1) return;
		t.data.length / 4 !== e.length && (t.data = new Float32Array(e.length * 4), n.data = new Float32Array(e.length * 4), r.data = new Uint16Array((e.length - 1) * 6));
		let i = n.data, a = r.data;
		i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1;
		let o = 0, s = e[0], c = this._width * this.textureScale, l = e.length;
		for (let t = 0; t < l; t++) {
			let n = t * 4;
			if (this.textureScale > 0) {
				let n = s.x - e[t].x, r = s.y - e[t].y, i = Math.sqrt(n * n + r * r);
				s = e[t], o += i / c;
			} else o = t / (l - 1);
			i[n] = o, i[n + 1] = 0, i[n + 2] = o, i[n + 3] = 1;
		}
		let u = 0;
		for (let e = 0; e < l - 1; e++) {
			let t = e * 2;
			a[u++] = t, a[u++] = t + 1, a[u++] = t + 2, a[u++] = t + 2, a[u++] = t + 1, a[u++] = t + 3;
		}
		n.update(), r.update(), this.updateVertices();
	}
	updateVertices() {
		let e = this.points;
		if (e.length < 1) return;
		let t = e[0], n, r = 0, i = 0, a = this.buffers[0].data, o = e.length, s = this.textureScale > 0 ? this.textureScale * this._width / 2 : this._width / 2;
		for (let c = 0; c < o; c++) {
			let l = e[c], u = c * 4;
			n = c < e.length - 1 ? e[c + 1] : l, i = -(n.x - t.x), r = n.y - t.y;
			let d = (1 - c / (o - 1)) * 10;
			d > 1 && (d = 1);
			let f = Math.sqrt(r * r + i * i);
			f < 1e-6 ? (r = 0, i = 0) : (r /= f, i /= f, r *= s, i *= s), a[u] = l.x + r, a[u + 1] = l.y + i, a[u + 2] = l.x - r, a[u + 3] = l.y - i, t = l;
		}
		this.buffers[0].update();
	}
	update() {
		this.textureScale > 0 ? this._build() : this.updateVertices();
	}
};
br.defaultOptions = {
	width: 200,
	points: [],
	textureScale: 0
};
var xr = br, Sr = class e extends Cn {
	constructor(t) {
		let { width: r, texture: i, points: a, textureScale: o, ...s } = {
			...e.defaultOptions,
			...t
		}, c = new xr(n({
			width: r ?? i.height,
			points: a,
			textureScale: o
		}));
		o > 0 && (i.source.style.addressMode = "repeat"), super(n({
			...s,
			texture: i,
			geometry: c
		})), this.autoUpdate = !0, this.onRender = this._render;
	}
	_render() {
		let e = this.geometry;
		(this.autoUpdate || e._width !== this.texture.height) && (e._width = this.texture.height, e.update());
	}
};
Sr.defaultOptions = { textureScale: 0 };
var Cr = Sr, wr = class {
	execute(e, t) {
		let n = e.renderer, r = n.canvasContext.activeContext, i = t.particleChildren, a = t.texture;
		r.save(), n.canvasContext.setContextTransform(t.worldTransform, t.roundPixels), n.canvasContext.setBlendMode(t.groupBlendMode);
		let o = t.groupColorAlpha, s = n.filter?.alphaMultiplier ?? 1, c = (o >>> 24 & 255) / 255 * s;
		for (let e = 0; e < i.length; e++) {
			let t = i[e], n = t.texture || a;
			if (!n?.source?.resource) continue;
			let o = t.color, s = (o >>> 24 & 255) / 255 * c;
			if (s <= 0) continue;
			let l = o & 16777215, u = ((l & 255) << 16) + (l & 65280) + (l >> 16 & 255), d = n.source.resource;
			u !== 16777215 && (d = ae.getTintedCanvas({ texture: n }, u));
			let f = n.frame, p = n.source.resolution, m = f.x * p, h = f.y * p, g = f.width * p, _ = f.height * p;
			r.globalAlpha = s;
			let v = -t.anchorX * f.width, y = -t.anchorY * f.height;
			t.rotation !== 0 || t.scaleX !== 1 || t.scaleY !== 1 ? (r.save(), r.translate(t.x, t.y), r.rotate(t.rotation), r.scale(t.scaleX, t.scaleY), r.drawImage(d, m, h, g, _, v, y, f.width, f.height), r.restore()) : r.drawImage(d, m, h, g, _, t.x + v, t.y + y, f.width, f.height);
		}
		r.restore();
	}
};
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/shared/utils/createIndicesForQuads.mjs
function Tr(e, t = null) {
	let n = e * 6;
	if (t ||= n > 65535 ? new Uint32Array(n) : new Uint16Array(n), t.length !== n) throw Error(`Out buffer length is incorrect, got ${t.length} and expected ${n}`);
	for (let e = 0, r = 0; e < n; e += 6, r += 4) t[e + 0] = r + 0, t[e + 1] = r + 1, t[e + 2] = r + 2, t[e + 3] = r + 0, t[e + 4] = r + 2, t[e + 5] = r + 3;
	return t;
}
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/shared/utils/generateParticleUpdateFunction.mjs
function Er(e) {
	return {
		dynamicUpdate: Dr(e, !0),
		staticUpdate: Dr(e, !1)
	};
}
function Dr(e, t) {
	let n = [];
	n.push("\n\n        var index = 0;\n\n        for (let i = 0; i < ps.length; ++i)\n        {\n            const p = ps[i];\n\n            ");
	let r = 0;
	for (let i in e) {
		let a = e[i];
		if (t !== a.dynamic) continue;
		n.push(`offset = index + ${r}`), n.push(a.code);
		let o = h(a.format);
		r += o.stride / 4;
	}
	n.push("\n            index += stride * 4;\n        }\n    "), n.unshift(`
        var stride = ${r};
    `);
	let i = n.join("\n");
	return Function("ps", "f32v", "u32v", i);
}
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/shared/ParticleBuffer.mjs
var Or = class {
	constructor(e) {
		this._size = 0, this._generateParticleUpdateCache = {};
		let t = this._size = e.size ?? 1e3, n = e.properties, r = 0, i = 0;
		for (let e in n) {
			let t = n[e], a = h(t.format);
			t.dynamic ? i += a.stride : r += a.stride;
		}
		this._dynamicStride = i / 4, this._staticStride = r / 4, this.staticAttributeBuffer = new ge(t * 4 * r), this.dynamicAttributeBuffer = new ge(t * 4 * i), this.indexBuffer = Tr(t);
		let a = new x(), o = 0, s = 0;
		this._staticBuffer = new g({
			data: /* @__PURE__ */ new Float32Array(1),
			label: "static-particle-buffer",
			shrinkToFit: !1,
			usage: y.VERTEX | y.COPY_DST
		}), this._dynamicBuffer = new g({
			data: /* @__PURE__ */ new Float32Array(1),
			label: "dynamic-particle-buffer",
			shrinkToFit: !1,
			usage: y.VERTEX | y.COPY_DST
		});
		for (let e in n) {
			let t = n[e], r = h(t.format);
			t.dynamic ? (a.addAttribute(t.attributeName, {
				buffer: this._dynamicBuffer,
				stride: this._dynamicStride * 4,
				offset: o * 4,
				format: t.format
			}), o += r.size) : (a.addAttribute(t.attributeName, {
				buffer: this._staticBuffer,
				stride: this._staticStride * 4,
				offset: s * 4,
				format: t.format
			}), s += r.size);
		}
		a.addIndex(this.indexBuffer);
		let c = this.getParticleUpdate(n);
		this._dynamicUpload = c.dynamicUpdate, this._staticUpload = c.staticUpdate, this.geometry = a;
	}
	getParticleUpdate(e) {
		let t = kr(e);
		return this._generateParticleUpdateCache[t] || (this._generateParticleUpdateCache[t] = this.generateParticleUpdate(e)), this._generateParticleUpdateCache[t];
	}
	generateParticleUpdate(e) {
		return Er(e);
	}
	update(e, t) {
		e.length > this._size && (t = !0, this._size = Math.max(e.length, this._size * 1.5 | 0), this.staticAttributeBuffer = new ge(this._size * this._staticStride * 4 * 4), this.dynamicAttributeBuffer = new ge(this._size * this._dynamicStride * 4 * 4), this.indexBuffer = Tr(this._size), this.geometry.indexBuffer.setDataWithSize(this.indexBuffer, this.indexBuffer.byteLength, !0));
		let n = this.dynamicAttributeBuffer;
		if (this._dynamicUpload(e, n.float32View, n.uint32View), this._dynamicBuffer.setDataWithSize(this.dynamicAttributeBuffer.float32View, e.length * this._dynamicStride * 4, !0), t) {
			let t = this.staticAttributeBuffer;
			this._staticUpload(e, t.float32View, t.uint32View), this._staticBuffer.setDataWithSize(t.float32View, e.length * this._staticStride * 4, !0);
		}
	}
	destroy() {
		this._staticBuffer.destroy(), this._dynamicBuffer.destroy(), this.geometry.destroy();
	}
};
function kr(e) {
	let t = [];
	for (let n in e) {
		let r = e[n];
		t.push(n, r.code, r.dynamic ? "d" : "s");
	}
	return t.join("_");
}
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/shared/shader/particles.frag.mjs
var Ar = "varying vec2 vUV;\nvarying vec4 vColor;\n\nuniform sampler2D uTexture;\n\nvoid main(void){\n    vec4 color = texture2D(uTexture, vUV) * vColor;\n    gl_FragColor = color;\n}", jr = "attribute vec2 aVertex;\nattribute vec2 aUV;\nattribute vec4 aColor;\n\nattribute vec2 aPosition;\nattribute float aRotation;\n\nuniform mat3 uTranslationMatrix;\nuniform float uRound;\nuniform vec2 uResolution;\nuniform vec4 uColor;\n\nvarying vec2 vUV;\nvarying vec4 vColor;\n\nvec2 roundPixels(vec2 position, vec2 targetSize)\n{       \n    return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n}\n\nvoid main(void){\n    float cosRotation = cos(aRotation);\n    float sinRotation = sin(aRotation);\n    float x = aVertex.x * cosRotation - aVertex.y * sinRotation;\n    float y = aVertex.x * sinRotation + aVertex.y * cosRotation;\n\n    vec2 v = vec2(x, y);\n    v = v + aPosition;\n\n    gl_Position = vec4((uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    if(uRound == 1.0)\n    {\n        gl_Position.xy = roundPixels(gl_Position.xy, uResolution);\n    }\n\n    vUV = aUV;\n    vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uColor;\n}\n", Mr = "\nstruct ParticleUniforms {\n  uTranslationMatrix:mat3x3<f32>,\n  uColor:vec4<f32>,\n  uRound:f32,\n  uResolution:vec2<f32>,\n};\n\nfn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>\n{\n  return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;\n}\n\n@group(0) @binding(0) var<uniform> uniforms: ParticleUniforms;\n\n@group(1) @binding(0) var uTexture: texture_2d<f32>;\n@group(1) @binding(1) var uSampler : sampler;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>,\n    @location(1) color : vec4<f32>,\n  };\n@vertex\nfn mainVertex(\n  @location(0) aVertex: vec2<f32>,\n  @location(1) aPosition: vec2<f32>,\n  @location(2) aUV: vec2<f32>,\n  @location(3) aColor: vec4<f32>,\n  @location(4) aRotation: f32,\n) -> VSOutput {\n  \n   let v = vec2(\n       aVertex.x * cos(aRotation) - aVertex.y * sin(aRotation),\n       aVertex.x * sin(aRotation) + aVertex.y * cos(aRotation)\n   ) + aPosition;\n\n   var position = vec4((uniforms.uTranslationMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n   if(uniforms.uRound == 1.0) {\n       position = vec4(roundPixels(position.xy, uniforms.uResolution), position.zw);\n   }\n\n    let vColor = vec4(aColor.rgb * aColor.a, aColor.a) * uniforms.uColor;\n\n  return VSOutput(\n   position,\n   aUV,\n   vColor,\n  );\n}\n\n@fragment\nfn mainFragment(\n  @location(0) uv: vec2<f32>,\n  @location(1) color: vec4<f32>,\n  @builtin(position) position: vec4<f32>,\n) -> @location(0) vec4<f32> {\n\n    var sample = textureSample(uTexture, uSampler, uv) * color;\n   \n    return sample;\n}", Nr = class extends p {
	constructor() {
		let e = S.from({
			vertex: jr,
			fragment: Ar
		}), t = d.from({
			fragment: {
				source: Mr,
				entryPoint: "mainFragment"
			},
			vertex: {
				source: Mr,
				entryPoint: "mainVertex"
			}
		});
		super({
			glProgram: e,
			gpuProgram: t,
			resources: {
				uTexture: T.WHITE.source,
				uSampler: new c({}),
				uniforms: {
					uTranslationMatrix: {
						value: new o(),
						type: "mat3x3<f32>"
					},
					uColor: {
						value: new E(16777215),
						type: "vec4<f32>"
					},
					uRound: {
						value: 1,
						type: "f32"
					},
					uResolution: {
						value: [0, 0],
						type: "vec2<f32>"
					}
				}
			}
		});
	}
}, Pr = class {
	constructor(e, t) {
		this.state = N.for2d(), this.localUniforms = new b({
			uTranslationMatrix: {
				value: new o(),
				type: "mat3x3<f32>"
			},
			uColor: {
				value: /* @__PURE__ */ new Float32Array(4),
				type: "vec4<f32>"
			},
			uRound: {
				value: 1,
				type: "f32"
			},
			uResolution: {
				value: [0, 0],
				type: "vec2<f32>"
			}
		}), this.renderer = e, this.adaptor = t, this.defaultShader = new Nr(), this.state = N.for2d(), this._managedContainers = new Ce({
			renderer: e,
			type: "renderable",
			name: "particleContainer"
		});
	}
	validateRenderable(e) {
		return !1;
	}
	addRenderable(e, t) {
		this.renderer.renderPipes.batch.break(t), t.add(e);
	}
	getBuffers(e) {
		return e._gpuData[this.renderer.uid] || this._initBuffer(e);
	}
	_initBuffer(e) {
		return e._gpuData[this.renderer.uid] = new Or({
			size: e.particleChildren.length,
			properties: e._properties
		}), this._managedContainers.add(e), e._gpuData[this.renderer.uid];
	}
	updateRenderable(e) {}
	execute(e) {
		let t = e.particleChildren;
		if (t.length === 0) return;
		let n = this.renderer, r = this.getBuffers(e);
		e.texture ||= t[0].texture;
		let i = this.state;
		r.update(t, e._childrenDirty), e._childrenDirty = !1, i.blendMode = be(e.groupBlendMode, e.texture._source);
		let a = this.localUniforms.uniforms, o = a.uTranslationMatrix;
		e.worldTransform.copyTo(o);
		let s = n.globalUniforms.globalUniformData;
		o.tx -= s.offset.x, o.ty -= s.offset.y, o.prepend(s.projectionMatrix), a.uResolution = s.resolution, a.uRound = n._roundPixels | e._roundPixels, se(e.groupColorAlpha, a.uColor, 0), this.adaptor.execute(this, e);
	}
	destroy() {
		this._managedContainers.destroy(), this.renderer = null, this.defaultShader &&= (this.defaultShader.destroy(), null);
	}
};
Pr.extension = {
	type: [D.CanvasPipes],
	name: "particle"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/canvas/CanvasParticleContainerPipe.mjs
var Fr = class extends Pr {
	constructor(e) {
		super(e, new wr());
	}
};
Fr.extension = {
	type: [D.CanvasPipes],
	name: "particle"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/gl/GlParticleContainerAdaptor.mjs
var Ir = class {
	execute(e, t) {
		let n = e.state, r = e.renderer, i = t.shader || e.defaultShader;
		i.resources.uTexture = t.texture._source, i.resources.uniforms = e.localUniforms;
		let a = r.gl, o = e.getBuffers(t);
		r.shader.bind(i), r.state.set(n), r.geometry.bind(o.geometry, i.glProgram);
		let s = o.geometry.indexBuffer.data.BYTES_PER_ELEMENT === 2 ? a.UNSIGNED_SHORT : a.UNSIGNED_INT;
		a.drawElements(a.TRIANGLES, t.particleChildren.length * 6, s, 0);
	}
}, Lr = class extends Pr {
	constructor(e) {
		super(e, new Ir());
	}
};
Lr.extension = {
	type: [D.WebGLPipes],
	name: "particle"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/gpu/GpuParticleContainerAdaptor.mjs
var Rr = class {
	execute(e, t) {
		let n = e.renderer, r = t.shader || e.defaultShader;
		r.groups[0] = n.renderPipes.uniformBatch.getUniformBindGroup(e.localUniforms, !0), r.groups[1] = n.texture.getTextureBindGroup(t.texture);
		let i = e.state, a = e.getBuffers(t);
		n.encoder.draw({
			geometry: a.geometry,
			shader: t.shader || e.defaultShader,
			state: i,
			size: t.particleChildren.length * 6
		});
	}
}, zr = class extends Pr {
	constructor(e) {
		super(e, new Rr());
	}
};
zr.extension = {
	type: [D.WebGPUPipes],
	name: "particle"
};
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/shared/Particle.mjs
var Br = class e {
	constructor(t) {
		if (t instanceof T) this.texture = t, M(this, e.defaultOptions, {});
		else {
			let n = {
				...e.defaultOptions,
				...t
			};
			M(this, n, {});
		}
	}
	get alpha() {
		return this._alpha;
	}
	set alpha(e) {
		this._alpha = Math.min(Math.max(e, 0), 1), this._updateColor();
	}
	get tint() {
		return ee(this._tint);
	}
	set tint(e) {
		this._tint = E.shared.setValue(e ?? 16777215).toBgrNumber(), this._updateColor();
	}
	_updateColor() {
		this.color = this._tint + ((this._alpha * 255 | 0) << 24);
	}
};
Br.defaultOptions = {
	anchorX: 0,
	anchorY: 0,
	x: 0,
	y: 0,
	scaleX: 1,
	scaleY: 1,
	rotation: 0,
	tint: 16777215,
	alpha: 1
};
var Vr = Br, Hr = {
	vertex: {
		attributeName: "aVertex",
		format: "float32x2",
		code: "\n            const texture = p.texture;\n            const sx = p.scaleX;\n            const sy = p.scaleY;\n            const ax = p.anchorX;\n            const ay = p.anchorY;\n            const trim = texture.trim;\n            const orig = texture.orig;\n\n            if (trim)\n            {\n                w1 = trim.x - (ax * orig.width);\n                w0 = w1 + trim.width;\n\n                h1 = trim.y - (ay * orig.height);\n                h0 = h1 + trim.height;\n            }\n            else\n            {\n                w1 = -ax * (orig.width);\n                w0 = w1 + orig.width;\n\n                h1 = -ay * (orig.height);\n                h0 = h1 + orig.height;\n            }\n\n            f32v[offset] = w1 * sx;\n            f32v[offset + 1] = h1 * sy;\n\n            f32v[offset + stride] = w0 * sx;\n            f32v[offset + stride + 1] = h1 * sy;\n\n            f32v[offset + (stride * 2)] = w0 * sx;\n            f32v[offset + (stride * 2) + 1] = h0 * sy;\n\n            f32v[offset + (stride * 3)] = w1 * sx;\n            f32v[offset + (stride * 3) + 1] = h0 * sy;\n        ",
		dynamic: !1
	},
	position: {
		attributeName: "aPosition",
		format: "float32x2",
		code: "\n            var x = p.x;\n            var y = p.y;\n\n            f32v[offset] = x;\n            f32v[offset + 1] = y;\n\n            f32v[offset + stride] = x;\n            f32v[offset + stride + 1] = y;\n\n            f32v[offset + (stride * 2)] = x;\n            f32v[offset + (stride * 2) + 1] = y;\n\n            f32v[offset + (stride * 3)] = x;\n            f32v[offset + (stride * 3) + 1] = y;\n        ",
		dynamic: !0
	},
	rotation: {
		attributeName: "aRotation",
		format: "float32",
		code: "\n            var rotation = p.rotation;\n\n            f32v[offset] = rotation;\n            f32v[offset + stride] = rotation;\n            f32v[offset + (stride * 2)] = rotation;\n            f32v[offset + (stride * 3)] = rotation;\n        ",
		dynamic: !1
	},
	uvs: {
		attributeName: "aUV",
		format: "float32x2",
		code: "\n            var uvs = p.texture.uvs;\n\n            f32v[offset] = uvs.x0;\n            f32v[offset + 1] = uvs.y0;\n\n            f32v[offset + stride] = uvs.x1;\n            f32v[offset + stride + 1] = uvs.y1;\n\n            f32v[offset + (stride * 2)] = uvs.x2;\n            f32v[offset + (stride * 2) + 1] = uvs.y2;\n\n            f32v[offset + (stride * 3)] = uvs.x3;\n            f32v[offset + (stride * 3) + 1] = uvs.y3;\n        ",
		dynamic: !1
	},
	color: {
		attributeName: "aColor",
		format: "unorm8x4",
		code: "\n            const c = p.color;\n\n            u32v[offset] = c;\n            u32v[offset + stride] = c;\n            u32v[offset + (stride * 2)] = c;\n            u32v[offset + (stride * 3)] = c;\n        ",
		dynamic: !1
	}
};
e.add(Lr), e.add(zr), e.add(Fr);
//#endregion
//#region node_modules/pixi.js/lib/scene/particle-container/shared/ParticleContainer.mjs
var Ur = new u(0, 0, 0, 0), Wr = class e extends I {
	constructor(t = {}) {
		t = {
			...e.defaultOptions,
			...t,
			dynamicProperties: {
				...e.defaultOptions.dynamicProperties,
				...t?.dynamicProperties
			}
		};
		let { dynamicProperties: n, shader: r, roundPixels: i, texture: a, particles: o, ...s } = t;
		super({
			label: "ParticleContainer",
			...s
		}), this.renderPipeId = "particle", this.batched = !1, this._childrenDirty = !1, this.texture = a || null, this.shader = r, this._properties = {};
		for (let e in Hr) {
			let t = Hr[e], r = n[e];
			this._properties[e] = {
				...t,
				dynamic: r
			};
		}
		this.allowChildren = !0, this.roundPixels = i ?? !1, this.particleChildren = o ?? [];
	}
	addParticle(...e) {
		for (let t = 0; t < e.length; t++) this.particleChildren.push(e[t]);
		return this.onViewUpdate(), e[0];
	}
	removeParticle(...e) {
		let t = !1;
		for (let n = 0; n < e.length; n++) {
			let r = this.particleChildren.indexOf(e[n]);
			r > -1 && (this.particleChildren.splice(r, 1), t = !0);
		}
		return t && this.onViewUpdate(), e[0];
	}
	update() {
		this._childrenDirty = !0;
	}
	onViewUpdate() {
		this._childrenDirty = !0, super.onViewUpdate();
	}
	get bounds() {
		return Ur;
	}
	updateBounds() {}
	destroy(e = !1) {
		if (super.destroy(e), typeof e == "boolean" ? e : e?.texture) {
			let t = typeof e == "boolean" ? e : e?.textureSource, n = this.texture ?? this.particleChildren[0]?.texture;
			n && n.destroy(t);
		}
		this.texture = null, this.shader?.destroy();
	}
	removeParticles(e, t) {
		e ??= 0, t ??= this.particleChildren.length;
		let n = this.particleChildren.splice(e, t - e);
		return this.onViewUpdate(), n;
	}
	removeParticleAt(e) {
		let t = this.particleChildren.splice(e, 1);
		return this.onViewUpdate(), t[0];
	}
	addParticleAt(e, t) {
		return this.particleChildren.splice(t, 0, e), this.onViewUpdate(), e;
	}
	addChild(...e) {
		throw Error("ParticleContainer.addChild() is not available. Please use ParticleContainer.addParticle()");
	}
	removeChild(...e) {
		throw Error("ParticleContainer.removeChild() is not available. Please use ParticleContainer.removeParticle()");
	}
	removeChildren(e, t) {
		throw Error("ParticleContainer.removeChildren() is not available. Please use ParticleContainer.removeParticles()");
	}
	removeChildAt(e) {
		throw Error("ParticleContainer.removeChildAt() is not available. Please use ParticleContainer.removeParticleAt()");
	}
	getChildAt(e) {
		throw Error("ParticleContainer.getChildAt() is not available. Please use ParticleContainer.getParticleAt()");
	}
	setChildIndex(e, t) {
		throw Error("ParticleContainer.setChildIndex() is not available. Please use ParticleContainer.setParticleIndex()");
	}
	getChildIndex(e) {
		throw Error("ParticleContainer.getChildIndex() is not available. Please use ParticleContainer.getParticleIndex()");
	}
	addChildAt(e, t) {
		throw Error("ParticleContainer.addChildAt() is not available. Please use ParticleContainer.addParticleAt()");
	}
	swapChildren(e, t) {
		throw Error("ParticleContainer.swapChildren() is not available. Please use ParticleContainer.swapParticles()");
	}
	reparentChild(...e) {
		throw Error("ParticleContainer.reparentChild() is not available with the particle container");
	}
	reparentChildAt(e, t) {
		throw Error("ParticleContainer.reparentChildAt() is not available with the particle container");
	}
};
Wr.defaultOptions = {
	dynamicProperties: {
		vertex: !1,
		position: !0,
		rotation: !1,
		uvs: !1,
		color: !1
	},
	roundPixels: !1
};
var Gr = Wr;
//#endregion
//#region node_modules/pixi.js/lib/index.mjs
e.add(Pe, Fe);
//#endregion
//#region Frontend/scenes/animatedSprite.ts
var Kr = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = await q.load("https://pixijs.com/assets/spritesheet/fighter.json"), n = [];
	for (let e = 1; e <= 30; e++) {
		let r = `rollSequence${String(e).padStart(4, "0")}.png`, i = t.textures[r];
		i && n.push(i);
	}
	let r = new wn({
		textures: n,
		animationSpeed: .5,
		autoPlay: !0
	});
	r.x = e.screen.width / 2, r.y = e.screen.height / 2, r.anchor.set(.5), e.stage.addChild(r);
}, qr = "in vec2 aPosition;\nout vec2 vTextureCoord;\n\nuniform vec4 uInputSize;\nuniform vec4 uOutputFrame;\nuniform vec4 uOutputTexture;\n\nvec4 filterVertexPosition( void )\n{\n    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;\n    \n    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nvec2 filterTextureCoord( void )\n{\n    return aPosition * (uOutputFrame.zw * uInputSize.zw);\n}\n\nvoid main(void)\n{\n    gl_Position = filterVertexPosition();\n    vTextureCoord = filterTextureCoord();\n}\n", Jr = "struct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n\nstruct VSOutput {\n    @builtin(position) position: vec4<f32>,\n    @location(0) uv : vec2<f32>\n  };\n\nfn filterVertexPosition(aPosition:vec2<f32>) -> vec4<f32>\n{\n    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;\n\n    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;\n    position.y = position.y * (2.0*gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;\n\n    return vec4(position, 0.0, 1.0);\n}\n\nfn filterTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);\n}\n\nfn globalTextureCoord( aPosition:vec2<f32> ) -> vec2<f32>\n{\n  return  (aPosition.xy / gfu.uGlobalFrame.zw) + (gfu.uGlobalFrame.xy / gfu.uGlobalFrame.zw);  \n}\n\nfn getSize() -> vec2<f32>\n{\n  return gfu.uGlobalFrame.zw;\n}\n  \n@vertex\nfn mainVertex(\n  @location(0) aPosition : vec2<f32>, \n) -> VSOutput {\n  return VSOutput(\n   filterVertexPosition(aPosition),\n   filterTextureCoord(aPosition)\n  );\n}", Yr = "precision highp float;\nin vec2 vTextureCoord;\nout vec4 finalColor;\n\nuniform sampler2D uTexture;\nuniform vec2 uStrength;\nuniform vec3 uColor;\nuniform float uKnockout;\nuniform float uAlpha;\n\nuniform vec4 uInputSize;\nuniform vec4 uInputClamp;\n\nconst float PI = 3.14159265358979323846264;\n\n// Hard-assignment of DIST and ANGLE_STEP_SIZE instead of using uDistance and uQuality to allow them to be use on GLSL loop conditions\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.);\nconst float ANGLE_STEP_NUM = ceil(PI * 2. / ANGLE_STEP_SIZE);\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.) / 2.;\n\nvoid main(void) {\n    vec2 px = vec2(1.) / uInputSize.xy;\n\n    float totalAlpha = 0.;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.; angle < PI * 2.; angle += ANGLE_STEP_SIZE) {\n      direction = vec2(cos(angle), sin(angle)) * px;\n\n      for (float curDistance = 0.; curDistance < DIST; curDistance++) {\n          displaced = clamp(vTextureCoord + direction * (curDistance + 1.), uInputClamp.xy, uInputClamp.zw);\n          curColor = texture(uTexture, displaced);\n          totalAlpha += (DIST - curDistance) * curColor.a;\n      }\n    }\n    \n    curColor = texture(uTexture, vTextureCoord);\n\n    vec4 glowColor = vec4(uColor, uAlpha);\n    bool knockout = uKnockout > .5;\n    float innerStrength = uStrength[0];\n    float outerStrength = uStrength[1];\n\n    float alphaRatio = totalAlpha / MAX_TOTAL_ALPHA;\n    float innerGlowAlpha = (1. - alphaRatio) * innerStrength * curColor.a * uAlpha;\n    float innerGlowStrength = min(1., innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a) * uAlpha;\n    float outerGlowStrength = min(1. - innerColor.a, outerGlowAlpha);\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n\n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      finalColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      finalColor = innerColor + outerGlowColor;\n    }\n}\n", Xr = "struct GlowUniforms {\n  uDistance: f32,\n  uStrength: vec2<f32>,\n  uColor: vec3<f32>,\n  uAlpha: f32,\n  uQuality: f32,\n  uKnockout: f32,\n};\n\nstruct GlobalFilterUniforms {\n  uInputSize:vec4<f32>,\n  uInputPixel:vec4<f32>,\n  uInputClamp:vec4<f32>,\n  uOutputFrame:vec4<f32>,\n  uGlobalFrame:vec4<f32>,\n  uOutputTexture:vec4<f32>,\n};\n\n@group(0) @binding(0) var<uniform> gfu: GlobalFilterUniforms;\n\n@group(0) @binding(1) var uTexture: texture_2d<f32>; \n@group(0) @binding(2) var uSampler: sampler;\n@group(1) @binding(0) var<uniform> glowUniforms : GlowUniforms;\n\n@fragment\nfn mainFragment(\n  @builtin(position) position: vec4<f32>,\n  @location(0) uv : vec2<f32>\n) -> @location(0) vec4<f32> {\n  let quality = glowUniforms.uQuality;\n  let distance = glowUniforms.uDistance;\n\n  let dist: f32 = glowUniforms.uDistance;\n  let angleStepSize: f32 = min(1. / quality / distance, PI * 2.0);\n  let angleStepNum: f32 = ceil(PI * 2.0 / angleStepSize);\n\n  let px: vec2<f32> = vec2<f32>(1.0 / gfu.uInputSize.xy);\n\n  var totalAlpha: f32 = 0.0;\n\n  var direction: vec2<f32>;\n  var displaced: vec2<f32>;\n  var curColor: vec4<f32>;\n\n  for (var angle = 0.0; angle < PI * 2.0; angle += angleStepSize) {\n    direction = vec2<f32>(cos(angle), sin(angle)) * px;\n    for (var curDistance = 0.0; curDistance < dist; curDistance+=1) {\n      displaced = vec2<f32>(clamp(uv + direction * (curDistance + 1.0), gfu.uInputClamp.xy, gfu.uInputClamp.zw));\n      curColor = textureSample(uTexture, uSampler, displaced);\n      totalAlpha += (dist - curDistance) * curColor.a;\n    }\n  }\n    \n  curColor = textureSample(uTexture, uSampler, uv);\n\n  let glowColorRGB = glowUniforms.uColor;\n  let glowAlpha = glowUniforms.uAlpha;\n  let glowColor = vec4<f32>(glowColorRGB, glowAlpha);\n  let knockout: bool = glowUniforms.uKnockout > 0.5;\n  let innerStrength = glowUniforms.uStrength[0];\n  let outerStrength = glowUniforms.uStrength[1];\n\n  let alphaRatio: f32 = (totalAlpha / (angleStepNum * dist * (dist + 1.0) / 2.0));\n  let innerGlowAlpha: f32 = (1.0 - alphaRatio) * innerStrength * curColor.a * glowAlpha;\n  let innerGlowStrength: f32 = min(1.0, innerGlowAlpha);\n  \n  let innerColor: vec4<f32> = mix(curColor, glowColor, innerGlowStrength);\n  let outerGlowAlpha: f32 = alphaRatio * outerStrength * (1. - curColor.a) * glowAlpha;\n  let outerGlowStrength: f32 = min(1.0 - innerColor.a, outerGlowAlpha);\n  let outerGlowColor: vec4<f32> = outerGlowStrength * glowColor.rgba;\n  \n  if (knockout) {\n    let resultAlpha: f32 = outerGlowAlpha + innerGlowAlpha;\n    return vec4<f32>(glowColor.rgb * resultAlpha, resultAlpha);\n  }\n  else {\n    return innerColor + outerGlowColor;\n  }\n}\n\nconst PI: f32 = 3.14159265358979323846264;", Zr = Object.defineProperty, Qr = (e, t, n) => t in e ? Zr(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, $r = (e, t, n) => (Qr(e, typeof t == "symbol" ? t : t + "", n), n), ei = class e extends L {
	constructor(t) {
		t = {
			...e.DEFAULT_OPTIONS,
			...t
		};
		let n = t.distance ?? 10, r = t.quality ?? .1, i = d.from({
			vertex: {
				source: Jr,
				entryPoint: "mainVertex"
			},
			fragment: {
				source: Xr,
				entryPoint: "mainFragment"
			}
		}), a = S.from({
			vertex: qr,
			fragment: Yr.replace(/__ANGLE_STEP_SIZE__/gi, `${(1 / r / n).toFixed(7)}`).replace(/__DIST__/gi, `${n.toFixed(0)}.0`),
			name: "glow-filter"
		});
		super({
			gpuProgram: i,
			glProgram: a,
			resources: { glowUniforms: {
				uDistance: {
					value: n,
					type: "f32"
				},
				uStrength: {
					value: [t.innerStrength, t.outerStrength],
					type: "vec2<f32>"
				},
				uColor: {
					value: /* @__PURE__ */ new Float32Array(3),
					type: "vec3<f32>"
				},
				uAlpha: {
					value: t.alpha,
					type: "f32"
				},
				uQuality: {
					value: r,
					type: "f32"
				},
				uKnockout: {
					value: t?.knockout ?? !1 ? 1 : 0,
					type: "f32"
				}
			} },
			padding: n
		}), $r(this, "uniforms"), $r(this, "_color"), this.uniforms = this.resources.glowUniforms.uniforms, this._color = new E(), this.color = t.color ?? 16777215;
	}
	get distance() {
		return this.uniforms.uDistance;
	}
	set distance(e) {
		this.uniforms.uDistance = this.padding = e;
	}
	get innerStrength() {
		return this.uniforms.uStrength[0];
	}
	set innerStrength(e) {
		this.uniforms.uStrength[0] = e;
	}
	get outerStrength() {
		return this.uniforms.uStrength[1];
	}
	set outerStrength(e) {
		this.uniforms.uStrength[1] = e;
	}
	get color() {
		return this._color.value;
	}
	set color(e) {
		this._color.setValue(e);
		let [t, n, r] = this._color.toArray();
		this.uniforms.uColor[0] = t, this.uniforms.uColor[1] = n, this.uniforms.uColor[2] = r;
	}
	get alpha() {
		return this.uniforms.uAlpha;
	}
	set alpha(e) {
		this.uniforms.uAlpha = e;
	}
	get quality() {
		return this.uniforms.uQuality;
	}
	set quality(e) {
		this.uniforms.uQuality = e;
	}
	get knockout() {
		return this.uniforms.uKnockout === 1;
	}
	set knockout(e) {
		this.uniforms.uKnockout = +!!e;
	}
};
$r(ei, "DEFAULT_OPTIONS", {
	distance: 10,
	outerStrength: 4,
	innerStrength: 0,
	color: 16777215,
	alpha: 1,
	quality: .1,
	knockout: !1
});
var ti = ei, ni = Object.defineProperty, ri = (e, t, n) => t in e ? ni(e, t, {
	enumerable: !0,
	configurable: !0,
	writable: !0,
	value: n
}) : e[t] = n, ii = (e, t) => {
	for (var n in t) ni(e, n, {
		get: t[n],
		enumerable: !0
	});
}, Y = (e, t, n) => ri(e, typeof t == "symbol" ? t : t + "", n);
ii({}, {
	DEG_TO_RADS: () => ci,
	GetTextureFromString: () => oi,
	combineRGBComponents: () => di,
	createSteppedGradient: () => vi,
	generateEase: () => gi,
	getBlendMode: () => _i,
	getTexturesFromConfig: () => Si,
	hexToRGB: () => hi,
	length: () => fi,
	normalize: () => pi,
	parseTextures: () => yi,
	parsingAnimatedTextures: () => bi,
	rotatePoint: () => ui,
	scaleBy: () => mi,
	verbose: () => si
});
var ai = class e {
	constructor(e, t, n) {
		Y(this, "value"), Y(this, "time"), Y(this, "next"), Y(this, "isStepped"), Y(this, "ease"), this.value = e, this.time = t, this.next = void 0, this.isStepped = !1, this.ease = n ? typeof n == "function" ? n : gi(n) : void 0;
	}
	static createList(t) {
		if ("list" in t) {
			let n = t.list, r, { value: i, time: a } = n[0], o = r = new e(typeof i == "string" ? hi(i) : i, a, t.ease);
			if (n.length > 2 || n.length === 2 && n[1].value !== i) for (let t = 1; t < n.length; ++t) {
				let { value: i, time: a } = n[t];
				r.next = new e(typeof i == "string" ? hi(i) : i, a), r = r.next;
			}
			return o.isStepped = !!t.isStepped, o;
		}
		let n = new e(typeof t.start == "string" ? hi(t.start) : t.start, 0);
		return t.end !== t.start && (n.next = new e(typeof t.end == "string" ? hi(t.end) : t.end, 1)), n;
	}
}, oi = T.from, si = !1, ci = Math.PI / 180, li = /* @__PURE__ */ new Set(/* @__PURE__ */ "inherit.normal.add.multiply.screen.darken.lighten.erase.color-dodge.color-burn.linear-burn.linear-dodge.linear-light.hard-light.soft-light.pin-light.difference.exclusion.overlay.saturation.color.luminosity.normal-npm.add-npm.screen-npm.none.subtract.divide.vivid-light.hard-mix.negation.min.max".split("."));
function ui(e, t) {
	if (!e) return;
	let n = Math.sin(e), r = Math.cos(e), i = t.x * r - t.y * n, a = t.x * n + t.y * r;
	t.x = i, t.y = a;
}
function di(e, t, n) {
	return e << 16 | t << 8 | n;
}
function fi(e) {
	return Math.sqrt(e.x * e.x + e.y * e.y);
}
function pi(e) {
	let t = 1 / fi(e);
	e.x *= t, e.y *= t;
}
function mi(e, t) {
	e.x *= t, e.y *= t;
}
function hi(e, t) {
	let n = E.shared.setValue(e);
	return {
		r: n.red * 255,
		g: n.green * 255,
		b: n.blue * 255,
		a: n.alpha === 1 ? void 0 : n.alpha * 255
	};
}
function gi(e) {
	let t = e.length, n = 1 / t;
	return (r) => {
		let i = t * r | 0, a = (r - i * n) * t, o = e[i] || e[t - 1];
		return o.s + a * (2 * (1 - a) * (o.cp - o.s) + a * (o.e - o.s));
	};
}
function _i(e) {
	return li.has(e) ? e : "normal";
}
function vi(e, t = 10) {
	(typeof t != "number" || t <= 0) && (t = 10);
	let n = new ai(hi(e[0].value), e[0].time);
	n.isStepped = !0;
	let r = n, i = e[0], a = 1, o = e[a];
	for (let n = 1; n < t; ++n) {
		let s = n / t;
		for (; s > o.time;) i = o, o = e[++a];
		s = (s - i.time) / (o.time - i.time);
		let c = hi(i.value), l = hi(o.value), u = {
			r: (l.r - c.r) * s + c.r,
			g: (l.g - c.g) * s + c.g,
			b: (l.b - c.b) * s + c.b
		};
		r.next = new ai(u, n / t), r = r.next;
	}
	return n;
}
function yi(e) {
	let t = (Array.isArray(e) ? e : [e]).map((e) => typeof e == "string" ? q.get(e) : e);
	if (!t.every((e) => e && e.source === t[0].source)) throw Error("All particle images must use the same source");
	return t;
}
function bi(e) {
	return typeof e == "object" && "texture" in e ? e.texture : e;
}
function xi(e) {
	return Array.from(new Set(e));
}
function Si(e) {
	return e.behaviors.reduce((e, t) => {
		let n = t;
		return n.type === "textureSingle" ? yi(n.config.texture) : n.type === "textureOrdered" ? xi(yi(n.config.textures)) : n.type === "textureRandom" ? yi(n.config.textures) : n.type === "animatedSingle" ? xi(yi(n.config.anim.textures.map(bi))) : n.type === "animatedRandom" ? xi(yi(n.config.anims.flatMap((e) => e.textures.map(bi)))) : [];
	}, []);
}
var Ci = /[achlmqstvz]|(-?\d*\.?\d*(?:e[-+]?\d+)?)[0-9]/gi, wi = /[+-]?\d*\.?\d+e[+-]?\d+/gi, Ti = Math.PI / 180;
180 / Math.PI;
var Ei = Math.sin, Di = Math.cos, Oi = Math.abs, ki = Math.sqrt;
function Ai(e, t, n, r, i, a, o, s, c) {
	if (e === s && t === c) return;
	n = Oi(n), r = Oi(r);
	let l = i % 360 * Ti, u = Di(l), d = Ei(l), f = Math.PI, p = f * 2, m = (e - s) / 2, h = (t - c) / 2, g = u * m + d * h, _ = -d * m + u * h, v = g * g, y = _ * _, b = v / (n * n) + y / (r * r);
	b > 1 && (n = ki(b) * n, r = ki(b) * r);
	let x = n * n, S = r * r, C = (x * S - x * y - S * v) / (x * y + S * v);
	C < 0 && (C = 0);
	let w = (a === o ? -1 : 1) * ki(C), T = w * (n * _ / r), E = w * -(r * g / n), D = (e + s) / 2, O = (t + c) / 2, k = D + (u * T - d * E), A = O + (d * T + u * E), j = (g - T) / n, M = (_ - E) / r, N = (-g - T) / n, P = (-_ - E) / r, ee = j * j + M * M, F = (M < 0 ? -1 : 1) * Math.acos(j / ki(ee)), I = (j * P - M * N < 0 ? -1 : 1) * Math.acos((j * N + M * P) / ki(ee * (N * N + P * P)));
	Number.isNaN(I) && (I = f), !o && I > 0 ? I -= p : o && I < 0 && (I += p), F %= p, I %= p;
	let L = Math.ceil(Oi(I) / (p / 4)), R = [], z = I / L, B = 4 / 3 * Ei(z / 2) / (1 + Di(z / 2)), te = u * n, ne = d * n, V = d * -r, H = u * r, U;
	for (U = 0; U < L; U++) i = F + U * z, g = Di(i), _ = Ei(i), j = Di(i += z), M = Ei(i), R.push(g - B * _, _ + B * g, j + B * M, M - B * j, j, M);
	for (U = 0; U < R.length; U += 2) g = R[U], _ = R[U + 1], R[U] = g * te + _ * V + k, R[U + 1] = g * ne + _ * H + A;
	return R[U - 2] = s, R[U - 1] = c, R;
}
function ji(e) {
	let t = `${e}`.replace(wi, (e) => {
		let t = +e;
		return t < 1e-4 && t > -1e-4 ? 0 : t;
	}).match(Ci) || [], n = [], r = 0, i = 0, a = 2 / 3, o = t.length, s = 0, c = `ERROR: malformed path: ${e}`, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w = (e, t, n, r) => {
		v = (n - e) / 3, y = (r - t) / 3, h.push(e + v, t + y, n - v, r - y, n, r);
	};
	if (!e || !Number.isNaN(t[0]) || Number.isNaN(t[1])) return console.log(c), n;
	for (l = 0; l < o; l++) if (x = p, Number.isNaN(t[l]) ? (p = t[l].toUpperCase(), m = p !== t[l]) : l--, d = +t[l + 1], f = +t[l + 2], m && (d += r, f += i), l || (g = d, _ = f), p === "M") h && (h.length < 8 ? --n.length : s += h.length), r = g = d, i = _ = f, h = [d, f], n.push(h), l += 2, p = "L";
	else if (p === "C") h ||= [0, 0], m || (r = i = 0), h.push(d, f, r + t[l + 3] * 1, i + t[l + 4] * 1, r += t[l + 5] * 1, i += t[l + 6] * 1), l += 6;
	else if (p === "S") v = r, y = i, (x === "C" || x === "S") && (v += r - h[h.length - 4], y += i - h[h.length - 3]), m || (r = i = 0), h.push(v, y, d, f, r += t[l + 3] * 1, i += t[l + 4] * 1), l += 4;
	else if (p === "Q") v = r + (d - r) * a, y = i + (f - i) * a, m || (r = i = 0), r += t[l + 3] * 1, i += t[l + 4] * 1, h.push(v, y, r + (d - r) * a, i + (f - i) * a, r, i), l += 4;
	else if (p === "T") v = r - h[h.length - 4], y = i - h[h.length - 3], h.push(r + v, i + y, d + (r + v * 1.5 - d) * a, f + (i + y * 1.5 - f) * a, r = d, i = f), l += 2;
	else if (p === "H") w(r, i, r = d, i), l += 1;
	else if (p === "V") w(r, i, r, i = d + (m ? i - r : 0)), l += 1;
	else if (p === "L" || p === "Z") p === "Z" && (d = g, f = _, h.closed = !0), (p === "L" || Oi(r - d) > .5 || Oi(i - f) > .5) && (w(r, i, d, f), p === "L" && (l += 2)), r = d, i = f;
	else if (p === "A") {
		if (S = t[l + 4], C = t[l + 5], v = t[l + 6], y = t[l + 7], u = 7, S.length > 1 && (S.length < 3 ? (y = v, v = C, u--) : (y = C, v = S.substr(2), u -= 2), C = S.charAt(1), S = S.charAt(0)), b = Ai(r, i, +t[l + 1], +t[l + 2], +t[l + 3], +S, +C, (m ? r : 0) + v * 1, (m ? i : 0) + y * 1), l += u, b) for (u = 0; u < b.length; u++) h.push(b[u]);
		r = h[h.length - 2], i = h[h.length - 1];
	} else console.log(c);
	return l = h.length, l < 6 ? (n.pop(), l = 0) : h[0] === h[l - 2] && h[1] === h[l - 1] && (h.closed = !0), n.totalPoints = s + l, n;
}
var Mi = 0x56bc75e2d63100000, Ni = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/gi, Pi = /[cLlsSaAhHvVtTqQ]/g, Fi = (e) => {
	let t = e.length, n = Mi, r;
	for (r = 1; r < t; r += 6) +e[r] < n && (n = +e[r]);
	return n;
}, Ii = (e, t, n) => {
	!n && n !== 0 && (n = Math.max(+e[e.length - 1], +e[1]));
	let r = e[0] * -1, i = -n, a = e.length, o = 1 / (+e[a - 2] + r), s = -t || (Math.abs(e[a - 1] - +e[1]) < .01 * (e[a - 2] - +e[0]) ? Fi(e) + i : +e[a - 1] + i), c;
	for (s = s ? 1 / s : -o, c = 0; c < a; c += 2) e[c] = (+e[c] + r) * o, e[c + 1] = (+e[c + 1] + i) * s;
}, Li = (e, t, n, r, i, a, o, s, c, l, u) => {
	let d = (e + n) / 2, f = (t + r) / 2, p = (n + i) / 2, m = (r + a) / 2, h = (i + o) / 2, g = (a + s) / 2, _ = (d + p) / 2, v = (f + m) / 2, y = (p + h) / 2, b = (m + g) / 2, x = (_ + y) / 2, S = (v + b) / 2, C = o - e, w = s - t, T = Math.abs((n - o) * w - (r - s) * C), E = Math.abs((i - o) * w - (a - s) * C), D;
	return l || (l = [{
		x: e,
		y: t
	}, {
		x: o,
		y: s
	}], u = 1), l.splice(u || l.length - 1, 0, {
		x,
		y: S
	}), (T + E) * (T + E) > c * (C * C + w * w) && (D = l.length, Li(e, t, d, f, _, v, x, S, c, l, u), Li(x, S, y, b, h, g, o, s, c, l, u + 1 + (l.length - D))), l;
};
function Ri(e, t = {}) {
	e ||= "0,0,1,1";
	let n = e.match(Ni), r = 1, i = [], a = [], o = t.precision || 1, s = o <= 1, c, l, u, d, f, p, m, h, g;
	if ((Pi.test(e) || ~e.indexOf("M") && e.indexOf("C") < 0) && (n = ji(e)[0]), c = n.length, c === 4) n.unshift(0, 0), n.push(1, 1), c = 8;
	else if ((c - 2) % 6) throw "Invalid CustomEase";
	for ((+n[0] != 0 || +n[c - 2] != 1) && Ii(n, t.height, t.originY), d = 2; d < c; d += 6) l = {
		x: +n[d - 2],
		y: +n[d - 1]
	}, u = {
		x: +n[d + 4],
		y: +n[d + 5]
	}, i.push(l, u), Li(l.x, l.y, +n[d], +n[d + 1], +n[d + 2], +n[d + 3], u.x, u.y, 1 / (o * 2e5), i, i.length - 1);
	for (c = i.length, d = 0; d < c; d++) m = i[d], h = i[d - 1] || m, (m.x > h.x || h.y !== m.y && h.x === m.x || m === h) && m.x <= 1 ? (h.cx = m.x - h.x, h.cy = m.y - h.y, h.n = m, h.nx = m.x, s && d > 1 && Math.abs(h.cy / h.cx - i[d - 2].cy / i[d - 2].cx) > 2 && (s = 0), h.cx < r && (h.cx ? r = h.cx : (h.cx = .001, d === c - 1 && (h.x -= .001, r = Math.min(r, .001), s = 0)))) : (i.splice(d--, 1), c--);
	if (c = 1 / r + 1 | 0, f = 1 / c, p = 0, m = i[0], s) {
		for (d = 0; d < c; d++) g = d * f, m.nx < g && (m = i[++p]), l = m.y + (g - m.x) / m.cx * m.cy, a[d] = {
			x: g,
			cx: f,
			y: l,
			cy: 0,
			nx: 9
		}, d && (a[d - 1].cy = l - a[d - 1].y);
		p = i[i.length - 1], a[c - 1].cy = p.y - l, a[c - 1].cx = p.x - a[a.length - 1].x;
	} else {
		for (d = 0; d < c; d++) m.nx < d * f && (m = i[++p]), a[d] = m;
		p < i.length - 1 && (a[d - 1] = i[i.length - 2]);
	}
	return function(e) {
		let t = a[e * c | 0] || a[c - 1];
		return t.nx < e && (t = t.n), t.y + (e - t.x) / t.cx * t.cy;
	};
}
var zi = class extends Vr {
	constructor(e) {
		super(e.particleImages[0]), Y(this, "emitter"), Y(this, "maxLife"), Y(this, "age"), Y(this, "agePercent"), Y(this, "oneOverLife"), Y(this, "next"), Y(this, "prev"), Y(this, "config"), Y(this, "parent"), this.emitter = e, this.config = {}, this.anchorX = this.anchorY = .5, this.maxLife = 0, this.age = 0, this.agePercent = 0, this.oneOverLife = 0, this.init = this.init, this.kill = this.kill;
	}
	init(e) {
		this.maxLife = e, this.age = this.agePercent = 0, this.rotation = 0, this.x = this.y = 0, this.scaleX = this.scaleY = 1, this.tint = 16777215, this.alpha = 1, this.oneOverLife = 1 / this.maxLife;
	}
	appendTo(e) {
		this.parent?.removeParticle(this), this.parent = e, e.addParticle(this);
	}
	appendAt(e, t) {
		this.parent?.removeParticle(this), this.parent = e, e.addParticleAt(this, t);
	}
	removeFromParent() {
		this.alpha = 0, this.parent?.removeParticle(this), this.parent = void 0;
	}
	kill() {
		this.emitter.recycle(this);
	}
	destroy() {
		this.removeFromParent(), this.next && this.prev && (this.next.prev = this.prev, this.prev.next = this.next), this.emitter = this.next = this.prev = null;
	}
}, Bi = /* @__PURE__ */ ((e) => (e[e.Spawn = 0] = "Spawn", e[e.Normal = 2] = "Normal", e[e.Late = 5] = "Late", e))(Bi || {}), Vi = F.shared, Hi = Symbol("Position particle per emitter position"), Ui = class e {
	constructor(e, t, n) {
		Y(this, "initBehaviors"), Y(this, "updateBehaviors"), Y(this, "recycleBehaviors"), Y(this, "minLifetime"), Y(this, "maxLifetime"), Y(this, "customEase"), Y(this, "_frequency"), Y(this, "spawnChance"), Y(this, "maxParticles"), Y(this, "emitterLifetime"), Y(this, "spawnPos"), Y(this, "particlesPerWave"), Y(this, "rotation"), Y(this, "ownerPos"), Y(this, "_prevEmitterPos"), Y(this, "_prevPosIsValid"), Y(this, "_posChanged"), Y(this, "_parent"), Y(this, "addAtBack"), Y(this, "particleCount"), Y(this, "_emit"), Y(this, "_spawnTimer"), Y(this, "_emitterLife"), Y(this, "_activeParticlesFirst"), Y(this, "_activeParticlesLast"), Y(this, "_poolFirst"), Y(this, "_origConfig"), Y(this, "_autoUpdate"), Y(this, "_destroyWhenComplete"), Y(this, "_completeCallback"), Y(this, "_particleImages"), this.initBehaviors = [], this.updateBehaviors = [], this.recycleBehaviors = [], this.minLifetime = 0, this.maxLifetime = 0, this.customEase = void 0, this._frequency = 1, this.spawnChance = 1, this.maxParticles = 1e3, this.emitterLifetime = -1, this.spawnPos = new r(), this.particlesPerWave = 1, this.rotation = 0, this.ownerPos = new r(), this._prevEmitterPos = new r(), this._prevPosIsValid = !1, this._posChanged = !1, this._parent = void 0, this.addAtBack = !1, this.particleCount = 0, this._emit = !1, this._spawnTimer = 0, this._emitterLife = -1, this._origConfig = void 0, this._autoUpdate = !1, this._destroyWhenComplete = !1, this._completeCallback = void 0, this._particleImages = [], this.parent = e, this.particleImages = n ?? Si(t), this.init(t), this.recycle = this.recycle, this.update = this.update, this.rotate = this.rotate, this.updateSpawnPos = this.updateSpawnPos, this.updateOwnerPos = this.updateOwnerPos;
	}
	static registerBehavior(t) {
		e.knownBehaviors[t.type] = t;
	}
	get frequency() {
		return this._frequency;
	}
	set frequency(e) {
		this._frequency = typeof e == "number" && e > 0 ? e : 1;
	}
	get parent() {
		return this._parent;
	}
	set parent(e) {
		this.cleanup(), this._parent = e;
	}
	get particleImages() {
		return this._particleImages;
	}
	set particleImages(e) {
		this._particleImages = yi(e);
	}
	init(t) {
		if (!t) return;
		this.cleanup(), this._origConfig = t, this.minLifetime = t.lifetime.min, this.maxLifetime = t.lifetime.max, this.customEase = t.ease ? typeof t.ease == "function" ? t.ease : typeof t.ease == "string" ? Ri(t.ease) : gi(t.ease) : void 0, this.particlesPerWave = 1, t.particlesPerWave && t.particlesPerWave > 1 && (this.particlesPerWave = t.particlesPerWave), this.frequency = t.frequency, this.spawnChance = typeof t.spawnChance == "number" && t.spawnChance > 0 ? t.spawnChance : 1, this.emitterLifetime = t.emitterLifetime || -1;
		let n = t.maxParticles ?? 0;
		this.maxParticles = n > 0 ? n : 1e3, this.addAtBack = !!t.addAtBack, this.rotation = 0, this.ownerPos.set(0), t.pos ? this.spawnPos.copyFrom(t.pos) : this.spawnPos.set(0), this._prevEmitterPos.copyFrom(this.spawnPos), this._prevPosIsValid = !1, this._spawnTimer = 0, this.emit = t.emit === void 0 || !!t.emit, this.autoUpdate = !!t.autoUpdate;
		let r = t.behaviors.map((t) => {
			let n = e.knownBehaviors[t.type];
			return n ? new n(t.config) : (console.error(`Unknown behavior: ${t.type}`), null);
		}).filter((e) => !!e);
		r.push(Hi), r.sort((e, t) => e === Hi ? t.order === 0 ? 1 : -1 : t === Hi ? e.order === 0 ? -1 : 1 : e.order - t.order), this.initBehaviors = r.slice(), this.updateBehaviors = r.filter((e) => e !== Hi && e.updateParticle), this.recycleBehaviors = r.filter((e) => e !== Hi && e.recycleParticle);
	}
	getBehavior(t) {
		return e.knownBehaviors[t] && this.initBehaviors.find((n) => n instanceof e.knownBehaviors[t]) || null;
	}
	fillPool(e) {
		for (; e > 0; --e) {
			let e = new zi(this);
			e.next = this._poolFirst, this._poolFirst = e;
		}
	}
	recycle(e, t = !1) {
		for (let n = 0; n < this.recycleBehaviors.length; ++n) this.recycleBehaviors[n].recycleParticle?.(e, !t);
		e.next && (e.next.prev = e.prev), e.prev && (e.prev.next = e.next), e === this._activeParticlesLast && (this._activeParticlesLast = e.prev), e === this._activeParticlesFirst && (this._activeParticlesFirst = e.next), e.prev = void 0, e.next = this._poolFirst, this._poolFirst = e, e.removeFromParent(), --this.particleCount;
	}
	rotate(e) {
		if (this.rotation === e) return;
		let t = e - this.rotation;
		this.rotation = e, ui(t, this.spawnPos), this._posChanged = !0;
	}
	updateSpawnPos(e, t) {
		this._posChanged = !0, this.spawnPos.x = e, this.spawnPos.y = t;
	}
	updateOwnerPos(e, t) {
		this._posChanged = !0, this.ownerPos.x = e, this.ownerPos.y = t;
	}
	resetPositionTracking() {
		this._prevPosIsValid = !1;
	}
	get emit() {
		return this._emit;
	}
	set emit(e) {
		this._emit = !!e, this._emitterLife = this.emitterLifetime;
	}
	get autoUpdate() {
		return this._autoUpdate;
	}
	set autoUpdate(e) {
		this._autoUpdate && !e ? Vi.remove(this.updateByTicker, this) : !this._autoUpdate && e && Vi.add(this.updateByTicker, this), this._autoUpdate = !!e;
	}
	playOnceAndDestroy(e) {
		this.autoUpdate = !0, this.emit = !0, this._destroyWhenComplete = !0, this._completeCallback = e;
	}
	playOnce(e) {
		this.emit = !0, this._completeCallback = e;
	}
	updateByTicker(e) {
		this.update(e.elapsedMS * .001);
	}
	update(e) {
		if (!this._parent) return;
		for (let t = this._activeParticlesFirst, n; t; t = n) if (n = t.next, t.age += e, t.age > t.maxLife || t.age < 0) this.recycle(t);
		else {
			let n = t.age * t.oneOverLife;
			this.customEase && (n = this.customEase.length === 4 ? this.customEase(n, 0, 1, 1) : this.customEase(n)), t.agePercent = n;
			for (let n = 0; n < this.updateBehaviors.length; ++n) if (this.updateBehaviors[n].updateParticle?.(t, e)) {
				this.recycle(t);
				break;
			}
		}
		let t = 0, n = 0;
		this._prevPosIsValid && (t = this._prevEmitterPos.x, n = this._prevEmitterPos.y);
		let r = this.ownerPos.x + this.spawnPos.x, i = this.ownerPos.y + this.spawnPos.y;
		if (this._emit) for (this._spawnTimer -= e < 0 ? 0 : e; this._spawnTimer <= 0;) {
			if (this._emitterLife >= 0 && (this._emitterLife -= this._frequency, this._emitterLife <= 0)) {
				this._spawnTimer = 0, this._emitterLife = 0, this.emit = !1;
				break;
			}
			if (this.particleCount >= this.maxParticles) {
				this._spawnTimer += this._frequency;
				continue;
			}
			let a, o;
			if (this._prevPosIsValid && this._posChanged) {
				let s = 1 + this._spawnTimer / e;
				a = (r - t) * s + t, o = (i - n) * s + n;
			} else a = r, o = i;
			let s, c;
			for (let e = Math.min(this.particlesPerWave, this.maxParticles - this.particleCount), t = 0; t < e; ++t) {
				if (this.spawnChance < 1 && Math.random() >= this.spawnChance) continue;
				let e;
				if (e = this.minLifetime === this.maxLifetime ? this.minLifetime : Math.random() * (this.maxLifetime - this.minLifetime) + this.minLifetime, -this._spawnTimer >= e) continue;
				let t;
				this._poolFirst ? (t = this._poolFirst, this._poolFirst = this._poolFirst.next, t.next = void 0) : t = new zi(this), t.init(e), this.addAtBack ? t.appendAt(this._parent, 0) : t.appendTo(this._parent), s ? (c.next = t, t.prev = c, c = t) : c = s = t, ++this.particleCount;
			}
			if (s) {
				this._activeParticlesLast ? (this._activeParticlesLast.next = s, s.prev = this._activeParticlesLast, this._activeParticlesLast = c) : (this._activeParticlesFirst = s, this._activeParticlesLast = c);
				for (let e = 0; e < this.initBehaviors.length; ++e) {
					let t = this.initBehaviors[e];
					if (t === Hi) for (let e = s, t; e !== void 0; e = t) {
						t = e.next, this.rotation !== 0 && (ui(this.rotation, e), e.rotation += this.rotation), e.x += a, e.y += o, e.age += -this._spawnTimer;
						let n = e.age * e.oneOverLife;
						this.customEase && (n = this.customEase.length === 4 ? this.customEase(n, 0, 1, 1) : this.customEase(n)), e.agePercent = n;
					}
					else t.initParticles(s);
				}
				for (let e = s, t; e !== void 0; e = t) {
					t = e.next;
					for (let t = 0; t < this.updateBehaviors.length; ++t) if (this.updateBehaviors[t].updateParticle?.(e, -this._spawnTimer)) {
						this.recycle(e);
						break;
					}
				}
			}
			this._spawnTimer += this._frequency;
		}
		if (this._posChanged &&= (this._prevEmitterPos.x = r, this._prevEmitterPos.y = i, this._prevPosIsValid = !0, !1), !this._emit && !this._activeParticlesFirst) {
			if (this._completeCallback) {
				let e = this._completeCallback;
				this._completeCallback = void 0, e();
			}
			this._destroyWhenComplete && this.destroy();
		}
	}
	emitNow() {
		if (!this._parent) return;
		let e = this.ownerPos.x + this.spawnPos.x, t = this.ownerPos.y + this.spawnPos.y, n, r;
		for (let e = Math.min(this.particlesPerWave, this.maxParticles - this.particleCount), t = 0; t < e; ++t) {
			if (this.spawnChance < 1 && Math.random() >= this.spawnChance) continue;
			let e;
			this._poolFirst ? (e = this._poolFirst, this._poolFirst = this._poolFirst.next, e.next = void 0) : e = new zi(this);
			let t;
			t = this.minLifetime === this.maxLifetime ? this.minLifetime : Math.random() * (this.maxLifetime - this.minLifetime) + this.minLifetime, e.init(t), this.addAtBack ? e.appendAt(this._parent, 0) : e.appendTo(this._parent), n ? (r.next = e, e.prev = r, r = e) : r = n = e, ++this.particleCount;
		}
		if (n) {
			this._activeParticlesLast ? (this._activeParticlesLast.next = n, n.prev = this._activeParticlesLast, this._activeParticlesLast = r) : (this._activeParticlesFirst = n, this._activeParticlesLast = r);
			for (let r = 0; r < this.initBehaviors.length; ++r) {
				let i = this.initBehaviors[r];
				if (i === Hi) for (let r = n, i; r !== void 0; r = i) i = r.next, this.rotation !== 0 && (ui(this.rotation, r), r.rotation += this.rotation), r.x += e, r.y += t;
				else i.initParticles(n);
			}
		}
	}
	cleanup() {
		let e, t;
		for (e = this._activeParticlesFirst; e; e = t) t = e.next, this.recycle(e, !0);
		this._activeParticlesFirst = this._activeParticlesLast = void 0, this.particleCount = 0;
	}
	get destroyed() {
		return !(this._parent && this.initBehaviors.length);
	}
	destroy() {
		this.autoUpdate = !1, this.cleanup();
		let e;
		for (let t = this._poolFirst; t; t = e) e = t.next, t.destroy();
		this._poolFirst = this.spawnPos = this.ownerPos = this._parent = this.customEase = this._completeCallback = void 0, this.initBehaviors.length = this.updateBehaviors.length = this.recycleBehaviors.length = 0;
	}
};
Y(Ui, "knownBehaviors", {});
var X = Ui;
ii({}, {
	AccelerationBehavior: () => Ji,
	AlphaBehavior: () => na,
	BehaviorOrder: () => Bi,
	BurstSpawnBehavior: () => ca,
	ColorBehavior: () => la,
	NoRotationBehavior: () => xa,
	OrderedTextureBehavior: () => da,
	PathBehavior: () => ga,
	PointSpawnBehavior: () => _a,
	RandomAnimatedTextureBehavior: () => oa,
	RandomTextureBehavior: () => va,
	RotationBehavior: () => ya,
	ScaleBehavior: () => Sa,
	ShapeSpawnBehavior: () => Ta,
	SingleAnimatedTextureBehavior: () => sa,
	SingleTextureBehavior: () => Ea,
	SpeedBehavior: () => Da,
	StaticAlphaBehavior: () => ra,
	StaticAnchorBehavior: () => ia,
	StaticColorBehavior: () => ua,
	StaticRotationBehavior: () => ba,
	StaticScaleBehavior: () => Ca,
	StaticSpeedBehavior: () => Oa,
	getAnimatedTextures: () => aa,
	spawnShapes: () => Wi
});
var Wi = {};
ii(Wi, {
	PolygonalChain: () => qi,
	Rectangle: () => Gi,
	Torus: () => Ki
});
var Gi = class {
	constructor(e) {
		Y(this, "x"), Y(this, "y"), Y(this, "w"), Y(this, "h"), this.x = e.x, this.y = e.y, this.w = Math.max(e.w, 1), this.h = Math.max(e.h, 1);
	}
	getRandPos(e) {
		e.x = Math.random() * this.w + this.x, e.y = Math.random() * this.h + this.y;
	}
};
Y(Gi, "type", "rect");
var Ki = class {
	constructor(e) {
		Y(this, "x"), Y(this, "y"), Y(this, "radius"), Y(this, "innerRadius"), Y(this, "rotation"), this.x = e.x || 0, this.y = e.y || 0, this.radius = Math.max(e.radius, 1), this.innerRadius = e.innerRadius || 0, this.rotation = !!e.affectRotation;
	}
	getRandPos(e) {
		e.x = this.innerRadius === this.radius ? this.radius : Math.random() * (this.radius - this.innerRadius) + this.innerRadius, e.y = 0;
		let t = Math.random() * Math.PI * 2;
		this.rotation && (e.rotation += t), ui(t, e), e.x += this.x, e.y += this.y;
	}
};
Y(Ki, "type", "torus");
var qi = class {
	constructor(e) {
		Y(this, "segments"), Y(this, "totalLength"), Y(this, "countingLengths"), this.segments = [], this.countingLengths = [], this.totalLength = 0, this.init(e);
	}
	init(e) {
		if (!e || !e.length) this.segments.push({
			p1: {
				x: 0,
				y: 0
			},
			p2: {
				x: 0,
				y: 0
			},
			l: 0
		});
		else if (Array.isArray(e[0])) for (let t = 0; t < e.length; ++t) {
			let n = e[t], r = n[0];
			for (let e = 1; e < n.length; ++e) {
				let t = n[e];
				this.segments.push({
					p1: r,
					p2: t,
					l: 0
				}), r = t;
			}
		}
		else {
			let t = e[0];
			for (let n = 1; n < e.length; ++n) {
				let r = e[n];
				this.segments.push({
					p1: t,
					p2: r,
					l: 0
				}), t = r;
			}
		}
		for (let e = 0; e < this.segments.length; ++e) {
			let { p1: t, p2: n } = this.segments[e], r = Math.sqrt((n.x - t.x) * (n.x - t.x) + (n.y - t.y) * (n.y - t.y));
			this.segments[e].l = r, this.totalLength += r, this.countingLengths.push(this.totalLength);
		}
	}
	getRandPos(e) {
		let t = Math.random() * this.totalLength, n, r = 0;
		if (this.segments.length === 1) n = this.segments[0], r = t;
		else for (let e = 0; e < this.countingLengths.length; ++e) if (t < this.countingLengths[e]) {
			n = this.segments[e], r = e === 0 ? t : t - this.countingLengths[e - 1];
			break;
		}
		r /= n.l || 1;
		let { p1: i, p2: a } = n;
		e.x = i.x + r * (a.x - i.x), e.y = i.y + r * (a.y - i.y);
	}
};
Y(qi, "type", "polygonalChain");
var Ji = class {
	constructor(e) {
		Y(this, "order", 5), Y(this, "minStart"), Y(this, "maxStart"), Y(this, "accel"), Y(this, "rotate"), Y(this, "maxSpeed"), this.minStart = e.minStart, this.maxStart = e.maxStart, this.accel = e.accel, this.rotate = !!e.rotate, this.maxSpeed = e.maxSpeed ?? 0;
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.random() * (this.maxStart - this.minStart) + this.minStart;
			t.config.velocity ? t.config.velocity.set(e, 0) : t.config.velocity = new r(e, 0), ui(t.rotation, t.config.velocity), t = t.next;
		}
	}
	updateParticle(e, t) {
		let n = e.config.velocity, r = n.x, i = n.y;
		if (n.x += this.accel.x * t, n.y += this.accel.y * t, this.maxSpeed) {
			let e = fi(n);
			e > this.maxSpeed && mi(n, this.maxSpeed / e);
		}
		e.x += (r + n.x) / 2 * t, e.y += (i + n.y) / 2 * t, this.rotate && (e.rotation = Math.atan2(n.y, n.x));
	}
};
Y(Ji, "type", "moveAcceleration");
function Yi(e) {
	return this.ease && (e = this.ease(e)), (this.first.next.value - this.first.value) * e + this.first.value;
}
function Xi(e) {
	this.ease && (e = this.ease(e));
	let t = this.first.value, n = this.first.next.value;
	return {
		r: (n.r - t.r) * e + t.r,
		g: (n.g - t.g) * e + t.g,
		b: (n.b - t.b) * e + t.b
	};
}
function Zi(e) {
	this.ease && (e = this.ease(e));
	let t = this.first, n = t.next;
	for (; e > n.time;) t = n, n = n.next;
	return e = (e - t.time) / (n.time - t.time), (n.value - t.value) * e + t.value;
}
function Qi(e) {
	this.ease && (e = this.ease(e));
	let t = this.first, n = t.next;
	for (; e > n.time;) t = n, n = n.next;
	e = (e - t.time) / (n.time - t.time);
	let r = t.value, i = n.value;
	return {
		r: (i.r - r.r) * e + r.r,
		g: (i.g - r.g) * e + r.g,
		b: (i.b - r.b) * e + r.b
	};
}
function $i(e) {
	this.ease && (e = this.ease(e));
	let t = this.first;
	for (; t.next && e > t.next.time;) t = t.next;
	return t.value;
}
function ea(e) {
	this.ease && (e = this.ease(e));
	let t = this.first;
	for (; t.next && e > t.next.time;) t = t.next;
	return t.value;
}
var ta = class {
	constructor(e = !1) {
		Y(this, "first"), Y(this, "interpolate"), Y(this, "ease"), Y(this, "isColor"), this.first = void 0, this.isColor = !!e, this.interpolate = void 0, this.ease = void 0;
	}
	reset(e) {
		this.first = e, this.interpolate = e.next && e.next.time >= 1 ? this.isColor ? Xi : Yi : e.isStepped ? this.isColor ? ea : $i : this.isColor ? Qi : Zi, this.ease = this.first.ease;
	}
}, na = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "list"), this.list = new ta(!1), this.list.reset(ai.createList(e.alpha));
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.alpha = this.list.first.value, t = t.next;
	}
	updateParticle(e) {
		e.alpha = this.list.interpolate(e.agePercent);
	}
};
Y(na, "type", "alpha");
var ra = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "value"), this.value = e.alpha;
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.alpha = this.value, t = t.next;
	}
};
Y(ra, "type", "alphaStatic");
var ia = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "x"), Y(this, "y"), this.x = e.x, this.y = e.y;
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.anchorX = this.x, t.anchorY = this.y, t = t.next;
	}
};
Y(ia, "type", "anchorStatic");
function aa(e) {
	let t = yi(e.map((e) => typeof e == "string" || e instanceof T ? e : e.texture)), n = [];
	for (let r = 0; r < e.length; ++r) {
		let i = e[r], a = t[r];
		if (typeof i == "string" || i instanceof T) n.push(a);
		else for (let e = i.count || 1; e > 0; --e) n.push(a);
	}
	return n;
}
var oa = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "anims"), this.anims = [];
		for (let t = 0; t < e.anims.length; ++t) {
			let n = e.anims[t], r = aa(n.textures), i = n.framerate < 0 ? -1 : n.framerate > 0 ? n.framerate : 60, a = {
				textures: r,
				duration: i > 0 ? r.length / i : 0,
				framerate: i,
				loop: i > 0 && !!n.loop
			};
			this.anims.push(a);
		}
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.floor(Math.random() * this.anims.length), n = t.config.anim = this.anims[e];
			t.texture = n.textures[0], t.config.animElapsed = 0, n.framerate === -1 ? (t.config.animDuration = t.maxLife, t.config.animFramerate = n.textures.length / t.maxLife) : (t.config.animDuration = n.duration, t.config.animFramerate = n.framerate), t = t.next;
		}
	}
	updateParticle(e, t) {
		let n = e.config, r = n.anim;
		n.animElapsed += t, n.animElapsed >= n.animDuration && (n.anim.loop ? n.animElapsed %= n.animDuration : n.animElapsed = n.animDuration - 1e-6);
		let i = n.animElapsed * n.animFramerate + 1e-7 | 0;
		e.texture = r.textures[i] || r.textures[r.textures.length - 1] || T.EMPTY;
	}
};
Y(oa, "type", "animatedRandom");
var sa = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "anim");
		let t = e.anim, n = aa(t.textures), r = t.framerate < 0 ? -1 : t.framerate > 0 ? t.framerate : 60;
		this.anim = {
			textures: n,
			duration: r > 0 ? n.length / r : 0,
			framerate: r,
			loop: r > 0 && !!t.loop
		};
	}
	initParticles(e) {
		let t = e, n = this.anim;
		for (; t;) t.texture = n.textures[0], t.config.animElapsed = 0, n.framerate === -1 ? (t.config.animDuration = t.maxLife, t.config.animFramerate = n.textures.length / t.maxLife) : (t.config.animDuration = n.duration, t.config.animFramerate = n.framerate), t = t.next;
	}
	updateParticle(e, t) {
		let n = this.anim, r = e.config;
		r.animElapsed += t, r.animElapsed >= r.animDuration && (n.loop ? r.animElapsed %= r.animDuration : r.animElapsed = r.animDuration - 1e-6);
		let i = r.animElapsed * r.animFramerate + 1e-7 | 0;
		e.texture = n.textures[i] || n.textures[n.textures.length - 1] || n.textures[0];
	}
};
Y(sa, "type", "animatedSingle");
var ca = class {
	constructor(e) {
		Y(this, "order", 0), Y(this, "spacing"), Y(this, "start"), Y(this, "distance"), this.spacing = e.spacing * ci, this.start = e.start * ci, this.distance = e.distance;
	}
	initParticles(e) {
		let t = 0, n = e;
		for (; n;) {
			let e;
			e = this.spacing ? this.start + this.spacing * t : Math.random() * Math.PI * 2, n.rotation = e, this.distance && (n.x = this.distance, ui(e, n)), n = n.next, ++t;
		}
	}
};
Y(ca, "type", "spawnBurst");
var la = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "list"), this.list = new ta(!0), this.list.reset(ai.createList(e.color));
	}
	initParticles(e) {
		let t = e, n = this.list.first.value;
		for (; t;) t.tint = E.shared.setValue(n), t = t.next;
	}
	updateParticle(e) {
		let t = this.list.interpolate(e.agePercent);
		e.tint = E.shared.setValue(t);
	}
};
Y(la, "type", "color");
var ua = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "value");
		let t = new E(e.color);
		this.value = t;
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.tint = this.value, t = t.next;
	}
};
Y(ua, "type", "colorStatic");
var da = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "textures"), Y(this, "index"), this.index = 0, this.textures = yi(e.textures);
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.texture = this.textures[this.index], ++this.index >= this.textures.length && (this.index = 0), t = t.next;
	}
};
Y(da, "type", "textureOrdered");
var fa = r.shared, pa = /* @__PURE__ */ "E.LN2.LN10.LOG2E.LOG10E.PI.SQRT1_2.SQRT2.abs.acos.acosh.asin.asinh.atan.atanh.atan2.cbrt.ceil.cos.cosh.exp.expm1.floor.fround.hypot.log.log1p.log10.log2.max.min.pow.random.round.sign.sin.sinh.sqrt.tan.tanh".split("."), ma = new RegExp(["[01234567890\\.\\*\\-\\+\\/\\(\\)x ,]"].concat(pa).join("|"), "g");
function ha(e) {
	let t = e.match(ma) ?? [e];
	for (let e = t.length - 1; e >= 0; --e) pa.indexOf(t[e]) >= 0 && (t[e] = `Math.${t[e]}`);
	return e = t.join(""), Function("x", `return ${e};`);
}
var ga = class {
	constructor(e) {
		if (Y(this, "order", 5), Y(this, "path"), Y(this, "list"), Y(this, "minMult"), e.path) {
			if (typeof e.path == "function") this.path = e.path;
			else try {
				this.path = ha(e.path);
			} catch {
				this.path = null;
			}
		} else this.path = (e) => e;
		this.list = new ta(!1), this.list.reset(ai.createList(e.speed)), this.minMult = e.minMult ?? 1;
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			t.config.initRotation = t.rotation, t.config.initPosition ? t.config.initPosition.copyFrom(t) : t.config.initPosition = new r(t.x, t.y), t.config.movement = 0;
			let e = Math.random() * (1 - this.minMult) + this.minMult;
			t.config.speedMult = e, t = t.next;
		}
	}
	updateParticle(e, t) {
		let n = this.list.interpolate(e.agePercent) * e.config.speedMult;
		e.config.movement += n * t, fa.x = e.config.movement, fa.y = this.path(fa.x), ui(e.config.initRotation, fa), e.x = e.config.initPosition.x + fa.x, e.y = e.config.initPosition.y + fa.y;
	}
};
Y(ga, "type", "movePath");
var _a = class {
	constructor() {
		Y(this, "order", 0);
	}
	initParticles(e) {}
};
Y(_a, "type", "spawnPoint");
var va = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "textures"), this.textures = yi(e.textures);
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.floor(Math.random() * this.textures.length);
			t.texture = this.textures[e], t = t.next;
		}
	}
};
Y(va, "type", "textureRandom");
var ya = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "minStart"), Y(this, "maxStart"), Y(this, "minSpeed"), Y(this, "maxSpeed"), Y(this, "accel"), this.minStart = e.minStart * ci, this.maxStart = e.maxStart * ci, this.minSpeed = e.minSpeed * ci, this.maxSpeed = e.maxSpeed * ci, this.accel = e.accel * ci;
	}
	initParticles(e) {
		let t = e;
		for (; t;) this.minStart === this.maxStart ? t.rotation += this.maxStart : t.rotation += Math.random() * (this.maxStart - this.minStart) + this.minStart, t.config.rotSpeed = Math.random() * (this.maxSpeed - this.minSpeed) + this.minSpeed, t = t.next;
	}
	updateParticle(e, t) {
		if (this.accel) {
			let n = e.config.rotSpeed;
			e.config.rotSpeed += this.accel * t, e.rotation += (e.config.rotSpeed + n) / 2 * t;
		} else e.rotation += e.config.rotSpeed * t;
	}
};
Y(ya, "type", "rotation");
var ba = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "min"), Y(this, "max"), this.min = e.min * ci, this.max = e.max * ci;
	}
	initParticles(e) {
		let t = e;
		for (; t;) this.min === this.max ? t.rotation += this.max : t.rotation += Math.random() * (this.max - this.min) + this.min, t = t.next;
	}
};
Y(ba, "type", "rotationStatic");
var xa = class {
	constructor(e) {
		Y(this, "order", 6), Y(this, "rotation"), this.rotation = (e.rotation || 0) * ci;
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.rotation = this.rotation, t = t.next;
	}
};
Y(xa, "type", "noRotation");
var Sa = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "list"), Y(this, "minMult"), this.list = new ta(!1), this.list.reset(ai.createList(e.scale)), this.minMult = e.minMult ?? 1;
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.random() * (1 - this.minMult) + this.minMult;
			t.config.scaleMult = e, t.scaleX = t.scaleY = this.list.first.value * e, t = t.next;
		}
	}
	updateParticle(e) {
		e.scaleX = e.scaleY = this.list.interpolate(e.agePercent) * e.config.scaleMult;
	}
};
Y(Sa, "type", "scale");
var Ca = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "min"), Y(this, "max"), this.min = e.min, this.max = e.max;
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.random() * (this.max - this.min) + this.min;
			t.scaleX = t.scaleY = e, t = t.next;
		}
	}
};
Y(Ca, "type", "scaleStatic");
var wa = class e {
	constructor(t) {
		Y(this, "order", 0), Y(this, "shape");
		let n = e.shapes[t.type];
		if (!n) throw Error(`No shape found with type '${t.type}'`);
		this.shape = new n(t.data);
	}
	static registerShape(t, n) {
		e.shapes[n || t.type] = t;
	}
	initParticles(e) {
		let t = e;
		for (; t;) this.shape.getRandPos(t), t = t.next;
	}
};
Y(wa, "type", "spawnShape"), Y(wa, "shapes", {});
var Ta = wa;
Ta.registerShape(qi), Ta.registerShape(Gi), Ta.registerShape(Ki), Ta.registerShape(Ki, "circle");
var Ea = class {
	constructor(e) {
		Y(this, "order", 2), Y(this, "texture"), this.texture = typeof e.texture == "string" ? oi(e.texture) : e.texture;
	}
	initParticles(e) {
		let t = e;
		for (; t;) t.texture = this.texture, t = t.next;
	}
};
Y(Ea, "type", "textureSingle");
var Da = class {
	constructor(e) {
		Y(this, "order", 5), Y(this, "list"), Y(this, "minMult"), this.list = new ta(!1), this.list.reset(ai.createList(e.speed)), this.minMult = e.minMult ?? 1;
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.random() * (1 - this.minMult) + this.minMult;
			t.config.speedMult = e, t.config.velocity ? t.config.velocity.set(this.list.first.value * e, 0) : t.config.velocity = new r(this.list.first.value * e, 0), ui(t.rotation, t.config.velocity), t = t.next;
		}
	}
	updateParticle(e, t) {
		let n = this.list.interpolate(e.agePercent) * e.config.speedMult, r = e.config.velocity;
		pi(r), mi(r, n), e.x += r.x * t, e.y += r.y * t;
	}
};
Y(Da, "type", "moveSpeed");
var Oa = class {
	constructor(e) {
		Y(this, "order", 5), Y(this, "min"), Y(this, "max"), this.min = e.min, this.max = e.max;
	}
	initParticles(e) {
		let t = e;
		for (; t;) {
			let e = Math.random() * (this.max - this.min) + this.min;
			t.config.velocity ? t.config.velocity.set(e, 0) : t.config.velocity = new r(e, 0), ui(t.rotation, t.config.velocity), t = t.next;
		}
	}
	updateParticle(e, t) {
		let n = e.config.velocity;
		e.x += n.x * t, e.y += n.y * t;
	}
};
Y(Oa, "type", "moveSpeedStatic"), X.registerBehavior(Ji), X.registerBehavior(na), X.registerBehavior(ra), X.registerBehavior(ia), X.registerBehavior(oa), X.registerBehavior(sa), X.registerBehavior(ca), X.registerBehavior(la), X.registerBehavior(ua), X.registerBehavior(da), X.registerBehavior(ga), X.registerBehavior(_a), X.registerBehavior(va), X.registerBehavior(ya), X.registerBehavior(ba), X.registerBehavior(xa), X.registerBehavior(Sa), X.registerBehavior(Ca), X.registerBehavior(Ta), X.registerBehavior(Ea), X.registerBehavior(Da), X.registerBehavior(Oa);
//#endregion
//#region node_modules/@pixi/sound/lib/instance.mjs
var ka;
function Aa(e) {
	return ka = e, e;
}
function ja() {
	return ka;
}
//#endregion
//#region node_modules/@pixi/sound/lib/filters/Filter.mjs
var Ma = class {
	constructor(e, t) {
		this.init(e, t);
	}
	init(e, t) {
		this.destination = e, this.source = t || e;
	}
	connect(e) {
		this.source?.connect(e);
	}
	disconnect() {
		this.source?.disconnect();
	}
	destroy() {
		this.disconnect(), this.destination = null, this.source = null;
	}
}, Na = class {
	static setParamValue(e, t) {
		if (e.setValueAtTime) {
			let n = ja().context;
			e.setValueAtTime(t, n.audioContext.currentTime);
		} else e.value = t;
		return t;
	}
}, Z = class extends Ma {
	constructor(e = 0, t = 0, n = 0, r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0) {
		let u = [], d = [
			{
				f: Z.F32,
				type: "lowshelf",
				gain: e
			},
			{
				f: Z.F64,
				type: "peaking",
				gain: t
			},
			{
				f: Z.F125,
				type: "peaking",
				gain: n
			},
			{
				f: Z.F250,
				type: "peaking",
				gain: r
			},
			{
				f: Z.F500,
				type: "peaking",
				gain: i
			},
			{
				f: Z.F1K,
				type: "peaking",
				gain: a
			},
			{
				f: Z.F2K,
				type: "peaking",
				gain: o
			},
			{
				f: Z.F4K,
				type: "peaking",
				gain: s
			},
			{
				f: Z.F8K,
				type: "peaking",
				gain: c
			},
			{
				f: Z.F16K,
				type: "highshelf",
				gain: l
			}
		];
		ja().useLegacy || (u = d.map((e) => {
			let t = ja().context.audioContext.createBiquadFilter();
			return t.type = e.type, Na.setParamValue(t.Q, 1), t.frequency.value = e.f, Na.setParamValue(t.gain, e.gain), t;
		})), super(u[0], u[u.length - 1]), this.bands = u, this.bandsMap = {};
		for (let e = 0; e < this.bands.length; e++) {
			let t = this.bands[e];
			e > 0 && this.bands[e - 1].connect(t), this.bandsMap[t.frequency.value] = t;
		}
	}
	setGain(e, t = 0) {
		if (!this.bandsMap[e]) throw Error(`No band found for frequency ${e}`);
		Na.setParamValue(this.bandsMap[e].gain, t);
	}
	getGain(e) {
		if (!this.bandsMap[e]) throw Error(`No band found for frequency ${e}`);
		return this.bandsMap[e].gain.value;
	}
	set f32(e) {
		this.setGain(Z.F32, e);
	}
	get f32() {
		return this.getGain(Z.F32);
	}
	set f64(e) {
		this.setGain(Z.F64, e);
	}
	get f64() {
		return this.getGain(Z.F64);
	}
	set f125(e) {
		this.setGain(Z.F125, e);
	}
	get f125() {
		return this.getGain(Z.F125);
	}
	set f250(e) {
		this.setGain(Z.F250, e);
	}
	get f250() {
		return this.getGain(Z.F250);
	}
	set f500(e) {
		this.setGain(Z.F500, e);
	}
	get f500() {
		return this.getGain(Z.F500);
	}
	set f1k(e) {
		this.setGain(Z.F1K, e);
	}
	get f1k() {
		return this.getGain(Z.F1K);
	}
	set f2k(e) {
		this.setGain(Z.F2K, e);
	}
	get f2k() {
		return this.getGain(Z.F2K);
	}
	set f4k(e) {
		this.setGain(Z.F4K, e);
	}
	get f4k() {
		return this.getGain(Z.F4K);
	}
	set f8k(e) {
		this.setGain(Z.F8K, e);
	}
	get f8k() {
		return this.getGain(Z.F8K);
	}
	set f16k(e) {
		this.setGain(Z.F16K, e);
	}
	get f16k() {
		return this.getGain(Z.F16K);
	}
	reset() {
		this.bands.forEach((e) => {
			Na.setParamValue(e.gain, 0);
		});
	}
	destroy() {
		this.bands.forEach((e) => {
			e.disconnect();
		}), this.bands = null, this.bandsMap = null;
	}
}, Pa = Z;
Pa.F32 = 32, Pa.F64 = 64, Pa.F125 = 125, Pa.F250 = 250, Pa.F500 = 500, Pa.F1K = 1e3, Pa.F2K = 2e3, Pa.F4K = 4e3, Pa.F8K = 8e3, Pa.F16K = 16e3;
//#endregion
//#region node_modules/@pixi/sound/lib/htmlaudio/HTMLAudioContext.mjs
var Fa = class extends s {
	constructor() {
		super(...arguments), this.speed = 1, this.muted = !1, this.volume = 1, this.paused = !1;
	}
	refresh() {
		this.emit("refresh");
	}
	refreshPaused() {
		this.emit("refreshPaused");
	}
	get filters() {
		return console.warn("HTML Audio does not support filters"), null;
	}
	set filters(e) {
		console.warn("HTML Audio does not support filters");
	}
	get audioContext() {
		return console.warn("HTML Audio does not support audioContext"), null;
	}
	toggleMute() {
		return this.muted = !this.muted, this.refresh(), this.muted;
	}
	togglePause() {
		return this.paused = !this.paused, this.refreshPaused(), this.paused;
	}
	destroy() {
		this.removeAllListeners();
	}
}, Ia = 0, La = class extends s {
	constructor(e) {
		super(), this.id = Ia++, this.init(e);
	}
	set(e, t) {
		if (this[e] === void 0) throw Error(`Property with name ${e} does not exist.`);
		switch (e) {
			case "speed":
				this.speed = t;
				break;
			case "volume":
				this.volume = t;
				break;
			case "paused":
				this.paused = t;
				break;
			case "loop":
				this.loop = t;
				break;
			case "muted": this.muted = t;
		}
		return this;
	}
	get progress() {
		let { currentTime: e } = this._source;
		return e / this._duration;
	}
	get paused() {
		return this._paused;
	}
	set paused(e) {
		this._paused = e, this.refreshPaused();
	}
	_onPlay() {
		this._playing = !0;
	}
	_onPause() {
		this._playing = !1;
	}
	init(e) {
		this._playing = !1, this._duration = e.source.duration;
		let t = this._source = e.source.cloneNode(!1);
		t.src = e.parent.url, t.onplay = this._onPlay.bind(this), t.onpause = this._onPause.bind(this), e.context.on("refresh", this.refresh, this), e.context.on("refreshPaused", this.refreshPaused, this), this._media = e;
	}
	_internalStop() {
		this._source && this._playing && (this._source.onended = null, this._source.pause());
	}
	stop() {
		this._internalStop(), this._source && this.emit("stop");
	}
	get speed() {
		return this._speed;
	}
	set speed(e) {
		this._speed = e, this.refresh();
	}
	get volume() {
		return this._volume;
	}
	set volume(e) {
		this._volume = e, this.refresh();
	}
	get loop() {
		return this._loop;
	}
	set loop(e) {
		this._loop = e, this.refresh();
	}
	get muted() {
		return this._muted;
	}
	set muted(e) {
		this._muted = e, this.refresh();
	}
	get filters() {
		return console.warn("HTML Audio does not support filters"), null;
	}
	set filters(e) {
		console.warn("HTML Audio does not support filters");
	}
	refresh() {
		let e = this._media.context, t = this._media.parent;
		this._source.loop = this._loop || t.loop;
		let n = e.volume * +!e.muted, r = t.volume * +!t.muted, i = this._volume * +!this._muted;
		this._source.volume = i * n * r, this._source.playbackRate = this._speed * e.speed * t.speed;
	}
	refreshPaused() {
		let e = this._media.context, t = this._media.parent, n = this._paused || t.paused || e.paused;
		n !== this._pausedReal && (this._pausedReal = n, n ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
			start: this._source.currentTime,
			end: this._end,
			volume: this._volume,
			speed: this._speed,
			loop: this._loop
		})), this.emit("pause", n));
	}
	play(e) {
		let { start: t, end: n, speed: r, loop: i, volume: a, muted: o } = e;
		n && console.assert(n > t, "End time is before start time"), this._speed = r, this._volume = a, this._loop = !!i, this._muted = o, this.refresh(), this.loop && n !== null && (console.warn("Looping not support when specifying an \"end\" time"), this.loop = !1), this._start = t, this._end = n || this._duration, this._start = Math.max(0, this._start - La.PADDING), this._end = Math.min(this._end + La.PADDING, this._duration), this._source.onloadedmetadata = () => {
			this._source && (this._source.currentTime = t, this._source.onloadedmetadata = null, this.emit("progress", t / this._duration, this._duration), F.shared.add(this._onUpdate, this));
		}, this._source.onended = this._onComplete.bind(this), this._source.play(), this.emit("start");
	}
	_onUpdate() {
		this.emit("progress", this.progress, this._duration), this._source.currentTime >= this._end && !this._source.loop && this._onComplete();
	}
	_onComplete() {
		F.shared.remove(this._onUpdate, this), this._internalStop(), this.emit("progress", 1, this._duration), this.emit("end", this);
	}
	destroy() {
		F.shared.remove(this._onUpdate, this), this.removeAllListeners();
		let e = this._source;
		e && (e.onended = null, e.onplay = null, e.onpause = null, this._internalStop()), this._source = null, this._speed = 1, this._volume = 1, this._loop = !1, this._end = null, this._start = 0, this._duration = 0, this._playing = !1, this._pausedReal = !1, this._paused = !1, this._muted = !1, this._media &&= (this._media.context.off("refresh", this.refresh, this), this._media.context.off("refreshPaused", this.refreshPaused, this), null);
	}
	toString() {
		return `[HTMLAudioInstance id=${this.id}]`;
	}
}, Ra = La;
Ra.PADDING = .1;
//#endregion
//#region node_modules/@pixi/sound/lib/htmlaudio/HTMLAudioMedia.mjs
var za = class extends s {
	init(e) {
		this.parent = e, this._source = e.options.source || new Audio(), e.url && (this._source.src = e.url);
	}
	create() {
		return new Ra(this);
	}
	get isPlayable() {
		return !!this._source && this._source.readyState === 4;
	}
	get duration() {
		return this._source.duration;
	}
	get context() {
		return this.parent.context;
	}
	get filters() {
		return null;
	}
	set filters(e) {
		console.warn("HTML Audio does not support filters");
	}
	destroy() {
		this.removeAllListeners(), this.parent = null, this._source &&= (this._source.src = "", this._source.load(), null);
	}
	get source() {
		return this._source;
	}
	load(e) {
		let t = this._source, n = this.parent;
		if (t.readyState === 4) {
			n.isLoaded = !0;
			let t = n.autoPlayStart();
			e && setTimeout(() => {
				e(null, n, t);
			}, 0);
			return;
		}
		if (!n.url) {
			e(/* @__PURE__ */ Error("sound.url or sound.source must be set"));
			return;
		}
		t.src = n.url;
		let r = () => {
			o(), n.isLoaded = !0;
			let t = n.autoPlayStart();
			e && e(null, n, t);
		}, i = () => {
			o(), e && e(/* @__PURE__ */ Error("Sound loading has been aborted"));
		}, a = () => {
			o();
			let n = `Failed to load audio element (code: ${t.error.code})`;
			e ? e(Error(n)) : console.error(n);
		}, o = () => {
			t.removeEventListener("canplaythrough", r), t.removeEventListener("load", r), t.removeEventListener("abort", i), t.removeEventListener("error", a);
		};
		t.addEventListener("canplaythrough", r, !1), t.addEventListener("load", r, !1), t.addEventListener("abort", i, !1), t.addEventListener("error", a, !1), t.load();
	}
}, Ba = class {
	constructor(e, t) {
		this.parent = e, Object.assign(this, t), this.duration = this.end - this.start, console.assert(this.duration > 0, "End time must be after start time");
	}
	play(e) {
		return this.parent.play({
			complete: e,
			speed: this.speed || this.parent.speed,
			end: this.end,
			start: this.start,
			loop: this.loop
		});
	}
	destroy() {
		this.parent = null;
	}
}, Va = [
	"ogg",
	"oga",
	"opus",
	"m4a",
	"mp3",
	"mpeg",
	"wav",
	"aiff",
	"wma",
	"mid",
	"caf"
], Ha = ["audio/mpeg", "audio/ogg"], Ua = {};
function Wa(e) {
	let t = {
		m4a: "audio/mp4",
		oga: "audio/ogg",
		opus: "audio/ogg; codecs=\"opus\"",
		caf: "audio/x-caf; codecs=\"opus\"",
		...e || {}
	}, n = document.createElement("audio"), r = {}, i = /^no$/;
	Va.forEach((e) => {
		let a = n.canPlayType(`audio/${e}`).replace(i, ""), o = t[e] ? n.canPlayType(t[e]).replace(i, "") : "";
		r[e] = !!a || !!o;
	}), Object.assign(Ua, r);
}
Wa();
//#endregion
//#region node_modules/@pixi/sound/lib/webaudio/WebAudioInstance.mjs
var Ga = 0, Ka = class extends s {
	constructor(e) {
		super(), this.id = Ga++, this._media = null, this._paused = !1, this._muted = !1, this._elapsed = 0, this.init(e);
	}
	set(e, t) {
		if (this[e] === void 0) throw Error(`Property with name ${e} does not exist.`);
		switch (e) {
			case "speed":
				this.speed = t;
				break;
			case "volume":
				this.volume = t;
				break;
			case "muted":
				this.muted = t;
				break;
			case "loop":
				this.loop = t;
				break;
			case "paused": this.paused = t;
		}
		return this;
	}
	stop() {
		this._source && (this._internalStop(), this.emit("stop"));
	}
	get speed() {
		return this._speed;
	}
	set speed(e) {
		this._speed = e, this.refresh(), this._update(!0);
	}
	get volume() {
		return this._volume;
	}
	set volume(e) {
		this._volume = e, this.refresh();
	}
	get muted() {
		return this._muted;
	}
	set muted(e) {
		this._muted = e, this.refresh();
	}
	get loop() {
		return this._loop;
	}
	set loop(e) {
		this._loop = e, this.refresh();
	}
	get filters() {
		return this._filters;
	}
	set filters(e) {
		this._filters && (this._filters?.filter((e) => e).forEach((e) => e.disconnect()), this._filters = null, this._source.connect(this._gain)), this._filters = e?.length ? e.slice(0) : null, this.refresh();
	}
	refresh() {
		if (!this._source) return;
		let e = this._media.context, t = this._media.parent;
		this._source.loop = this._loop || t.loop;
		let n = e.volume * +!e.muted, r = t.volume * +!t.muted, i = this._volume * +!this._muted;
		Na.setParamValue(this._gain.gain, i * r * n), Na.setParamValue(this._source.playbackRate, this._speed * t.speed * e.speed), this.applyFilters();
	}
	applyFilters() {
		if (this._filters?.length) {
			this._source.disconnect();
			let e = this._source;
			this._filters.forEach((t) => {
				e.connect(t.destination), e = t;
			}), e.connect(this._gain);
		}
	}
	refreshPaused() {
		let e = this._media.context, t = this._media.parent, n = this._paused || t.paused || e.paused;
		n !== this._pausedReal && (this._pausedReal = n, n ? (this._internalStop(), this.emit("paused")) : (this.emit("resumed"), this.play({
			start: this._elapsed % this._duration,
			end: this._end,
			speed: this._speed,
			loop: this._loop,
			volume: this._volume
		})), this.emit("pause", n));
	}
	play(e) {
		let { start: t, end: n, speed: r, loop: i, volume: a, muted: o, filters: s } = e;
		n && console.assert(n > t, "End time is before start time"), this._paused = !1;
		let { source: c, gain: l } = this._media.nodes.cloneBufferSource();
		this._source = c, this._gain = l, this._speed = r, this._volume = a, this._loop = !!i, this._muted = o, this._filters = s, this.refresh();
		let u = this._source.buffer.duration;
		this._duration = u, this._end = n, this._lastUpdate = this._now(), this._elapsed = t, this._source.onended = this._onComplete.bind(this), this._loop ? (this._source.loopEnd = n, this._source.loopStart = t, this._source.start(0, t)) : n ? this._source.start(0, t, n - t) : this._source.start(0, t), this.emit("start"), this._update(!0), this.enableTicker(!0);
	}
	enableTicker(e) {
		F.shared.remove(this._updateListener, this), e && F.shared.add(this._updateListener, this);
	}
	get progress() {
		return this._progress;
	}
	get paused() {
		return this._paused;
	}
	set paused(e) {
		this._paused = e, this.refreshPaused();
	}
	destroy() {
		this.removeAllListeners(), this._internalStop(), this._gain &&= (this._gain.disconnect(), null), this._media &&= (this._media.context.events.off("refresh", this.refresh, this), this._media.context.events.off("refreshPaused", this.refreshPaused, this), null), this._filters?.forEach((e) => e.disconnect()), this._filters = null, this._end = null, this._speed = 1, this._volume = 1, this._loop = !1, this._elapsed = 0, this._duration = 0, this._paused = !1, this._muted = !1, this._pausedReal = !1;
	}
	toString() {
		return `[WebAudioInstance id=${this.id}]`;
	}
	_now() {
		return this._media.context.audioContext.currentTime;
	}
	_updateListener() {
		this._update();
	}
	_update(e = !1) {
		if (this._source) {
			let t = this._now(), n = t - this._lastUpdate;
			if (n > 0 || e) {
				let e = this._source.playbackRate.value;
				this._elapsed += n * e, this._lastUpdate = t;
				let r = this._duration, i;
				if (this._source.loopStart) {
					let e = this._source.loopEnd - this._source.loopStart;
					i = (this._source.loopStart + this._elapsed % e) / r;
				} else i = this._elapsed % r / r;
				this._progress = i, this.emit("progress", this._progress, r);
			}
		}
	}
	init(e) {
		this._media = e, e.context.events.on("refresh", this.refresh, this), e.context.events.on("refreshPaused", this.refreshPaused, this);
	}
	_internalStop() {
		if (this._source) {
			this.enableTicker(!1), this._source.onended = null, this._source.stop(0), this._source.disconnect();
			try {
				this._source.buffer = null;
			} catch (e) {
				console.warn("Failed to set AudioBufferSourceNode.buffer to null:", e);
			}
			this._source = null;
		}
	}
	_onComplete() {
		if (this._source) {
			this.enableTicker(!1), this._source.onended = null, this._source.disconnect();
			try {
				this._source.buffer = null;
			} catch (e) {
				console.warn("Failed to set AudioBufferSourceNode.buffer to null:", e);
			}
		}
		this._source = null, this._progress = 1, this.emit("progress", 1, this._duration), this.emit("end", this);
	}
}, qa = class {
	constructor(e, t) {
		this._output = t, this._input = e;
	}
	get destination() {
		return this._input;
	}
	get filters() {
		return this._filters;
	}
	set filters(e) {
		if (this._filters && (this._filters.forEach((e) => {
			e && e.disconnect();
		}), this._filters = null, this._input.connect(this._output)), e && e.length) {
			this._filters = e.slice(0), this._input.disconnect();
			let t = null;
			e.forEach((e) => {
				t === null ? this._input.connect(e.destination) : t.connect(e.destination), t = e;
			}), t.connect(this._output);
		}
	}
	destroy() {
		this.filters = null, this._input = null, this._output = null;
	}
}, Ja = class extends qa {
	constructor(e) {
		let t = e.audioContext, n = t.createBufferSource(), r = t.createGain(), i = t.createAnalyser();
		n.connect(i), i.connect(r), r.connect(e.destination), super(i, r), this.context = e, this.bufferSource = n, this.gain = r, this.analyser = i;
	}
	get script() {
		return this._script || (this._script = this.context.audioContext.createScriptProcessor(Ja.BUFFER_SIZE), this._script.connect(this.context.destination)), this._script;
	}
	destroy() {
		super.destroy(), this.bufferSource.disconnect(), this._script && this._script.disconnect(), this.gain.disconnect(), this.analyser.disconnect(), this.bufferSource = null, this._script = null, this.gain = null, this.analyser = null, this.context = null;
	}
	cloneBufferSource() {
		let e = this.bufferSource, t = this.context.audioContext.createBufferSource();
		t.buffer = e.buffer, Na.setParamValue(t.playbackRate, e.playbackRate.value), t.loop = e.loop;
		let n = this.context.audioContext.createGain();
		return t.connect(n), n.connect(this.destination), {
			source: t,
			gain: n
		};
	}
	get bufferSize() {
		return this.script.bufferSize;
	}
}, Ya = Ja;
Ya.BUFFER_SIZE = 0;
//#endregion
//#region node_modules/@pixi/sound/lib/webaudio/WebAudioMedia.mjs
var Xa = class {
	init(e) {
		this.parent = e, this._nodes = new Ya(this.context), this._source = this._nodes.bufferSource, this.source = e.options.source;
	}
	destroy() {
		this.parent = null, this._nodes.destroy(), this._nodes = null;
		try {
			this._source.buffer = null;
		} catch (e) {
			console.warn("Failed to set AudioBufferSourceNode.buffer to null:", e);
		}
		this._source = null, this.source = null;
	}
	create() {
		return new Ka(this);
	}
	get context() {
		return this.parent.context;
	}
	get isPlayable() {
		return !!this._source && !!this._source.buffer;
	}
	get filters() {
		return this._nodes.filters;
	}
	set filters(e) {
		this._nodes.filters = e;
	}
	get duration() {
		return console.assert(this.isPlayable, "Sound not yet playable, no duration"), this._source.buffer.duration;
	}
	get buffer() {
		return this._source.buffer;
	}
	set buffer(e) {
		this._source.buffer = e;
	}
	get nodes() {
		return this._nodes;
	}
	load(e) {
		this.source ? this._decode(this.source, e) : this.parent.url ? this._loadUrl(e) : e ? e(/* @__PURE__ */ Error("sound.url or sound.source must be set")) : console.error("sound.url or sound.source must be set");
	}
	async _loadUrl(e) {
		let t = this.parent.url, n = await v.get().fetch(t);
		this._decode(await n.arrayBuffer(), e);
	}
	_decode(e, t) {
		let n = (e, n) => {
			if (e) t && t(e);
			else {
				this.parent.isLoaded = !0, this.buffer = n;
				let e = this.parent.autoPlayStart();
				t && t(null, this.parent, e);
			}
		};
		e instanceof AudioBuffer ? n(null, e) : this.parent.context.decode(e, n);
	}
}, Za = class {
	static from(e) {
		let t = {};
		return typeof e == "string" ? t.url = e : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? t.source = e : Array.isArray(e) ? t.url = e : t = e, t = {
			autoPlay: !1,
			singleInstance: !1,
			url: null,
			source: null,
			preload: !1,
			volume: 1,
			speed: 1,
			complete: null,
			loaded: null,
			loop: !1,
			...t
		}, Object.freeze(t), new Za(ja().useLegacy ? new za() : new Xa(), t);
	}
	constructor(e, t) {
		this.media = e, this.options = t, this._instances = [], this._sprites = {}, this.media.init(this);
		let n = t.complete;
		this._autoPlayOptions = n ? { complete: n } : null, this.isLoaded = !1, this._preloadQueue = null, this.isPlaying = !1, this.autoPlay = t.autoPlay, this.singleInstance = t.singleInstance, this.preload = t.preload || this.autoPlay, this.url = Array.isArray(t.url) ? this.preferUrl(t.url) : t.url, this.speed = t.speed, this.volume = t.volume, this.loop = t.loop, t.sprites && this.addSprites(t.sprites), this.preload && this._preload(t.loaded);
	}
	preferUrl(e) {
		let [t] = e.map((e) => ({
			url: e,
			ext: z.extname(e).slice(1)
		})).filter(({ ext: e }) => Ua[e]).sort((e, t) => Va.indexOf(e.ext) - Va.indexOf(t.ext));
		if (!t) throw Error("No supported file type found");
		return t.url;
	}
	get context() {
		return ja().context;
	}
	pause() {
		return this.isPlaying = !1, this.paused = !0, this;
	}
	resume() {
		return this.isPlaying = this._instances.length > 0, this.paused = !1, this;
	}
	get paused() {
		return this._paused;
	}
	set paused(e) {
		this._paused = e, this.refreshPaused();
	}
	get speed() {
		return this._speed;
	}
	set speed(e) {
		this._speed = e, this.refresh();
	}
	get filters() {
		return this.media.filters;
	}
	set filters(e) {
		this.media.filters = e;
	}
	addSprites(e, t) {
		if (typeof e == "object") {
			let t = {};
			for (let n in e) t[n] = this.addSprites(n, e[n]);
			return t;
		}
		console.assert(!this._sprites[e], `Alias ${e} is already taken`);
		let n = new Ba(this, t);
		return this._sprites[e] = n, n;
	}
	destroy() {
		this._removeInstances(), this.removeSprites(), this.media.destroy(), this.media = null, this._sprites = null, this._instances = null;
	}
	removeSprites(e) {
		if (e) {
			let t = this._sprites[e];
			t !== void 0 && (t.destroy(), delete this._sprites[e]);
		} else for (let e in this._sprites) this.removeSprites(e);
		return this;
	}
	get isPlayable() {
		return this.isLoaded && this.media && this.media.isPlayable;
	}
	stop() {
		if (!this.isPlayable) return this.autoPlay = !1, this._autoPlayOptions = null, this;
		this.isPlaying = !1;
		for (let e = this._instances.length - 1; e >= 0; e--) this._instances[e].stop();
		return this;
	}
	play(e, t) {
		let n;
		if (typeof e == "string" ? n = {
			sprite: e,
			loop: this.loop,
			complete: t
		} : typeof e == "function" ? (n = {}, n.complete = e) : n = e, n = {
			complete: null,
			loaded: null,
			sprite: null,
			end: null,
			start: 0,
			volume: 1,
			speed: 1,
			muted: !1,
			loop: !1,
			...n || {}
		}, n.sprite) {
			let e = n.sprite;
			console.assert(!!this._sprites[e], `Alias ${e} is not available`);
			let t = this._sprites[e];
			n.start = t.start + (n.start || 0), n.end = t.end, n.speed = t.speed || 1, n.loop = t.loop || n.loop, delete n.sprite;
		}
		if (n.offset && (n.start = n.offset), !this.isLoaded) return this._preloadQueue ? new Promise((e) => {
			this._preloadQueue.push(() => {
				e(this.play(n));
			});
		}) : (this._preloadQueue = [], this.autoPlay = !0, this._autoPlayOptions = n, new Promise((e, t) => {
			this._preload((r, i, a) => {
				this._preloadQueue.forEach((e) => e()), this._preloadQueue = null, r ? t(r) : (n.loaded && n.loaded(r, i, a), e(a));
			});
		}));
		(this.singleInstance || n.singleInstance) && this._removeInstances();
		let r = this._createInstance();
		return this._instances.push(r), this.isPlaying = !0, r.once("end", () => {
			n.complete && n.complete(this), this._onComplete(r);
		}), r.once("stop", () => {
			this._onComplete(r);
		}), r.play(n), r;
	}
	refresh() {
		let e = this._instances.length;
		for (let t = 0; t < e; t++) this._instances[t].refresh();
	}
	refreshPaused() {
		let e = this._instances.length;
		for (let t = 0; t < e; t++) this._instances[t].refreshPaused();
	}
	get volume() {
		return this._volume;
	}
	set volume(e) {
		this._volume = e, this.refresh();
	}
	get muted() {
		return this._muted;
	}
	set muted(e) {
		this._muted = e, this.refresh();
	}
	get loop() {
		return this._loop;
	}
	set loop(e) {
		this._loop = e, this.refresh();
	}
	_preload(e) {
		this.media.load(e);
	}
	get instances() {
		return this._instances;
	}
	get sprites() {
		return this._sprites;
	}
	get duration() {
		return this.media.duration;
	}
	autoPlayStart() {
		let e;
		return this.autoPlay && (e = this.play(this._autoPlayOptions)), e;
	}
	_removeInstances() {
		for (let e = this._instances.length - 1; e >= 0; e--) this._poolInstance(this._instances[e]);
		this._instances.length = 0;
	}
	_onComplete(e) {
		if (this._instances) {
			let t = this._instances.indexOf(e);
			t > -1 && this._instances.splice(t, 1), this.isPlaying = this._instances.length > 0;
		}
		this._poolInstance(e);
	}
	_createInstance() {
		if (Za._pool.length > 0) {
			let e = Za._pool.pop();
			return e.init(this.media), e;
		}
		return this.media.create();
	}
	_poolInstance(e) {
		e.destroy(), Za._pool.indexOf(e) < 0 && Za._pool.push(e);
	}
}, Qa = Za;
Qa._pool = [];
//#endregion
//#region node_modules/@pixi/sound/lib/webaudio/WebAudioContext.mjs
var $a = class e extends qa {
	constructor() {
		let t = window, n = new e.AudioContext(), r = n.createDynamicsCompressor(), i = n.createAnalyser();
		i.connect(r), r.connect(n.destination), super(i, r), this.autoPause = !0, this._ctx = n, this._offlineCtx = new e.OfflineAudioContext(1, 2, t.OfflineAudioContext ? Math.max(8e3, Math.min(96e3, n.sampleRate)) : 44100), this.compressor = r, this.analyser = i, this.events = new s(), this.volume = 1, this.speed = 1, this.muted = !1, this.paused = !1, this._locked = n.state === "suspended" && ("ontouchstart" in globalThis || "onclick" in globalThis), this._locked && (this._unlock(), this._unlock = this._unlock.bind(this), document.addEventListener("mousedown", this._unlock, !0), document.addEventListener("touchstart", this._unlock, !0), document.addEventListener("touchend", this._unlock, !0)), this.onFocus = this.onFocus.bind(this), this.onBlur = this.onBlur.bind(this), globalThis.addEventListener("focus", this.onFocus), globalThis.addEventListener("blur", this.onBlur);
	}
	onFocus() {
		if (!this.autoPause) return;
		let e = this._ctx.state;
		(e === "suspended" || e === "interrupted" || !this._locked) && (this.paused = this._pausedOnBlur, this.refreshPaused());
	}
	onBlur() {
		this.autoPause && (this._locked || (this._pausedOnBlur = this._paused, this.paused = !0, this.refreshPaused()));
	}
	_unlock() {
		this._locked && (this.playEmptySound(), this._ctx.state === "running" && (document.removeEventListener("mousedown", this._unlock, !0), document.removeEventListener("touchend", this._unlock, !0), document.removeEventListener("touchstart", this._unlock, !0), this._locked = !1));
	}
	playEmptySound() {
		let e = this._ctx.createBufferSource();
		e.buffer = this._ctx.createBuffer(1, 1, 22050), e.connect(this._ctx.destination), e.start(0, 0, 0), e.context.state === "suspended" && e.context.resume();
	}
	static get AudioContext() {
		let e = window;
		return e.AudioContext || e.webkitAudioContext || null;
	}
	static get OfflineAudioContext() {
		let e = window;
		return e.OfflineAudioContext || e.webkitOfflineAudioContext || null;
	}
	destroy() {
		super.destroy();
		let e = this._ctx;
		e.close !== void 0 && e.close(), globalThis.removeEventListener("focus", this.onFocus), globalThis.removeEventListener("blur", this.onBlur), this.events.removeAllListeners(), this.analyser.disconnect(), this.compressor.disconnect(), this.analyser = null, this.compressor = null, this.events = null, this._offlineCtx = null, this._ctx = null;
	}
	get audioContext() {
		return this._ctx;
	}
	get offlineContext() {
		return this._offlineCtx;
	}
	set paused(e) {
		e && this._ctx.state === "running" ? this._ctx.suspend() : !e && this._ctx.state === "suspended" && this._ctx.resume(), this._paused = e;
	}
	get paused() {
		return this._paused;
	}
	refresh() {
		this.events.emit("refresh");
	}
	refreshPaused() {
		this.events.emit("refreshPaused");
	}
	toggleMute() {
		return this.muted = !this.muted, this.refresh(), this.muted;
	}
	togglePause() {
		return this.paused = !this.paused, this.refreshPaused(), this._paused;
	}
	decode(e, t) {
		let n = (e) => {
			t(Error(e?.message || "Unable to decode file"));
		}, r = this._offlineCtx.decodeAudioData(e, (e) => {
			t(null, e);
		}, n);
		r && r.catch(n);
	}
}, eo = class {
	constructor() {
		this.init();
	}
	init() {
		return this.supported && (this._webAudioContext = new $a()), this._htmlAudioContext = new Fa(), this._sounds = {}, this.useLegacy = !this.supported, this;
	}
	get context() {
		return this._context;
	}
	get filtersAll() {
		return this.useLegacy ? [] : this._context.filters;
	}
	set filtersAll(e) {
		this.useLegacy || (this._context.filters = e);
	}
	get supported() {
		return $a.AudioContext !== null;
	}
	add(e, t) {
		if (typeof e == "object") {
			let n = {};
			for (let r in e) {
				let i = this._getOptions(e[r], t);
				n[r] = this.add(r, i);
			}
			return n;
		}
		if (console.assert(!this._sounds[e], `Sound with alias ${e} already exists.`), t instanceof Qa) return this._sounds[e] = t, t;
		let n = this._getOptions(t), r = Qa.from(n);
		return this._sounds[e] = r, r;
	}
	_getOptions(e, t) {
		let n;
		return n = typeof e == "string" || Array.isArray(e) ? { url: e } : e instanceof ArrayBuffer || e instanceof AudioBuffer || e instanceof HTMLAudioElement ? { source: e } : e, n = {
			...n,
			...t || {}
		}, n;
	}
	get useLegacy() {
		return this._useLegacy;
	}
	set useLegacy(e) {
		this._useLegacy = e, this._context = !e && this.supported ? this._webAudioContext : this._htmlAudioContext;
	}
	get disableAutoPause() {
		return !this._webAudioContext.autoPause;
	}
	set disableAutoPause(e) {
		this._webAudioContext.autoPause = !e;
	}
	remove(e) {
		return this.exists(e, !0), this._sounds[e].destroy(), delete this._sounds[e], this;
	}
	get volumeAll() {
		return this._context.volume;
	}
	set volumeAll(e) {
		this._context.volume = e, this._context.refresh();
	}
	get speedAll() {
		return this._context.speed;
	}
	set speedAll(e) {
		this._context.speed = e, this._context.refresh();
	}
	togglePauseAll() {
		return this._context.togglePause();
	}
	pauseAll() {
		return this._context.paused = !0, this._context.refreshPaused(), this;
	}
	resumeAll() {
		return this._context.paused = !1, this._context.refreshPaused(), this;
	}
	toggleMuteAll() {
		return this._context.toggleMute();
	}
	muteAll() {
		return this._context.muted = !0, this._context.refresh(), this;
	}
	unmuteAll() {
		return this._context.muted = !1, this._context.refresh(), this;
	}
	removeAll() {
		for (let e in this._sounds) this._sounds[e].destroy(), delete this._sounds[e];
		return this;
	}
	stopAll() {
		for (let e in this._sounds) this._sounds[e].stop();
		return this;
	}
	exists(e, t = !1) {
		let n = !!this._sounds[e];
		return t && console.assert(n, `No sound matching alias '${e}'.`), n;
	}
	isPlaying() {
		for (let e in this._sounds) if (this._sounds[e].isPlaying) return !0;
		return !1;
	}
	find(e) {
		return this.exists(e, !0), this._sounds[e];
	}
	play(e, t) {
		return this.find(e).play(t);
	}
	stop(e) {
		return this.find(e).stop();
	}
	pause(e) {
		return this.find(e).pause();
	}
	resume(e) {
		return this.find(e).resume();
	}
	volume(e, t) {
		let n = this.find(e);
		return t !== void 0 && (n.volume = t), n.volume;
	}
	speed(e, t) {
		let n = this.find(e);
		return t !== void 0 && (n.speed = t), n.speed;
	}
	duration(e) {
		return this.find(e).duration;
	}
	close() {
		return this.removeAll(), this._sounds = null, this._webAudioContext &&= (this._webAudioContext.destroy(), null), this._htmlAudioContext &&= (this._htmlAudioContext.destroy(), null), this._context = null, this;
	}
}, to = (e) => {
	let t = e.src, n = e?.alias?.[0];
	return (!n || e.src === n) && (n = z.basename(t, z.extname(t))), n;
}, no = {
	extension: D.Asset,
	detection: {
		test: async () => !0,
		add: async (e) => [...e, ...Va.filter((e) => Ua[e])],
		remove: async (e) => e.filter((t) => e.includes(t))
	},
	loader: {
		name: "sound",
		extension: {
			type: [D.LoadParser],
			priority: V.High
		},
		test(e) {
			return !!Ua[z.extname(e).slice(1)] || Ha.some((t) => e.startsWith(`data:${t}`));
		},
		async load(e, t) {
			let n = await new Promise((n, r) => Qa.from({
				...t.data,
				url: e,
				preload: !0,
				loaded(e, i) {
					e ? r(e) : n(i), t.data?.loaded?.(e, i);
				}
			}));
			return ja().add(to(t), n), n;
		},
		async unload(e, t) {
			ja().remove(to(t));
		}
	}
};
e.add(no);
//#endregion
//#region node_modules/@pixi/sound/lib/index.mjs
var ro = Aa(new eo()), io = async (e, ...t) => {
	let { default: n } = await (WebAssembly.validate(new Uint8Array([
		0,
		97,
		115,
		109,
		1,
		0,
		0,
		0,
		1,
		5,
		1,
		96,
		0,
		1,
		123,
		3,
		2,
		1,
		0,
		10,
		10,
		1,
		8,
		0,
		65,
		0,
		253,
		15,
		253,
		98,
		11
	])) && (typeof window > "u" || window.crossOriginIsolated === !0) ? import("./Box2D.deluxe-BeOOWrLF.js") : import("./Box2D.compat-wwASP0_G.js"));
	return await n(e, ...t);
}, ao = function() {
	var e = 0, t = document.createElement("div");
	t.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", t.addEventListener("click", function(n) {
		n.preventDefault(), r(++e % t.children.length);
	}, !1);
	function n(e) {
		return t.appendChild(e.dom), e;
	}
	function r(n) {
		for (var r = 0; r < t.children.length; r++) t.children[r].style.display = r === n ? "block" : "none";
		e = n;
	}
	var i = (performance || Date).now(), a = i, o = 0, s = n(new ao.Panel("FPS", "#0ff", "#002")), c = n(new ao.Panel("MS", "#0f0", "#020"));
	if (self.performance && self.performance.memory) var l = n(new ao.Panel("MB", "#f08", "#201"));
	return r(0), {
		REVISION: 16,
		dom: t,
		addPanel: n,
		showPanel: r,
		begin: function() {
			i = (performance || Date).now();
		},
		end: function() {
			o++;
			var e = (performance || Date).now();
			if (c.update(e - i, 200), e >= a + 1e3 && (s.update(o * 1e3 / (e - a), 100), a = e, o = 0, l)) {
				var t = performance.memory;
				l.update(t.usedJSHeapSize / 1048576, t.jsHeapSizeLimit / 1048576);
			}
			return e;
		},
		update: function() {
			i = this.end();
		},
		domElement: t,
		setMode: r
	};
};
ao.Panel = function(e, t, n) {
	var r = Infinity, i = 0, a = Math.round, o = a(window.devicePixelRatio || 1), s = 80 * o, c = 48 * o, l = 3 * o, u = 2 * o, d = 3 * o, f = 15 * o, p = 74 * o, m = 30 * o, h = document.createElement("canvas");
	h.width = s, h.height = c, h.style.cssText = "width:80px;height:48px";
	var g = h.getContext("2d");
	return g.font = "bold " + 9 * o + "px Helvetica,Arial,sans-serif", g.textBaseline = "top", g.fillStyle = n, g.fillRect(0, 0, s, c), g.fillStyle = t, g.fillText(e, l, u), g.fillRect(d, f, p, m), g.fillStyle = n, g.globalAlpha = .9, g.fillRect(d, f, p, m), {
		dom: h,
		update: function(c, _) {
			r = Math.min(r, c), i = Math.max(i, c), g.fillStyle = n, g.globalAlpha = 1, g.fillRect(0, 0, s, f), g.fillStyle = t, g.fillText(a(c) + " " + e + " (" + a(r) + "-" + a(i) + ")", l, u), g.drawImage(h, d + o, f, p - o, m, d, f, p - o, m), g.fillRect(d + p - o, f, o, m), g.fillStyle = n, g.globalAlpha = .9, g.fillRect(d + p - o, f, o, a((1 - c / _) * m));
		}
	};
};
//#endregion
//#region Frontend/stats/overlays.ts
var oo = 56, so = null, co = !1, lo = null, uo = () => {
	so && co && so.update();
};
function fo(e) {
	so || (so = new ao(), so.showPanel(0), so.dom.style.top = `${oo}px`, so.dom.style.left = "0px", so.dom.style.display = "none", document.body.appendChild(so.dom), lo = e, lo.add(uo));
}
function po() {
	so && (co = !co, so.dom.style.display = co ? "block" : "none");
}
var mo = null, ho = !1;
function go() {
	mo || (mo = document.createElement("div"), mo.style.cssText = "position:fixed;top:56px;left:0;z-index:10000;display:none;pointer-events:none;font:bold 11px monospace;color:#4ade80;background:rgba(2,6,23,0.9);padding:6px 8px;white-space:pre;", mo.textContent = "C# ECS: waiting for telemetry...", document.body.appendChild(mo));
}
function _o() {
	mo && (ho = !ho, mo.style.display = ho ? "block" : "none");
}
function vo(e) {
	mo && (mo.textContent = `C# ECS\nentities: ${e.entityCount}\nsignal: #${e.seq}\ntick: ${e.tickMs.toFixed(1)} ms`);
}
function yo(e) {
	if (e.length < 6) throw Error(`signal buffer too short for header: ${e.length} < 6`);
	return {
		seq: e[0],
		epoch: e[1],
		entityCount: e[2],
		stride: e[3],
		stepMs: e[4],
		tickMs: e[5]
	};
}
function bo(e, t, n = 6) {
	let r = yo(e), i = [];
	for (let a = 0; a < r.entityCount; a++) i.push(t(e, n + a * r.stride));
	return {
		header: r,
		states: i
	};
}
function Q(e) {
	return e !== 0;
}
//#endregion
//#region Frontend/scenes/interpolation.ts
var xo = 1, So = class {
	entries = /* @__PURE__ */ new Map();
	lastSeq = -1;
	epoch = null;
	lastSignalAt = 0;
	dirty = !1;
	ingest(e, t, n, r = performance.now()) {
		if (n !== void 0 && this.epoch !== null && n !== this.epoch && (this.entries.clear(), this.lastSeq = -1), t !== void 0 && t <= this.lastSeq) return !1;
		n !== void 0 && (this.epoch = n), t !== void 0 && (this.lastSeq = t), this.lastSignalAt = r, this.dirty = !0;
		let i = /* @__PURE__ */ new Set();
		for (let t of e) {
			i.add(t.id);
			let e = this.entries.get(t.id);
			e ? (e.previous = e.current, e.current = t, e.receivedAt = r) : this.entries.set(t.id, {
				previous: t,
				current: t,
				receivedAt: r
			});
		}
		for (let e of this.entries.keys()) i.has(e) || this.entries.delete(e);
		return !0;
	}
	alpha(e, t = performance.now()) {
		let n = Math.max(1, e), r = (t - this.lastSignalAt) / n;
		return 1 + Math.min(xo, r);
	}
	advance(e, t = performance.now()) {
		let n = this.alpha(e, t);
		return this.dirty ? (this.dirty = !1, n) : n < 2 ? n : null;
	}
	ingestFromBuffer(e, t, n = 6, r = performance.now()) {
		let { header: i, states: a } = bo(e, t, n);
		return this.ingest(a, i.seq, i.epoch, r) ? i : null;
	}
	values() {
		return this.entries.values();
	}
	clear() {
		this.entries.clear(), this.lastSeq = -1, this.epoch = null, this.lastSignalAt = performance.now(), this.dirty = !0;
	}
	removeWhere(e) {
		for (let t of this.entries.keys()) e(t) && this.entries.delete(t);
	}
};
function Co(e, t, n) {
	return e + (t - e) * n;
}
function wo(e, t, n) {
	let r = t - e;
	return r > Math.PI && (r -= Math.PI * 2), r < -Math.PI && (r += Math.PI * 2), e + r * n;
}
function To(e, t, n, r) {
	let i = t - e;
	i > r / 2 && (i -= r), i < -r / 2 && (i += r);
	let a = e + i * n;
	for (; a < 0;) a += r;
	for (; a >= r;) a -= r;
	return a;
}
function Eo(e) {
	return Math.min(Math.max(e, 0) / 1e3, 1 / 30);
}
var Do = null;
function Oo(e) {
	Do = e;
}
function ko(e) {
	let t = Do;
	if (!t) return console.error("[pixi-debug] RENDER_SOURCE is \"local-buffer\" but no local buffer provider is registered. This bundle must be served by the co-located Game.Wasm host (ADR-007 Phase 2/3). Either run it under that host, or rebuild the frontend with `npm run build:web` (SSE mode)."), null;
	let n = {
		addSignalListener: () => {},
		addBufferListener: (e, n) => t.onSignal(e, n),
		postCommand: async (e, n) => {
			if (!t.postCommand) {
				console.warn(`[pixi-debug] local provider has no command handler for ${e}`);
				return;
			}
			t.postCommand(e, n);
		},
		close: () => t.close?.(),
		onInterrupted: () => {}
	};
	return Ao(n, e), n;
}
function Ao(e, t) {
	let n = t?.match(/^\/?api\/([a-z-]+)\/stream$/)?.[1];
	n && e.postCommand(`/api/${n}/connect`);
}
//#endregion
//#region Frontend/scenes/asteroids.ts
var jo = 0, Mo = 1, No = 2, Po = 3, Fo = 4, Io = 5, Lo = [
	[0, -16],
	[4, 0],
	[8, 16],
	[2.4, 9.6],
	[-2.4, 9.6],
	[-8, 16],
	[-4, 0]
], Ro = [
	[-24, 0],
	[-12, -6],
	[-6, -6],
	[-6, -12],
	[6, -12],
	[6, -6],
	[12, -6],
	[24, 0],
	[12, 6],
	[-12, 6]
], zo = "_content/Game.UI/audio/", Bo = /* @__PURE__ */ new Set();
function Vo(e, t) {
	Bo.has(e) || (ro.add(e, `${zo}${t}`), Bo.add(e));
}
function Ho(e, t) {
	Vo(e, t), ro.play(e);
}
function Uo(e, t, n) {
	Vo(e, t), n ? ro.play(e, {
		loop: !0,
		volume: .25
	}) : ro.stop(e);
}
var Wo = (...e) => console.log("[pixi-debug] asteroids:", ...e);
function Go(e, t, n) {
	let r = Math.sin(e * 127.1 + t * 311.7) * 43758.5453;
	return n * (.75 + .45 * (r - Math.floor(r)));
}
function Ko(e, t, n, r) {
	return [e * n - t * r, e * r + t * n];
}
function qo() {
	let e = document.createElement("canvas");
	e.width = 32, e.height = 32;
	let t = e.getContext("2d");
	if (t) {
		let e = t.createRadialGradient(16, 16, 0, 16, 16, 16);
		e.addColorStop(0, "rgba(255,255,255,1)"), e.addColorStop(.4, "rgba(255,255,255,0.8)"), e.addColorStop(1, "rgba(255,255,255,0)"), t.fillStyle = e, t.fillRect(0, 0, 32, 32);
	}
	return T.from(e);
}
var Jo = (e) => ({
	lifetime: {
		min: .35,
		max: .7
	},
	frequency: 0,
	particlesPerWave: 70,
	emitterLifetime: .06,
	maxParticles: 160,
	pos: {
		x: 0,
		y: 0
	},
	addAtBack: !1,
	autoUpdate: !1,
	behaviors: [
		{
			type: "spawnShape",
			config: {
				type: "torus",
				data: {
					x: 0,
					y: 0,
					radius: 2,
					affectRotation: !0
				}
			}
		},
		{
			type: "moveSpeed",
			config: {
				speed: { list: [{
					value: 420,
					time: 0
				}, {
					value: 40,
					time: 1
				}] },
				minMult: .6
			}
		},
		{
			type: "alpha",
			config: { alpha: { list: [{
				value: 1,
				time: 0
			}, {
				value: 0,
				time: 1
			}] } }
		},
		{
			type: "scale",
			config: {
				scale: { list: [{
					value: 1,
					time: 0
				}, {
					value: .25,
					time: 1
				}] },
				minMult: .5
			}
		},
		{
			type: "color",
			config: { color: { list: [
				{
					value: "ffffff",
					time: 0
				},
				{
					value: "ff8c00",
					time: .6
				},
				{
					value: "442200",
					time: 1
				}
			] } }
		},
		{
			type: "rotationStatic",
			config: {
				min: 0,
				max: 360
			}
		},
		{
			type: "textureSingle",
			config: { texture: e }
		}
	]
}), Yo = (e) => ({
	lifetime: {
		min: .18,
		max: .32
	},
	frequency: .008,
	spawnChance: 1,
	particlesPerWave: 1,
	maxParticles: 120,
	pos: {
		x: 0,
		y: 0
	},
	addAtBack: !1,
	autoUpdate: !1,
	behaviors: [
		{
			type: "spawnShape",
			config: {
				type: "rect",
				data: {
					x: -2,
					y: 0,
					w: 4,
					h: 2
				}
			}
		},
		{
			type: "moveSpeed",
			config: {
				speed: { list: [{
					value: 240,
					time: 0
				}, {
					value: 20,
					time: 1
				}] },
				minMult: .5
			}
		},
		{
			type: "alpha",
			config: { alpha: { list: [{
				value: .9,
				time: 0
			}, {
				value: 0,
				time: 1
			}] } }
		},
		{
			type: "scale",
			config: {
				scale: { list: [{
					value: 1.2,
					time: 0
				}, {
					value: .3,
					time: 1
				}] },
				minMult: .5
			}
		},
		{
			type: "color",
			config: { color: { list: [
				{
					value: "ffffff",
					time: 0
				},
				{
					value: "ffa500",
					time: .4
				},
				{
					value: "ff3300",
					time: 1
				}
			] } }
		},
		{
			type: "rotationStatic",
			config: {
				min: 168,
				max: 192
			}
		},
		{
			type: "textureSingle",
			config: { texture: e }
		}
	]
});
function Xo(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.id == "number" && typeof t.x == "number" && typeof t.y == "number" && typeof t.rotation == "number" && typeof t.kind == "number" && typeof t.size == "number";
}
function Zo(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.seq == "number" && typeof t.entityCount == "number" && typeof t.tickMs == "number" && Array.isArray(t.sprites) && t.sprites.every(Xo) && typeof t.score == "number" && typeof t.highScore == "number" && typeof t.lives == "number" && typeof t.level == "number" && typeof t.gameOver == "boolean" && typeof t.started == "boolean" && typeof t.thrustOn == "boolean";
}
var Qo = (e, t) => {
	let n = (t ?? {}).asteroids ?? {};
	e.renderer.background.color = "#020617";
	let r = n.courtWidth ?? 800, i = n.courtHeight ?? 600, a = new k(), o = Math.min(e.screen.width / r, e.screen.height / i);
	a.scale.set(o), a.x = (e.screen.width - r * o) / 2, a.y = (e.screen.height - i * o) / 2, e.stage.addChild(a);
	let s = new K();
	a.addChild(s), a.filters = [new ti({
		distance: 12,
		outerStrength: 2.2,
		innerStrength: .6,
		color: 5089023,
		quality: .5
	})];
	let c = new J({
		text: "SCORE: 000000",
		style: new ke({
			fontFamily: "monospace",
			fontSize: 16,
			fontWeight: "bold",
			fill: "#e2e8f0"
		})
	});
	c.position.set(12, 12), e.stage.addChild(c);
	let l = new J({
		text: "HI: 000000",
		style: new ke({
			fontFamily: "monospace",
			fontSize: 16,
			fontWeight: "bold",
			fill: "#64748b"
		})
	});
	l.anchor.set(.5, 0), l.position.set(e.screen.width / 2, 12), e.stage.addChild(l);
	let u = new J({
		text: "^".repeat(2),
		style: new ke({
			fontFamily: "monospace",
			fontSize: 18,
			fontWeight: "bold",
			fill: "#34d399"
		})
	});
	u.anchor.set(1, 0), u.position.set(e.screen.width - 12, 12), e.stage.addChild(u);
	let d = document.createElement("div");
	d.style.cssText = "position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.55);z-index:5;";
	let f = document.createElement("div");
	f.style.cssText = "font:bold 2rem sans-serif;color:#4da6ff;text-align:center;";
	let p = document.createElement("button");
	p.type = "button", p.textContent = "START GAME", p.style.cssText = "background-color:#4da6ff;color:#020617;border:none;border-radius:0.5rem;padding:0.75rem 2rem;font-size:1.1rem;font-weight:bold;cursor:pointer;";
	let m = document.createElement("div");
	m.style.cssText = "color:#94a3b8;font:0.85rem sans-serif;text-align:center;", m.textContent = "ARROWS/A-D rotate · W/UP thrust · SPACE fire · H hyperspace", d.append(f, p, m), document.body.appendChild(d);
	let h = n.started ?? !1, g = n.gameOver ?? !1, _ = n.score ?? 0, v = n.highScore ?? 0, y = n.lives ?? 3, b = !1, x = g, S = null, C = () => {
		if (h && !g) {
			d.style.display = "none";
			return;
		}
		d.style.display = "flex", f.textContent = g ? `GAME OVER - SCORE: ${_}` : "ASTEROIDS", p.textContent = g ? "PLAY AGAIN" : "START GAME";
	}, w = () => {
		h && !g || (Wo("starting game (button or space)"), S?.postCommand("/api/asteroids/start").then(() => {
			h = !0, g = !1, C();
		}).catch((e) => console.error("[pixi-debug] asteroids start failed:", e)));
	};
	p.addEventListener("click", w);
	let T = new So(), E = 1e3 / 60, D = null, O = null, A = new Gr({ dynamicProperties: {
		position: !0,
		rotation: !0,
		scale: !0,
		color: !0
	} });
	a.addChild(A);
	let j = qo(), M = null;
	M = new X(A, Yo(j), j), M.updateOwnerPos(r / 2, i / 2), M.emit = !1;
	let N = [], P = /* @__PURE__ */ new Set(), ee = (e, t) => {
		let n = new X(A, Jo(j), j);
		n.updateOwnerPos(e, t), n.playOnceAndDestroy(() => {
			let e = N.indexOf(n);
			e >= 0 && N.splice(e, 1), n.destroy();
		}), N.push(n);
	}, F = null, I = null, L = [], R = new K();
	a.addChild(R);
	let z = async () => {
		if (I) return;
		F ||= await io();
		let e = F.b2DefaultWorldDef();
		e.gravity = new F.b2Vec2(0, 0), I = F.b2CreateWorld(e), Wo("box2d3-wasm world initialized");
	}, B = async (e, t) => {
		if (await z(), !I || !F) return;
		let n = F;
		for (let r = 0; r < 10; r++) {
			let r = 2 + Math.random() * 4, i = Math.random() * Math.PI * 2, a = 120 + Math.random() * 240, o = n.b2DefaultBodyDef();
			o.type = n.b2BodyType.b2_dynamicBody, o.position = new n.b2Vec2(e, t), o.linearVelocity = new n.b2Vec2(Math.cos(i) * a, Math.sin(i) * a);
			let s = n.b2CreateBody(I, o), c = n.b2DefaultShapeDef();
			c.material.friction = 0, c.material.restitution = .6, n.b2CreatePolygonShape(s, c, n.b2MakeBox(r, r)), L.push({
				body: s,
				radius: r,
				born: performance.now()
			});
		}
	}, te = (e, t, n) => {
		let r = Math.cos(t.rotation), i = Math.sin(t.rotation), a = [];
		for (let [e, n] of Lo) {
			let [o, s] = Ko(e, n, r, i);
			a.push(o + t.x, s + t.y);
		}
		e.poly(a).fill(n);
	}, ne = (e, t, n) => {
		let r = [], i = t.size > 0 ? t.size : 18;
		for (let e = 0; e < 9; e++) {
			let n = t.rotation + Math.PI * 2 * e / 9, a = Go(t.id, e, i);
			r.push(t.x + Math.cos(n) * a, t.y + Math.sin(n) * a);
		}
		e.poly(r).stroke({
			width: 2,
			color: n
		});
	}, V = (e, t, n) => {
		let r = Math.cos(t.rotation), i = Math.sin(t.rotation), a = [];
		for (let [e, n] of Ro) {
			let [o, s] = Ko(e, n, r, i);
			a.push(o + t.x, s + t.y);
		}
		e.poly(a).stroke({
			width: 2,
			color: n
		});
	}, H = (e, t, n) => {
		let r = Math.cos(t.rotation), i = Math.sin(t.rotation), [a, o] = Ko(0, -8, r, i), [s, c] = Ko(0, 8, r, i);
		e.moveTo(t.x - a, t.y - o).lineTo(t.x + s, t.y + c).stroke({
			width: 2,
			color: n
		});
	}, U = (e, t, n) => {
		let r = Math.max(0, Math.min(1, t.size)), i = 8 + r * 44;
		e.circle(t.x, t.y, i).stroke({
			width: 2,
			color: n,
			alpha: 1 - r * .9
		});
	}, re = (e) => {
		D = null, s.clear();
		for (let t of T.values()) {
			let { previous: n, current: a } = t, o = To(n.x, a.x, e, r), c = To(n.y, a.y, e, i), l = wo(n.rotation, a.rotation, e), u = a.r << 16 | a.g << 8 | a.b, d = {
				...a,
				x: o,
				y: c,
				rotation: l
			};
			switch (a.kind === jo && (D = d), a.kind) {
				case jo:
					te(s, d, u);
					break;
				case Mo:
					ne(s, d, u);
					break;
				case No:
					s.circle(o, c, 2.5).fill(u);
					break;
				case Po:
					V(s, d, u);
					break;
				case Fo:
					H(s, d, u);
					break;
				case Io: U(s, d, u);
			}
		}
	}, ie = (e, t, n, r, i) => {
		c.text = `SCORE: ${String(e).padStart(6, "0")}`, l.text = `HI: ${String(t).padStart(6, "0")}`, u.text = "^".repeat(Math.max(0, n - 1)), _ = e, v = t, y = n, g = r, h = i, g && !x && (Wo("game ended (ECS signal) - score", _), Ho("asteroids-endgame", "asteroids-explode3.wav")), x = g, C();
	};
	T.ingest((n.sprites ?? []).filter(Xo)), ie(_, v, y, g, h);
	let ae = !1, W = !1, G = !1, oe = (e, t, n, r, i) => {
		S?.postCommand("/api/asteroids/input", JSON.stringify({
			thrust: e,
			left: t,
			right: n,
			fire: r,
			hyperspace: i
		})).catch((e) => console.error("[pixi-debug] asteroids input failed:", e));
	}, se = (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault(), h && !g ? e.key === " " && !e.repeat && oe(ae, W, G, !0, !1) : w();
			return;
		}
		if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
			e.preventDefault(), ae = !0, oe(!0, W, G, !1, !1);
			return;
		}
		if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
			e.preventDefault(), W = !0, oe(ae, !0, G, !1, !1);
			return;
		}
		if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
			e.preventDefault(), G = !0, oe(ae, W, !0, !1, !1);
			return;
		}
		(e.key === "h" || e.key === "H") && (e.preventDefault(), e.repeat || oe(ae, W, G, !1, !0));
	}, ce = (e) => {
		e.key === "ArrowUp" || e.key === "w" || e.key === "W" ? (ae = !1, oe(!1, W, G, !1, !1)) : e.key === "ArrowLeft" || e.key === "a" || e.key === "A" ? (W = !1, oe(ae, !1, G, !1, !1)) : (e.key === "ArrowRight" || e.key === "d" || e.key === "D") && (G = !1, oe(ae, W, !1, !1, !1));
	};
	window.addEventListener("keydown", se), window.addEventListener("keyup", ce);
	let le = (e) => {
		let t = Eo(e.deltaMS), n = T.advance(E);
		if (n !== null && re(n), M) {
			let e = D;
			if (e && b && h && !g) {
				let t = e.x - Math.sin(e.rotation) * 14, n = e.y + Math.cos(e.rotation) * 14;
				M.updateOwnerPos(t, n), M.rotate(e.rotation * 180 / Math.PI + 180), M.emit = !0;
			} else M.emit = !1;
			M.update(t);
		}
		for (let e of N) e.update(t);
		if (I && F && L.length > 0) {
			F.b2World_Step(I, t, 4);
			let e = performance.now();
			R.clear();
			for (let t = L.length - 1; t >= 0; t--) {
				let n = L[t];
				if (e - n.born > 1800) {
					F.b2DestroyBody(n.body), L.splice(t, 1);
					continue;
				}
				let r = F.b2Body_GetPosition(n.body);
				R.circle(r.x, r.y, n.radius).fill(16752762);
			}
		}
	};
	if (e.ticker.add(le), Wo("scene boot: screen", e.screen.width, "x", e.screen.height, "court", r, "x", i, "sprites", (n.sprites ?? []).length, "started", h, "gameOver", g, "stream", n.streamUrl), S = ko(n.streamUrl), !S) return;
	Wo("SSE connected:", n.streamUrl);
	let ue = (e) => {
		try {
			if (vo({
				seq: e.seq,
				entityCount: e.entityCount,
				tickMs: e.tickMs
			}), E = Math.max(1, e.stepMs ?? 1e3 / 60), e.epoch !== void 0 && e.epoch !== O) {
				if (O !== null) {
					P.clear();
					for (let e of N.splice(0)) e.destroy();
					if (R.clear(), I && F) for (let e of L.splice(0)) F.b2DestroyBody(e.body);
				}
				O = e.epoch;
			}
			if (T.ingest(e.sprites, e.seq, e.epoch), ie(e.score, e.highScore, e.lives, e.gameOver, e.started), e.exploded) for (let t of e.sprites) t.kind !== Io || P.has(t.id) || (P.add(t.id), ee(t.x, t.y), B(t.x, t.y), Ho(`asteroids-explode${1 + Math.floor(Math.random() * 3)}`, `asteroids-explode${1 + Math.floor(Math.random() * 3)}.wav`));
			e.fired && Ho("asteroids-fire", "asteroids-fire.wav"), e.saucerSpawned && (Wo("ECS event: saucer spawned"), Ho("asteroids-ssaucer", "asteroids-ssaucer.wav")), e.lifeGained && (Wo("ECS event: extra ship"), Ho("asteroids-life", "asteroids-life.wav")), e.levelUp && (Wo("ECS event: new belt, level", e.level), Ho("asteroids-thumphi", "asteroids-thumphi.wav")), e.thrustOn !== b && (b = e.thrustOn, Uo("asteroids-thrust", "asteroids-thrust.wav", b));
		} catch (e) {
			console.error("[pixi-debug] asteroids-move apply failed:", e);
		}
	};
	S.addSignalListener("asteroids-move", (e) => {
		try {
			let t = JSON.parse(e);
			if (!Zo(t)) throw Error("invalid asteroids render signal");
			ue(t);
		} catch (e) {
			console.error("[pixi-debug] asteroids-move parse failed:", e);
		}
	});
	let de = (e, t) => ({
		id: e[t],
		x: e[t + 1],
		y: e[t + 2],
		rotation: e[t + 3],
		vx: e[t + 4],
		vy: e[t + 5],
		kind: e[t + 6],
		size: e[t + 7],
		r: e[t + 8],
		g: e[t + 9],
		b: e[t + 10]
	});
	S.addBufferListener("asteroids-move", (e) => {
		try {
			let { header: t, states: n } = bo(e, de, 18);
			ue({
				seq: t.seq,
				entityCount: t.entityCount,
				tickMs: t.tickMs,
				stepMs: t.stepMs,
				epoch: t.epoch,
				sprites: n,
				score: e[6],
				highScore: e[7],
				lives: e[8],
				level: e[9],
				gameOver: Q(e[10]),
				started: Q(e[11]),
				thrustOn: Q(e[12]),
				exploded: Q(e[13]),
				fired: Q(e[14]),
				saucerSpawned: Q(e[15]),
				levelUp: Q(e[16]),
				lifeGained: Q(e[17])
			});
		} catch (e) {
			console.error("[pixi-debug] asteroids-move buffer decode failed:", e);
		}
	});
	let fe = () => {
		S?.close(), window.removeEventListener("keydown", se), window.removeEventListener("keyup", ce), e.ticker.remove(le), M &&= (M.destroy(), null);
		for (let e of N) e.destroy();
		N.length = 0, I && F && F.b2DestroyWorld(I), I = null, F = null, L.length = 0, ro.stop("asteroids-thrust"), d.remove();
	};
	S.onInterrupted(() => fe()), window.addEventListener("beforeunload", fe);
}, $o = async (e) => {
	e.renderer.background.color = "#1099bb", q.addBundle("animals", [
		{
			alias: "bunny",
			src: "https://pixijs.com/assets/bunny.png"
		},
		{
			alias: "eggHead",
			src: "https://pixijs.com/assets/eggHead.png"
		},
		{
			alias: "flowerTop",
			src: "https://pixijs.com/assets/flowerTop.png"
		}
	]), await q.loadBundle("animals");
	let t = await q.load("bunny"), n = await q.load("eggHead"), r = await q.load("flowerTop"), i = new P(t);
	i.anchor.set(.5), i.x = e.screen.width / 2 - 150, i.y = e.screen.height / 2, i.scale.set(3), e.stage.addChild(i);
	let a = new P(n);
	a.anchor.set(.5), a.x = e.screen.width / 2, a.y = e.screen.height / 2, a.scale.set(.5), e.stage.addChild(a);
	let o = new P(r);
	o.anchor.set(.5), o.x = e.screen.width / 2 + 150, o.y = e.screen.height / 2, o.scale.set(.5), e.stage.addChild(o);
}, es = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = await q.load("https://pixijs.com/assets/bunny.png"), n = new P(t);
	n.anchor.set(.5), n.x = e.screen.width / 2, n.y = e.screen.height / 2, n.scale.set(4), n.eventMode = "static", n.cursor = "pointer", n.on("pointertap", () => {
		n.scale.x *= 1.25, n.scale.y *= 1.25;
	}), e.stage.addChild(n), e.ticker.add((e) => {
		n.destroyed || (n.rotation += .1 * e.deltaTime);
	});
}, ts = (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new k();
	e.stage.addChild(t);
	let n = new yr({
		text: "Hello, PixiJS!",
		style: {
			fontFamily: "Arial",
			fontSize: 16,
			fill: "#ddd"
		}
	});
	n.x = 100, n.y = 100, n.anchor.set(.5), t.addChild(n), t.x = e.screen.width / 2, t.y = e.screen.height / 2, t.pivot.x = t.width / 2, t.pivot.y = t.height / 2, e.ticker.add((e) => {
		t.rotation -= .01 * e.deltaTime;
	});
}, ns = async (e) => {
	e.renderer.background.color = "#1099bb", await q.load("https://pixijs.com/assets/bitmap-font/desyrel.xml");
	let t = new yr({
		text: "bitmap fonts are supported!\nWoo yay!",
		style: {
			fontFamily: "Desyrel",
			fontSize: 55,
			align: "left"
		}
	});
	t.x = 50, t.y = 200, e.stage.addChild(t);
}, rs = async (e) => {
	e.renderer.background.color = "#ffffff";
	let t = new k();
	e.stage.addChild(t);
	let n = await q.load("https://pixijs.com/assets/bunny.png");
	for (let e = 0; e < 25; e++) {
		let r = new P(n);
		r.x = e % 5 * 40, r.y = Math.floor(e / 5) * 40, t.addChild(r);
	}
	t.x = e.screen.width / 2, t.y = e.screen.height / 2, t.pivot.x = t.width / 2, t.pivot.y = t.height / 2, e.ticker.add((e) => {
		t.rotation -= .01 * e.deltaTime;
	});
}, is = (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new K();
	t.circle(300, 300, 50).fill(16711680), e.stage.addChild(t);
	let n = new K();
	n.rect(500, 250, 100, 100).fill(255), e.stage.addChild(n);
	let r = new _n();
	t.filters = [r];
	let i = new _n();
	n.filters = [i];
	let a = 0;
	e.ticker.add((e) => {
		a += .005 * e.deltaTime;
		let t = Math.cos(a), n = Math.sin(a);
		r.strength = 20 * t, i.strength = 20 * n;
	});
}, as = "breakout-brick", os = "breakout-paddle", ss = "breakout-levelup", cs = "breakout-loselife", ls = "breakout-gameover", us = "_content/Game.UI/audio/", ds = /* @__PURE__ */ new Set();
function fs(e, t) {
	ds.has(e) || (ro.add(e, `${us}${t}`), ds.add(e));
}
function ps(e, t) {
	fs(e, t), ro.play(e);
}
var ms = (...e) => console.log("[pixi-debug] breakout:", ...e), hs = (e, t) => {
	let n = (t ?? {}).breakout ?? {};
	e.renderer.background.color = "#020617";
	let r = n.courtWidth ?? 600, i = n.courtHeight ?? 500, a = new K(), o = Math.min(e.screen.width / r, e.screen.height / i);
	a.scale.set(o), a.x = 0, a.y = 0, e.stage.addChild(a);
	let s = new K();
	s.rect(0, 0, r, i).stroke({
		width: 4,
		color: "#8B0000"
	}), s.scale.set(o), s.x = a.x, s.y = a.y, e.stage.addChild(s);
	let c = new J({
		text: "Score: 0  Lives: 3  Level: 1",
		style: new ke({
			fontFamily: "Arial",
			fontSize: 18,
			fontWeight: "bold",
			fill: "#e2e8f0"
		})
	});
	c.anchor.set(1, 0), c.position.set(e.screen.width - 16, 12), e.stage.addChild(c);
	let l = document.createElement("div");
	l.style.cssText = "position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.55);z-index:5;";
	let u = document.createElement("div");
	u.style.cssText = "font:bold 2rem sans-serif;color:#f97316;text-align:center;";
	let d = document.createElement("button");
	d.type = "button", d.textContent = "START GAME", d.style.cssText = "background-color:#f97316;color:#020617;border:none;border-radius:0.5rem;padding:0.75rem 2rem;font-size:1.1rem;font-weight:bold;cursor:pointer;";
	let f = document.createElement("div");
	f.style.cssText = "color:#94a3b8;font:0.85rem sans-serif;", f.textContent = "arrow keys move · SPACE launches the ball", l.append(u, d, f), document.body.appendChild(l);
	let p = n.started ?? !1, m = n.gameOver ?? !1, h = n.score ?? 0, g = n.lives ?? 3, _ = n.level ?? 0, v = m, y = !1, b = !1, x = 1e3 / 60, S = new So(), C = null, w = () => {
		m && !v && (ms("game ended (ECS signal) - score", h), ps(ls, "breakout-gameover.mp3")), v = m;
	}, T = () => {
		if (p && !m) {
			l.style.display = "none";
			return;
		}
		l.style.display = "flex", u.textContent = m ? `GAME OVER - SCORE: ${h}` : "BREAKOUT", d.textContent = m ? "PLAY AGAIN" : "START GAME";
	}, E = (e, t, n) => {
		C?.postCommand("/api/breakout/input", JSON.stringify({
			left: e,
			right: t,
			launch: n
		})).catch((e) => console.error("[pixi-debug] breakout input failed:", e));
	}, D = () => {
		p && !m || (ms("starting game (button or space)"), C?.postCommand("/api/breakout/start").then(() => {
			p = !0, m = !1, ms("game started (sim confirmed)"), T();
		}).catch((e) => console.error("[pixi-debug] breakout start failed:", e)));
	};
	d.addEventListener("click", D);
	let O = (e) => {
		a.clear();
		for (let t of S.values()) {
			let n = t.current, r = Co(t.previous.x, n.x, e), i = Co(t.previous.y, n.y, e), o = n.r << 16 | n.g << 8 | n.b;
			n.id === 2 ? a.circle(r, i, n.width / 2).fill(o) : a.rect(r - n.width / 2, i - n.height / 2, n.width, n.height).fill(o);
		}
	}, k = (e, t, n, r, i) => {
		c.text = `Score: ${e}  Lives: ${t}  Level: ${n + 1}`, h = e, g = t, _ = n, m = r, p = i, w(), T();
	};
	S.ingest(n.sprites ?? []);
	let A = () => {
		let e = S.advance(x);
		e !== null && O(e);
	};
	e.ticker.add(A), k(h, g, _, m, p), ms("scene boot: screen", e.screen.width, "x", e.screen.height, "sprites", (n.sprites ?? []).length, "bricks", (n.sprites ?? []).filter((e) => e.id >= 1e3).length, "score", h, "lives", g, "level", _ + 1, "started", p, "gameOver", m, "stream", n.streamUrl), e.ticker.addOnce(() => {
		let e = a.getBounds();
		document.getElementById("pixi-viewport")?.setAttribute("data-court-bounds", `${Math.round(e.width)}x${Math.round(e.height)}`);
	});
	let j = (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault(), p && !m ? (ms("launch ball"), E(y, b, !0)) : D();
			return;
		}
		if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
			e.preventDefault(), y = !0, E(!0, b, !1);
			return;
		}
		(e.key === "ArrowRight" || e.key === "d" || e.key === "D") && (e.preventDefault(), b = !0, E(y, !0, !1));
	}, M = (e) => {
		e.key === "ArrowLeft" || e.key === "a" || e.key === "A" ? (y = !1, E(!1, b, !1)) : (e.key === "ArrowRight" || e.key === "d" || e.key === "D") && (b = !1, E(y, !1, !1));
	};
	if (window.addEventListener("keydown", j), window.addEventListener("keyup", M), C = ko(n.streamUrl), !C) return;
	ms("SSE connected:", n.streamUrl), C.addSignalListener("breakout-move", (e) => {
		try {
			let t = JSON.parse(e);
			x = Math.max(1, t.stepMs ?? 1e3 / 60), S.ingest(t.sprites, t.seq, t.epoch), k(t.score, t.lives, t.level, t.gameOver, t.started), t.brickHit && (ms("event: brick hit - score", t.score), ps(as, "breakout-brick.mp3")), t.paddleHit && (ms("event: paddle hit"), ps(os, "breakout-paddle.mp3")), t.levelUp && (ms("event: level up -> level", t.level + 1), ps(ss, "breakout-levelup.mp3")), t.loseLife && (ms("event: lost a life -> lives", t.lives), ps(cs, "breakout-loselife.mp3"));
		} catch (e) {
			console.error("[pixi-debug] breakout-move parse failed:", e);
		}
	});
	let N = (e, t) => ({
		id: e[t],
		x: e[t + 1],
		y: e[t + 2],
		width: e[t + 3],
		height: e[t + 4],
		r: e[t + 5],
		g: e[t + 6],
		b: e[t + 7]
	});
	C.addBufferListener("breakout-move", (e) => {
		try {
			let t = S.ingestFromBuffer(e, N, 15);
			if (!t) return;
			x = Math.max(1, t.stepMs);
			let n = e[6], r = e[7], i = e[8], a = Q(e[9]), o = Q(e[10]);
			k(n, r, i, a, o), Q(e[11]) && (ms("event: brick hit - score", n), ps(as, "breakout-brick.mp3")), Q(e[12]) && (ms("event: paddle hit"), ps(os, "breakout-paddle.mp3")), Q(e[13]) && (ms("event: level up -> level", i + 1), ps(ss, "breakout-levelup.mp3")), Q(e[14]) && (ms("event: lost a life -> lives", r), ps(cs, "breakout-loselife.mp3"));
		} catch (e) {
			console.error("[pixi-debug] breakout-move buffer decode failed:", e);
		}
	});
	let P = () => {
		C?.close(), window.removeEventListener("keydown", j), window.removeEventListener("keyup", M), e.ticker.remove(A), l.remove();
	};
	C.onInterrupted(() => P()), window.addEventListener("beforeunload", P);
}, gs = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new k();
	e.stage.addChild(t);
	let n = await q.load("https://pixijs.com/assets/bunny.png");
	for (let e = 0; e < 25; e++) {
		let r = new P(n);
		r.anchor.set(.5), r.x = e % 5 * 40, r.y = Math.floor(e / 5) * 40, t.addChild(r);
	}
	t.x = e.screen.width / 2, t.y = e.screen.height / 2, t.pivot.x = t.width / 2, t.pivot.y = t.height / 2, e.ticker.add((e) => {
		t.rotation -= .01 * e.deltaTime;
	});
}, _s = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new k();
	e.stage.addChild(t);
	let n = await q.load("https://pixijs.com/assets/bunny.png");
	for (let e = 0; e < 25; e++) {
		let r = new P(n);
		r.x = e % 5 * 40, r.y = Math.floor(e / 5) * 40, t.addChild(r);
	}
	t.x = e.screen.width / 2, t.y = e.screen.height / 2, t.pivot.x = t.width / 2, t.pivot.y = t.height / 2, e.ticker.add((e) => {
		t.rotation -= .01 * e.deltaTime;
	});
}, vs = async (e) => {
	e.renderer.background.color = "#1099bb", e.stage.eventMode = "static", e.stage.hitArea = e.screen;
	let t = await q.load("https://pixijs.com/assets/bunny.png");
	t.source.scaleMode = "nearest";
	let n = null;
	function r(e) {
		n && (n.x = e.global.x, n.y = e.global.y);
	}
	function i() {
		n &&= (n.alpha = 1, e.stage.off("pointermove", r), e.stage.off("pointerup", i), e.stage.off("pointerupoutside", i), null);
	}
	function a(a, o) {
		let s = new P(t);
		s.eventMode = "static", s.cursor = "pointer", s.anchor.set(.5), s.scale.set(3), s.on("pointerdown", () => {
			n = s, s.alpha = .5, e.stage.on("pointermove", r), e.stage.on("pointerup", i), e.stage.on("pointerupoutside", i);
		}), s.x = a, s.y = o, e.stage.addChild(s);
	}
	for (let t = 0; t < 10; t++) a(Math.floor(Math.random() * e.screen.width), Math.floor(Math.random() * e.screen.height));
}, ys = async (e, t) => {
	let n = t ?? {};
	e.renderer.background.color = "#0f172a";
	let r = await q.load("https://pixijs.com/assets/bunny.png");
	vo({
		seq: 0,
		entityCount: n.sprites?.length ?? 0,
		tickMs: 0
	});
	let i = /* @__PURE__ */ new Map();
	for (let t of n.sprites ?? []) {
		let n = new P(r);
		n.anchor.set(.5), n.position.set(t.x, t.y), n.tint = t.r << 16 | t.g << 8 | t.b, n.scale.set(.5), n.eventMode = "static", e.stage.addChild(n), i.set(t.id, n);
	}
	let a = ko(n.streamUrl);
	a && (a.addSignalListener("sprite-move", (e) => {
		try {
			let t = JSON.parse(e);
			vo({
				seq: t.seq,
				entityCount: t.entityCount,
				tickMs: t.tickMs
			});
			for (let e of t.sprites) {
				let t = i.get(e.id);
				t && !t.destroyed && t.position.set(e.x, e.y);
			}
		} catch (e) {
			console.error("[pixi-debug] ECS sprite-move parse failed:", e);
		}
	}), a.addBufferListener("sprite-move", (e) => {
		try {
			let t = e[2];
			vo({
				seq: e[0],
				entityCount: t,
				tickMs: e[5]
			});
			for (let n = 0; n < t; n++) {
				let t = 6 + n * 6, r = i.get(e[t]);
				r && !r.destroyed && r.position.set(e[t + 1], e[t + 2]);
			}
		} catch (e) {
			console.error("[pixi-debug] ECS sprite-move buffer decode failed:", e);
		}
	}), a.onInterrupted(() => a.close()), window.addEventListener("beforeunload", () => a.close()));
}, bs = async (e) => {
	e.renderer.background.color = "#1099bb", q.addBundle("fonts", [
		{
			alias: "ChaChicle",
			src: "https://pixijs.com/assets/webfont-loader/ChaChicle.ttf"
		},
		{
			alias: "Lineal",
			src: "https://pixijs.com/assets/webfont-loader/Lineal.otf"
		},
		{
			alias: "Dotrice Regular",
			src: "https://pixijs.com/assets/webfont-loader/Dotrice-Regular.woff"
		},
		{
			alias: "Crosterian",
			src: "https://pixijs.com/assets/webfont-loader/Crosterian.woff2"
		}
	]), await q.loadBundle("fonts");
	let t = new J({
		text: "ChaChicle.ttf",
		style: {
			fontFamily: "ChaChicle",
			fontSize: 50
		}
	}), n = new J({
		text: "Lineal.otf",
		style: {
			fontFamily: "Lineal",
			fontSize: 50
		}
	}), r = new J({
		text: "Dotrice Regular.woff",
		style: {
			fontFamily: "Dotrice Regular",
			fontSize: 50
		}
	}), i = new J({
		text: "Crosterian.woff2",
		style: {
			fontFamily: "Crosterian",
			fontSize: 50
		}
	});
	n.y = 150, r.y = 300, i.y = 450, e.stage.addChild(t, n, r, i);
}, xs = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new k();
	t.x = 400, t.y = 300, e.stage.addChild(t);
	let n = await q.load("https://pixijs.com/assets/bg_rotate.jpg"), r = new P(n);
	r.anchor.set(.5), t.addChild(r);
	let i = new K();
	i.rect(-100, -100, 200, 200).fill(0), t.mask = i, t.addChild(i), e.ticker.add((e) => {
		t.rotation += .01 * e.deltaTime, i.rotation -= .01 * e.deltaTime;
	});
}, Ss = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = await q.load("https://pixijs.com/assets/snake.png"), n = [];
	for (let e = 0; e < 20; e++) n.push(new r(e * 45, 0));
	let i = new Cr({
		texture: t,
		points: n
	});
	i.x = -40, i.y = 300, e.stage.addChild(i);
	let a = 0;
	e.ticker.add((e) => {
		a += .1 * e.deltaTime;
		for (let e = 0; e < n.length; e++) n[e].y = Math.sin(e * .5 + a) * 30, n[e].x = e * 45 + Math.cos(e * .3 + a) * 20;
	});
}, Cs = (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new J({ text: "Basic text in pixi" });
	t.x = 50, t.y = 100, e.stage.addChild(t);
	let n = new de(0, 0, 0, 428.4), r = [16777215, 65433];
	r.forEach((e, t) => {
		let i = t / r.length;
		n.addColorStop(i, e);
	});
	let i = new J({
		text: "Rich text with a lot of options and across multiple lines",
		style: {
			fontFamily: "Arial",
			fontSize: 36,
			fontStyle: "italic",
			fontWeight: "bold",
			fill: n,
			stroke: {
				color: "#4a1850",
				width: 5,
				join: "round"
			},
			dropShadow: {
				color: "#000000",
				blur: 4,
				angle: Math.PI / 6,
				distance: 6
			},
			wordWrap: !0,
			wordWrapWidth: 440
		}
	});
	i.x = 50, i.y = 220, e.stage.addChild(i);
	let a = new J({
		text: "SKEW IS COOL",
		style: {
			fontFamily: "Arial",
			dropShadow: {
				alpha: .8,
				angle: 2.1,
				blur: 4,
				color: "0x111111",
				distance: 10
			},
			fill: "#ffffff",
			stroke: {
				color: "#004620",
				width: 12,
				join: "round"
			},
			fontSize: 60,
			fontWeight: "lighter"
		}
	});
	a.skew.set(.65, -.3), a.anchor.set(.5), a.x = 300, a.y = 480, e.stage.addChild(a);
};
//#endregion
//#region Frontend/scenes/pacman.ts
function ws(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.id == "number" && typeof t.x == "number" && typeof t.y == "number" && typeof t.previousX == "number" && typeof t.previousY == "number" && typeof t.rotation == "number" && typeof t.kind == "number" && typeof t.visible == "boolean";
}
function Ts(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.seq == "number" && typeof t.entityCount == "number" && typeof t.tickMs == "number" && Array.isArray(t.sprites) && t.sprites.every(ws) && typeof t.score == "number" && typeof t.lives == "number" && typeof t.level == "number" && typeof t.pelletsRemaining == "number" && typeof t.gameOver == "boolean" && typeof t.started == "boolean";
}
var Es = 0, Ds = 1, Os = 2, ks = 3, As = 4, js = 5, Ms = 6, Ns = 7, Ps = 2, Fs = 3, Is = 0, Ls = 1, Rs = 2, zs = 3, Bs = 4, Vs = 5, Hs = 6, Us = 7, Ws = {
	[Is]: 16726832,
	[Ls]: 16739179,
	[Rs]: 16764032,
	[zs]: 6732650,
	[Bs]: 11225020,
	[Vs]: 4367861,
	[Hs]: 16766287,
	[Us]: 14737632
}, Gs = {
	ArrowUp: "up",
	w: "up",
	W: "up",
	ArrowLeft: "left",
	a: "left",
	A: "left",
	ArrowDown: "down",
	s: "down",
	S: "down",
	ArrowRight: "right",
	d: "right",
	D: "right"
}, Ks = {
	[Ds]: 16726832,
	[Os]: 16752098,
	[ks]: 3335910,
	[As]: 16758602
}, qs = "_content/Game.UI/audio/", Js = /* @__PURE__ */ new Set();
function Ys(e, t) {
	Js.has(e) || (ro.add(e, `${qs}${t}`), Js.add(e));
}
function Xs(e, t) {
	Ys(e, t), ro.play(e);
}
var Zs = (e, t) => {
	let n = (t ?? {}).pacman ?? {};
	e.renderer.background.color = "#020617";
	let r = n.mazeRows ?? [], i = n.mazeWidth ?? 29, a = n.mazeHeight ?? 31, o = n.cellSize ?? 8, s = i * o, c = a * o, l = new k(), u = new K(), d = new K(), f = new K();
	l.addChild(u, d, f), e.stage.addChild(l), (() => {
		u.clear(), u.rect(0, 0, s, c).fill(781);
		for (let e = 0; e < a; e++) {
			let t = r[e] ?? "";
			for (let n = 0; n < i; n++) {
				let r = t[n] === " " || t[n] === void 0, i = n * o, a = e * o;
				r ? u.rect(i, a, o, o).fill(464188) : u.rect(i + 1, a + 1, o - 2, o - 2).fill(133143).stroke({
					width: .8,
					color: 1920728,
					alpha: .65
				});
			}
		}
		u.rect(0, 0, s, c).stroke({
			width: 2,
			color: 2450411,
			alpha: .85
		});
	})();
	let p = new J({
		text: "SCORE 000000",
		style: new ke({
			fontFamily: "monospace",
			fontSize: 16,
			fontWeight: "bold",
			fill: "#f8fafc"
		})
	}), m = new J({
		text: "LEVEL 1",
		style: new ke({
			fontFamily: "monospace",
			fontSize: 16,
			fontWeight: "bold",
			fill: "#60a5fa"
		})
	}), h = new J({
		text: "LIVES 3",
		style: new ke({
			fontFamily: "monospace",
			fontSize: 16,
			fontWeight: "bold",
			fill: "#fde047"
		})
	});
	e.stage.addChild(p, m, h);
	let g = document.createElement("div");
	g.style.cssText = "position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.58);z-index:5;";
	let _ = document.createElement("div");
	_.style.cssText = "font:bold 2rem monospace;color:#facc15;text-align:center;";
	let v = document.createElement("button");
	v.type = "button", v.textContent = "START GAME", v.style.cssText = "background:#facc15;color:#020617;border:0;border-radius:0.5rem;padding:0.75rem 2rem;font:bold 1.1rem monospace;cursor:pointer;";
	let y = document.createElement("div");
	y.style.cssText = "color:#94a3b8;font:0.85rem monospace;text-align:center;", y.textContent = "ARROWS / WASD TO MOVE · SPACE TO START", g.append(_, v, y), document.body.appendChild(g);
	let b = n.started ?? !1, x = n.gameOver ?? !1, S = n.score ?? 0, C = n.lives ?? 3, w = n.level ?? 1, T = x, E = 1e3 / 60, D = 0, O = 0, A = new So(), j = null, M = () => {
		let t = Math.min(e.screen.width / s, e.screen.height / c);
		l.scale.set(t), l.x = (e.screen.width - s * t) / 2, l.y = Math.max(0, (e.screen.height - c * t) / 2), p.position.set(12, 12), m.anchor.set(.5, 0), m.position.set(e.screen.width / 2, 12), h.anchor.set(1, 0), h.position.set(e.screen.width - 12, 12);
	}, N = () => {
		g.style.display = b && !x ? "none" : "flex", _.textContent = x ? `GAME OVER · SCORE ${S}` : "PAC-MAN", v.textContent = x ? "PLAY AGAIN" : "START GAME";
	}, P = (e, t, n, r, i) => {
		S = e, C = t, w = n, x = r, b = i, p.text = `SCORE ${String(S).padStart(6, "0")}`, m.text = `LEVEL ${w}`, h.text = `LIVES ${C}`, x && !T && Xs("pacman-dying", "pacman-dying.wav"), T = x, N();
	}, ee = () => {
		b && !x || j?.postCommand("/api/pacman/start").then(() => {
			b = !0, x = !1, Xs("pacman-start", "pacman-start.wav"), N();
		}).catch((e) => console.error("[pixi-debug] pacman start failed:", e));
	}, F = (e) => {
		j?.postCommand("/api/pacman/input", JSON.stringify({ direction: e })).catch((e) => console.error("[pixi-debug] pacman input failed:", e));
	}, I = (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault(), ee();
			return;
		}
		let t = Gs[e.key];
		t && (e.preventDefault(), F(t));
	}, L = (e) => {
		d.clear(), f.clear();
		let t = performance.now();
		for (let { previous: n, current: r } of A.values()) {
			let i = n.x + (r.x - n.x) * e, a = n.y + (r.y - n.y) * e;
			if (!r.visible) continue;
			if (r.kind === js || r.kind === Ms) {
				let e = r.kind === Ms ? 2.4 + Math.sin(t / 160) * .5 : 1.2;
				d.circle(i, a, e).fill(r.kind === Ms ? 16707722 : 16777215);
				continue;
			}
			if (r.kind === Ns) {
				let e = Ws[r.fruitItem] ?? 16726832;
				d.circle(i, a, o * .38).fill(e);
				continue;
			}
			if (r.kind === Es) {
				f.circle(i, a, o * .42).fill(16436245);
				continue;
			}
			let s;
			if (r.mode === Ps) {
				let e = O * .332;
				s = D > 0 && D <= e && Math.floor(t / 166) % 2 == 0 ? 16777215 : 2450411;
			} else s = Ks[r.kind] ?? 16777215;
			f.roundRect(i - o * .42, a - o * .42, o * .84, o * .84, 2).fill(s), f.circle(i - 1.6, a - 1, 1.4).fill(16777215), f.circle(i + 1.6, a - 1, 1.4).fill(16777215), r.mode === Fs && (f.circle(i - 1.6, a - 1, .55).fill(1920728), f.circle(i + 1.6, a - 1, .55).fill(1920728));
		}
	}, R = (e) => {
		let t = A.advance(E);
		t !== null && L(t);
	};
	if (A.ingest((n.sprites ?? []).filter(ws)), P(S, C, w, x, b), M(), N(), window.addEventListener("resize", M), window.addEventListener("keydown", I), v.addEventListener("click", ee), e.ticker.add(R), j = ko(n.streamUrl), !j) return;
	j.addSignalListener("pacman-move", (e) => {
		try {
			let t = JSON.parse(e);
			if (!Ts(t)) throw Error("invalid Pacman render signal");
			let n = t;
			vo({
				seq: n.seq,
				entityCount: n.entityCount,
				tickMs: n.tickMs
			}), E = Math.max(1, n.stepMs ?? 1e3 / 60), D = n.frightenedRemaining ?? 0, O = n.frightFlashes ?? 0, A.ingest(n.sprites, n.seq, n.epoch), P(n.score, n.lives, n.level, n.gameOver, n.started), n.atePellet && Xs("pacman-munch", "pacman-munch1.wav"), n.atePowerPellet && Xs("pacman-power", "pacman-frightened.wav"), n.ghostEaten && Xs("pacman-ghost-eaten", "pacman-ghost-eaten.wav"), n.ateFruit && Xs("pacman-fruit", "pacman-fruit.wav"), n.levelUp && Xs("pacman-level-up", "pacman-extra-life.wav"), n.died && !n.gameOver && Xs("pacman-dying", "pacman-dying.wav");
		} catch (e) {
			console.error("[pixi-debug] pacman-move parse failed:", e);
		}
	});
	let z = (e, t) => ({
		id: e[t],
		x: e[t + 1],
		y: e[t + 2],
		previousX: e[t + 3],
		previousY: e[t + 4],
		velocityX: e[t + 5],
		velocityY: e[t + 6],
		rotation: e[t + 7],
		kind: e[t + 8],
		direction: e[t + 9],
		mode: e[t + 10],
		visible: Q(e[t + 11]),
		r: e[t + 12],
		g: e[t + 13],
		b: e[t + 14],
		fruitItem: e[t + 15]
	});
	j.addBufferListener("pacman-move", (e) => {
		try {
			let t = A.ingestFromBuffer(e, z, 24);
			if (!t) return;
			vo({
				seq: t.seq,
				entityCount: t.entityCount,
				tickMs: t.tickMs
			}), E = Math.max(1, t.stepMs);
			let n = e[6], r = e[7], i = e[8], a = Q(e[10]), o = Q(e[11]);
			D = e[13], O = e[15];
			let s = Q(e[18]), c = Q(e[19]), l = Q(e[20]), u = Q(e[21]), d = Q(e[22]), f = Q(e[23]);
			P(n, r, i, a, o), s && Xs("pacman-munch", "pacman-munch1.wav"), c && Xs("pacman-power", "pacman-frightened.wav"), l && Xs("pacman-ghost-eaten", "pacman-ghost-eaten.wav"), f && Xs("pacman-fruit", "pacman-fruit.wav"), d && Xs("pacman-level-up", "pacman-extra-life.wav"), u && !a && Xs("pacman-dying", "pacman-dying.wav");
		} catch (e) {
			console.error("[pixi-debug] pacman-move buffer decode failed:", e);
		}
	});
	let B = !1;
	j.onInterrupted(() => {
		console.warn("[pixi-debug] pacman SSE connection interrupted; browser will retry");
	}), window.addEventListener("beforeunload", () => {
		B || (B = !0, j?.close(), e.ticker.remove(R), window.removeEventListener("resize", M), window.removeEventListener("keydown", I), g.remove(), p.destroy(), m.destroy(), h.destroy(), l.destroy({ children: !0 }));
	}, { once: !0 });
}, Qs = async (e) => {
	e.renderer.background.color = "#1099bb";
	let t = await q.load("https://pixijs.com/assets/bunny.png"), n = new k();
	n.x = 400, n.y = 300, e.stage.addChild(n);
	for (let e = 0; e < 20; e++) {
		let e = new P(t);
		e.x = Math.random() * 400 - 200, e.y = Math.random() * 400 - 200, e.rotation = Math.random() * 2 * Math.PI, n.addChild(e);
	}
	let r = ce.create({
		width: 800,
		height: 600
	}), i = new P(r);
	i.x = 400, i.y = 300, i.anchor.set(.5), e.stage.addChild(i), n.visible = !1, e.ticker.add((t) => {
		n.rotation -= .01 * t.deltaTime, e.renderer.render({
			container: n,
			target: r
		}), i.rotation += .01 * t.deltaTime;
	});
}, $s = 0, ec = 1, tc = 2, nc = 3, $ = {
	PALM_TREE: 0,
	BILLBOARD08: 1,
	TREE1: 2,
	DEAD_TREE1: 3,
	BILLBOARD09: 4,
	BOULDER3: 5,
	COLUMN: 6,
	BILLBOARD01: 7,
	BILLBOARD06: 8,
	BILLBOARD05: 9,
	BOULDER2: 10,
	BILLBOARD07: 11,
	TREE2: 12,
	BILLBOARD04: 13,
	DEAD_TREE2: 14,
	BOULDER1: 15,
	BUSH1: 16,
	CACTUS: 17,
	BUSH2: 18,
	BILLBOARD03: 19,
	BILLBOARD02: 20,
	STUMP: 21,
	SEMI: 22,
	TRUCK: 23,
	CAR03: 24,
	CAR02: 25,
	CAR04: 26,
	CAR01: 27,
	PLAYER_UPHILL_LEFT: 28,
	PLAYER_UPHILL_STRAIGHT: 29,
	PLAYER_UPHILL_RIGHT: 30,
	PLAYER_LEFT: 31,
	PLAYER_STRAIGHT: 32,
	PLAYER_RIGHT: 33
}, rc = {
	[$.PALM_TREE]: {
		x: 5,
		y: 5,
		w: 215,
		h: 540
	},
	[$.BILLBOARD08]: {
		x: 230,
		y: 5,
		w: 385,
		h: 265
	},
	[$.TREE1]: {
		x: 625,
		y: 5,
		w: 360,
		h: 360
	},
	[$.DEAD_TREE1]: {
		x: 5,
		y: 555,
		w: 135,
		h: 332
	},
	[$.BILLBOARD09]: {
		x: 150,
		y: 555,
		w: 328,
		h: 282
	},
	[$.BOULDER3]: {
		x: 230,
		y: 280,
		w: 320,
		h: 220
	},
	[$.COLUMN]: {
		x: 995,
		y: 5,
		w: 200,
		h: 315
	},
	[$.BILLBOARD01]: {
		x: 625,
		y: 375,
		w: 300,
		h: 170
	},
	[$.BILLBOARD06]: {
		x: 488,
		y: 555,
		w: 298,
		h: 190
	},
	[$.BILLBOARD05]: {
		x: 5,
		y: 897,
		w: 298,
		h: 190
	},
	[$.BOULDER2]: {
		x: 621,
		y: 897,
		w: 298,
		h: 140
	},
	[$.BILLBOARD07]: {
		x: 313,
		y: 897,
		w: 298,
		h: 190
	},
	[$.TREE2]: {
		x: 1205,
		y: 5,
		w: 282,
		h: 295
	},
	[$.BILLBOARD04]: {
		x: 1205,
		y: 310,
		w: 268,
		h: 170
	},
	[$.DEAD_TREE2]: {
		x: 1205,
		y: 490,
		w: 150,
		h: 260
	},
	[$.BOULDER1]: {
		x: 1205,
		y: 760,
		w: 168,
		h: 248
	},
	[$.BUSH1]: {
		x: 5,
		y: 1097,
		w: 240,
		h: 155
	},
	[$.CACTUS]: {
		x: 929,
		y: 897,
		w: 235,
		h: 118
	},
	[$.BUSH2]: {
		x: 255,
		y: 1097,
		w: 232,
		h: 152
	},
	[$.BILLBOARD03]: {
		x: 5,
		y: 1262,
		w: 230,
		h: 220
	},
	[$.BILLBOARD02]: {
		x: 245,
		y: 1262,
		w: 215,
		h: 220
	},
	[$.STUMP]: {
		x: 995,
		y: 330,
		w: 195,
		h: 140
	},
	[$.SEMI]: {
		x: 1365,
		y: 490,
		w: 122,
		h: 144
	},
	[$.TRUCK]: {
		x: 1365,
		y: 644,
		w: 100,
		h: 78
	},
	[$.CAR03]: {
		x: 1383,
		y: 760,
		w: 88,
		h: 55
	},
	[$.CAR02]: {
		x: 1383,
		y: 825,
		w: 80,
		h: 59
	},
	[$.CAR04]: {
		x: 1383,
		y: 894,
		w: 80,
		h: 57
	},
	[$.CAR01]: {
		x: 1205,
		y: 1018,
		w: 80,
		h: 56
	},
	[$.PLAYER_UPHILL_LEFT]: {
		x: 1383,
		y: 961,
		w: 80,
		h: 45
	},
	[$.PLAYER_UPHILL_STRAIGHT]: {
		x: 1295,
		y: 1018,
		w: 80,
		h: 45
	},
	[$.PLAYER_UPHILL_RIGHT]: {
		x: 1385,
		y: 1018,
		w: 80,
		h: 45
	},
	[$.PLAYER_LEFT]: {
		x: 995,
		y: 480,
		w: 80,
		h: 41
	},
	[$.PLAYER_STRAIGHT]: {
		x: 1085,
		y: 480,
		w: 80,
		h: 41
	},
	[$.PLAYER_RIGHT]: {
		x: 995,
		y: 531,
		w: 80,
		h: 41
	}
}, ic = {
	lanes: 3,
	roadWidth: 2e3,
	cameraHeight: 1e3,
	drawDistance: 300,
	fieldOfView: 100,
	fogDensity: 5,
	resolutionScale: 1
}, ac = {
	[$s]: {
		road: 7039851,
		grass: 1092112,
		rumble: 5592405,
		lane: 13421772
	},
	[ec]: {
		road: 6908265,
		grass: 39424,
		rumble: 12303291,
		lane: null
	},
	[tc]: {
		road: 16777215,
		grass: 16777215,
		rumble: 16777215,
		lane: null
	},
	[nc]: {
		road: 0,
		grass: 0,
		rumble: 0,
		lane: null
	}
}, oc = .001, sc = .002, cc = .003, lc = .3 / 80, uc = "racer-music", dc = "_content/Game.UI/games/racer/racer.mp3", fc = (...e) => console.log("[pixi-debug] racer:", ...e);
function pc(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.seq == "number" && typeof t.entityCount == "number" && typeof t.tickMs == "number" && typeof t.player == "object" && Array.isArray(t.cars) && typeof t.settings == "object";
}
function mc(e, t, n) {
	return e + (t - e) * n;
}
function hc(e, t) {
	let n = e % t;
	return (n < 0 ? n + t : n) / t;
}
function gc(e, t, n) {
	let r = e + t;
	for (; r >= n;) r -= n;
	for (; r < 0;) r += n;
	return r;
}
function _c(e) {
	let t = Math.floor(e / 60), n = Math.floor(e - t * 60), r = Math.floor(10 * (e - Math.floor(e)));
	return t > 0 ? `${t}.${n < 10 ? "0" : ""}${n}.${r}` : `${n}.${r}`;
}
var vc = class {
	sprites = [];
	masks = [];
	cursor = 0;
	container;
	atlas;
	constructor(e, t, n) {
		this.container = e, this.atlas = t;
		for (let e = 0; e < n; e++) this.createEntry();
	}
	createEntry() {
		let e = new K();
		this.masks.push(e);
		let t = new P(this.atlas);
		t.visible = !1, t.mask = e, this.container.addChild(t), this.sprites.push(t);
	}
	acquire(e, t, n, r, i, a) {
		this.cursor >= this.sprites.length && this.createEntry();
		let o = this.sprites[this.cursor], s = this.masks[this.cursor];
		this.cursor++, o.texture = e, o.x = t, o.y = n, o.width = r, o.height = i, o.visible = !0, o.alpha = 1, o.tint = 16777215;
		let c = Math.min(n, a), l = Math.max(0, a - c);
		l > 0 && r > 0 ? s.clear().rect(t, c, r, l).fill(16777215) : s.clear();
	}
	finish() {
		for (let e = this.cursor; e < this.sprites.length; e++) this.sprites[e].visible = !1, this.sprites[e].mask = null, this.masks[e].clear();
		this.cursor = 0;
	}
	destroy() {
		for (let e of this.sprites) e.destroy();
		for (let e of this.masks) e.destroy();
		this.sprites.length = 0, this.masks.length = 0;
	}
};
function yc(e, t, n) {
	let r = document.createElement("div");
	r.style.cssText = "position:fixed;top:108px;right:12px;width:220px;padding:0.6rem;background:rgba(2,6,23,.9);border:1px solid rgba(148,163,184,.35);border-radius:.5rem;color:#cbd5e1;font:12px sans-serif;z-index:6;display:none;gap:.35rem;";
	let i = document.createElement("strong");
	i.textContent = "Racer tuning (paused)", i.style.color = "#fbbf24", r.appendChild(i);
	let a = /* @__PURE__ */ new Map(), o = { ...e };
	for (let [t, n, i, s, c] of [
		[
			"lanes",
			"Lanes",
			1,
			4,
			1
		],
		[
			"roadWidth",
			"Road width",
			500,
			3e3,
			50
		],
		[
			"cameraHeight",
			"Camera height",
			500,
			5e3,
			50
		],
		[
			"drawDistance",
			"Draw distance",
			100,
			500,
			10
		],
		[
			"fieldOfView",
			"Field of view",
			80,
			140,
			1
		],
		[
			"fogDensity",
			"Fog density",
			0,
			50,
			1
		],
		[
			"resolutionScale",
			"Resolution",
			.4,
			1.5,
			.1
		]
	]) {
		let l = document.createElement("label");
		l.style.display = "grid", l.style.gap = "2px";
		let u = document.createElement("span");
		u.textContent = n;
		let d = document.createElement("input");
		d.type = "range", d.min = String(i), d.max = String(s), d.step = String(c), d.value = String(e[t]), d.addEventListener("input", () => {
			o = {
				lanes: Number(a.get("lanes")?.value ?? e.lanes),
				roadWidth: Number(a.get("roadWidth")?.value ?? e.roadWidth),
				cameraHeight: Number(a.get("cameraHeight")?.value ?? e.cameraHeight),
				drawDistance: Number(a.get("drawDistance")?.value ?? e.drawDistance),
				fieldOfView: Number(a.get("fieldOfView")?.value ?? e.fieldOfView),
				fogDensity: Number(a.get("fogDensity")?.value ?? e.fogDensity),
				resolutionScale: Number(a.get("resolutionScale")?.value ?? e.resolutionScale)
			};
		}), a.set(t, d), l.append(u, d), r.appendChild(l);
	}
	let s = document.createElement("div");
	s.style.cssText = "display:flex;justify-content:flex-end;gap:.4rem;margin-top:.35rem;";
	let c = document.createElement("button");
	c.type = "button", c.textContent = "Cancel", c.style.cssText = "border:1px solid #64748b;background:#1e293b;color:#e2e8f0;border-radius:.3rem;padding:.3rem .55rem;cursor:pointer;", c.addEventListener("click", () => {
		n();
	});
	let l = document.createElement("button");
	return l.type = "button", l.textContent = "Apply", l.style.cssText = "border:1px solid #f59e0b;background:#f59e0b;color:#111827;border-radius:.3rem;padding:.3rem .55rem;cursor:pointer;", l.addEventListener("click", () => {
		t(o);
	}), s.append(c, l), r.appendChild(s), document.body.appendChild(r), {
		element: r,
		update: (e) => {
			o = { ...e };
			for (let [t, n] of a) n.value = String(e[t]);
		},
		read: () => ({ ...o }),
		setVisible: (e) => {
			r.style.display = e ? "grid" : "none";
		},
		setBusy: (e) => {
			c.disabled = e, l.disabled = e;
			for (let t of a.values()) t.disabled = e;
		}
	};
}
var bc = async (e, t) => {
	let n = (t ?? {}).racer ?? {}, r = n.track ?? {}, a = r.segments ?? [], o = r.sprites ?? [], s = r.segmentLength ?? 200, c = r.trackLength ?? a.length * s, l = n.settings ?? ic, u = n.player ?? {
		x: 0,
		z: 0,
		speed: 0,
		currentLapTime: 0,
		lastLapTime: 0,
		fastLapTime: 180,
		lap: 0,
		steer: 0,
		uphill: !1
	}, d = n.cars ?? [], f = 0, p = 0, m = 0, h = u.z, g = 1e3 / 60, _ = !1, v = new So(), y = new So(), b = null;
	e.renderer.background.color = "#72d7ee";
	let [x, S] = await Promise.all([q.load("_content/Game.UI/games/racer/sprites.png"), q.load("_content/Game.UI/games/racer/background.png")]), C = new k(), w = new K(), E = new k(), D = new k(), O = new k();
	C.addChild(E, w, D, O), e.stage.addChild(C);
	let A = [
		new T({
			source: S.source,
			frame: new i(5, 495, 640, 480)
		}),
		new T({
			source: S.source,
			frame: new i(5, 5, 640, 480)
		}),
		new T({
			source: S.source,
			frame: new i(5, 985, 640, 480)
		})
	], j = A.map((t) => {
		let n = new Un({
			texture: t,
			width: e.screen.width,
			height: e.screen.height
		});
		return C.addChildAt(n, 0), n;
	}), M = new ke({
		fontFamily: "Arial, sans-serif",
		fontSize: 14,
		fontWeight: "bold",
		fill: 16777215,
		dropShadow: {
			color: 0,
			distance: 1
		}
	}), N = new J({
		text: "0 mph",
		style: M
	}), P = new J({
		text: "Time: 0.0",
		style: M
	}), ee = new J({
		text: "Last: --",
		style: M
	}), F = new J({
		text: "Fastest: --",
		style: new ke({
			fontFamily: "Arial, sans-serif",
			fontSize: 14,
			fontWeight: "bold",
			fill: 0
		})
	});
	N.visible = !1, P.visible = !1, ee.visible = !1, F.visible = !1, e.stage.addChild(N, P, ee, F);
	let I = null, L = async (e) => {
		if (!I) throw Error(`signal stream not connected (${e})`);
		await I.postCommand(e);
	}, R = async (e) => {
		if (!I) throw Error("signal stream not connected (/api/racer/config)");
		await I.postCommand("/api/racer/config", JSON.stringify(e));
	}, z = !1, B = !1, te = !1, ne = { ...l }, V, H, U = () => {
		z = !1, V.setVisible(!1), H.title = "Configure race", H.setAttribute("aria-label", "Configure race");
	};
	async function re() {
		if (!(z || B)) {
			B = !0, H.disabled = !0;
			try {
				await L("/api/racer/pause"), ne = { ...l }, V.update(l), V.setVisible(!0), z = !0, H.title = "Hide race tuning", H.setAttribute("aria-label", "Hide race tuning");
			} catch (e) {
				console.error("[pixi-debug] racer pause failed:", e);
			} finally {
				B = !1, H.disabled = !1;
			}
		}
	}
	async function ie(e) {
		if (!(!z || B)) {
			B = !0, V.setBusy(!0);
			try {
				await R(e), l = { ...e }, te && await L("/api/racer/resume"), U();
			} catch (e) {
				console.error("[pixi-debug] racer tuning apply failed:", e);
			} finally {
				B = !1, V.setBusy(!1), H.disabled = !1;
			}
		}
	}
	async function ae() {
		if (!(!z || B)) {
			B = !0, V.setBusy(!0);
			try {
				te && await L("/api/racer/resume"), l = { ...ne }, V.update(l), U();
			} catch (e) {
				console.error("[pixi-debug] racer tuning cancel failed:", e);
			} finally {
				B = !1, V.setBusy(!1), H.disabled = !1;
			}
		}
	}
	H = document.createElement("button"), H.id = "racer-config-button", H.type = "button", H.title = "Configure race", H.setAttribute("aria-label", "Configure race"), H.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z\"/><path d=\"m19.4 15 .1.1a2 2 0 0 1-2.8 2.8l-.1-.1a2 2 0 0 0-3.4 1.4v.2a2 2 0 0 1-4 0v-.2a2 2 0 0 0-3.4-1.4l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A2 2 0 0 0 1.6 11H1.4a2 2 0 0 1 0-4h.2A2 2 0 0 0 3 3.6l-.1-.1A2 2 0 1 1 5.7.7l.1.1A2 2 0 0 0 9.2-.6v-.2a2 2 0 0 1 4 0v.2a2 2 0 0 0 3.4 1.4l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A2 2 0 0 0 20.8 7h.2a2 2 0 0 1 0 4h-.2a2 2 0 0 0-1.4 4Z\" transform=\"translate(0 2) scale(.83)\"/></svg>", H.style.cssText = "position:fixed;top:64px;right:12px;width:36px;height:36px;display:grid;place-items:center;border:1px solid rgba(148,163,184,.45);border-radius:.45rem;background:rgba(2,6,23,.9);color:#fbbf24;cursor:pointer;z-index:7;", H.addEventListener("click", () => {
		z ? ae() : re();
	}), document.body.appendChild(H);
	let W = document.createElement("div");
	W.id = "racer-start-overlay", W.style.cssText = "position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,.78);z-index:20;";
	let G = document.createElement("h2");
	G.textContent = "ENDLESS RACER", G.style.cssText = "margin:0;font-family:Arial,sans-serif;font-size:2rem;color:#fbbf24;";
	let oe = document.createElement("button");
	oe.type = "button", oe.textContent = "START GAME", oe.style.cssText = "font-family:Arial,sans-serif;font-size:1.25rem;font-weight:bold;color:#0f172a;background:#fbbf24;border:none;border-radius:.5rem;padding:.75rem 2.5rem;cursor:pointer;";
	let se = document.createElement("p");
	se.textContent = "↑/W accelerate · ↓/S brake · ←/→ or A/D steer", se.style.cssText = "margin:0;font-family:Arial,sans-serif;color:#94a3b8;", W.append(G, oe, se), document.body.appendChild(W);
	let ce = document.createElement("button");
	ce.id = "racer-restart-button", ce.type = "button", ce.textContent = "RESTART", ce.title = "Restart race", ce.style.cssText = "position:fixed;top:106px;right:12px;display:none;font-family:Arial,sans-serif;font-weight:bold;color:#fbbf24;background:rgba(2,6,23,.9);border:1px solid rgba(148,163,184,.45);border-radius:.45rem;padding:.4rem .6rem;cursor:pointer;z-index:7;", document.body.appendChild(ce);
	let le = document.createElement("button");
	le.type = "button", le.textContent = "🔊", le.title = "Toggle sound", le.style.cssText = "position:fixed;top:12px;right:12px;width:36px;height:36px;font-size:20px;border:1px solid rgba(148,163,184,.45);border-radius:.45rem;background:rgba(2,6,23,.9);color:#e2e8f0;cursor:pointer;z-index:7;display:grid;place-items:center;", le.addEventListener("click", () => {
		_ = !_, le.textContent = _ ? "🔇" : "🔊", ro.volume(uc, _ ? 0 : .05);
	}), document.body.appendChild(le);
	let ue = () => {
		te || L("/api/racer/resume").then(() => {
			te = !0, W.style.display = "none", ce.style.display = "block", ro.play(uc, {
				loop: !0,
				volume: .05
			});
		}).catch((e) => console.error("[pixi-debug] racer start failed:", e));
	};
	oe.addEventListener("click", ue), ce.addEventListener("click", () => {
		L("/api/racer/restart").catch((e) => console.error("[pixi-debug] racer restart failed:", e));
	}), V = yc(l, ie, ae), V.element.id = "racer-tuning-panel";
	let de = /* @__PURE__ */ new Map(), fe = /* @__PURE__ */ new Map();
	for (let e of o) {
		let t = fe.get(e.segmentIndex) ?? [];
		t.push(e), fe.set(e.segmentIndex, t);
	}
	let pe = (e) => {
		let t = rc[e];
		if (!t) return null;
		let n = de.get(e);
		if (n) return n;
		let r = new T({
			source: x.source,
			frame: new i(t.x, t.y, t.w, t.h)
		});
		return de.set(e, r), r;
	}, me = (e, t, n, r, i, a, o, s, c, l) => {
		let u = e - r, d = t - i, f = n - a, p = o / f;
		return {
			x: Math.round(s / 2 + p * u * s / 2),
			y: Math.round(c / 2 - p * d * c / 2),
			w: Math.round(p * l * s / 2),
			scale: p,
			cameraZ: f,
			cameraY: d
		};
	}, he = (e, t, n = 1) => {
		w.poly(e).fill({
			color: t,
			alpha: n
		});
	}, ge = (e, t) => {
		let { p1: n, p2: r, segment: i, fog: a } = e, o = ac[i.color] ?? ac[$s], s = n.w / Math.max(6, 2 * l.lanes), c = r.w / Math.max(6, 2 * l.lanes), u = n.w / Math.max(32, 8 * l.lanes), d = r.w / Math.max(32, 8 * l.lanes);
		if (w.rect(0, r.y, t, Math.max(0, n.y - r.y)).fill(o.grass), he([
			n.x - n.w - s,
			n.y,
			n.x - n.w,
			n.y,
			r.x - r.w,
			r.y,
			r.x - r.w - c,
			r.y
		], o.rumble), he([
			n.x + n.w + s,
			n.y,
			n.x + n.w,
			n.y,
			r.x + r.w,
			r.y,
			r.x + r.w + c,
			r.y
		], o.rumble), he([
			n.x - n.w,
			n.y,
			n.x + n.w,
			n.y,
			r.x + r.w,
			r.y,
			r.x - r.w,
			r.y
		], o.road), o.lane !== null) {
			let e = n.w * 2 / l.lanes, t = r.w * 2 / l.lanes, i = n.x - n.w + e, a = r.x - r.w + t;
			for (let s = 1; s < l.lanes; s++) he([
				i - u / 2,
				n.y,
				i + u / 2,
				n.y,
				a + d / 2,
				r.y,
				a - d / 2,
				r.y
			], o.lane), i += e, a += t;
		}
		a < 1 && w.rect(0, r.y, t, Math.max(0, n.y - r.y)).fill({
			color: 20744,
			alpha: 1 - a
		});
	}, _e = (e, t, n, r, i, a, o, s) => {
		let c = rc[t], u = pe(t);
		if (!c || !u) return;
		let d = c.w * n * s / 2 * (lc * l.roadWidth), f = c.h * n * s / 2 * (lc * l.roadWidth), p = r + d * a, m = i - f, h = Math.min(f, Math.max(0, o - m));
		h <= 0 || d <= 0 || e.acquire(u, p, m, d, h, o);
	}, ve = new vc(E, x, 128), ye = new vc(D, x, 32), be = new vc(O, x, 1), xe = Math.round(e.screen.width / l.resolutionScale), Se = Math.round(e.screen.height / l.resolutionScale), Ce = () => {
		xe = Math.round(e.screen.width / l.resolutionScale), Se = Math.round(e.screen.height / l.resolutionScale), C.scale.set(l.resolutionScale);
		for (let e of j) e.width = xe, e.height = Se, e.tileScale.set(1, Se / 480);
	}, we = new ResizeObserver(() => Ce());
	we.observe(e.canvas);
	let Te = !1, Ee = !1, De = !1, Oe = !1, Ae = /* @__PURE__ */ new Map(), je = (t) => {
		let n = e.canvas.getBoundingClientRect(), r = (t.clientX - n.left) / n.width, i = (t.clientY - n.top) / n.height;
		return r < .5 ? i < .5 ? "left" : "right" : i < .5 ? "faster" : "slower";
	}, Me = () => {
		Te = Ee = De = Oe = !1;
		for (let { action: e } of Ae.values()) e === "left" ? Te = !0 : e === "right" ? Ee = !0 : e === "faster" ? De = !0 : Oe = !0;
	}, Ne = (e) => {
		e.preventDefault();
		for (let t = 0; t < e.changedTouches.length; t++) {
			let n = e.changedTouches[t];
			Ae.set(n.identifier, { action: je(n) });
		}
		Me(), ze();
	}, Pe = (e) => {
		e.preventDefault();
		for (let t = 0; t < e.changedTouches.length; t++) Ae.delete(e.changedTouches[t].identifier);
		Me(), ze();
	}, Fe = Pe, Ie = e.canvas;
	Ie.addEventListener("touchstart", Ne, { passive: !1 }), Ie.addEventListener("touchend", Pe, { passive: !1 }), Ie.addEventListener("touchcancel", Fe, { passive: !1 });
	let Le = () => {
		if (a.length === 0) return;
		let t = v.advance(g);
		if (t === null) return;
		let n = v.values().next().value, r = n ? {
			...n.current,
			x: Co(n.previous.x, n.current.x, t),
			z: To(n.previous.z, n.current.z, t, c)
		} : u, i = y.alpha(g), o = Array.from(y.values(), (e) => {
			let t = To(e.previous.z, e.current.z, i, c);
			return {
				...e.current,
				z: t,
				percent: hc(t, s)
			};
		}), d = gc(r.z - h, 0, c), _ = Math.floor(r.z / s) % a.length, b = a[_ < 0 ? _ + a.length : _]?.curve ?? 0;
		f = gc(f, oc * b * d / s, 1), p = gc(p, sc * b * d / s, 1), m = gc(m, cc * b * d / s, 1), h = r.z;
		let x = Math.max(.1, l.resolutionScale), S = Math.max(1, e.screen.width / x), C = Math.max(1, e.screen.height / x), T = 1 / Math.tan(l.fieldOfView / 2 * Math.PI / 180), E = l.cameraHeight * T, D = Math.floor(r.z / s) % a.length, O = D < 0 ? D + a.length : D, k = hc(r.z, s), A = gc(r.z + E, 0, c), M = Math.floor(A / s) % a.length, I = a[M] ?? a[0], L = hc(A, s), R = mc(I?.p1WorldY ?? 0, I?.p2WorldY ?? 0, L), z = R + l.cameraHeight, B = C, te = 0, ne = -(a[O]?.curve ?? 0) * k, V = /* @__PURE__ */ new Map();
		w.clear(), ve.finish(), ye.finish(), be.finish(), j[0].tilePosition.set(-f * 1280, C * .001 * R), j[1].tilePosition.set(-p * 1280, C * .002 * R), j[2].tilePosition.set(-m * 1280, C * .003 * R);
		for (let e = 0; e < l.drawDistance; e++) {
			let t = a[(O + e) % a.length];
			if (!t) continue;
			let n = t.index < O, i = 1 / Math.E ** ((e / l.drawDistance) ** 2 * l.fogDensity), o = me(0, t.p1WorldY, t.index * s, r.x * l.roadWidth - te, z, r.z - (n ? c : 0), T, S, C, l.roadWidth), u = me(0, t.p2WorldY, (t.index + 1) * s, r.x * l.roadWidth - te - ne, z, r.z - (n ? c : 0), T, S, C, l.roadWidth);
			te += ne, ne += t.curve;
			let d = {
				segment: t,
				p1: o,
				p2: u,
				fog: i,
				clip: B
			};
			o.cameraZ <= T || u.y >= o.y || u.y >= B || (ge(d, S), B = o.y, d.clip = B, V.set(t.index, d));
		}
		let H = /* @__PURE__ */ new Map();
		for (let e of o) {
			let t = Math.floor(e.z / s) % a.length, n = t < 0 ? t + a.length : t, r = H.get(n) ?? [];
			r.push(e), H.set(n, r);
		}
		for (let e = l.drawDistance - 1; e > 0; e--) {
			let t = a[(O + e) % a.length];
			if (!t) continue;
			let n = V.get(t.index);
			if (!n) continue;
			let i = H.get(t.index) ?? [];
			for (let e of i) {
				let t = mc(n.p1.scale, n.p2.scale, e.percent), r = mc(n.p1.x, n.p2.x, e.percent) + t * e.offset * l.roadWidth * S / 2, i = mc(n.p1.y, n.p2.y, e.percent);
				_e(ye, e.spriteKind, t, r, i, -.5, n.clip, S);
			}
			for (let e of fe.get(t.index) ?? []) _e(ve, e.spriteKind, n.p1.scale, n.p1.x + n.p1.scale * e.offset * l.roadWidth * S / 2, n.p1.y, e.offset < 0 ? -1 : 0, n.clip, S);
			if (t.index === M) {
				let e = mc(t.p1WorldY - z, t.p2WorldY - z, L), n = T / E, i = C / 2 - n * e * C / 2, a = r.uphill ? r.steer < 0 ? $.PLAYER_UPHILL_LEFT : r.steer > 0 ? $.PLAYER_UPHILL_RIGHT : $.PLAYER_UPHILL_STRAIGHT : r.steer < 0 ? $.PLAYER_LEFT : r.steer > 0 ? $.PLAYER_RIGHT : $.PLAYER_STRAIGHT, o = 1.5 * Math.random() * (r.speed / 6e4) * l.resolutionScale;
				_e(be, a, n, S / 2, i + o, -.5, C, S);
			}
		}
		let U = Math.round(5 * Math.round(r.speed / 500));
		N.text = `${U} mph`, P.text = `Time: ${_c(r.currentLapTime)}`, ee.text = r.lastLapTime > 0 ? `Last: ${_c(r.lastLapTime)}` : "", F.text = `Fastest: ${_c(r.fastLapTime)}`;
		let re = Se * l.resolutionScale - 32;
		N.position.set(xe * l.resolutionScale - 100, re), P.position.set(16, re), ee.position.set(180, re), F.position.set(xe * l.resolutionScale / 2 - 60, re), N.visible = !0, P.visible = !0, ee.visible = r.lastLapTime > 0, F.visible = !0;
		let ie = r.lastLapTime > 0 && r.lastLapTime <= r.fastLapTime;
		F.style.fill = ie ? 16766720 : 0, document.getElementById("pixi-viewport")?.setAttribute("data-racer-bounds", `${Math.round(S)}x${Math.round(C)}`);
	}, Re = (e) => {
		e.epoch !== void 0 && e.epoch !== b && (b !== null && (f = 0, p = 0, m = 0, h = e.player.z), b = e.epoch), g = Math.max(1, e.stepMs ?? 1e3 / 60), u = e.player, d = e.cars, l = e.settings, v.ingest([{
			id: 0,
			...e.player
		}], e.seq, e.epoch), y.ingest(e.cars, e.seq, e.epoch), z || V.update(l), vo({
			seq: e.seq,
			entityCount: e.entityCount,
			tickMs: e.tickMs
		}), e.lapCompleted && fc("lap completed:", u.lap, _c(u.lastLapTime)), e.collided && fc("collision resolved by ECS");
	}, ze = () => {
		I?.postCommand("/api/racer/input", JSON.stringify({
			left: Te,
			right: Ee,
			faster: De,
			slower: Oe
		})).catch((e) => console.error("[pixi-debug] racer input failed:", e));
	}, Be = (e, t) => {
		switch (e.key) {
			case "ArrowLeft":
			case "a":
			case "A": return Te = t, !0;
			case "ArrowRight":
			case "d":
			case "D": return Ee = t, !0;
			case "ArrowUp":
			case "w":
			case "W": return De = t, !0;
			case "ArrowDown":
			case "s":
			case "S": return Oe = t, !0;
			default: return !1;
		}
	}, Ve = (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault(), ue();
			return;
		}
		Be(e, !0) && (e.preventDefault(), ze());
	}, He = (e) => {
		Be(e, !1) && (e.preventDefault(), ze());
	};
	window.addEventListener("keydown", Ve), window.addEventListener("keyup", He), I = ko(n.streamUrl), I?.addSignalListener("racer-move", (e) => {
		try {
			let t = JSON.parse(e);
			if (!pc(t)) return;
			Re(t);
		} catch (e) {
			console.error("[pixi-debug] racer-move parse failed:", e);
		}
	});
	let Ue = (e, t) => ({
		id: e[t],
		z: e[t + 1],
		offset: e[t + 2],
		speed: e[t + 3],
		percent: e[t + 4],
		spriteKind: e[t + 5]
	});
	I?.addBufferListener("racer-move", (e) => {
		try {
			let t = yo(e), n = [];
			for (let r = 0; r < t.entityCount; r++) n.push(Ue(e, 24 + r * t.stride));
			Re({
				seq: t.seq,
				entityCount: t.entityCount,
				tickMs: t.tickMs,
				stepMs: t.stepMs,
				epoch: t.epoch,
				player: {
					x: e[6],
					z: e[7],
					speed: e[8],
					currentLapTime: e[9],
					lastLapTime: e[10],
					fastLapTime: e[11],
					lap: e[12],
					steer: e[13],
					uphill: Q(e[14])
				},
				cars: n,
				settings: {
					lanes: e[15],
					roadWidth: e[16],
					cameraHeight: e[17],
					drawDistance: e[18],
					fieldOfView: e[19],
					fogDensity: e[20],
					resolutionScale: e[21]
				},
				lapCompleted: Q(e[22]),
				collided: Q(e[23])
			});
		} catch (e) {
			console.error("[pixi-debug] racer-move buffer decode failed:", e);
		}
	}), I?.onInterrupted(() => fc("SSE connection error")), v.ingest([{
		id: 0,
		...u
	}]), y.ingest(d), ro.add(uc, dc), L("/api/racer/pause").catch((e) => console.error("[pixi-debug] racer pause failed:", e)), e.ticker.add(Le), Le(), fc("scene boot:", a.length, "segments,", d.length, "cars"), window.addEventListener("beforeunload", () => {
		I?.close(), window.removeEventListener("keydown", Ve), window.removeEventListener("keyup", He), Ie.removeEventListener("touchstart", Ne), Ie.removeEventListener("touchend", Pe), Ie.removeEventListener("touchcancel", Fe), we.disconnect(), e.ticker.remove(Le), ro.stop(uc), V.element.remove(), H.remove(), W.remove(), ce.remove(), le.remove(), ve.destroy(), ye.destroy(), be.destroy(), N.destroy(), P.destroy(), ee.destroy(), F.destroy();
		for (let e of de.values()) e.destroy();
		for (let e of A) e.destroy();
	});
}, xc = (e) => {
	e.renderer.background.color = "#1099bb";
	let t = new K();
	t.rect(50, 50, 100, 100).fill(14561865), t.rect(200, 50, 100, 100).fill(6621786).stroke({
		width: 2,
		color: 16706423
	}), t.rect(350, 50, 100, 100).fill(12796552).stroke({
		width: 10,
		color: 16760065
	}), t.rect(530, 50, 140, 100).fill(11161352).stroke({
		width: 2,
		color: 16777215
	}), t.circle(100, 250, 50).fill(14561865), t.circle(250, 250, 50).fill(6621786).stroke({
		width: 2,
		color: 16706423
	}), t.circle(400, 250, 50).fill(12796552).stroke({
		width: 10,
		color: 16760065
	}), t.ellipse(600, 250, 80, 50).fill(11161352).stroke({
		width: 2,
		color: 16777215
	}), t.moveTo(50, 350).lineTo(250, 350).lineTo(100, 400).lineTo(50, 350).fill(16724736).stroke({
		width: 4,
		color: 16767232
	}), t.roundRect(50, 440, 100, 100, 16).fill({
		color: 6621786,
		alpha: .25
	}).stroke({
		width: 2,
		color: 16711935
	}), t.star(360, 370, 5, 50).fill(3525722).stroke({
		width: 2,
		color: 16777215
	}), t.star(280, 510, 7, 50).fill(16763994).stroke({
		width: 2,
		color: 16777213
	}), t.star(470, 450, 4, 50).fill(5583706).stroke({
		width: 2,
		color: 16777213
	}), t.poly([
		600,
		370,
		700,
		460,
		780,
		420,
		730,
		570,
		590,
		520
	]).fill(3473658), t.eventMode = "static", t.cursor = "pointer", t.on("pointertap", () => {
		console.log("Graphics clicked!"), t.tint = 65280;
	}), e.stage.addChild(t);
}, Sc = 12, Cc = (e, t) => ({
	id: e[t],
	x: e[t + 1],
	y: e[t + 2],
	previousX: e[t + 3],
	previousY: e[t + 4],
	velocityX: e[t + 5],
	velocityY: e[t + 6],
	kind: e[t + 7],
	r: e[t + 8],
	g: e[t + 9],
	b: e[t + 10]
}), wc = 2, Tc = 3, Ec = 125, Dc = {
	ArrowUp: "up",
	w: "up",
	W: "up",
	k: "up",
	K: "up",
	ArrowDown: "down",
	s: "down",
	S: "down",
	j: "down",
	J: "down",
	ArrowLeft: "left",
	a: "left",
	A: "left",
	h: "left",
	H: "left",
	ArrowRight: "right",
	d: "right",
	D: "right",
	l: "right",
	L: "right"
}, Oc = "snake-eat", kc = "snake-spawn", Ac = "snake-endgame", jc = "_content/Game.UI/audio/snake-eat.mp3", Mc = "_content/Game.UI/audio/snake-spawn.mp3", Nc = "_content/Game.UI/audio/snake-endgame.mp3", Pc = /* @__PURE__ */ new Set();
function Fc(e, t) {
	Pc.has(e) || (ro.add(e, t), Pc.add(e));
}
function Ic(e, t) {
	Fc(e, t), ro.play(e);
}
function Lc(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.id == "number" && typeof t.x == "number" && typeof t.y == "number" && typeof t.previousX == "number" && typeof t.previousY == "number" && typeof t.velocityX == "number" && typeof t.velocityY == "number" && typeof t.kind == "number" && typeof t.r == "number" && typeof t.g == "number" && typeof t.b == "number";
}
function Rc(e) {
	if (!e || typeof e != "object") return !1;
	let t = e;
	return typeof t.seq == "number" && typeof t.entityCount == "number" && typeof t.tickMs == "number" && typeof t.stepMs == "number" && Array.isArray(t.sprites) && t.sprites.every(Lc) && typeof t.score == "number" && typeof t.gameOver == "boolean" && typeof t.started == "boolean" && typeof t.ate == "boolean" && typeof t.foodSpawned == "boolean" && typeof t.foodFalling == "boolean";
}
var zc = (e, t) => {
	let n = (t ?? {}).snake ?? {};
	e.renderer.background.color = "#020617";
	let r = n.gridWidth ?? 40, i = n.gridHeight ?? 30, a = n.cellSize ?? 20, o = r * a, s = i * a, c = new K(), l = new K(), u = Math.min(e.screen.width / o, e.screen.height / s);
	c.scale.set(u), c.x = (e.screen.width - o * u) / 2, c.y = (e.screen.height - s * u) / 2, l.scale.set(u), l.x = c.x, l.y = c.y, e.stage.addChild(c), e.stage.addChild(l);
	let d = new K();
	d.rect(0, 0, o, s).stroke({
		width: 4,
		color: "#8B0000"
	}), d.scale.set(u), d.x = c.x, d.y = c.y, e.stage.addChild(d);
	let f = new J({
		text: "Score: 0",
		style: new ke({
			fontFamily: "Arial",
			fontSize: 20,
			fontWeight: "bold",
			fill: "#e2e8f0"
		})
	});
	f.anchor.set(1, 0), f.position.set(e.screen.width - 16, 12), e.stage.addChild(f);
	let p = document.createElement("div");
	p.style.cssText = "position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.55);z-index:5;";
	let m = document.createElement("div");
	m.style.cssText = "font:bold 2rem sans-serif;color:#34d399;text-align:center;";
	let h = document.createElement("button");
	h.type = "button", h.textContent = "START GAME", h.style.cssText = "background-color:#34d399;color:#020617;border:none;border-radius:0.5rem;padding:0.75rem 2rem;font-size:1.1rem;font-weight:bold;cursor:pointer;";
	let g = document.createElement("div");
	g.style.cssText = "color:#94a3b8;font:0.85rem sans-serif;", g.textContent = "or press SPACE", p.append(m, h, g), document.body.appendChild(p);
	let _ = n.started ?? !1, v = n.gameOver ?? !1, y = n.score ?? 0, b = _, x = v, S = Ec, C = new So(), w = null, T = () => {
		_ && !b && console.debug("[pixi-debug] snake started (ECS signal)"), v && !x && (console.debug("[pixi-debug] snake ended (ECS signal) - score", y), Ic(Ac, Nc)), b = _, x = v;
	}, E = () => {
		if (_ && !v) {
			p.style.display = "none";
			return;
		}
		p.style.display = "flex", m.textContent = v ? `GAME OVER - SCORE: ${y}` : "SNAKE", h.textContent = v ? "PLAY AGAIN" : "START GAME";
	}, D = () => {
		_ && !v || w?.postCommand("/api/snake/start").then(() => {
			_ = !0, v = !1, E();
		}).catch((e) => console.error("[pixi-debug] snake start failed:", e));
	};
	h.addEventListener("click", D);
	let O = (e) => {
		c.clear(), l.clear();
		for (let { previous: t, current: n } of C.values()) {
			let r = t.x + (n.x - t.x) * e, i = t.y + (n.y - t.y) * e, o = n.r << 16 | n.g << 8 | n.b;
			(n.kind === wc || n.kind === Tc ? l : c).rect(r - a / 2, i - a / 2, a, a).fill(o);
		}
	}, k = (e, t, n) => {
		f.text = `Score: ${e}`, v = t, _ = n, y = e, T(), E();
	};
	C.ingest((n.sprites ?? []).filter(Lc)), k(n.score ?? 0, n.gameOver ?? !1, _);
	let A = (e) => {
		let t = C.advance(S);
		t !== null && O(t);
	};
	e.ticker.add(A);
	let j = (e) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault(), D();
			return;
		}
		let t = Dc[e.key];
		t && (e.preventDefault(), w?.postCommand("/api/snake/input", JSON.stringify({ direction: t })).catch((e) => console.error("[pixi-debug] snake input failed:", e)));
	};
	window.addEventListener("keydown", j), w = ko(n.streamUrl), w && (w.addSignalListener("snake-move", (e) => {
		try {
			let t = JSON.parse(e);
			if (!Rc(t)) throw Error("invalid snake render signal");
			vo({
				seq: t.seq,
				entityCount: t.entityCount,
				tickMs: t.tickMs
			}), S = Math.max(1, t.stepMs), C.ingest(t.sprites, t.seq, t.epoch), k(t.score, t.gameOver, t.started), t.ate && Ic(Oc, jc), t.foodSpawned && Ic(kc, Mc), t.foodFalling && console.debug("[pixi-debug] snake bad food started falling");
		} catch (e) {
			console.error("[pixi-debug] snake-move parse failed:", e);
		}
	}), w.addBufferListener("snake-move", (e) => {
		try {
			let t = C.ingestFromBuffer(e, Cc, Sc);
			if (!t) return;
			vo({
				seq: t.seq,
				entityCount: t.entityCount,
				tickMs: t.tickMs
			}), S = Math.max(1, t.stepMs), k(e[6], Q(e[7]), Q(e[8])), Q(e[9]) && Ic(Oc, jc), Q(e[10]) && Ic(kc, Mc), Q(e[11]) && console.debug("[pixi-debug] snake bad food started falling");
		} catch (e) {
			console.error("[pixi-debug] snake-move buffer decode failed:", e);
		}
	}), w.onInterrupted(() => console.warn("[pixi-debug] snake SSE interrupted; browser will retry")), window.addEventListener("beforeunload", () => {
		w?.close(), window.removeEventListener("keydown", j), e.ticker.remove(A), p.remove();
	}, { once: !0 }));
}, Bc = async (e) => {
	e.renderer.background.color = "#000000";
	let t = await q.load("https://pixijs.com/assets/star.png"), n = 0, r = 0, i = [];
	for (let n = 0; n < 500; n++) {
		let n = new P(t);
		n.anchor.set(.5, .7), e.stage.addChild(n), i.push({
			sprite: n,
			x: Math.random() * 1e3 - 500,
			y: Math.random() * 1e3 - 500,
			z: Math.random() * 1e3
		});
	}
	setInterval(() => {
		r = Math.random();
	}, 5e3), e.ticker.add((t) => {
		n += (r - n) / 20 * t.deltaTime;
		let a = e.screen.width / 2, o = e.screen.height / 2;
		for (let e of i) {
			e.z -= n * 10 * t.deltaTime, e.z <= 0 && (e.z += 1e3);
			let r = Math.atan2(e.y, e.x) * (180 / Math.PI) + 90;
			e.sprite.rotation = Math.PI / 180 * r;
			let i = e.x * (20 / (e.z - 0)), s = e.y * (20 / (e.z - 0));
			e.sprite.x = i + a, e.sprite.y = s + o;
			let c = 1 - e.z / 1e3;
			e.sprite.scale.set(c, c);
		}
	});
}, Vc = {
	ArrowLeft: "left",
	a: "left",
	A: "left",
	ArrowRight: "right",
	d: "right",
	D: "right",
	ArrowUp: "rotate",
	w: "rotate",
	W: "rotate",
	ArrowDown: "down",
	s: "down",
	S: "down"
}, Hc = (...e) => console.log("[pixi-debug] tetris:", ...e), Uc = 14, Wc = (e, t) => ({
	id: e[t],
	x: e[t + 1],
	y: e[t + 2],
	r: e[t + 3],
	g: e[t + 4],
	b: e[t + 5]
}), Gc = {
	"basic/container": _s,
	"basic/container-pivot": gs,
	"basic/blend-modes": rs,
	"basic/bitmap-text": ns,
	"basic/bitmap-text2": ts,
	"basic/from-font": bs,
	"basic/pixi-text": Cs,
	"sprite/basic": es,
	"sprite/animated-sprite": Kr,
	"sprite/tiling-sprite": async (e) => {
		e.renderer.background.color = "#1099bb";
		let t = new Un({
			texture: await q.load("https://pixijs.com/assets/p2.jpeg"),
			width: e.screen.width,
			height: e.screen.height
		});
		e.stage.addChild(t);
		let n = 0;
		e.ticker.add(() => {
			n += .005, t.tileScale.x = 2 + Math.sin(n), t.tileScale.y = 2 + Math.cos(n), t.tilePosition.x += 1, t.tilePosition.y += 1;
		});
	},
	"graphics/simple-graphics": xc,
	"filters/blur-filter": is,
	"masks/graphics-mask": xs,
	"meshes/mesh-rope": Ss,
	"events/dragging": vs,
	"textures/render-texture": Qs,
	"assets/asset-bundle": $o,
	"advanced/star-warp": Bc,
	"ecs/sprites": ys,
	"games/snake": zc,
	"games/tetris": (e, t) => {
		let n = (t ?? {}).tetris ?? {};
		e.renderer.background.color = "#020617";
		let r = n.gridWidth ?? 10, i = n.gridHeight ?? 20, a = n.cellSize ?? 30, o = r * a, s = i * a, c = new K(), l = Math.min(e.screen.width / o, e.screen.height / s);
		c.scale.set(l), c.x = (e.screen.width - o * l) / 2, c.y = (e.screen.height - s * l) / 2, e.stage.addChild(c);
		let u = new K();
		u.rect(0, 0, o, s).stroke({
			width: 4,
			color: "#8B0000"
		}), u.scale.set(l), u.x = c.x, u.y = c.y, e.stage.addChild(u);
		let d = new J({
			text: "Score: 0  Rows: 0  Level: 1",
			style: new ke({
				fontFamily: "Arial",
				fontSize: 18,
				fontWeight: "bold",
				fill: "#e2e8f0"
			})
		});
		d.anchor.set(1, 0), d.position.set(e.screen.width - 16, 12), e.stage.addChild(d);
		let f = document.createElement("div");
		f.style.cssText = "position:fixed;top:52px;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:rgba(2,6,23,0.55);z-index:5;";
		let p = document.createElement("div");
		p.style.cssText = "font:bold 2rem sans-serif;color:#f97316;text-align:center;";
		let m = document.createElement("button");
		m.type = "button", m.textContent = "START GAME", m.style.cssText = "background-color:#f97316;color:#020617;border:none;border-radius:0.5rem;padding:0.75rem 2rem;font-size:1.1rem;font-weight:bold;cursor:pointer;";
		let h = document.createElement("div");
		h.style.cssText = "color:#94a3b8;font:0.85rem sans-serif;", h.textContent = "or press SPACE", f.append(p, m, h), document.body.appendChild(f);
		let g = n.started ?? !1, _ = n.gameOver ?? !1, v = n.score ?? 0, y = n.rows ?? 0, b = n.level ?? 1, x = _, S = 1e3 / 60, C = new So(), w = null, T = () => {
			_ && !x && Hc("game ended (ECS signal) - score", v), x = _;
		}, E = () => {
			if (g && !_) {
				f.style.display = "none";
				return;
			}
			f.style.display = "flex", p.textContent = _ ? `GAME OVER - SCORE: ${v}` : "TETRIS", m.textContent = _ ? "PLAY AGAIN" : "START GAME";
		}, D = () => {
			g && !_ || (Hc("starting game (button or space)"), w?.postCommand("/api/tetris/start").catch((e) => console.error("[pixi-debug] tetris start failed:", e)), g = !0, _ = !1, E());
		};
		m.addEventListener("click", D);
		let O = (e) => {
			c.clear();
			for (let t of C.values()) {
				let n = t.current, r = Co(t.previous.x, n.x, e), i = Co(t.previous.y, n.y, e);
				c.rect(r - a / 2, i - a / 2, a, a).fill(n.r << 16 | n.g << 8 | n.b);
			}
		}, k = (e, t, n, r, i) => {
			d.text = `Score: ${e}  Rows: ${t}  Level: ${n}`, v = e, y = t, b = n, _ = r, g = i, T(), E();
		};
		C.ingest(n.sprites ?? []);
		let A = () => {
			let e = C.advance(S);
			e !== null && O(e);
		};
		e.ticker.add(A), k(v, y, b, _, g);
		let j = (e) => {
			if (e.key === " " || e.key === "Enter") {
				if (e.preventDefault(), g && !_) {
					let t = e.key === " " ? "hardDrop" : "rotate";
					Hc("input command:", t), w?.postCommand("/api/tetris/input", JSON.stringify({ command: t })).catch((e) => console.error("[pixi-debug] tetris input failed:", e));
				} else D();
				return;
			}
			let t = Vc[e.key];
			t && (e.preventDefault(), Hc("input command:", t), w?.postCommand("/api/tetris/input", JSON.stringify({ command: t })).catch((e) => console.error("[pixi-debug] tetris input failed:", e)));
		};
		if (window.addEventListener("keydown", j), w = ko(n.streamUrl), !w) return;
		w.addSignalListener("tetris-move", (e) => {
			try {
				let t = JSON.parse(e);
				S = Math.max(1, t.stepMs ?? 1e3 / 60), C.removeWhere((e) => e < 1e3), C.ingest(t.sprites, t.seq, t.epoch), k(t.score, t.rows, t.level, t.gameOver, t.started), t.locked && Hc("ECS event: piece locked, cleared lines", t.linesCleared);
			} catch (e) {
				console.error("[pixi-debug] tetris-move parse failed:", e);
			}
		}), w.addBufferListener("tetris-move", (e) => {
			try {
				let t = C.ingestFromBuffer(e, Wc, Uc);
				if (!t) return;
				S = Math.max(1, t.stepMs), C.removeWhere((e) => e < 1e3);
				let n = e[6], r = e[7], i = e[8], a = Q(e[9]), o = Q(e[10]), s = Q(e[11]), c = e[12];
				k(n, r, i, a, o), s && Hc("ECS event: piece locked, cleared lines", c);
			} catch (e) {
				console.error("[pixi-debug] tetris-move buffer decode failed:", e);
			}
		});
		let M = () => {
			w?.close(), window.removeEventListener("keydown", j), e.ticker.remove(A), f.remove();
		};
		w.onInterrupted(() => M()), window.addEventListener("beforeunload", M);
	},
	"games/breakout": hs,
	"games/asteroids": Qo,
	"games/racer": bc,
	"games/pacman": Zs
}, Kc = (...e) => console.log("[pixi-debug]", ...e), qc = null, Jc = null, Yc = null;
async function Xc(e) {
	if (Kc("initGame called, containerId =", e), Jc = document.getElementById(e), !Jc) {
		console.error(`[pixi-debug] container '#${e}' NOT found in DOM`);
		return;
	}
	Kc("container found, client size =", Jc.clientWidth, "x", Jc.clientHeight), await new Promise((e) => setTimeout(e, 50)), Kc("layout wait done, client size now =", Jc.clientWidth, "x", Jc.clientHeight), (Jc.clientWidth === 0 || Jc.clientHeight === 0) && (console.warn(`[pixi-debug] PixiJS Target Container '${e}' has a 0px boundary size. Forcing fallback dimensions.`), Jc.style.width = "100vw", Jc.style.height = "100vh"), Kc("creating PixiJS Application"), qc = new Ge(), await qc.init({
		resizeTo: Jc,
		backgroundAlpha: 1,
		autoDensity: !0,
		antialias: !0,
		hello: !0
	}), Kc("Pixy Active Renderer Type:", qc.renderer.type), Kc("app.init succeeded, canvas size =", qc.canvas.width, "x", qc.canvas.height), Jc.appendChild(qc.canvas), Kc("canvas appended to container"), fo(qc.ticker), go(), window.addEventListener("resize", Qc);
}
function Zc(e) {
	if (Kc("renderText called, message =", JSON.stringify(e)), !qc || !Jc) {
		console.error("[pixi-debug] renderText skipped: PixiJS app or container is not initialized");
		return;
	}
	Yc || (Kc("creating PixiJS Text object"), Yc = new J({
		text: "",
		style: new ke({
			fontFamily: "Arial",
			fontSize: 36,
			fontWeight: "bold",
			fill: "#ffffff"
		})
	}), Yc.anchor.set(.5), qc.stage.addChild(Yc), Kc("Text created and added to stage")), Yc.text = e, Kc("text set, measured size =", Yc.width, "x", Yc.height), Qc();
}
function Qc() {
	!Yc || !Jc || (Yc.x = Jc.clientWidth / 2, Yc.y = Jc.clientHeight / 2, Kc("message centered at", Yc.x, ",", Yc.y));
}
async function $c(e) {
	if (Kc("renderScene called, message =", JSON.stringify(e)), !qc || !Jc) {
		console.error("[pixi-debug] renderScene skipped: PixiJS app or container is not initialized");
		return;
	}
	let t = null;
	try {
		let n = JSON.parse(e);
		n && typeof n == "object" && (t = n);
	} catch {
		t = null;
	}
	if (!t?.exampleId) {
		Zc(e);
		return;
	}
	let n = Gc[t.exampleId];
	if (!n) {
		console.error(`[pixi-debug] no scene registered for exampleId '${t.exampleId}'`);
		return;
	}
	Kc("running scene for exampleId =", t.exampleId);
	try {
		await n(qc, t);
	} catch (e) {
		console.error(`[pixi-debug] scene '${t.exampleId}' failed:`, e);
	}
}
Kc("game-bundle loaded, exposing window.initGame / window.renderText / window.renderScene"), window.initGame = Xc, window.renderText = Zc, window.renderScene = $c, window.togglePixiStats = po, window.toggleCSharpStats = _o, window.registerLocalBufferProvider = Oo, window.dispatchEvent(new Event("pixi-bundle-ready"));
//#endregion
export { Xc as initGame, $c as renderScene, Zc as renderText };

//# sourceMappingURL=game-bundle.js.map