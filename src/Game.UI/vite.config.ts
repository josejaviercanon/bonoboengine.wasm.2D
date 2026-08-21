import { defineConfig } from 'vite';
import { resolve } from 'path';

// Compile-time render-source flag (ADR-007): 'local-buffer' (DEFAULT —
// co-located Game.Wasm host, matches the C# SINGLE_PLAYER_LOCAL default) or
// 'sse' (`vite build --mode web` — Game.Web static-SSR bridge, multiplayer).
// `define` replaces the identifier before bundling so the unused transport
// branch is tree-shaken away. `fetch` POST ships only in 'web' mode bundles.
const renderSource = (mode: string) => (mode === 'web' ? 'sse' : 'local-buffer');

export default defineConfig(({ mode }) => ({
    define: {
        __RENDER_SOURCE__: JSON.stringify(renderSource(mode))
    },
  build: {
    lib: {
      entry: resolve(__dirname, 'Frontend/game.ts'),
      name: 'GameViewport',
      fileName: 'game-bundle',
      // ES module: Rapier's wasm-bindgen wrapper uses top-level await, which the
      // IIFE output format cannot express. Loaded via <script type="module">.
      formats: ['es']
    },
    outDir: resolve(__dirname, 'wwwroot/dist'), // Exports directly to Blazor assets
    emptyOutDir: true,
    sourcemap: true
  }
}));
