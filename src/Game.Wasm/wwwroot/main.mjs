import { dotnet } from './_framework/dotnet.js';
import { notifyRender, setupProvider } from './js/wasm-interop.js';

const dbg = (...args) => console.log('[pixi-debug]', ...args);

// Bootstrap .NET runtime
const runtime = await dotnet.withApplicationArguments("start").create();
const { setModuleImports, getAssemblyExports, getConfig, runMain } = runtime;

// Register the interop module BEFORE runMain so C# [JSImport] can find it
setModuleImports('WasmInterop', { notifyRender });

const config = getConfig();
const exports = await getAssemblyExports(config.mainAssemblyName);

// Register local-buffer provider with Pixi bundle (handles command routing + signals)
setupProvider(exports);

// Run C# Main() — initializes SimHost
await runMain();

// Build toolbar UI from the C# catalog
const exampleList = JSON.parse(exports.Game.Wasm.WasmInterop.ListExamples());
const groups = [...new Set(exampleList.map(e => e.group))];
const games = exampleList.filter(e => e.group === 'Games');
const examples = exampleList.filter(e => e.group !== 'Games');

function buildToolbar() {
    const toolbar = document.createElement('div');
    toolbar.style.cssText =
        'position:fixed;top:0;left:0;right:0;background:rgba(15,23,42,0.9);padding:0.75rem 1rem;' +
        'color:#fff;z-index:10;display:flex;justify-content:space-between;align-items:center;' +
        'gap:1rem;border-bottom:1px solid #1e293b;';

    const left = document.createElement('div');
    left.style.cssText = 'display:flex;align-items:center;gap:1rem;min-width:0;flex-wrap:wrap;';

    const title = document.createElement('span');
    title.style.cssText = 'font-size:0.75rem;color:#94a3b8;';
    title.textContent = 'PixiJS Examples';
    left.appendChild(title);

    // Example selector
    const exampleSelect = document.createElement('select');
    exampleSelect.id = 'example-select';
    exampleSelect.style.cssText =
        'background:#0f172a;color:#e2e8f0;border:1px solid #334155;' +
        'border-radius:0.375rem;padding:0.375rem 0.5rem;font-size:0.875rem;';
    for (const g of [...new Set(examples.map(e => e.group))]) {
        const optgroup = document.createElement('optgroup');
        optgroup.label = g;
        for (const item of examples.filter(e => e.group === g)) {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.title;
            optgroup.appendChild(opt);
        }
        exampleSelect.appendChild(optgroup);
    }
    left.appendChild(exampleSelect);

    const sep = document.createElement('span');
    sep.style.cssText = 'font-size:0.75rem;color:#94a3b8;';
    sep.textContent = 'Games';
    left.appendChild(sep);

    // Game selector
    const gameSelect = document.createElement('select');
    gameSelect.id = 'game-select';
    gameSelect.style.cssText =
        'background:#0f172a;color:#e2e8f0;border:1px solid #334155;' +
        'border-radius:0.375rem;padding:0.375rem 0.5rem;font-size:0.875rem;';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a game…';
    gameSelect.appendChild(placeholder);
    for (const g of games) {
        const opt = document.createElement('option');
        opt.value = g.id;
        opt.textContent = g.title;
        gameSelect.appendChild(opt);
    }
    left.appendChild(gameSelect);

    // Selection handler
    const onSelect = async (id) => {
        const payload = exports.Game.Wasm.WasmInterop.GetExamplePayload(id);
        if (typeof window.renderScene === 'function') {
            await window.renderScene(payload);
        }
    };
    exampleSelect.addEventListener('change', () => onSelect(exampleSelect.value));
    gameSelect.addEventListener('change', () => onSelect(gameSelect.value));

    const right = document.createElement('div');
    right.style.cssText = 'display:flex;align-items:center;gap:0.5rem;';
    const statsBtn = document.createElement('button');
    statsBtn.type = 'button';
    statsBtn.textContent = 'PixiJS Stats';
    statsBtn.style.cssText =
        'background:#0f172a;color:#e2e8f0;border:1px solid #334155;' +
        'border-radius:0.375rem;padding:0.375rem 0.5rem;font-size:0.75rem;cursor:pointer;';
    statsBtn.addEventListener('click', () => window.togglePixiStats?.());
    const csStatsBtn = document.createElement('button');
    csStatsBtn.type = 'button';
    csStatsBtn.textContent = 'C# Stats';
    csStatsBtn.style.cssText =
        'background:#0f172a;color:#e2e8f0;border:1px solid #334155;' +
        'border-radius:0.375rem;padding:0.375rem 0.5rem;font-size:0.75rem;cursor:pointer;';
    csStatsBtn.addEventListener('click', () => window.toggleCSharpStats?.());
    right.appendChild(statsBtn);
    right.appendChild(csStatsBtn);

    toolbar.appendChild(left);
    toolbar.appendChild(right);
    document.body.prepend(toolbar);

    return { exampleSelect, gameSelect };
}

const { exampleSelect, gameSelect } = buildToolbar();

// Determine initial example from URL query or default
const params = new URLSearchParams(window.location.search);
const initialId = params.get('example') || 'games/tetris';
const cat = exampleList.find(e => e.id === initialId);
if (cat) {
    if (cat.group === 'Games') gameSelect.value = initialId;
    else exampleSelect.value = initialId;
}

// Wait for pixi bundle then render initial scene
async function bootPixiAndRender() {
    if (typeof window.initGame !== 'function') {
        await new Promise(resolve => {
            const check = () => {
                if (typeof window.initGame === 'function' && document.getElementById('pixi-viewport')) {
                    resolve();
                } else {
                    setTimeout(check, 50);
                }
            };
            check();
        });
    }
    await window.initGame('pixi-viewport');
    const payload = exports.Game.Wasm.WasmInterop.GetExamplePayload(initialId);
    dbg('initial payload acquired, rendering', initialId);
    await window.renderScene(payload);
}

await bootPixiAndRender();