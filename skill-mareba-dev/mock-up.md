<html lang="ja" data-fontsize="standard"><head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>말해봐 マレバ — 韓国語AI会話 (standalone)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&amp;family=Noto+Sans+KR:wght@400;500;600;700&amp;display=swap" rel="stylesheet">
  <style>
/* マレバ — design tokens */
:root {
  /* Brand colors — dusty pastel + adult feminine */
  --bg-canvas: #FBF8F4;       /* warm off-white canvas */
  --bg-app: #FFFCF8;          /* in-device background */
  --bg-card: #FFFFFF;
  --bg-soft: #F6EFE9;         /* card hover / soft fill */
  --bg-blush: #F9E8E4;        /* dusty blush */
  --bg-lilac: #ECE4F4;        /* dusty lilac */
  --bg-mint:  #E3EFE8;        /* dusty mint accent */
  --bg-cream: #F7EFD9;        /* warm cream */

  /* Foregrounds */
  --ink-1: #2A2230;           /* primary text — warm dark plum */
  --ink-2: #5C4F65;           /* secondary */
  --ink-3: #8E8198;           /* tertiary / placeholder */
  --ink-4: #C8BFD0;           /* dividers */

  /* Accents — muted, adult */
  --plum: #8B7AC7;            /* dusty purple */
  --plum-deep: #6F5DAB;
  --plum-soft: #D9D1ED;
  --rose: #D69AAE;            /* dusty rose */
  --rose-deep: #B97189;
  --rose-soft: #F2DCE2;
  --gold: #C8A36B;            /* warm gold accent */

  /* Functional */
  --success: #7BA88E;
  --warn: #D9A14B;
  --error: #C97A7A;

  /* Radii + shadows */
  --r-sm: 10px;
  --r-md: 16px;
  --r-lg: 22px;
  --r-xl: 28px;
  --r-pill: 999px;

  --sh-sm: 0 2px 6px rgba(67, 47, 88, 0.06);
  --sh-md: 0 6px 18px rgba(67, 47, 88, 0.08);
  --sh-lg: 0 18px 40px rgba(67, 47, 88, 0.12);

  /* Type scale (mobile defaults) */
  --fs-xs: 12px;
  --fs-sm: 13px;
  --fs-base: 15px;
  --fs-md: 16px;
  --fs-lg: 18px;
  --fs-xl: 22px;
  --fs-2xl: 28px;
  --fs-3xl: 34px;
}

[data-fontsize="large"] {
  --fs-xs: 14px;
  --fs-sm: 15px;
  --fs-base: 17px;
  --fs-md: 18px;
  --fs-lg: 20px;
  --fs-xl: 24px;
  --fs-2xl: 30px;
  --fs-3xl: 36px;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: 'Noto Sans JP', 'Hiragino Sans', system-ui, sans-serif;
  color: var(--ink-1);
  background: var(--bg-canvas);
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "palt";
}

[lang="ko"] {
  font-family: 'Noto Sans KR', 'Noto Sans JP', system-ui, sans-serif;
}

button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
  color: inherit;
  padding: 0;
}

/* ─── Phone shell ─── */
.phone {
  width: 390px;
  height: 844px;
  background: var(--bg-app);
  border-radius: 48px;
  position: relative;
  overflow: hidden;
  box-shadow:
    0 0 0 1px rgba(67,47,88,0.08),
    0 0 0 11px #1a1422,
    0 0 0 12px #2a2230,
    0 30px 60px rgba(67,47,88,0.18);
}
.phone-screen {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: var(--bg-app);
}
.phone-notch {
  position: absolute;
  top: 11px; left: 50%;
  transform: translateX(-50%);
  width: 120px; height: 32px;
  background: #0d0810;
  border-radius: 999px;
  z-index: 10;
}
.status-bar {
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  flex-shrink: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-1);
  letter-spacing: 0.2px;
}
.status-bar .icons {
  display: flex; gap: 6px; align-items: center;
}
.home-indicator {
  position: absolute;
  bottom: 8px; left: 50%;
  transform: translateX(-50%);
  width: 134px; height: 5px;
  background: var(--ink-1);
  opacity: 0.35;
  border-radius: 999px;
  z-index: 10;
}

/* ─── Tab bar ─── */
.tab-bar {
  height: 84px;
  background: rgba(255, 252, 248, 0.92);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(200, 191, 208, 0.4);
  display: flex;
  padding: 8px 0 24px;
  flex-shrink: 0;
}
.tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 10px;
  font-weight: 500;
  color: var(--ink-3);
  transition: color .15s;
}
.tab-item.active { color: var(--plum-deep); }
.tab-item .tab-icon {
  width: 26px; height: 26px;
  display: flex; align-items: center; justify-content: center;
}

/* ─── Generic ─── */
.scroll-area {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
.scroll-area::-webkit-scrollbar { width: 0; }

.chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: var(--r-pill);
  font-size: var(--fs-xs);
  font-weight: 500;
  background: var(--bg-soft);
  color: var(--ink-2);
}

.btn-primary {
  background: linear-gradient(180deg, #9888CF 0%, var(--plum-deep) 100%);
  color: white;
  font-weight: 600;
  font-size: var(--fs-md);
  padding: 16px 24px;
  border-radius: var(--r-pill);
  box-shadow: 0 6px 16px rgba(111,93,171,0.3);
  transition: transform .12s ease, box-shadow .12s ease;
}
.btn-primary:active {
  transform: scale(0.98);
  box-shadow: 0 3px 8px rgba(111,93,171,0.3);
}

.btn-ghost {
  background: var(--bg-soft);
  color: var(--ink-1);
  font-weight: 500;
  font-size: var(--fs-base);
  padding: 12px 18px;
  border-radius: var(--r-pill);
}

/* Animations */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-up { animation: fadeUp .35s ease both; }

@keyframes pulseRing {
  0% { box-shadow: 0 0 0 0 rgba(139,122,199,.4); }
  70% { box-shadow: 0 0 0 18px rgba(139,122,199,0); }
  100% { box-shadow: 0 0 0 0 rgba(139,122,199,0); }
}
.pulse-ring { animation: pulseRing 1.6s infinite; }

@keyframes typing {
  0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
  30% { opacity: 1; transform: translateY(-3px); }
}
.typing-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--plum);
  animation: typing 1.2s infinite;
}
.typing-dot:nth-child(2) { animation-delay: .15s; }
.typing-dot:nth-child(3) { animation-delay: .3s; }
  </style>
<script>function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* ─── tweaks-panel.jsx ─── */

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;height:22px;
    border-radius:6px;cursor:default;padding:0}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((key, val) => {
    setValues(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [key]: val
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: {
        [key]: val
      }
    }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}
function TweakColor({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
    type: "color",
    className: "twk-swatch",
    value: value,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfX1RXRUFLU19TVFlMRSIsInVzZVR3ZWFrcyIsImRlZmF1bHRzIiwidmFsdWVzIiwic2V0VmFsdWVzIiwiUmVhY3QiLCJ1c2VTdGF0ZSIsInNldFR3ZWFrIiwidXNlQ2FsbGJhY2siLCJrZXkiLCJ2YWwiLCJwcmV2IiwiX29iamVjdFNwcmVhZCIsIndpbmRvdyIsInBhcmVudCIsInBvc3RNZXNzYWdlIiwidHlwZSIsImVkaXRzIiwiVHdlYWtzUGFuZWwiLCJ0aXRsZSIsImNoaWxkcmVuIiwib3BlbiIsInNldE9wZW4iLCJkcmFnUmVmIiwidXNlUmVmIiwib2Zmc2V0UmVmIiwieCIsInkiLCJQQUQiLCJjbGFtcFRvVmlld3BvcnQiLCJwYW5lbCIsImN1cnJlbnQiLCJ3Iiwib2Zmc2V0V2lkdGgiLCJoIiwib2Zmc2V0SGVpZ2h0IiwibWF4UmlnaHQiLCJNYXRoIiwibWF4IiwiaW5uZXJXaWR0aCIsIm1heEJvdHRvbSIsImlubmVySGVpZ2h0IiwibWluIiwic3R5bGUiLCJyaWdodCIsImJvdHRvbSIsInVzZUVmZmVjdCIsIlJlc2l6ZU9ic2VydmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJybyIsIm9ic2VydmUiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImRpc2Nvbm5lY3QiLCJvbk1zZyIsImUiLCJ0IiwiZGF0YSIsImRpc21pc3MiLCJvbkRyYWdTdGFydCIsInIiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzeCIsImNsaWVudFgiLCJzeSIsImNsaWVudFkiLCJzdGFydFJpZ2h0Iiwic3RhcnRCb3R0b20iLCJtb3ZlIiwiZXYiLCJ1cCIsImNyZWF0ZUVsZW1lbnQiLCJGcmFnbWVudCIsInJlZiIsImNsYXNzTmFtZSIsIm9uTW91c2VEb3duIiwic3RvcFByb3BhZ2F0aW9uIiwib25DbGljayIsIlR3ZWFrU2VjdGlvbiIsImxhYmVsIiwiVHdlYWtSb3ciLCJ2YWx1ZSIsImlubGluZSIsIlR3ZWFrU2xpZGVyIiwic3RlcCIsInVuaXQiLCJvbkNoYW5nZSIsIk51bWJlciIsInRhcmdldCIsIlR3ZWFrVG9nZ2xlIiwicm9sZSIsIlR3ZWFrUmFkaW8iLCJvcHRpb25zIiwidHJhY2tSZWYiLCJkcmFnZ2luZyIsInNldERyYWdnaW5nIiwib3B0cyIsIm1hcCIsIm8iLCJpZHgiLCJmaW5kSW5kZXgiLCJuIiwibGVuZ3RoIiwidmFsdWVSZWYiLCJzZWdBdCIsImlubmVyIiwid2lkdGgiLCJpIiwiZmxvb3IiLCJsZWZ0Iiwib25Qb2ludGVyRG93biIsInYwIiwidiIsIlR3ZWFrU2VsZWN0IiwibCIsIlR3ZWFrVGV4dCIsInBsYWNlaG9sZGVyIiwiVHdlYWtOdW1iZXIiLCJjbGFtcCIsInN0YXJ0UmVmIiwib25TY3J1YlN0YXJ0IiwicHJldmVudERlZmF1bHQiLCJkZWNpbWFscyIsIlN0cmluZyIsInNwbGl0IiwiZHgiLCJyYXciLCJzbmFwcGVkIiwicm91bmQiLCJ0b0ZpeGVkIiwiVHdlYWtDb2xvciIsIlR3ZWFrQnV0dG9uIiwic2Vjb25kYXJ5IiwiT2JqZWN0IiwiYXNzaWduIl0sInNvdXJjZXMiOlsiSW5saW5lIEJhYmVsIHNjcmlwdCJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIOKUgOKUgOKUgCB0d2Vha3MtcGFuZWwuanN4IOKUgOKUgOKUgCAqL1xuXG4vLyB0d2Vha3MtcGFuZWwuanN4XG4vLyBSZXVzYWJsZSBUd2Vha3Mgc2hlbGwgKyBmb3JtLWNvbnRyb2wgaGVscGVycy5cbi8vXG4vLyBPd25zIHRoZSBob3N0IHByb3RvY29sIChsaXN0ZW5zIGZvciBfX2FjdGl2YXRlX2VkaXRfbW9kZSAvIF9fZGVhY3RpdmF0ZV9lZGl0X21vZGUsXG4vLyBwb3N0cyBfX2VkaXRfbW9kZV9hdmFpbGFibGUgLyBfX2VkaXRfbW9kZV9zZXRfa2V5cyAvIF9fZWRpdF9tb2RlX2Rpc21pc3NlZCkgc29cbi8vIGluZGl2aWR1YWwgcHJvdG90eXBlcyBkb24ndCByZS1yb2xsIGl0LiBTaGlwcyBhIGNvbnNpc3RlbnQgc2V0IG9mIGNvbnRyb2xzIHNvIHlvdVxuLy8gZG9uJ3QgaGFuZC1kcmF3IDxpbnB1dCB0eXBlPVwicmFuZ2VcIj4sIHNlZ21lbnRlZCByYWRpb3MsIHN0ZXBwZXJzLCBldGMuXG4vL1xuLy8gVXNhZ2UgKGluIGFuIEhUTUwgZmlsZSB0aGF0IGxvYWRzIFJlYWN0ICsgQmFiZWwpOlxuLy9cbi8vICAgY29uc3QgVFdFQUtfREVGQVVMVFMgPSAvKkVESVRNT0RFLUJFR0lOKi97XG4vLyAgICAgXCJwcmltYXJ5Q29sb3JcIjogXCIjRDk3NzU3XCIsXG4vLyAgICAgXCJmb250U2l6ZVwiOiAxNixcbi8vICAgICBcImRlbnNpdHlcIjogXCJyZWd1bGFyXCIsXG4vLyAgICAgXCJkYXJrXCI6IGZhbHNlXG4vLyAgIH0vKkVESVRNT0RFLUVORCovO1xuLy9cbi8vICAgZnVuY3Rpb24gQXBwKCkge1xuLy8gICAgIGNvbnN0IFt0LCBzZXRUd2Vha10gPSB1c2VUd2Vha3MoVFdFQUtfREVGQVVMVFMpO1xuLy8gICAgIHJldHVybiAoXG4vLyAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiB0LmZvbnRTaXplLCBjb2xvcjogdC5wcmltYXJ5Q29sb3IgfX0+XG4vLyAgICAgICAgIEhlbGxvXG4vLyAgICAgICAgIDxUd2Vha3NQYW5lbD5cbi8vICAgICAgICAgICA8VHdlYWtTZWN0aW9uIGxhYmVsPVwiVHlwb2dyYXBoeVwiIC8+XG4vLyAgICAgICAgICAgPFR3ZWFrU2xpZGVyIGxhYmVsPVwiRm9udCBzaXplXCIgdmFsdWU9e3QuZm9udFNpemV9IG1pbj17MTB9IG1heD17MzJ9IHVuaXQ9XCJweFwiXG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gc2V0VHdlYWsoJ2ZvbnRTaXplJywgdil9IC8+XG4vLyAgICAgICAgICAgPFR3ZWFrUmFkaW8gIGxhYmVsPVwiRGVuc2l0eVwiIHZhbHVlPXt0LmRlbnNpdHl9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9e1snY29tcGFjdCcsICdyZWd1bGFyJywgJ2NvbWZ5J119XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gc2V0VHdlYWsoJ2RlbnNpdHknLCB2KX0gLz5cbi8vICAgICAgICAgICA8VHdlYWtTZWN0aW9uIGxhYmVsPVwiVGhlbWVcIiAvPlxuLy8gICAgICAgICAgIDxUd2Vha0NvbG9yICBsYWJlbD1cIlByaW1hcnlcIiB2YWx1ZT17dC5wcmltYXJ5Q29sb3J9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gc2V0VHdlYWsoJ3ByaW1hcnlDb2xvcicsIHYpfSAvPlxuLy8gICAgICAgICAgIDxUd2Vha1RvZ2dsZSBsYWJlbD1cIkRhcmsgbW9kZVwiIHZhbHVlPXt0LmRhcmt9XG4vLyAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodikgPT4gc2V0VHdlYWsoJ2RhcmsnLCB2KX0gLz5cbi8vICAgICAgICAgPC9Ud2Vha3NQYW5lbD5cbi8vICAgICAgIDwvZGl2PlxuLy8gICAgICk7XG4vLyAgIH1cbi8vXG4vLyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuY29uc3QgX19UV0VBS1NfU1RZTEUgPSBgXG4gIC50d2stcGFuZWx7cG9zaXRpb246Zml4ZWQ7cmlnaHQ6MTZweDtib3R0b206MTZweDt6LWluZGV4OjIxNDc0ODM2NDY7d2lkdGg6MjgwcHg7XG4gICAgbWF4LWhlaWdodDpjYWxjKDEwMHZoIC0gMzJweCk7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtcbiAgICBiYWNrZ3JvdW5kOnJnYmEoMjUwLDI0OSwyNDcsLjc4KTtjb2xvcjojMjkyNjFiO1xuICAgIC13ZWJraXQtYmFja2Ryb3AtZmlsdGVyOmJsdXIoMjRweCkgc2F0dXJhdGUoMTYwJSk7YmFja2Ryb3AtZmlsdGVyOmJsdXIoMjRweCkgc2F0dXJhdGUoMTYwJSk7XG4gICAgYm9yZGVyOi41cHggc29saWQgcmdiYSgyNTUsMjU1LDI1NSwuNik7Ym9yZGVyLXJhZGl1czoxNHB4O1xuICAgIGJveC1zaGFkb3c6MCAxcHggMCByZ2JhKDI1NSwyNTUsMjU1LC41KSBpbnNldCwwIDEycHggNDBweCByZ2JhKDAsMCwwLC4xOCk7XG4gICAgZm9udDoxMS41cHgvMS40IHVpLXNhbnMtc2VyaWYsc3lzdGVtLXVpLC1hcHBsZS1zeXN0ZW0sc2Fucy1zZXJpZjtvdmVyZmxvdzpoaWRkZW59XG4gIC50d2staGR7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtcbiAgICBwYWRkaW5nOjEwcHggOHB4IDEwcHggMTRweDtjdXJzb3I6bW92ZTt1c2VyLXNlbGVjdDpub25lfVxuICAudHdrLWhkIGJ7Zm9udC1zaXplOjEycHg7Zm9udC13ZWlnaHQ6NjAwO2xldHRlci1zcGFjaW5nOi4wMWVtfVxuICAudHdrLXh7YXBwZWFyYW5jZTpub25lO2JvcmRlcjowO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7Y29sb3I6cmdiYSg0MSwzOCwyNywuNTUpO1xuICAgIHdpZHRoOjIycHg7aGVpZ2h0OjIycHg7Ym9yZGVyLXJhZGl1czo2cHg7Y3Vyc29yOmRlZmF1bHQ7Zm9udC1zaXplOjEzcHg7bGluZS1oZWlnaHQ6MX1cbiAgLnR3ay14OmhvdmVye2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDYpO2NvbG9yOiMyOTI2MWJ9XG4gIC50d2stYm9keXtwYWRkaW5nOjJweCAxNHB4IDE0cHg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTBweDtcbiAgICBvdmVyZmxvdy15OmF1dG87b3ZlcmZsb3cteDpoaWRkZW47bWluLWhlaWdodDowO1xuICAgIHNjcm9sbGJhci13aWR0aDp0aGluO3Njcm9sbGJhci1jb2xvcjpyZ2JhKDAsMCwwLC4xNSkgdHJhbnNwYXJlbnR9XG4gIC50d2stYm9keTo6LXdlYmtpdC1zY3JvbGxiYXJ7d2lkdGg6OHB4fVxuICAudHdrLWJvZHk6Oi13ZWJraXQtc2Nyb2xsYmFyLXRyYWNre2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7bWFyZ2luOjJweH1cbiAgLnR3ay1ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjE1KTtib3JkZXItcmFkaXVzOjRweDtcbiAgICBib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O2JhY2tncm91bmQtY2xpcDpjb250ZW50LWJveH1cbiAgLnR3ay1ib2R5Ojotd2Via2l0LXNjcm9sbGJhci10aHVtYjpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjI1KTtcbiAgICBib3JkZXI6MnB4IHNvbGlkIHRyYW5zcGFyZW50O2JhY2tncm91bmQtY2xpcDpjb250ZW50LWJveH1cbiAgLnR3ay1yb3d7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6NXB4fVxuICAudHdrLXJvdy1oe2ZsZXgtZGlyZWN0aW9uOnJvdzthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47Z2FwOjEwcHh9XG4gIC50d2stbGJse2Rpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpiYXNlbGluZTtcbiAgICBjb2xvcjpyZ2JhKDQxLDM4LDI3LC43Mil9XG4gIC50d2stbGJsPnNwYW46Zmlyc3QtY2hpbGR7Zm9udC13ZWlnaHQ6NTAwfVxuICAudHdrLXZhbHtjb2xvcjpyZ2JhKDQxLDM4LDI3LC41KTtmb250LXZhcmlhbnQtbnVtZXJpYzp0YWJ1bGFyLW51bXN9XG5cbiAgLnR3ay1zZWN0e2ZvbnQtc2l6ZToxMHB4O2ZvbnQtd2VpZ2h0OjYwMDtsZXR0ZXItc3BhY2luZzouMDZlbTt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7XG4gICAgY29sb3I6cmdiYSg0MSwzOCwyNywuNDUpO3BhZGRpbmc6MTBweCAwIDB9XG4gIC50d2stc2VjdDpmaXJzdC1jaGlsZHtwYWRkaW5nLXRvcDowfVxuXG4gIC50d2stZmllbGR7YXBwZWFyYW5jZTpub25lO3dpZHRoOjEwMCU7aGVpZ2h0OjI2cHg7cGFkZGluZzowIDhweDtcbiAgICBib3JkZXI6LjVweCBzb2xpZCByZ2JhKDAsMCwwLC4xKTtib3JkZXItcmFkaXVzOjdweDtcbiAgICBiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjYpO2NvbG9yOmluaGVyaXQ7Zm9udDppbmhlcml0O291dGxpbmU6bm9uZX1cbiAgLnR3ay1maWVsZDpmb2N1c3tib3JkZXItY29sb3I6cmdiYSgwLDAsMCwuMjUpO2JhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuODUpfVxuICBzZWxlY3QudHdrLWZpZWxke3BhZGRpbmctcmlnaHQ6MjJweDtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOnVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDt1dGY4LDxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTAnIGhlaWdodD0nNicgdmlld0JveD0nMCAwIDEwIDYnPjxwYXRoIGZpbGw9J3JnYmEoMCwwLDAsLjUpJyBkPSdNMCAwaDEwTDUgNnonLz48L3N2Zz5cIik7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtcG9zaXRpb246cmlnaHQgOHB4IGNlbnRlcn1cblxuICAudHdrLXNsaWRlcnthcHBlYXJhbmNlOm5vbmU7LXdlYmtpdC1hcHBlYXJhbmNlOm5vbmU7d2lkdGg6MTAwJTtoZWlnaHQ6NHB4O21hcmdpbjo2cHggMDtcbiAgICBib3JkZXItcmFkaXVzOjk5OXB4O2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTIpO291dGxpbmU6bm9uZX1cbiAgLnR3ay1zbGlkZXI6Oi13ZWJraXQtc2xpZGVyLXRodW1iey13ZWJraXQtYXBwZWFyYW5jZTpub25lO2FwcGVhcmFuY2U6bm9uZTtcbiAgICB3aWR0aDoxNHB4O2hlaWdodDoxNHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQ6I2ZmZjtcbiAgICBib3JkZXI6LjVweCBzb2xpZCByZ2JhKDAsMCwwLC4xMik7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMik7Y3Vyc29yOmRlZmF1bHR9XG4gIC50d2stc2xpZGVyOjotbW96LXJhbmdlLXRodW1ie3dpZHRoOjE0cHg7aGVpZ2h0OjE0cHg7Ym9yZGVyLXJhZGl1czo1MCU7XG4gICAgYmFja2dyb3VuZDojZmZmO2JvcmRlcjouNXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEyKTtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4yKTtjdXJzb3I6ZGVmYXVsdH1cblxuICAudHdrLXNlZ3twb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5OmZsZXg7cGFkZGluZzoycHg7Ym9yZGVyLXJhZGl1czo4cHg7XG4gICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC4wNik7dXNlci1zZWxlY3Q6bm9uZX1cbiAgLnR3ay1zZWctdGh1bWJ7cG9zaXRpb246YWJzb2x1dGU7dG9wOjJweDtib3R0b206MnB4O2JvcmRlci1yYWRpdXM6NnB4O1xuICAgIGJhY2tncm91bmQ6cmdiYSgyNTUsMjU1LDI1NSwuOSk7Ym94LXNoYWRvdzowIDFweCAycHggcmdiYSgwLDAsMCwuMTIpO1xuICAgIHRyYW5zaXRpb246bGVmdCAuMTVzIGN1YmljLWJlemllciguMywuNywuNCwxKSx3aWR0aCAuMTVzfVxuICAudHdrLXNlZy5kcmFnZ2luZyAudHdrLXNlZy10aHVtYnt0cmFuc2l0aW9uOm5vbmV9XG4gIC50d2stc2VnIGJ1dHRvbnthcHBlYXJhbmNlOm5vbmU7cG9zaXRpb246cmVsYXRpdmU7ei1pbmRleDoxO2ZsZXg6MTtib3JkZXI6MDtcbiAgICBiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2NvbG9yOmluaGVyaXQ7Zm9udDppbmhlcml0O2ZvbnQtd2VpZ2h0OjUwMDtoZWlnaHQ6MjJweDtcbiAgICBib3JkZXItcmFkaXVzOjZweDtjdXJzb3I6ZGVmYXVsdDtwYWRkaW5nOjB9XG5cbiAgLnR3ay10b2dnbGV7cG9zaXRpb246cmVsYXRpdmU7d2lkdGg6MzJweDtoZWlnaHQ6MThweDtib3JkZXI6MDtib3JkZXItcmFkaXVzOjk5OXB4O1xuICAgIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwuMTUpO3RyYW5zaXRpb246YmFja2dyb3VuZCAuMTVzO2N1cnNvcjpkZWZhdWx0O3BhZGRpbmc6MH1cbiAgLnR3ay10b2dnbGVbZGF0YS1vbj1cIjFcIl17YmFja2dyb3VuZDojMzRjNzU5fVxuICAudHdrLXRvZ2dsZSBpe3Bvc2l0aW9uOmFic29sdXRlO3RvcDoycHg7bGVmdDoycHg7d2lkdGg6MTRweDtoZWlnaHQ6MTRweDtib3JkZXItcmFkaXVzOjUwJTtcbiAgICBiYWNrZ3JvdW5kOiNmZmY7Ym94LXNoYWRvdzowIDFweCAycHggcmdiYSgwLDAsMCwuMjUpO3RyYW5zaXRpb246dHJhbnNmb3JtIC4xNXN9XG4gIC50d2stdG9nZ2xlW2RhdGEtb249XCIxXCJdIGl7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoMTRweCl9XG5cbiAgLnR3ay1udW17ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtoZWlnaHQ6MjZweDtwYWRkaW5nOjAgMCAwIDhweDtcbiAgICBib3JkZXI6LjVweCBzb2xpZCByZ2JhKDAsMCwwLC4xKTtib3JkZXItcmFkaXVzOjdweDtiYWNrZ3JvdW5kOnJnYmEoMjU1LDI1NSwyNTUsLjYpfVxuICAudHdrLW51bS1sYmx7Zm9udC13ZWlnaHQ6NTAwO2NvbG9yOnJnYmEoNDEsMzgsMjcsLjYpO2N1cnNvcjpldy1yZXNpemU7XG4gICAgdXNlci1zZWxlY3Q6bm9uZTtwYWRkaW5nLXJpZ2h0OjhweH1cbiAgLnR3ay1udW0gaW5wdXR7ZmxleDoxO21pbi13aWR0aDowO2hlaWdodDoxMDAlO2JvcmRlcjowO2JhY2tncm91bmQ6dHJhbnNwYXJlbnQ7XG4gICAgZm9udDppbmhlcml0O2ZvbnQtdmFyaWFudC1udW1lcmljOnRhYnVsYXItbnVtczt0ZXh0LWFsaWduOnJpZ2h0O3BhZGRpbmc6MCA4cHggMCAwO1xuICAgIG91dGxpbmU6bm9uZTtjb2xvcjppbmhlcml0Oy1tb3otYXBwZWFyYW5jZTp0ZXh0ZmllbGR9XG4gIC50d2stbnVtIGlucHV0Ojotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uLC50d2stbnVtIGlucHV0Ojotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9ue1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTpub25lO21hcmdpbjowfVxuICAudHdrLW51bS11bml0e3BhZGRpbmctcmlnaHQ6OHB4O2NvbG9yOnJnYmEoNDEsMzgsMjcsLjQ1KX1cblxuICAudHdrLWJ0bnthcHBlYXJhbmNlOm5vbmU7aGVpZ2h0OjI2cHg7cGFkZGluZzowIDEycHg7Ym9yZGVyOjA7Ym9yZGVyLXJhZGl1czo3cHg7XG4gICAgYmFja2dyb3VuZDpyZ2JhKDAsMCwwLC43OCk7Y29sb3I6I2ZmZjtmb250OmluaGVyaXQ7Zm9udC13ZWlnaHQ6NTAwO2N1cnNvcjpkZWZhdWx0fVxuICAudHdrLWJ0bjpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjg4KX1cbiAgLnR3ay1idG4uc2Vjb25kYXJ5e2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuMDYpO2NvbG9yOmluaGVyaXR9XG4gIC50d2stYnRuLnNlY29uZGFyeTpob3ZlcntiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjEpfVxuXG4gIC50d2stc3dhdGNoe2FwcGVhcmFuY2U6bm9uZTstd2Via2l0LWFwcGVhcmFuY2U6bm9uZTt3aWR0aDo1NnB4O2hlaWdodDoyMnB4O1xuICAgIGJvcmRlcjouNXB4IHNvbGlkIHJnYmEoMCwwLDAsLjEpO2JvcmRlci1yYWRpdXM6NnB4O3BhZGRpbmc6MDtjdXJzb3I6ZGVmYXVsdDtcbiAgICBiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2ZsZXgtc2hyaW5rOjB9XG4gIC50d2stc3dhdGNoOjotd2Via2l0LWNvbG9yLXN3YXRjaC13cmFwcGVye3BhZGRpbmc6MH1cbiAgLnR3ay1zd2F0Y2g6Oi13ZWJraXQtY29sb3Itc3dhdGNoe2JvcmRlcjowO2JvcmRlci1yYWRpdXM6NS41cHh9XG4gIC50d2stc3dhdGNoOjotbW96LWNvbG9yLXN3YXRjaHtib3JkZXI6MDtib3JkZXItcmFkaXVzOjUuNXB4fVxuYDtcblxuLy8g4pSA4pSAIHVzZVR3ZWFrcyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIFNpbmdsZSBzb3VyY2Ugb2YgdHJ1dGggZm9yIHR3ZWFrIHZhbHVlcy4gc2V0VHdlYWsgcGVyc2lzdHMgdmlhIHRoZSBob3N0XG4vLyAoX19lZGl0X21vZGVfc2V0X2tleXMg4oaSIGhvc3QgcmV3cml0ZXMgdGhlIEVESVRNT0RFIGJsb2NrIG9uIGRpc2spLlxuZnVuY3Rpb24gdXNlVHdlYWtzKGRlZmF1bHRzKSB7XG4gIGNvbnN0IFt2YWx1ZXMsIHNldFZhbHVlc10gPSBSZWFjdC51c2VTdGF0ZShkZWZhdWx0cyk7XG4gIGNvbnN0IHNldFR3ZWFrID0gUmVhY3QudXNlQ2FsbGJhY2soKGtleSwgdmFsKSA9PiB7XG4gICAgc2V0VmFsdWVzKChwcmV2KSA9PiAoeyAuLi5wcmV2LCBba2V5XTogdmFsIH0pKTtcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsgdHlwZTogJ19fZWRpdF9tb2RlX3NldF9rZXlzJywgZWRpdHM6IHsgW2tleV06IHZhbCB9IH0sICcqJyk7XG4gIH0sIFtdKTtcbiAgcmV0dXJuIFt2YWx1ZXMsIHNldFR3ZWFrXTtcbn1cblxuLy8g4pSA4pSAIFR3ZWFrc1BhbmVsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gRmxvYXRpbmcgc2hlbGwuIFJlZ2lzdGVycyB0aGUgcHJvdG9jb2wgbGlzdGVuZXIgQkVGT1JFIGFubm91bmNpbmdcbi8vIGF2YWlsYWJpbGl0eSDigJQgaWYgdGhlIGFubm91bmNlIHJhbiBmaXJzdCwgdGhlIGhvc3QncyBhY3RpdmF0ZSBjb3VsZCBsYW5kXG4vLyBiZWZvcmUgb3VyIGhhbmRsZXIgZXhpc3RzIGFuZCB0aGUgdG9vbGJhciB0b2dnbGUgd291bGQgc2lsZW50bHkgbm8tb3AuXG4vLyBUaGUgY2xvc2UgYnV0dG9uIHBvc3RzIF9fZWRpdF9tb2RlX2Rpc21pc3NlZCBzbyB0aGUgaG9zdCdzIHRvb2xiYXIgdG9nZ2xlXG4vLyBmbGlwcyBvZmYgaW4gbG9ja3N0ZXA7IHRoZSBob3N0IGVjaG9lcyBfX2RlYWN0aXZhdGVfZWRpdF9tb2RlIGJhY2sgd2hpY2hcbi8vIGlzIHdoYXQgYWN0dWFsbHkgaGlkZXMgdGhlIHBhbmVsLlxuZnVuY3Rpb24gVHdlYWtzUGFuZWwoeyB0aXRsZSA9ICdUd2Vha3MnLCBjaGlsZHJlbiB9KSB7XG4gIGNvbnN0IFtvcGVuLCBzZXRPcGVuXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgZHJhZ1JlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcbiAgY29uc3Qgb2Zmc2V0UmVmID0gUmVhY3QudXNlUmVmKHsgeDogMTYsIHk6IDE2IH0pO1xuICBjb25zdCBQQUQgPSAxNjtcblxuICBjb25zdCBjbGFtcFRvVmlld3BvcnQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgcGFuZWwgPSBkcmFnUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHcgPSBwYW5lbC5vZmZzZXRXaWR0aCwgaCA9IHBhbmVsLm9mZnNldEhlaWdodDtcbiAgICBjb25zdCBtYXhSaWdodCA9IE1hdGgubWF4KFBBRCwgd2luZG93LmlubmVyV2lkdGggLSB3IC0gUEFEKTtcbiAgICBjb25zdCBtYXhCb3R0b20gPSBNYXRoLm1heChQQUQsIHdpbmRvdy5pbm5lckhlaWdodCAtIGggLSBQQUQpO1xuICAgIG9mZnNldFJlZi5jdXJyZW50ID0ge1xuICAgICAgeDogTWF0aC5taW4obWF4UmlnaHQsIE1hdGgubWF4KFBBRCwgb2Zmc2V0UmVmLmN1cnJlbnQueCkpLFxuICAgICAgeTogTWF0aC5taW4obWF4Qm90dG9tLCBNYXRoLm1heChQQUQsIG9mZnNldFJlZi5jdXJyZW50LnkpKSxcbiAgICB9O1xuICAgIHBhbmVsLnN0eWxlLnJpZ2h0ID0gb2Zmc2V0UmVmLmN1cnJlbnQueCArICdweCc7XG4gICAgcGFuZWwuc3R5bGUuYm90dG9tID0gb2Zmc2V0UmVmLmN1cnJlbnQueSArICdweCc7XG4gIH0sIFtdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghb3BlbikgcmV0dXJuO1xuICAgIGNsYW1wVG9WaWV3cG9ydCgpO1xuICAgIGlmICh0eXBlb2YgUmVzaXplT2JzZXJ2ZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2xhbXBUb1ZpZXdwb3J0KTtcbiAgICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgY2xhbXBUb1ZpZXdwb3J0KTtcbiAgICB9XG4gICAgY29uc3Qgcm8gPSBuZXcgUmVzaXplT2JzZXJ2ZXIoY2xhbXBUb1ZpZXdwb3J0KTtcbiAgICByby5vYnNlcnZlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgcmV0dXJuICgpID0+IHJvLmRpc2Nvbm5lY3QoKTtcbiAgfSwgW29wZW4sIGNsYW1wVG9WaWV3cG9ydF0pO1xuXG4gIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25Nc2cgPSAoZSkgPT4ge1xuICAgICAgY29uc3QgdCA9IGU/LmRhdGE/LnR5cGU7XG4gICAgICBpZiAodCA9PT0gJ19fYWN0aXZhdGVfZWRpdF9tb2RlJykgc2V0T3Blbih0cnVlKTtcbiAgICAgIGVsc2UgaWYgKHQgPT09ICdfX2RlYWN0aXZhdGVfZWRpdF9tb2RlJykgc2V0T3BlbihmYWxzZSk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTXNnKTtcbiAgICB3aW5kb3cucGFyZW50LnBvc3RNZXNzYWdlKHsgdHlwZTogJ19fZWRpdF9tb2RlX2F2YWlsYWJsZScgfSwgJyonKTtcbiAgICByZXR1cm4gKCkgPT4gd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1zZyk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBkaXNtaXNzID0gKCkgPT4ge1xuICAgIHNldE9wZW4oZmFsc2UpO1xuICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UoeyB0eXBlOiAnX19lZGl0X21vZGVfZGlzbWlzc2VkJyB9LCAnKicpO1xuICB9O1xuXG4gIGNvbnN0IG9uRHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgICBjb25zdCBwYW5lbCA9IGRyYWdSZWYuY3VycmVudDtcbiAgICBpZiAoIXBhbmVsKSByZXR1cm47XG4gICAgY29uc3QgciA9IHBhbmVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IHN4ID0gZS5jbGllbnRYLCBzeSA9IGUuY2xpZW50WTtcbiAgICBjb25zdCBzdGFydFJpZ2h0ID0gd2luZG93LmlubmVyV2lkdGggLSByLnJpZ2h0O1xuICAgIGNvbnN0IHN0YXJ0Qm90dG9tID0gd2luZG93LmlubmVySGVpZ2h0IC0gci5ib3R0b207XG4gICAgY29uc3QgbW92ZSA9IChldikgPT4ge1xuICAgICAgb2Zmc2V0UmVmLmN1cnJlbnQgPSB7XG4gICAgICAgIHg6IHN0YXJ0UmlnaHQgLSAoZXYuY2xpZW50WCAtIHN4KSxcbiAgICAgICAgeTogc3RhcnRCb3R0b20gLSAoZXYuY2xpZW50WSAtIHN5KSxcbiAgICAgIH07XG4gICAgICBjbGFtcFRvVmlld3BvcnQoKTtcbiAgICB9O1xuICAgIGNvbnN0IHVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG1vdmUpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB1cCk7XG4gICAgfTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgbW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB1cCk7XG4gIH07XG5cbiAgaWYgKCFvcGVuKSByZXR1cm4gbnVsbDtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPHN0eWxlPntfX1RXRUFLU19TVFlMRX08L3N0eWxlPlxuICAgICAgPGRpdiByZWY9e2RyYWdSZWZ9IGNsYXNzTmFtZT1cInR3ay1wYW5lbFwiXG4gICAgICAgICAgIHN0eWxlPXt7IHJpZ2h0OiBvZmZzZXRSZWYuY3VycmVudC54LCBib3R0b206IG9mZnNldFJlZi5jdXJyZW50LnkgfX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHdrLWhkXCIgb25Nb3VzZURvd249e29uRHJhZ1N0YXJ0fT5cbiAgICAgICAgICA8Yj57dGl0bGV9PC9iPlxuICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidHdrLXhcIiBhcmlhLWxhYmVsPVwiQ2xvc2UgdHdlYWtzXCJcbiAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2Rpc21pc3N9PuKclTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0d2stYm9keVwiPntjaGlsZHJlbn08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvPlxuICApO1xufVxuXG4vLyDilIDilIAgTGF5b3V0IGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmN0aW9uIFR3ZWFrU2VjdGlvbih7IGxhYmVsLCBjaGlsZHJlbiB9KSB7XG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHdrLXNlY3RcIj57bGFiZWx9PC9kaXY+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC8+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFR3ZWFrUm93KHsgbGFiZWwsIHZhbHVlLCBjaGlsZHJlbiwgaW5saW5lID0gZmFsc2UgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtpbmxpbmUgPyAndHdrLXJvdyB0d2stcm93LWgnIDogJ3R3ay1yb3cnfT5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHdrLWxibFwiPlxuICAgICAgICA8c3Bhbj57bGFiZWx9PC9zcGFuPlxuICAgICAgICB7dmFsdWUgIT0gbnVsbCAmJiA8c3BhbiBjbGFzc05hbWU9XCJ0d2stdmFsXCI+e3ZhbHVlfTwvc3Bhbj59XG4gICAgICA8L2Rpdj5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuLy8g4pSA4pSAIENvbnRyb2xzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jdGlvbiBUd2Vha1NsaWRlcih7IGxhYmVsLCB2YWx1ZSwgbWluID0gMCwgbWF4ID0gMTAwLCBzdGVwID0gMSwgdW5pdCA9ICcnLCBvbkNoYW5nZSB9KSB7XG4gIHJldHVybiAoXG4gICAgPFR3ZWFrUm93IGxhYmVsPXtsYWJlbH0gdmFsdWU9e2Ake3ZhbHVlfSR7dW5pdH1gfT5cbiAgICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiBjbGFzc05hbWU9XCJ0d2stc2xpZGVyXCIgbWluPXttaW59IG1heD17bWF4fSBzdGVwPXtzdGVwfVxuICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX0gb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShOdW1iZXIoZS50YXJnZXQudmFsdWUpKX0gLz5cbiAgICA8L1R3ZWFrUm93PlxuICApO1xufVxuXG5mdW5jdGlvbiBUd2Vha1RvZ2dsZSh7IGxhYmVsLCB2YWx1ZSwgb25DaGFuZ2UgfSkge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwidHdrLXJvdyB0d2stcm93LWhcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHdrLWxibFwiPjxzcGFuPntsYWJlbH08L3NwYW4+PC9kaXY+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJ0d2stdG9nZ2xlXCIgZGF0YS1vbj17dmFsdWUgPyAnMScgOiAnMCd9XG4gICAgICAgICAgICAgIHJvbGU9XCJzd2l0Y2hcIiBhcmlhLWNoZWNrZWQ9eyEhdmFsdWV9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uQ2hhbmdlKCF2YWx1ZSl9PjxpIC8+PC9idXR0b24+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFR3ZWFrUmFkaW8oeyBsYWJlbCwgdmFsdWUsIG9wdGlvbnMsIG9uQ2hhbmdlIH0pIHtcbiAgY29uc3QgdHJhY2tSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XG4gIGNvbnN0IFtkcmFnZ2luZywgc2V0RHJhZ2dpbmddID0gUmVhY3QudXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBvcHRzID0gb3B0aW9ucy5tYXAoKG8pID0+ICh0eXBlb2YgbyA9PT0gJ29iamVjdCcgPyBvIDogeyB2YWx1ZTogbywgbGFiZWw6IG8gfSkpO1xuICBjb25zdCBpZHggPSBNYXRoLm1heCgwLCBvcHRzLmZpbmRJbmRleCgobykgPT4gby52YWx1ZSA9PT0gdmFsdWUpKTtcbiAgY29uc3QgbiA9IG9wdHMubGVuZ3RoO1xuXG4gIC8vIFRoZSBhY3RpdmUgdmFsdWUgaXMgcmVhZCBieSBwb2ludGVyLW1vdmUgaGFuZGxlcnMgYXR0YWNoZWQgZm9yIHRoZSBsaWZldGltZVxuICAvLyBvZiBhIGRyYWcg4oCUIHJlZiBpdCBzbyBhIHN0YWxlIGNsb3N1cmUgZG9lc24ndCBmaXJlIG9uQ2hhbmdlIGZvciBldmVyeSBtb3ZlLlxuICBjb25zdCB2YWx1ZVJlZiA9IFJlYWN0LnVzZVJlZih2YWx1ZSk7XG4gIHZhbHVlUmVmLmN1cnJlbnQgPSB2YWx1ZTtcblxuICBjb25zdCBzZWdBdCA9IChjbGllbnRYKSA9PiB7XG4gICAgY29uc3QgciA9IHRyYWNrUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgaW5uZXIgPSByLndpZHRoIC0gNDtcbiAgICBjb25zdCBpID0gTWF0aC5mbG9vcigoKGNsaWVudFggLSByLmxlZnQgLSAyKSAvIGlubmVyKSAqIG4pO1xuICAgIHJldHVybiBvcHRzW01hdGgubWF4KDAsIE1hdGgubWluKG4gLSAxLCBpKSldLnZhbHVlO1xuICB9O1xuXG4gIGNvbnN0IG9uUG9pbnRlckRvd24gPSAoZSkgPT4ge1xuICAgIHNldERyYWdnaW5nKHRydWUpO1xuICAgIGNvbnN0IHYwID0gc2VnQXQoZS5jbGllbnRYKTtcbiAgICBpZiAodjAgIT09IHZhbHVlUmVmLmN1cnJlbnQpIG9uQ2hhbmdlKHYwKTtcbiAgICBjb25zdCBtb3ZlID0gKGV2KSA9PiB7XG4gICAgICBpZiAoIXRyYWNrUmVmLmN1cnJlbnQpIHJldHVybjtcbiAgICAgIGNvbnN0IHYgPSBzZWdBdChldi5jbGllbnRYKTtcbiAgICAgIGlmICh2ICE9PSB2YWx1ZVJlZi5jdXJyZW50KSBvbkNoYW5nZSh2KTtcbiAgICB9O1xuICAgIGNvbnN0IHVwID0gKCkgPT4ge1xuICAgICAgc2V0RHJhZ2dpbmcoZmFsc2UpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgbW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdXApO1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgbW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHVwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxUd2Vha1JvdyBsYWJlbD17bGFiZWx9PlxuICAgICAgPGRpdiByZWY9e3RyYWNrUmVmfSByb2xlPVwicmFkaW9ncm91cFwiIG9uUG9pbnRlckRvd249e29uUG9pbnRlckRvd259XG4gICAgICAgICAgIGNsYXNzTmFtZT17ZHJhZ2dpbmcgPyAndHdrLXNlZyBkcmFnZ2luZycgOiAndHdrLXNlZyd9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR3ay1zZWctdGh1bWJcIlxuICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6IGBjYWxjKDJweCArICR7aWR4fSAqICgxMDAlIC0gNHB4KSAvICR7bn0pYCxcbiAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYGNhbGMoKDEwMCUgLSA0cHgpIC8gJHtufSlgIH19IC8+XG4gICAgICAgIHtvcHRzLm1hcCgobykgPT4gKFxuICAgICAgICAgIDxidXR0b24ga2V5PXtvLnZhbHVlfSB0eXBlPVwiYnV0dG9uXCIgcm9sZT1cInJhZGlvXCIgYXJpYS1jaGVja2VkPXtvLnZhbHVlID09PSB2YWx1ZX0+XG4gICAgICAgICAgICB7by5sYWJlbH1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgKSl9XG4gICAgICA8L2Rpdj5cbiAgICA8L1R3ZWFrUm93PlxuICApO1xufVxuXG5mdW5jdGlvbiBUd2Vha1NlbGVjdCh7IGxhYmVsLCB2YWx1ZSwgb3B0aW9ucywgb25DaGFuZ2UgfSkge1xuICByZXR1cm4gKFxuICAgIDxUd2Vha1JvdyBsYWJlbD17bGFiZWx9PlxuICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJ0d2stZmllbGRcIiB2YWx1ZT17dmFsdWV9IG9uQ2hhbmdlPXsoZSkgPT4gb25DaGFuZ2UoZS50YXJnZXQudmFsdWUpfT5cbiAgICAgICAge29wdGlvbnMubWFwKChvKSA9PiB7XG4gICAgICAgICAgY29uc3QgdiA9IHR5cGVvZiBvID09PSAnb2JqZWN0JyA/IG8udmFsdWUgOiBvO1xuICAgICAgICAgIGNvbnN0IGwgPSB0eXBlb2YgbyA9PT0gJ29iamVjdCcgPyBvLmxhYmVsIDogbztcbiAgICAgICAgICByZXR1cm4gPG9wdGlvbiBrZXk9e3Z9IHZhbHVlPXt2fT57bH08L29wdGlvbj47XG4gICAgICAgIH0pfVxuICAgICAgPC9zZWxlY3Q+XG4gICAgPC9Ud2Vha1Jvdz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gVHdlYWtUZXh0KHsgbGFiZWwsIHZhbHVlLCBwbGFjZWhvbGRlciwgb25DaGFuZ2UgfSkge1xuICByZXR1cm4gKFxuICAgIDxUd2Vha1JvdyBsYWJlbD17bGFiZWx9PlxuICAgICAgPGlucHV0IGNsYXNzTmFtZT1cInR3ay1maWVsZFwiIHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3ZhbHVlfSBwbGFjZWhvbGRlcj17cGxhY2Vob2xkZXJ9XG4gICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9IC8+XG4gICAgPC9Ud2Vha1Jvdz5cbiAgKTtcbn1cblxuZnVuY3Rpb24gVHdlYWtOdW1iZXIoeyBsYWJlbCwgdmFsdWUsIG1pbiwgbWF4LCBzdGVwID0gMSwgdW5pdCA9ICcnLCBvbkNoYW5nZSB9KSB7XG4gIGNvbnN0IGNsYW1wID0gKG4pID0+IHtcbiAgICBpZiAobWluICE9IG51bGwgJiYgbiA8IG1pbikgcmV0dXJuIG1pbjtcbiAgICBpZiAobWF4ICE9IG51bGwgJiYgbiA+IG1heCkgcmV0dXJuIG1heDtcbiAgICByZXR1cm4gbjtcbiAgfTtcbiAgY29uc3Qgc3RhcnRSZWYgPSBSZWFjdC51c2VSZWYoeyB4OiAwLCB2YWw6IDAgfSk7XG4gIGNvbnN0IG9uU2NydWJTdGFydCA9IChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHN0YXJ0UmVmLmN1cnJlbnQgPSB7IHg6IGUuY2xpZW50WCwgdmFsOiB2YWx1ZSB9O1xuICAgIGNvbnN0IGRlY2ltYWxzID0gKFN0cmluZyhzdGVwKS5zcGxpdCgnLicpWzFdIHx8ICcnKS5sZW5ndGg7XG4gICAgY29uc3QgbW92ZSA9IChldikgPT4ge1xuICAgICAgY29uc3QgZHggPSBldi5jbGllbnRYIC0gc3RhcnRSZWYuY3VycmVudC54O1xuICAgICAgY29uc3QgcmF3ID0gc3RhcnRSZWYuY3VycmVudC52YWwgKyBkeCAqIHN0ZXA7XG4gICAgICBjb25zdCBzbmFwcGVkID0gTWF0aC5yb3VuZChyYXcgLyBzdGVwKSAqIHN0ZXA7XG4gICAgICBvbkNoYW5nZShjbGFtcChOdW1iZXIoc25hcHBlZC50b0ZpeGVkKGRlY2ltYWxzKSkpKTtcbiAgICB9O1xuICAgIGNvbnN0IHVwID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgbW92ZSk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcnVwJywgdXApO1xuICAgIH07XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJtb3ZlJywgbW92ZSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJ1cCcsIHVwKTtcbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInR3ay1udW1cIj5cbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInR3ay1udW0tbGJsXCIgb25Qb2ludGVyRG93bj17b25TY3J1YlN0YXJ0fT57bGFiZWx9PC9zcGFuPlxuICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiB2YWx1ZT17dmFsdWV9IG1pbj17bWlufSBtYXg9e21heH0gc3RlcD17c3RlcH1cbiAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKGNsYW1wKE51bWJlcihlLnRhcmdldC52YWx1ZSkpKX0gLz5cbiAgICAgIHt1bml0ICYmIDxzcGFuIGNsYXNzTmFtZT1cInR3ay1udW0tdW5pdFwiPnt1bml0fTwvc3Bhbj59XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFR3ZWFrQ29sb3IoeyBsYWJlbCwgdmFsdWUsIG9uQ2hhbmdlIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInR3ay1yb3cgdHdrLXJvdy1oXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInR3ay1sYmxcIj48c3Bhbj57bGFiZWx9PC9zcGFuPjwvZGl2PlxuICAgICAgPGlucHV0IHR5cGU9XCJjb2xvclwiIGNsYXNzTmFtZT1cInR3ay1zd2F0Y2hcIiB2YWx1ZT17dmFsdWV9XG4gICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShlLnRhcmdldC52YWx1ZSl9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmZ1bmN0aW9uIFR3ZWFrQnV0dG9uKHsgbGFiZWwsIG9uQ2xpY2ssIHNlY29uZGFyeSA9IGZhbHNlIH0pIHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9e3NlY29uZGFyeSA/ICd0d2stYnRuIHNlY29uZGFyeScgOiAndHdrLWJ0bid9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfT57bGFiZWx9PC9idXR0b24+XG4gICk7XG59XG5cbk9iamVjdC5hc3NpZ24od2luZG93LCB7XG4gIHVzZVR3ZWFrcywgVHdlYWtzUGFuZWwsIFR3ZWFrU2VjdGlvbiwgVHdlYWtSb3csXG4gIFR3ZWFrU2xpZGVyLCBUd2Vha1RvZ2dsZSwgVHdlYWtSYWRpbywgVHdlYWtTZWxlY3QsXG4gIFR3ZWFrVGV4dCwgVHdlYWtOdW1iZXIsIFR3ZWFrQ29sb3IsIFR3ZWFrQnV0dG9uLFxufSk7XG4gICJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNQSxjQUFjLEdBQUc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUVBLEdBQUk7SUFBQ0osR0FBRyxFQUFFQSxHQUFJO0lBQUMrQyxJQUFJLEVBQUVBLElBQUs7SUFDM0RFLFFBQVEsRUFBRy9CLENBQUMsSUFBSytCLFFBQVEsQ0FBQ2dDLEtBQUssQ0FBQy9CLE1BQU0sQ0FBQ2hDLENBQUMsQ0FBQ2lDLE1BQU0sQ0FBQ1AsS0FBSyxDQUFDLENBQUM7RUFBRSxDQUFFLENBQUMsRUFDbEVJLElBQUksaUJBQUlqRixLQUFBLENBQUFtRSxhQUFBO0lBQU1HLFNBQVMsRUFBQztFQUFjLEdBQUVXLElBQVcsQ0FDakQsQ0FBQztBQUVWO0FBRUEsU0FBUzZDLFVBQVVBLENBQUM7RUFBRW5ELEtBQUs7RUFBRUUsS0FBSztFQUFFSztBQUFTLENBQUMsRUFBRTtFQUM5QyxvQkFDRWxGLEtBQUEsQ0FBQW1FLGFBQUE7SUFBS0csU0FBUyxFQUFDO0VBQW1CLGdCQUNoQ3RFLEtBQUEsQ0FBQW1FLGFBQUE7SUFBS0csU0FBUyxFQUFDO0VBQVMsZ0JBQUN0RSxLQUFBLENBQUFtRSxhQUFBLGVBQU9RLEtBQVksQ0FBTSxDQUFDLGVBQ25EM0UsS0FBQSxDQUFBbUUsYUFBQTtJQUFPeEQsSUFBSSxFQUFDLE9BQU87SUFBQzJELFNBQVMsRUFBQyxZQUFZO0lBQUNPLEtBQUssRUFBRUEsS0FBTTtJQUNqREssUUFBUSxFQUFHL0IsQ0FBQyxJQUFLK0IsUUFBUSxDQUFDL0IsQ0FBQyxDQUFDaUMsTUFBTSxDQUFDUCxLQUFLO0VBQUUsQ0FBRSxDQUNoRCxDQUFDO0FBRVY7QUFFQSxTQUFTa0QsV0FBV0EsQ0FBQztFQUFFcEQsS0FBSztFQUFFRixPQUFPO0VBQUV1RCxTQUFTLEdBQUc7QUFBTSxDQUFDLEVBQUU7RUFDMUQsb0JBQ0VoSSxLQUFBLENBQUFtRSxhQUFBO0lBQVF4RCxJQUFJLEVBQUMsUUFBUTtJQUFDMkQsU0FBUyxFQUFFMEQsU0FBUyxHQUFHLG1CQUFtQixHQUFHLFNBQVU7SUFDckV2RCxPQUFPLEVBQUVBO0VBQVEsR0FBRUUsS0FBYyxDQUFDO0FBRTlDO0FBRUFzRCxNQUFNLENBQUNDLE1BQU0sQ0FBQzFILE1BQU0sRUFBRTtFQUNwQlosU0FBUztFQUFFaUIsV0FBVztFQUFFNkQsWUFBWTtFQUFFRSxRQUFRO0VBQzlDRyxXQUFXO0VBQUVNLFdBQVc7RUFBRUUsVUFBVTtFQUFFc0IsV0FBVztFQUNqREUsU0FBUztFQUFFRSxXQUFXO0VBQUVhLFVBQVU7RUFBRUM7QUFDdEMsQ0FBQyxDQUFDIiwiaWdub3JlTGlzdCI6W119</script><script>/* ─── icons.jsx ─── */
// Icons.jsx — minimal line icons for マレバ
const Icon = ({
  name,
  size = 22,
  color = 'currentColor',
  strokeWidth = 1.6
}) => {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  };
  switch (name) {
    case 'home':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9z"
      }));
    case 'book':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 17a3 3 0 0 1 3-3h11"
      }));
    case 'chat':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M4 5h16v11H8l-4 4V5z"
      }));
    case 'chart':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M4 20V10M10 20V4M16 20v-7M22 20H2"
      }));
    case 'user':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "8",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"
      }));
    case 'mic':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "9",
        y: "3",
        width: "6",
        height: "12",
        rx: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M5 11a7 7 0 0 0 14 0"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 18v3"
      }));
    case 'play':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M7 5l12 7-12 7V5z",
        fill: color
      }));
    case 'volume':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M4 9h4l5-4v14l-5-4H4V9z"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M16 8c1.5 1 2.5 2.4 2.5 4s-1 3-2.5 4"
      }));
    case 'translate':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 6h10M8 4v2M5 6c0 4 3 7 8 8M11 11c-2 3-5 5-8 5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M13 20l4-9 4 9M14.5 17h5"
      }));
    case 'lightbulb':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M9 18h6M10 21h4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 3a6 6 0 0 0-4 10c.7.7 1 1.5 1 2.5V17h6v-1.5c0-1 .3-1.8 1-2.5a6 6 0 0 0-4-10z"
      }));
    case 'flame':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 3c1 3 4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 1-5 1.5 0 2-1 3-3z"
      }));
    case 'sparkle':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"
      }));
    case 'arrow-right':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 12h14M13 6l6 6-6 6"
      }));
    case 'arrow-left':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M19 12H5M11 6l-6 6 6 6"
      }));
    case 'check':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 12l4 4 10-10"
      }));
    case 'star':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9z"
      }));
    case 'gift':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "9",
        width: "18",
        height: "11",
        rx: "1.5"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 13h18M12 9v11M8 9c-1.7 0-3-1.1-3-2.5S6.3 4 8 4c2 0 3 3 4 5-1 0-3 0-4 0zM16 9c1.7 0 3-1.1 3-2.5S17.7 4 16 4c-2 0-3 3-4 5 1 0 3 0 4 0z"
      }));
    case 'clock':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 7v5l3 2"
      }));
    case 'pin':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 21s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12z"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "9",
        r: "2.5"
      }));
    case 'bookmark':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M6 4h12v17l-6-4-6 4V4z"
      }));
    case 'settings':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "3"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"
      }));
    case 'close':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M6 6l12 12M18 6L6 18"
      }));
    case 'menu':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M4 7h16M4 12h16M4 17h16"
      }));
    case 'crown':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 18h18M4 7l4 4 4-6 4 6 4-4-2 11H6L4 7z"
      }));
    case 'coffee':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9zM17 11h2a2 2 0 0 1 0 4h-2M7 3c0 1 .5 1.5 0 3M11 3c0 1 .5 1.5 0 3"
      }));
    case 'plane':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M3 12l3-1 3 4 3-1-7-9 2-1 9 8 4-1a2 2 0 0 1 0 4l-15 5v-2l4-3z"
      }));
    case 'briefcase':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("rect", {
        x: "3",
        y: "7",
        width: "18",
        height: "13",
        rx: "2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"
      }));
    case 'heart':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"
      }));
    case 'shopping':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("path", {
        d: "M5 8h14l-1 12H6L5 8zM9 8a3 3 0 1 1 6 0"
      }));
    case 'globe':
      return /*#__PURE__*/React.createElement("svg", props, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "9"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"
      }));
    default:
      return null;
  }
};
window.Icon = Icon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJY29uIiwibmFtZSIsInNpemUiLCJjb2xvciIsInN0cm9rZVdpZHRoIiwicHJvcHMiLCJ3aWR0aCIsImhlaWdodCIsInZpZXdCb3giLCJmaWxsIiwic3Ryb2tlIiwic3Ryb2tlTGluZWNhcCIsInN0cm9rZUxpbmVqb2luIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiZCIsImN4IiwiY3kiLCJyIiwieCIsInkiLCJyeCIsIndpbmRvdyJdLCJzb3VyY2VzIjpbIklubGluZSBCYWJlbCBzY3JpcHQgKDIpIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLyog4pSA4pSA4pSAIGljb25zLmpzeCDilIDilIDilIAgKi9cbi8vIEljb25zLmpzeCDigJQgbWluaW1hbCBsaW5lIGljb25zIGZvciDjg57jg6zjg5BcbmNvbnN0IEljb24gPSAoeyBuYW1lLCBzaXplID0gMjIsIGNvbG9yID0gJ2N1cnJlbnRDb2xvcicsIHN0cm9rZVdpZHRoID0gMS42IH0pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgd2lkdGg6IHNpemUsIGhlaWdodDogc2l6ZSwgdmlld0JveDogJzAgMCAyNCAyNCcsXG4gICAgZmlsbDogJ25vbmUnLCBzdHJva2U6IGNvbG9yLCBzdHJva2VXaWR0aCwgc3Ryb2tlTGluZWNhcDogJ3JvdW5kJywgc3Ryb2tlTGluZWpvaW46ICdyb3VuZCcsXG4gIH07XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ2hvbWUnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTMgMTFsOS03IDkgN3Y5YTIgMiAwIDAgMS0yIDJoLTR2LTZoLTZ2Nkg1YTIgMiAwIDAgMS0yLTJ2LTl6XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdib29rJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk00IDRoMTFhMyAzIDAgMCAxIDMgM3YxM0g3YTMgMyAwIDAgMS0zLTNWNHpcIi8+PHBhdGggZD1cIk00IDE3YTMgMyAwIDAgMSAzLTNoMTFcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2NoYXQnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTQgNWgxNnYxMUg4bC00IDRWNXpcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2NoYXJ0JzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk00IDIwVjEwTTEwIDIwVjRNMTYgMjB2LTdNMjIgMjBIMlwiLz48L3N2Zz47XG4gICAgY2FzZSAndXNlcic6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxjaXJjbGUgY3g9XCIxMlwiIGN5PVwiOFwiIHI9XCI0XCIvPjxwYXRoIGQ9XCJNNCAyMWMxLjUtNCA0LjUtNiA4LTZzNi41IDIgOCA2XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdtaWMnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cmVjdCB4PVwiOVwiIHk9XCIzXCIgd2lkdGg9XCI2XCIgaGVpZ2h0PVwiMTJcIiByeD1cIjNcIi8+PHBhdGggZD1cIk01IDExYTcgNyAwIDAgMCAxNCAwXCIvPjxwYXRoIGQ9XCJNMTIgMTh2M1wiLz48L3N2Zz47XG4gICAgY2FzZSAncGxheSc6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxwYXRoIGQ9XCJNNyA1bDEyIDctMTIgN1Y1elwiIGZpbGw9e2NvbG9yfS8+PC9zdmc+O1xuICAgIGNhc2UgJ3ZvbHVtZSc6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxwYXRoIGQ9XCJNNCA5aDRsNS00djE0bC01LTRINFY5elwiLz48cGF0aCBkPVwiTTE2IDhjMS41IDEgMi41IDIuNCAyLjUgNHMtMSAzLTIuNSA0XCIvPjwvc3ZnPjtcbiAgICBjYXNlICd0cmFuc2xhdGUnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTMgNmgxME04IDR2Mk01IDZjMCA0IDMgNyA4IDhNMTEgMTFjLTIgMy01IDUtOCA1XCIvPjxwYXRoIGQ9XCJNMTMgMjBsNC05IDQgOU0xNC41IDE3aDVcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2xpZ2h0YnVsYic6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxwYXRoIGQ9XCJNOSAxOGg2TTEwIDIxaDRcIi8+PHBhdGggZD1cIk0xMiAzYTYgNiAwIDAgMC00IDEwYy43LjcgMSAxLjUgMSAyLjVWMTdoNnYtMS41YzAtMSAuMy0xLjggMS0yLjVhNiA2IDAgMCAwLTQtMTB6XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdmbGFtZSc6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxwYXRoIGQ9XCJNMTIgM2MxIDMgNCA0IDQgOGE0IDQgMCAxIDEtOCAwYzAtMiAxLTMgMS01IDEuNSAwIDItMSAzLTN6XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdzcGFya2xlJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk0xMiAzbDEuOCA1LjJMMTkgMTBsLTUuMiAxLjhMMTIgMTdsLTEuOC01LjJMNSAxMGw1LjItMS44elwiLz48L3N2Zz47XG4gICAgY2FzZSAnYXJyb3ctcmlnaHQnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTUgMTJoMTRNMTMgNmw2IDYtNiA2XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdhcnJvdy1sZWZ0JzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk0xOSAxMkg1TTExIDZsLTYgNiA2IDZcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2NoZWNrJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk01IDEybDQgNCAxMC0xMFwiLz48L3N2Zz47XG4gICAgY2FzZSAnc3Rhcic6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxwYXRoIGQ9XCJNMTIgM2wyLjcgNS41IDYuMS45LTQuNCA0LjMgMSA2LjFMMTIgMTdsLTUuNCAyLjggMS02LjFMMy4yIDkuNGw2LjEtLjl6XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdnaWZ0JzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHJlY3QgeD1cIjNcIiB5PVwiOVwiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxMVwiIHJ4PVwiMS41XCIvPjxwYXRoIGQ9XCJNMyAxM2gxOE0xMiA5djExTTggOWMtMS43IDAtMy0xLjEtMy0yLjVTNi4zIDQgOCA0YzIgMCAzIDMgNCA1LTEgMC0zIDAtNCAwek0xNiA5YzEuNyAwIDMtMS4xIDMtMi41UzE3LjcgNCAxNiA0Yy0yIDAtMyAzLTQgNSAxIDAgMyAwIDQgMHpcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2Nsb2NrJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCI5XCIvPjxwYXRoIGQ9XCJNMTIgN3Y1bDMgMlwiLz48L3N2Zz47XG4gICAgY2FzZSAncGluJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk0xMiAyMXMtNy02LTctMTJhNyA3IDAgMSAxIDE0IDBjMCA2LTcgMTItNyAxMnpcIi8+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCI5XCIgcj1cIjIuNVwiLz48L3N2Zz47XG4gICAgY2FzZSAnYm9va21hcmsnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTYgNGgxMnYxN2wtNi00LTYgNFY0elwiLz48L3N2Zz47XG4gICAgY2FzZSAnc2V0dGluZ3MnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48Y2lyY2xlIGN4PVwiMTJcIiBjeT1cIjEyXCIgcj1cIjNcIi8+PHBhdGggZD1cIk0xOS40IDE1YTEuNyAxLjcgMCAwIDAgLjMgMS44bC4xLjFhMiAyIDAgMSAxLTIuOCAyLjhsLS4xLS4xYTEuNyAxLjcgMCAwIDAtMS44LS4zIDEuNyAxLjcgMCAwIDAtMSAxLjVWMjFhMiAyIDAgMSAxLTQgMHYtLjFhMS43IDEuNyAwIDAgMC0xLTEuNSAxLjcgMS43IDAgMCAwLTEuOC4zbC0uMS4xYTIgMiAwIDEgMS0yLjgtMi44bC4xLS4xYTEuNyAxLjcgMCAwIDAgLjMtMS44IDEuNyAxLjcgMCAwIDAtMS41LTFIM2EyIDIgMCAxIDEgMC00aC4xYTEuNyAxLjcgMCAwIDAgMS41LTEgMS43IDEuNyAwIDAgMC0uMy0xLjhsLS4xLS4xYTIgMiAwIDEgMSAyLjgtMi44bC4xLjFhMS43IDEuNyAwIDAgMCAxLjguM2gwYTEuNyAxLjcgMCAwIDAgMS0xLjVWM2EyIDIgMCAxIDEgNCAwdi4xYTEuNyAxLjcgMCAwIDAgMSAxLjVoMGExLjcgMS43IDAgMCAwIDEuOC0uM2wuMS0uMWEyIDIgMCAxIDEgMi44IDIuOGwtLjEuMWExLjcgMS43IDAgMCAwLS4zIDEuOHYwYTEuNyAxLjcgMCAwIDAgMS41IDFIMjFhMiAyIDAgMSAxIDAgNGgtLjFhMS43IDEuNyAwIDAgMC0xLjUgMXpcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2Nsb3NlJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk02IDZsMTIgMTJNMTggNkw2IDE4XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdtZW51JzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHBhdGggZD1cIk00IDdoMTZNNCAxMmgxNk00IDE3aDE2XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdjcm93bic6XG4gICAgICByZXR1cm4gPHN2ZyB7Li4ucHJvcHN9PjxwYXRoIGQ9XCJNMyAxOGgxOE00IDdsNCA0IDQtNiA0IDYgNC00LTIgMTFINkw0IDd6XCIvPjwvc3ZnPjtcbiAgICBjYXNlICdjb2ZmZWUnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTQgOWgxM3Y2YTQgNCAwIDAgMS00IDRIOGE0IDQgMCAwIDEtNC00Vjl6TTE3IDExaDJhMiAyIDAgMCAxIDAgNGgtMk03IDNjMCAxIC41IDEuNSAwIDNNMTEgM2MwIDEgLjUgMS41IDAgM1wiLz48L3N2Zz47XG4gICAgY2FzZSAncGxhbmUnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTMgMTJsMy0xIDMgNCAzLTEtNy05IDItMSA5IDggNC0xYTIgMiAwIDAgMSAwIDRsLTE1IDV2LTJsNC0zelwiLz48L3N2Zz47XG4gICAgY2FzZSAnYnJpZWZjYXNlJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PHJlY3QgeD1cIjNcIiB5PVwiN1wiIHdpZHRoPVwiMThcIiBoZWlnaHQ9XCIxM1wiIHJ4PVwiMlwiLz48cGF0aCBkPVwiTTkgN1Y1YTIgMiAwIDAgMSAyLTJoMmEyIDIgMCAwIDEgMiAydjJNMyAxM2gxOFwiLz48L3N2Zz47XG4gICAgY2FzZSAnaGVhcnQnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTEyIDIwcy03LTQuNS03LTEwYTQgNCAwIDAgMSA3LTIuNUE0IDQgMCAwIDEgMTkgMTBjMCA1LjUtNyAxMC03IDEwelwiLz48L3N2Zz47XG4gICAgY2FzZSAnc2hvcHBpbmcnOlxuICAgICAgcmV0dXJuIDxzdmcgey4uLnByb3BzfT48cGF0aCBkPVwiTTUgOGgxNGwtMSAxMkg2TDUgOHpNOSA4YTMgMyAwIDEgMSA2IDBcIi8+PC9zdmc+O1xuICAgIGNhc2UgJ2dsb2JlJzpcbiAgICAgIHJldHVybiA8c3ZnIHsuLi5wcm9wc30+PGNpcmNsZSBjeD1cIjEyXCIgY3k9XCIxMlwiIHI9XCI5XCIvPjxwYXRoIGQ9XCJNMyAxMmgxOE0xMiAzYTE0IDE0IDAgMCAxIDAgMThNMTIgM2ExNCAxNCAwIDAgMCAwIDE4XCIvPjwvc3ZnPjtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn07XG5cbndpbmRvdy5JY29uID0gSWNvbjtcbiAgIl0sIm1hcHBpbmdzIjoiQUFDQTtBQUNBO0FBQ0EsTUFBTUEsSUFBSSxHQUFHQSxDQUFDO0VBQUVDLElBQUk7RUFBRUMsSUFBSSxHQUFHLEVBQUU7RUFBRUMsS0FBSyxHQUFHLGNBQWM7RUFBRUMsV0FBVyxHQUFHO0FBQUksQ0FBQyxLQUFLO0VBQy9FLE1BQU1DLEtBQUssR0FBRztJQUNa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</script><script>/* ─── phone-shell.jsx ─── */
// PhoneShell.jsx — device chrome wrapper
const PhoneShell = ({
  children,
  time = '9:41'
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "phone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "phone-notch"
  }), /*#__PURE__*/React.createElement("div", {
    className: "phone-screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "status-bar"
  }, /*#__PURE__*/React.createElement("span", null, time), /*#__PURE__*/React.createElement("div", {
    className: "icons"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 16 11",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "7",
    width: "3",
    height: "4",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "4.3",
    y: "5",
    width: "3",
    height: "6",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "8.6",
    y: "2.5",
    width: "3",
    height: "8.5",
    rx: "0.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "12.9",
    y: "0",
    width: "3",
    height: "11",
    rx: "0.5"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "15",
    height: "11",
    viewBox: "0 0 15 11",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7.5 2.8c1.9 0 3.6.7 4.9 1.9l1-1A8 8 0 0 0 7.5 1.3 8 8 0 0 0 1.6 3.7l1 1A6.7 6.7 0 0 1 7.5 2.8zm0 3a4 4 0 0 1 2.8 1.2l1-1A5.5 5.5 0 0 0 7.5 4.3 5.5 5.5 0 0 0 3.7 6l1 1A4 4 0 0 1 7.5 5.8zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"
  })), /*#__PURE__*/React.createElement("svg", {
    width: "24",
    height: "11",
    viewBox: "0 0 24 11",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "0.5",
    y: "0.5",
    width: "20",
    height: "10",
    rx: "3",
    stroke: "currentColor",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "17",
    height: "7",
    rx: "1.5",
    fill: "currentColor"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 4v3c.7-.2 1.2-.9 1.2-1.5S22.7 4.2 22 4z",
    fill: "currentColor",
    opacity: "0.5"
  })))), children, /*#__PURE__*/React.createElement("div", {
    className: "home-indicator"
  })));
};
window.PhoneShell = PhoneShell;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQaG9uZVNoZWxsIiwiY2hpbGRyZW4iLCJ0aW1lIiwiUmVhY3QiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwid2lkdGgiLCJoZWlnaHQiLCJ2aWV3Qm94IiwiZmlsbCIsIngiLCJ5IiwicngiLCJkIiwic3Ryb2tlIiwib3BhY2l0eSIsIndpbmRvdyJdLCJzb3VyY2VzIjpbIklubGluZSBCYWJlbCBzY3JpcHQgKDMpIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLyog4pSA4pSA4pSAIHBob25lLXNoZWxsLmpzeCDilIDilIDilIAgKi9cbi8vIFBob25lU2hlbGwuanN4IOKAlCBkZXZpY2UgY2hyb21lIHdyYXBwZXJcbmNvbnN0IFBob25lU2hlbGwgPSAoeyBjaGlsZHJlbiwgdGltZSA9ICc5OjQxJyB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJwaG9uZVwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwaG9uZS1ub3RjaFwiIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInBob25lLXNjcmVlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0YXR1cy1iYXJcIj5cbiAgICAgICAgICA8c3Bhbj57dGltZX08L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpY29uc1wiPlxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjE2XCIgaGVpZ2h0PVwiMTFcIiB2aWV3Qm94PVwiMCAwIDE2IDExXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiPlxuICAgICAgICAgICAgICA8cmVjdCB4PVwiMFwiIHk9XCI3XCIgd2lkdGg9XCIzXCIgaGVpZ2h0PVwiNFwiIHJ4PVwiMC41XCIvPlxuICAgICAgICAgICAgICA8cmVjdCB4PVwiNC4zXCIgeT1cIjVcIiB3aWR0aD1cIjNcIiBoZWlnaHQ9XCI2XCIgcng9XCIwLjVcIi8+XG4gICAgICAgICAgICAgIDxyZWN0IHg9XCI4LjZcIiB5PVwiMi41XCIgd2lkdGg9XCIzXCIgaGVpZ2h0PVwiOC41XCIgcng9XCIwLjVcIi8+XG4gICAgICAgICAgICAgIDxyZWN0IHg9XCIxMi45XCIgeT1cIjBcIiB3aWR0aD1cIjNcIiBoZWlnaHQ9XCIxMVwiIHJ4PVwiMC41XCIvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgICAgICA8c3ZnIHdpZHRoPVwiMTVcIiBoZWlnaHQ9XCIxMVwiIHZpZXdCb3g9XCIwIDAgMTUgMTFcIiBmaWxsPVwiY3VycmVudENvbG9yXCI+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNy41IDIuOGMxLjkgMCAzLjYuNyA0LjkgMS45bDEtMUE4IDggMCAwIDAgNy41IDEuMyA4IDggMCAwIDAgMS42IDMuN2wxIDFBNi43IDYuNyAwIDAgMSA3LjUgMi44em0wIDNhNCA0IDAgMCAxIDIuOCAxLjJsMS0xQTUuNSA1LjUgMCAwIDAgNy41IDQuMyA1LjUgNS41IDAgMCAwIDMuNyA2bDEgMUE0IDQgMCAwIDEgNy41IDUuOHptMCAzYTEuNSAxLjUgMCAxIDAgMCAzIDEuNSAxLjUgMCAwIDAgMC0zelwiLz5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPHN2ZyB3aWR0aD1cIjI0XCIgaGVpZ2h0PVwiMTFcIiB2aWV3Qm94PVwiMCAwIDI0IDExXCIgZmlsbD1cIm5vbmVcIj5cbiAgICAgICAgICAgICAgPHJlY3QgeD1cIjAuNVwiIHk9XCIwLjVcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMTBcIiByeD1cIjNcIiBzdHJva2U9XCJjdXJyZW50Q29sb3JcIiBvcGFjaXR5PVwiMC40XCIvPlxuICAgICAgICAgICAgICA8cmVjdCB4PVwiMlwiIHk9XCIyXCIgd2lkdGg9XCIxN1wiIGhlaWdodD1cIjdcIiByeD1cIjEuNVwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIi8+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNMjIgNHYzYy43LS4yIDEuMi0uOSAxLjItMS41UzIyLjcgNC4yIDIyIDR6XCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIG9wYWNpdHk9XCIwLjVcIi8+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJob21lLWluZGljYXRvclwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbndpbmRvdy5QaG9uZVNoZWxsID0gUGhvbmVTaGVsbDtcbiAgIl0sIm1hcHBpbmdzIjoiQUFDQTtBQUNBO0FBQ0EsTUFBTUEsVUFBVSxHQUFHQSxDQUFDO0VBQUVDLFFBQVE7RUFBRUMsSUFBSSxHQUFHO0FBQU8sQ0FBQyxLQUFLO0VBQ2xELG9CQUNFQyxLQUFBLENBQUFDLGFBQUE7SUFBS0MsU0FBUyxFQUFDO0VBQU8sZ0JBQ3BCRixLQUFBLENBQUFDLGFBQUE7SUFBS0MsU0FBUyxFQUFDO0VBQWEsQ0FBRSxDQUFDLGVBQy9CRixLQUFBLENBQUFDLGFBQUE7SUFBS0MsU0FBUyxFQUFDO0VBQWMsZ0JBQzNCRixLQUFBLENBQUFDLGFBQUE7SUFBS0MsU0FBUyxFQUFDO0VBQVksZ0JBQ3pCRixLQUFBLENBQUFDLGFBQUEsZUFBT0YsSUFBVyxDQUFDLGVBQ25CQyxLQUFBLENBQUFDLGFBQUE7SUFBS0MsU0FBUyxFQUFDO0VBQU8sZ0JBQ3BCRixLQUFBLENBQUFDLGFBQUE7SUFBS0UsS0FBSyxFQUFDLElBQUk7SUFBQ0MsTUFBTSxFQUFDLElBQUk7SUFBQ0MsT0FBTyxFQUFDLFdBQVc7SUFBQ0MsSUFBSSxFQUFDO0VBQWMsZ0JBQ2pFTixLQUFBLENBQUFDLGFBQUE7SUFBTU0sQ0FBQyxFQUFDLEdBQUc7SUFBQ0MsQ0FBQyxFQUFDLEdBQUc7SUFBQ0wsS0FBSyxFQUFDLEdBQUc7SUFBQ0MsTUFBTSxFQUFDLEdBQUc7SUFBQ0ssRUFBRSxFQUFDO0VBQUssQ0FBQyxDQUFDLGVBQ2pEVCxLQUFBLENBQUFDLGFBQUE7SUFBTU0sQ0FBQyxFQUFDLEtBQUs7SUFBQ0MsQ0FBQyxFQUFDLEdBQUc7SUFBQ0wsS0FBSyxFQUFDLEdBQUc7SUFBQ0MsTUFBTSxFQUFDLEdBQUc7SUFBQ0ssRUFBRSxFQUFDO0VBQUssQ0FBQyxDQUFDLGVBQ25EVCxLQUFBLENBQUFDLGFBQUE7SUFBTU0sQ0FBQyxFQUFDLEtBQUs7SUFBQ0MsQ0FBQyxFQUFDLEtBQUs7SUFBQ0wsS0FBSyxFQUFDLEdBQUc7SUFBQ0MsTUFBTSxFQUFDLEtBQUs7SUFBQ0ssRUFBRSxFQUFDO0VBQUssQ0FBQyxDQUFDLGVBQ3ZEVCxLQUFBLENBQUFDLGFBQUE7SUFBTU0sQ0FBQyxFQUFDLE1BQU07SUFBQ0MsQ0FBQyxFQUFDLEdBQUc7SUFBQ0wsS0FBSyxFQUFDLEdBQUc7SUFBQ0MsTUFBTSxFQUFDLElBQUk7SUFBQ0ssRUFBRSxFQUFDO0VBQUssQ0FBQyxDQUNqRCxDQUFDLGVBQ05ULEtBQUEsQ0FBQUMsYUFBQTtJQUFLRSxLQUFLLEVBQUMsSUFBSTtJQUFDQyxNQUFNLEVBQUMsSUFBSTtJQUFDQyxPQUFPLEVBQUMsV0FBVztJQUFDQyxJQUFJLEVBQUM7RUFBYyxnQkFDakVOLEtBQUEsQ0FBQUMsYUFBQTtJQUFNUyxDQUFDLEVBQUM7RUFBcU8sQ0FBQyxDQUMzTyxDQUFDLGVBQ05WLEtBQUEsQ0FBQUMsYUFBQTtJQUFLRSxLQUFLLEVBQUMsSUFBSTtJQUFDQyxNQUFNLEVBQUMsSUFBSTtJQUFDQyxPQUFPLEVBQUMsV0FBVztJQUFDQyxJQUFJLEVBQUM7RUFBTSxnQkFDekROLEtBQUEsQ0FBQUMsYUFBQTtJQUFNTSxDQUFDLEVBQUMsS0FBSztJQUFDQyxDQUFDLEVBQUMsS0FBSztJQUFDTCxLQUFLLEVBQUMsSUFBSTtJQUFDQyxNQUFNLEVBQUMsSUFBSTtJQUFDSyxFQUFFLEVBQUMsR0FBRztJQUFDRSxNQUFNLEVBQUMsY0FBYztJQUFDQyxPQUFPLEVBQUM7RUFBSyxDQUFDLENBQUMsZUFDekZaLEtBQUEsQ0FBQUMsYUFBQTtJQUFNTSxDQUFDLEVBQUMsR0FBRztJQUFDQyxDQUFDLEVBQUMsR0FBRztJQUFDTCxLQUFLLEVBQUMsSUFBSTtJQUFDQyxNQUFNLEVBQUMsR0FBRztJQUFDSyxFQUFFLEVBQUMsS0FBSztJQUFDSCxJQUFJLEVBQUM7RUFBYyxDQUFDLENBQUMsZUFDdEVOLEtBQUEsQ0FBQUMsYUFBQTtJQUFNUyxDQUFDLEVBQUMsNkNBQTZDO0lBQUNKLElBQUksRUFBQyxjQUFjO0lBQUNNLE9BQU8sRUFBQztFQUFLLENBQUMsQ0FDckYsQ0FDRixDQUNGLENBQUMsRUFDTGQsUUFBUSxlQUNURSxLQUFBLENBQUFDLGFBQUE7SUFBS0MsU0FBUyxFQUFDO0VBQWdCLENBQUUsQ0FDOUIsQ0FDRixDQUFDO0FBRVYsQ0FBQztBQUVEVyxNQUFNLENBQUNoQixVQUFVLEdBQUdBLFVBQVUiLCJpZ25vcmVMaXN0IjpbXX0=</script><script>/* ─── screen-home.jsx ─── */
// HomeScreen.jsx — ホーム
const HomeScreen = ({
  onNavigate
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll-area",
    style: {
      background: 'var(--bg-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 20px 16px',
      background: 'linear-gradient(180deg, var(--bg-blush) 0%, var(--bg-app) 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      letterSpacing: '0.5px',
      fontWeight: 500
    }
  }, "\uC548\uB155\uD558\uC138\uC694 \u273F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xl)',
      fontWeight: 700,
      marginTop: 2,
      letterSpacing: '-0.01em'
    }
  }, "\u304A\u304B\u3048\u308A\u306A\u3055\u3044\u3001", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--plum-deep)'
    }
  }, "\u307F\u304A"), "\u3055\u3093")), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: 'var(--bg-card)',
      boxShadow: 'var(--sh-sm)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings",
    size: 18,
    color: "var(--ink-2)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-lg)',
      padding: '18px 20px',
      boxShadow: 'var(--sh-sm)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Stat, {
    icon: "flame",
    label: "\u9023\u7D9A",
    value: "12",
    unit: "\u65E5",
    tone: "rose"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "star",
    label: "\u30EC\u30D9\u30EB",
    value: "Lv.2",
    unit: "\u521D\u7D1A",
    tone: "plum"
  }), /*#__PURE__*/React.createElement(Stat, {
    icon: "sparkle",
    label: "\u4ECA\u65E5",
    value: "2/3",
    unit: "\u56DE",
    tone: "gold"
  }))), /*#__PURE__*/React.createElement(Section, {
    title: "\u4ECA\u65E5\u306E\u304A\u3059\u3059\u3081",
    sub: "\u3042\u306A\u305F\u306E\u30EC\u30D9\u30EB\u306B\u5408\u308F\u305B\u3066"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('preview'),
    style: {
      width: '100%',
      textAlign: 'left',
      background: 'linear-gradient(135deg, #F2DCE2 0%, #ECE4F4 100%)',
      borderRadius: 'var(--r-lg)',
      padding: '20px 22px',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: 'var(--sh-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: -30,
      top: -30,
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.5)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: 'rgba(255,255,255,0.7)',
      color: 'var(--plum-deep)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "coffee",
    size: 12
  }), " \u98F2\u98DF \xB7 Lv.2"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: 'var(--fs-xl)',
      fontWeight: 700,
      lineHeight: 1.3
    }
  }, "\u30AB\u30D5\u30A7\u3067", /*#__PURE__*/React.createElement("br", null), "\u30E9\u30C6\u3092\u6CE8\u6587\u3059\u308B"), /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      marginTop: 4,
      fontSize: 'var(--fs-base)',
      color: 'var(--rose-deep)',
      fontWeight: 600
    }
  }, "\uCE74\uD398\uC5D0\uC11C \uB77C\uB5BC \uC8FC\uBB38\uD558\uAE30"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-2)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 14
  }), " 5\u5206", /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--ink-3)'
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    size: 14
  }), " \u2605\u2605\u2606")))), /*#__PURE__*/React.createElement(Section, {
    title: "\u7D9A\u304D\u304B\u3089"
  }, /*#__PURE__*/React.createElement(ContinueCard, {
    onClick: () => onNavigate('chat')
  })), /*#__PURE__*/React.createElement(Section, {
    title: "\u30AB\u30C6\u30B4\u30EA\u30FC\u3067\u63A2\u3059",
    cta: "\u3059\u3079\u3066\u898B\u308B",
    onCta: () => onNavigate('scenarios')
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(CategoryTile, {
    icon: "globe",
    label: "\u65E5\u5E38",
    count: 4,
    tone: "lilac",
    onClick: () => onNavigate('scenarios')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    icon: "coffee",
    label: "\u98F2\u98DF",
    count: 5,
    tone: "blush",
    onClick: () => onNavigate('scenarios')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    icon: "plane",
    label: "\u65C5\u884C",
    count: 3,
    tone: "mint",
    onClick: () => onNavigate('scenarios')
  }), /*#__PURE__*/React.createElement(CategoryTile, {
    icon: "briefcase",
    label: "\u30D3\u30B8\u30CD\u30B9",
    count: 3,
    tone: "cream",
    onClick: () => onNavigate('scenarios')
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 100
    }
  }));
};
const Stat = ({
  icon,
  label,
  value,
  unit,
  tone
}) => {
  const colors = {
    rose: {
      bg: 'var(--rose-soft)',
      fg: 'var(--rose-deep)'
    },
    plum: {
      bg: 'var(--plum-soft)',
      fg: 'var(--plum-deep)'
    },
    gold: {
      bg: '#F0E4CC',
      fg: 'var(--gold)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '4px 6px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: colors.bg,
      color: colors.fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 6px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 700,
      lineHeight: 1,
      color: 'var(--ink-1)'
    }
  }, value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      marginTop: 4
    }
  }, label, /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 2
    }
  }, unit)));
};
const Section = ({
  title,
  sub,
  cta,
  onCta,
  children
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    padding: '20px 20px 0'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginBottom: 12
  }
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 'var(--fs-md)',
    fontWeight: 700
  }
}, title), sub && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--ink-3)',
    marginTop: 2
  }
}, sub)), cta && /*#__PURE__*/React.createElement("button", {
  onClick: onCta,
  style: {
    fontSize: 'var(--fs-sm)',
    color: 'var(--plum-deep)',
    fontWeight: 500
  }
}, cta, " \u2192")), children);
const ContinueCard = ({
  onClick
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  style: {
    width: '100%',
    textAlign: 'left',
    background: 'var(--bg-card)',
    borderRadius: 'var(--r-md)',
    padding: '14px 16px',
    boxShadow: 'var(--sh-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: 14
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: 48,
    height: 48,
    borderRadius: 'var(--r-sm)',
    background: 'var(--bg-mint)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#5B9477'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "plane",
  size: 22
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 'var(--fs-base)',
    fontWeight: 600
  }
}, "\u30BF\u30AF\u30B7\u30FC\u306B\u4E57\u308B"), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--ink-3)',
    marginTop: 2
  }
}, "\u9014\u4E2D\u307E\u3067 \xB7 \u6B8B\u308A3\u30BF\u30FC\u30F3"), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 8,
    height: 4,
    borderRadius: 999,
    background: 'var(--bg-soft)',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    width: '60%',
    height: '100%',
    background: 'var(--plum)',
    borderRadius: 999
  }
}))), /*#__PURE__*/React.createElement(Icon, {
  name: "arrow-right",
  size: 18,
  color: "var(--ink-3)"
}));
const CategoryTile = ({
  icon,
  label,
  count,
  tone,
  onClick
}) => {
  const bg = {
    lilac: 'var(--bg-lilac)',
    blush: 'var(--bg-blush)',
    mint: 'var(--bg-mint)',
    cream: 'var(--bg-cream)'
  }[tone];
  const fg = {
    lilac: 'var(--plum-deep)',
    blush: 'var(--rose-deep)',
    mint: '#5B9477',
    cream: 'var(--gold)'
  }[tone];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    style: {
      background: bg,
      borderRadius: 'var(--r-md)',
      padding: '16px 16px 14px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      minHeight: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--r-sm)',
      background: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: fg
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 700
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      marginTop: 2
    }
  }, count, "\u3064\u306E\u5834\u9762")));
};
window.HomeScreen = HomeScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJIb21lU2NyZWVuIiwib25OYXZpZ2F0ZSIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwiYmFja2dyb3VuZCIsInBhZGRpbmciLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImp1c3RpZnlDb250ZW50IiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJjb2xvciIsImxldHRlclNwYWNpbmciLCJmb250V2VpZ2h0IiwibWFyZ2luVG9wIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXJSYWRpdXMiLCJib3hTaGFkb3ciLCJJY29uIiwibmFtZSIsInNpemUiLCJncmlkVGVtcGxhdGVDb2x1bW5zIiwiZ2FwIiwiU3RhdCIsImljb24iLCJsYWJlbCIsInZhbHVlIiwidW5pdCIsInRvbmUiLCJTZWN0aW9uIiwidGl0bGUiLCJzdWIiLCJvbkNsaWNrIiwidGV4dEFsaWduIiwicG9zaXRpb24iLCJvdmVyZmxvdyIsInJpZ2h0IiwidG9wIiwibGluZUhlaWdodCIsImxhbmciLCJDb250aW51ZUNhcmQiLCJjdGEiLCJvbkN0YSIsIkNhdGVnb3J5VGlsZSIsImNvdW50IiwiY29sb3JzIiwicm9zZSIsImJnIiwiZmciLCJwbHVtIiwiZ29sZCIsIm1hcmdpbiIsIm1hcmdpbkxlZnQiLCJjaGlsZHJlbiIsImZsZXgiLCJtaW5XaWR0aCIsImxpbGFjIiwiYmx1c2giLCJtaW50IiwiY3JlYW0iLCJmbGV4RGlyZWN0aW9uIiwibWluSGVpZ2h0Iiwid2luZG93Il0sInNvdXJjZXMiOlsiSW5saW5lIEJhYmVsIHNjcmlwdCAoNCkiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKiDilIDilIDilIAgc2NyZWVuLWhvbWUuanN4IOKUgOKUgOKUgCAqL1xuLy8gSG9tZVNjcmVlbi5qc3gg4oCUIOODm+ODvOODoFxuY29uc3QgSG9tZVNjcmVlbiA9ICh7IG9uTmF2aWdhdGUgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsLWFyZWFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tYmctYXBwKScgfX0+XG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBwYWRkaW5nOiAnMTJweCAyMHB4IDE2cHgnLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDE4MGRlZywgdmFyKC0tYmctYmx1c2gpIDAlLCB2YXIoLS1iZy1hcHApIDEwMCUpJyxcbiAgICAgIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIG1hcmdpbkJvdHRvbTogMTggfX0+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIGxldHRlclNwYWNpbmc6ICcwLjVweCcsIGZvbnRXZWlnaHQ6IDUwMCB9fT5cbiAgICAgICAgICAgICAg7JWI64WV7ZWY7IS47JqUIOKcv1xuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteGwpJywgZm9udFdlaWdodDogNzAwLCBtYXJnaW5Ub3A6IDIsIGxldHRlclNwYWNpbmc6ICctMC4wMWVtJyB9fT5cbiAgICAgICAgICAgICAg44GK44GL44GI44KK44Gq44GV44GE44CBPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1wbHVtLWRlZXApJyB9fT7jgb/jgYo8L3NwYW4+44GV44KTXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7XG4gICAgICAgICAgICB3aWR0aDogNDAsIGhlaWdodDogNDAsIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLCBib3hTaGFkb3c6ICd2YXIoLS1zaC1zbSknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPEljb24gbmFtZT1cInNldHRpbmdzXCIgc2l6ZT17MTh9IGNvbG9yPVwidmFyKC0taW5rLTIpXCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFN0cmVhayArIGxldmVsIGNhcmQgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLFxuICAgICAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXItbGcpJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMThweCAyMHB4JyxcbiAgICAgICAgICBib3hTaGFkb3c6ICd2YXIoLS1zaC1zbSknLFxuICAgICAgICAgIGRpc3BsYXk6ICdncmlkJyxcbiAgICAgICAgICBncmlkVGVtcGxhdGVDb2x1bW5zOiAnMWZyIDFmciAxZnInLFxuICAgICAgICAgIGdhcDogNCxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPFN0YXQgaWNvbj1cImZsYW1lXCIgbGFiZWw9XCLpgKPntppcIiB2YWx1ZT1cIjEyXCIgdW5pdD1cIuaXpVwiIHRvbmU9XCJyb3NlXCIgLz5cbiAgICAgICAgICA8U3RhdCBpY29uPVwic3RhclwiIGxhYmVsPVwi44Os44OZ44OrXCIgdmFsdWU9XCJMdi4yXCIgdW5pdD1cIuWInee0mlwiIHRvbmU9XCJwbHVtXCIgLz5cbiAgICAgICAgICA8U3RhdCBpY29uPVwic3BhcmtsZVwiIGxhYmVsPVwi5LuK5pelXCIgdmFsdWU9XCIyLzNcIiB1bml0PVwi5ZueXCIgdG9uZT1cImdvbGRcIiAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVG9kYXkncyByZWNvbW1lbmRhdGlvbiAqL31cbiAgICAgIDxTZWN0aW9uIHRpdGxlPVwi5LuK5pel44Gu44GK44GZ44GZ44KBXCIgc3ViPVwi44GC44Gq44Gf44Gu44Os44OZ44Or44Gr5ZCI44KP44Gb44GmXCI+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZSgncHJldmlldycpfSBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjRjJEQ0UyIDAlLCAjRUNFNEY0IDEwMCUpJyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLWxnKScsXG4gICAgICAgICAgcGFkZGluZzogJzIwcHggMjJweCcsXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICBib3hTaGFkb3c6ICd2YXIoLS1zaC1zbSknLFxuICAgICAgICB9fT5cbiAgICAgICAgICB7LyogZGVjb3JhdGl2ZSBibG9iICovfVxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCByaWdodDogLTMwLCB0b3A6IC0zMCwgd2lkdGg6IDEyMCwgaGVpZ2h0OiAxMjAsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsMjU1LDI1NSwwLjUpJyxcbiAgICAgICAgICB9fSAvPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScgfX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGlwXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogJ3JnYmEoMjU1LDI1NSwyNTUsMC43KScsIGNvbG9yOiAndmFyKC0tcGx1bS1kZWVwKScgfX0+XG4gICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJjb2ZmZWVcIiBzaXplPXsxMn0gLz4g6aOy6aOfIMK3IEx2LjJcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAxMiwgZm9udFNpemU6ICd2YXIoLS1mcy14bCknLCBmb250V2VpZ2h0OiA3MDAsIGxpbmVIZWlnaHQ6IDEuMyB9fT5cbiAgICAgICAgICAgICAg44Kr44OV44Kn44GnPGJyLz7jg6njg4bjgpLms6jmlofjgZnjgotcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBsYW5nPVwia29cIiBzdHlsZT17eyBtYXJnaW5Ub3A6IDQsIGZvbnRTaXplOiAndmFyKC0tZnMtYmFzZSknLCBjb2xvcjogJ3ZhcigtLXJvc2UtZGVlcCknLCBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgICAgICAgIOy5tO2OmOyXkOyEnCDrnbzrlrwg7KO866y47ZWY6riwXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgbWFyZ2luVG9wOiAxNCwgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LFxuICAgICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZzLXNtKScsIGNvbG9yOiAndmFyKC0taW5rLTIpJyxcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiY2xvY2tcIiBzaXplPXsxNH0gLz4gNeWIhlxuICAgICAgICAgICAgICA8c3BhbiBzdHlsZT17eyB3aWR0aDogMywgaGVpZ2h0OiAzLCBib3JkZXJSYWRpdXM6ICc1MCUnLCBiYWNrZ3JvdW5kOiAndmFyKC0taW5rLTMpJyB9fSAvPlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwic3RhclwiIHNpemU9ezE0fSAvPiDimIXimIXimIZcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgey8qIENvbnRpbnVlICovfVxuICAgICAgPFNlY3Rpb24gdGl0bGU9XCLntprjgY3jgYvjgolcIj5cbiAgICAgICAgPENvbnRpbnVlQ2FyZCBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlKCdjaGF0Jyl9IC8+XG4gICAgICA8L1NlY3Rpb24+XG5cbiAgICAgIHsvKiBDYXRlZ29yaWVzICovfVxuICAgICAgPFNlY3Rpb24gdGl0bGU9XCLjgqvjg4bjgrTjg6rjg7zjgafmjqLjgZlcIiBjdGE9XCLjgZnjgbnjgabopovjgotcIiBvbkN0YT17KCkgPT4gb25OYXZpZ2F0ZSgnc2NlbmFyaW9zJyl9PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdncmlkJywgZ3JpZFRlbXBsYXRlQ29sdW1uczogJzFmciAxZnInLCBnYXA6IDEwIH19PlxuICAgICAgICAgIDxDYXRlZ29yeVRpbGUgaWNvbj1cImdsb2JlXCIgbGFiZWw9XCLml6XluLhcIiBjb3VudD17NH0gdG9uZT1cImxpbGFjXCIgb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZSgnc2NlbmFyaW9zJyl9IC8+XG4gICAgICAgICAgPENhdGVnb3J5VGlsZSBpY29uPVwiY29mZmVlXCIgbGFiZWw9XCLpo7Lpo59cIiBjb3VudD17NX0gdG9uZT1cImJsdXNoXCIgb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZSgnc2NlbmFyaW9zJyl9IC8+XG4gICAgICAgICAgPENhdGVnb3J5VGlsZSBpY29uPVwicGxhbmVcIiBsYWJlbD1cIuaXheihjFwiIGNvdW50PXszfSB0b25lPVwibWludFwiIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGUoJ3NjZW5hcmlvcycpfSAvPlxuICAgICAgICAgIDxDYXRlZ29yeVRpbGUgaWNvbj1cImJyaWVmY2FzZVwiIGxhYmVsPVwi44OT44K444ON44K5XCIgY291bnQ9ezN9IHRvbmU9XCJjcmVhbVwiIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGUoJ3NjZW5hcmlvcycpfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvU2VjdGlvbj5cblxuICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IDEwMCB9fSAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgU3RhdCA9ICh7IGljb24sIGxhYmVsLCB2YWx1ZSwgdW5pdCwgdG9uZSB9KSA9PiB7XG4gIGNvbnN0IGNvbG9ycyA9IHtcbiAgICByb3NlOiB7IGJnOiAndmFyKC0tcm9zZS1zb2Z0KScsIGZnOiAndmFyKC0tcm9zZS1kZWVwKScgfSxcbiAgICBwbHVtOiB7IGJnOiAndmFyKC0tcGx1bS1zb2Z0KScsIGZnOiAndmFyKC0tcGx1bS1kZWVwKScgfSxcbiAgICBnb2xkOiB7IGJnOiAnI0YwRTRDQycsIGZnOiAndmFyKC0tZ29sZCknIH0sXG4gIH1bdG9uZV07XG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyB0ZXh0QWxpZ246ICdjZW50ZXInLCBwYWRkaW5nOiAnNHB4IDZweCcgfX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgYmFja2dyb3VuZDogY29sb3JzLmJnLCBjb2xvcjogY29sb3JzLmZnLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgIG1hcmdpbjogJzAgYXV0byA2cHgnLFxuICAgICAgfX0+XG4gICAgICAgIDxJY29uIG5hbWU9e2ljb259IHNpemU9ezE4fSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtbGcpJywgZm9udFdlaWdodDogNzAwLCBsaW5lSGVpZ2h0OiAxLCBjb2xvcjogJ3ZhcigtLWluay0xKScgfX0+XG4gICAgICAgIHt2YWx1ZX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0taW5rLTMpJywgbWFyZ2luVG9wOiA0IH19PlxuICAgICAgICB7bGFiZWx9PHNwYW4gc3R5bGU9e3sgbWFyZ2luTGVmdDogMiB9fT57dW5pdH08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IFNlY3Rpb24gPSAoeyB0aXRsZSwgc3ViLCBjdGEsIG9uQ3RhLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHggMjBweCAwJyB9fT5cbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2Jhc2VsaW5lJywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgbWFyZ2luQm90dG9tOiAxMiB9fT5cbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1tZCknLCBmb250V2VpZ2h0OiA3MDAgfX0+e3RpdGxlfTwvZGl2PlxuICAgICAgICB7c3ViICYmIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpblRvcDogMiB9fT57c3VifTwvZGl2Pn1cbiAgICAgIDwvZGl2PlxuICAgICAge2N0YSAmJiAoXG4gICAgICAgIDxidXR0b24gb25DbGljaz17b25DdGF9IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtc20pJywgY29sb3I6ICd2YXIoLS1wbHVtLWRlZXApJywgZm9udFdlaWdodDogNTAwIH19PlxuICAgICAgICAgIHtjdGF9IOKGklxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IENvbnRpbnVlQ2FyZCA9ICh7IG9uQ2xpY2sgfSkgPT4gKFxuICA8YnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2t9IHN0eWxlPXt7XG4gICAgd2lkdGg6ICcxMDAlJywgdGV4dEFsaWduOiAnbGVmdCcsXG4gICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLWNhcmQpJyxcbiAgICBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgcGFkZGluZzogJzE0cHggMTZweCcsXG4gICAgYm94U2hhZG93OiAndmFyKC0tc2gtc20pJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDE0LFxuICB9fT5cbiAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICB3aWR0aDogNDgsIGhlaWdodDogNDgsIGJvcmRlclJhZGl1czogJ3ZhcigtLXItc20pJyxcbiAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1taW50KScsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICBjb2xvcjogJyM1Qjk0NzcnLFxuICAgIH19PlxuICAgICAgPEljb24gbmFtZT1cInBsYW5lXCIgc2l6ZT17MjJ9IC8+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBtaW5XaWR0aDogMCB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1iYXNlKScsIGZvbnRXZWlnaHQ6IDYwMCB9fT7jgr/jgq/jgrfjg7zjgavkuZfjgos8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpblRvcDogMiB9fT5cbiAgICAgICAg6YCU5Lit44G+44GnIMK3IOaui+OCijPjgr/jg7zjg7NcbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBtYXJnaW5Ub3A6IDgsIGhlaWdodDogNCwgYm9yZGVyUmFkaXVzOiA5OTksXG4gICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1zb2Z0KScsIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IHdpZHRoOiAnNjAlJywgaGVpZ2h0OiAnMTAwJScsIGJhY2tncm91bmQ6ICd2YXIoLS1wbHVtKScsIGJvcmRlclJhZGl1czogOTk5IH19IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8SWNvbiBuYW1lPVwiYXJyb3ctcmlnaHRcIiBzaXplPXsxOH0gY29sb3I9XCJ2YXIoLS1pbmstMylcIiAvPlxuICA8L2J1dHRvbj5cbik7XG5cbmNvbnN0IENhdGVnb3J5VGlsZSA9ICh7IGljb24sIGxhYmVsLCBjb3VudCwgdG9uZSwgb25DbGljayB9KSA9PiB7XG4gIGNvbnN0IGJnID0ge1xuICAgIGxpbGFjOiAndmFyKC0tYmctbGlsYWMpJyxcbiAgICBibHVzaDogJ3ZhcigtLWJnLWJsdXNoKScsXG4gICAgbWludDogJ3ZhcigtLWJnLW1pbnQpJyxcbiAgICBjcmVhbTogJ3ZhcigtLWJnLWNyZWFtKScsXG4gIH1bdG9uZV07XG4gIGNvbnN0IGZnID0ge1xuICAgIGxpbGFjOiAndmFyKC0tcGx1bS1kZWVwKScsXG4gICAgYmx1c2g6ICd2YXIoLS1yb3NlLWRlZXApJyxcbiAgICBtaW50OiAnIzVCOTQ3NycsXG4gICAgY3JlYW06ICd2YXIoLS1nb2xkKScsXG4gIH1bdG9uZV07XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfSBzdHlsZT17e1xuICAgICAgYmFja2dyb3VuZDogYmcsIGJvcmRlclJhZGl1czogJ3ZhcigtLXItbWQpJyxcbiAgICAgIHBhZGRpbmc6ICcxNnB4IDE2cHggMTRweCcsIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAxMixcbiAgICAgIG1pbkhlaWdodDogMTAwLFxuICAgIH19PlxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICB3aWR0aDogMzYsIGhlaWdodDogMzYsIGJvcmRlclJhZGl1czogJ3ZhcigtLXItc20pJyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjU1LDI1NSwyNTUsMC43KScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgY29sb3I6IGZnLFxuICAgICAgfX0+XG4gICAgICAgIDxJY29uIG5hbWU9e2ljb259IHNpemU9ezE4fSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtYmFzZSknLCBmb250V2VpZ2h0OiA3MDAgfX0+e2xhYmVsfTwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1pbmstMyknLCBtYXJnaW5Ub3A6IDIgfX0+e2NvdW50feOBpOOBruWgtOmdojwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9idXR0b24+XG4gICk7XG59O1xuXG53aW5kb3cuSG9tZVNjcmVlbiA9IEhvbWVTY3JlZW47XG4gICJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFDQTtBQUNBLE1BQU1BLFVBQVUsR0FBR0EsQ0FBQztFQUFFQztBQUFXLENBQUMsS0FBSztFQUNyQyxvQkFDRUMsS0FBQSxDQUFBQyxhQUFBO0lBQUtDLFNBQVMsRUFBQyxhQUFhO0lBQUNDLEtBQUssRUFBRTtNQUFFQyxVQUFVLEVBQUU7SUFBZ0I7RUFBRSxnQkFFbEVKLEtBQUEsQ0FBQUMsYUFBQTtJQUFLRSxLQUFLLEVBQUU7TUFDVkUsT0FBTyxFQUFFLGdCQUFnQjtNQUN6QkQsVUFBVSxFQUFFO0lBQ2Q7RUFBRSxnQkFDQUosS0FBQSxDQUFBQyxhQUFBO0lBQUtFLEtBQUssRUFBRTtNQUFFRyxPQUFPLEVBQUUsTUFBTTtNQUFFQyxVQUFVLEVBQUUsUUFBUTtNQUFFQyxjQUFjLEVBQUUsZUFBZTtNQUFFQyxZQUFZLEVBQUU7SUFBRztFQUFFLGdCQUN2R1QsS0FBQSxD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</script><script>function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ─── screen-scenarios.jsx ─── */
// ScenariosScreen.jsx — 場面選択
const ScenariosScreen = ({
  onNavigate,
  onBack
}) => {
  const [activeCat, setActiveCat] = React.useState('all');
  const [activeLevel, setActiveLevel] = React.useState('all');
  const categories = [{
    id: 'all',
    label: 'すべて'
  }, {
    id: 'daily',
    label: '日常'
  }, {
    id: 'food',
    label: '飲食'
  }, {
    id: 'travel',
    label: '旅行'
  }, {
    id: 'shop',
    label: '買い物'
  }, {
    id: 'biz',
    label: 'ビジネス'
  }, {
    id: 'culture',
    label: '文化'
  }];
  const levels = ['all', 'Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5'];
  const scenarios = [{
    id: 1,
    ja: 'カフェでラテを注文する',
    ko: '카페에서 라떼 주문하기',
    cat: '飲食',
    level: 'Lv.2',
    diff: 2,
    time: 5,
    icon: 'coffee',
    tone: 'blush',
    recommended: true
  }, {
    id: 2,
    ja: 'タクシーに乗る',
    ko: '택시 타기',
    cat: '旅行',
    level: 'Lv.2',
    diff: 2,
    time: 5,
    icon: 'plane',
    tone: 'mint',
    inProgress: true
  }, {
    id: 3,
    ja: '趣味について話す',
    ko: '취미에 대해 이야기하기',
    cat: '日常',
    level: 'Lv.2',
    diff: 2,
    time: 10,
    icon: 'heart',
    tone: 'lilac'
  }, {
    id: 4,
    ja: 'コンビニで買い物',
    ko: '편의점에서 쇼핑',
    cat: '買い物',
    level: 'Lv.2',
    diff: 1,
    time: 5,
    icon: 'shopping',
    tone: 'cream'
  }, {
    id: 5,
    ja: 'ホテルで困った時',
    ko: '호텔에서 곤란할 때',
    cat: '旅行',
    level: 'Lv.3',
    diff: 3,
    time: 10,
    icon: 'plane',
    tone: 'mint'
  }, {
    id: 6,
    ja: 'アレルギーを伝える',
    ko: '알레르기 알리기',
    cat: '飲食',
    level: 'Lv.3',
    diff: 3,
    time: 10,
    icon: 'coffee',
    tone: 'blush'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll-area",
    style: {
      background: 'var(--bg-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 5,
      background: 'rgba(255,252,248,0.95)',
      backdropFilter: 'blur(12px)',
      padding: '6px 20px 12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--bg-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-lg)',
      fontWeight: 700
    }
  }, "\u5834\u9762\u3092\u9078\u3076")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      overflowX: 'auto',
      margin: '0 -20px',
      padding: '0 20px 4px',
      scrollbarWidth: 'none'
    }
  }, categories.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    onClick: () => setActiveCat(c.id),
    style: {
      padding: '8px 14px',
      borderRadius: 'var(--r-pill)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      background: activeCat === c.id ? 'var(--ink-1)' : 'var(--bg-soft)',
      color: activeCat === c.id ? 'white' : 'var(--ink-2)',
      flexShrink: 0
    }
  }, c.label))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 8
    }
  }, levels.map(lv => /*#__PURE__*/React.createElement("button", {
    key: lv,
    onClick: () => setActiveLevel(lv),
    style: {
      padding: '6px 12px',
      borderRadius: 'var(--r-pill)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 600,
      background: activeLevel === lv ? 'var(--plum-soft)' : 'transparent',
      color: activeLevel === lv ? 'var(--plum-deep)' : 'var(--ink-3)',
      border: '1px solid',
      borderColor: activeLevel === lv ? 'var(--plum-soft)' : 'var(--ink-4)'
    }
  }, lv === 'all' ? '全て' : lv)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 20px 100px'
    }
  }, scenarios.map((s, i) => /*#__PURE__*/React.createElement(ScenarioRow, _extends({
    key: s.id
  }, s, {
    onClick: () => onNavigate('preview'),
    delay: i * 30
  })))));
};
const ScenarioRow = ({
  ja,
  ko,
  level,
  diff,
  time,
  icon,
  tone,
  recommended,
  inProgress,
  onClick,
  delay
}) => {
  const tones = {
    blush: {
      bg: 'var(--bg-blush)',
      fg: 'var(--rose-deep)'
    },
    mint: {
      bg: 'var(--bg-mint)',
      fg: '#5B9477'
    },
    lilac: {
      bg: 'var(--bg-lilac)',
      fg: 'var(--plum-deep)'
    },
    cream: {
      bg: 'var(--bg-cream)',
      fg: 'var(--gold)'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("button", {
    onClick: onClick,
    className: "fade-up",
    style: {
      width: '100%',
      textAlign: 'left',
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      boxShadow: 'var(--sh-sm)',
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      animationDelay: `${delay}ms`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 52,
      height: 52,
      borderRadius: 'var(--r-sm)',
      background: tones.bg,
      color: tones.fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center',
      marginBottom: 4,
      flexWrap: 'wrap'
    }
  }, recommended && /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: 'var(--rose-soft)',
      color: 'var(--rose-deep)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 10
  }), " \u304A\u3059\u3059\u3081"), inProgress && /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: 'var(--plum-soft)',
      color: 'var(--plum-deep)',
      fontWeight: 600
    }
  }, "\u7D9A\u304D\u304B\u3089")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 600,
      lineHeight: 1.3
    }
  }, ja), /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      marginTop: 2
    }
  }, ko), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", null, level), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--ink-4)'
    }
  }), /*#__PURE__*/React.createElement("span", null, '★'.repeat(diff), '☆'.repeat(3 - diff)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: 'var(--ink-4)'
    }
  }), /*#__PURE__*/React.createElement("span", null, time, "\u5206"))));
};
window.ScenariosScreen = ScenariosScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTY2VuYXJpb3NTY3JlZW4iLCJvbk5hdmlnYXRlIiwib25CYWNrIiwiYWN0aXZlQ2F0Iiwic2V0QWN0aXZlQ2F0IiwiUmVhY3QiLCJ1c2VTdGF0ZSIsImFjdGl2ZUxldmVsIiwic2V0QWN0aXZlTGV2ZWwiLCJjYXRlZ29yaWVzIiwiaWQiLCJsYWJlbCIsImxldmVscyIsInNjZW5hcmlvcyIsImphIiwia28iLCJjYXQiLCJsZXZlbCIsImRpZmYiLCJ0aW1lIiwiaWNvbiIsInRvbmUiLCJyZWNvbW1lbmRlZCIsImluUHJvZ3Jlc3MiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJiYWNrZ3JvdW5kIiwicG9zaXRpb24iLCJ0b3AiLCJ6SW5kZXgiLCJiYWNrZHJvcEZpbHRlciIsInBhZGRpbmciLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsImdhcCIsIm1hcmdpbkJvdHRvbSIsIm9uQ2xpY2siLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlclJhZGl1cyIsImp1c3RpZnlDb250ZW50IiwiSWNvbiIsIm5hbWUiLCJzaXplIiwiZm9udFNpemUiLCJmb250V2VpZ2h0Iiwib3ZlcmZsb3dYIiwibWFyZ2luIiwic2Nyb2xsYmFyV2lkdGgiLCJtYXAiLCJjIiwia2V5Iiwid2hpdGVTcGFjZSIsImNvbG9yIiwiZmxleFNocmluayIsIm1hcmdpblRvcCIsImx2IiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJzIiwiaSIsIlNjZW5hcmlvUm93IiwiX2V4dGVuZHMiLCJkZWxheSIsInRvbmVzIiwiYmx1c2giLCJiZyIsImZnIiwibWludCIsImxpbGFjIiwiY3JlYW0iLCJ0ZXh0QWxpZ24iLCJib3hTaGFkb3ciLCJhbmltYXRpb25EZWxheSIsImZsZXgiLCJtaW5XaWR0aCIsImZsZXhXcmFwIiwibGluZUhlaWdodCIsImxhbmciLCJyZXBlYXQiLCJ3aW5kb3ciXSwic291cmNlcyI6WyJJbmxpbmUgQmFiZWwgc2NyaXB0ICg1KSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIOKUgOKUgOKUgCBzY3JlZW4tc2NlbmFyaW9zLmpzeCDilIDilIDilIAgKi9cbi8vIFNjZW5hcmlvc1NjcmVlbi5qc3gg4oCUIOWgtOmdoumBuOaKnlxuY29uc3QgU2NlbmFyaW9zU2NyZWVuID0gKHsgb25OYXZpZ2F0ZSwgb25CYWNrIH0pID0+IHtcbiAgY29uc3QgW2FjdGl2ZUNhdCwgc2V0QWN0aXZlQ2F0XSA9IFJlYWN0LnVzZVN0YXRlKCdhbGwnKTtcbiAgY29uc3QgW2FjdGl2ZUxldmVsLCBzZXRBY3RpdmVMZXZlbF0gPSBSZWFjdC51c2VTdGF0ZSgnYWxsJyk7XG5cbiAgY29uc3QgY2F0ZWdvcmllcyA9IFtcbiAgICB7IGlkOiAnYWxsJywgbGFiZWw6ICfjgZnjgbnjgaYnIH0sXG4gICAgeyBpZDogJ2RhaWx5JywgbGFiZWw6ICfml6XluLgnIH0sXG4gICAgeyBpZDogJ2Zvb2QnLCBsYWJlbDogJ+mjsumjnycgfSxcbiAgICB7IGlkOiAndHJhdmVsJywgbGFiZWw6ICfml4XooYwnIH0sXG4gICAgeyBpZDogJ3Nob3AnLCBsYWJlbDogJ+iyt+OBhOeJqScgfSxcbiAgICB7IGlkOiAnYml6JywgbGFiZWw6ICfjg5Pjgrjjg43jgrknIH0sXG4gICAgeyBpZDogJ2N1bHR1cmUnLCBsYWJlbDogJ+aWh+WMlicgfSxcbiAgXTtcbiAgY29uc3QgbGV2ZWxzID0gWydhbGwnLCAnTHYuMScsICdMdi4yJywgJ0x2LjMnLCAnTHYuNCcsICdMdi41J107XG5cbiAgY29uc3Qgc2NlbmFyaW9zID0gW1xuICAgIHsgaWQ6IDEsIGphOiAn44Kr44OV44Kn44Gn44Op44OG44KS5rOo5paH44GZ44KLJywga286ICfsubTtjpjsl5DshJwg652865a8IOyjvOusuO2VmOq4sCcsIGNhdDogJ+mjsumjnycsIGxldmVsOiAnTHYuMicsIGRpZmY6IDIsIHRpbWU6IDUsIGljb246ICdjb2ZmZWUnLCB0b25lOiAnYmx1c2gnLCByZWNvbW1lbmRlZDogdHJ1ZSB9LFxuICAgIHsgaWQ6IDIsIGphOiAn44K/44Kv44K344O844Gr5LmX44KLJywga286ICftg53si5wg7YOA6riwJywgY2F0OiAn5peF6KGMJywgbGV2ZWw6ICdMdi4yJywgZGlmZjogMiwgdGltZTogNSwgaWNvbjogJ3BsYW5lJywgdG9uZTogJ21pbnQnLCBpblByb2dyZXNzOiB0cnVlIH0sXG4gICAgeyBpZDogMywgamE6ICfotqPlkbPjgavjgaTjgYTjgaboqbHjgZknLCBrbzogJ+y3qOuvuOyXkCDrjIDtlbQg7J207JW86riw7ZWY6riwJywgY2F0OiAn5pel5bi4JywgbGV2ZWw6ICdMdi4yJywgZGlmZjogMiwgdGltZTogMTAsIGljb246ICdoZWFydCcsIHRvbmU6ICdsaWxhYycgfSxcbiAgICB7IGlkOiA0LCBqYTogJ+OCs+ODs+ODk+ODi+OBp+iyt+OBhOeJqScsIGtvOiAn7Y647J2Y7KCQ7JeQ7IScIOyHvO2VkScsIGNhdDogJ+iyt+OBhOeJqScsIGxldmVsOiAnTHYuMicsIGRpZmY6IDEsIHRpbWU6IDUsIGljb246ICdzaG9wcGluZycsIHRvbmU6ICdjcmVhbScgfSxcbiAgICB7IGlkOiA1LCBqYTogJ+ODm+ODhuODq+OBp+WbsOOBo+OBn+aZgicsIGtvOiAn7Zi47YWU7JeQ7IScIOqzpOuegO2VoCDrlYwnLCBjYXQ6ICfml4XooYwnLCBsZXZlbDogJ0x2LjMnLCBkaWZmOiAzLCB0aW1lOiAxMCwgaWNvbjogJ3BsYW5lJywgdG9uZTogJ21pbnQnIH0sXG4gICAgeyBpZDogNiwgamE6ICfjgqLjg6zjg6vjgq7jg7zjgpLkvJ3jgYjjgosnLCBrbzogJ+yVjOugiOultOq4sCDslYzrpqzquLAnLCBjYXQ6ICfpo7Lpo58nLCBsZXZlbDogJ0x2LjMnLCBkaWZmOiAzLCB0aW1lOiAxMCwgaWNvbjogJ2NvZmZlZScsIHRvbmU6ICdibHVzaCcgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsLWFyZWFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tYmctYXBwKScgfX0+XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiAnc3RpY2t5JywgdG9wOiAwLCB6SW5kZXg6IDUsXG4gICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTIsMjQ4LDAuOTUpJyxcbiAgICAgICAgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDEycHgpJyxcbiAgICAgICAgcGFkZGluZzogJzZweCAyMHB4IDEycHgnLFxuICAgICAgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LCBtYXJnaW5Cb3R0b206IDEwIH19PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25CYWNrfSBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IDM2LCBoZWlnaHQ6IDM2LCBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLXNvZnQpJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJhcnJvdy1sZWZ0XCIgc2l6ZT17MTh9IC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLWxnKScsIGZvbnRXZWlnaHQ6IDcwMCB9fT7loLTpnaLjgpLpgbjjgbY8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENhdGVnb3J5IHRhYnMgKi99XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgb3ZlcmZsb3dYOiAnYXV0bycsXG4gICAgICAgICAgbWFyZ2luOiAnMCAtMjBweCcsIHBhZGRpbmc6ICcwIDIwcHggNHB4JyxcbiAgICAgICAgICBzY3JvbGxiYXJXaWR0aDogJ25vbmUnLFxuICAgICAgICB9fT5cbiAgICAgICAgICB7Y2F0ZWdvcmllcy5tYXAoYyA9PiAoXG4gICAgICAgICAgICA8YnV0dG9uIGtleT17Yy5pZH0gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlQ2F0KGMuaWQpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnOHB4IDE0cHgnLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLXBpbGwpJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICd2YXIoLS1mcy1zbSknLCBmb250V2VpZ2h0OiA2MDAsIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiBhY3RpdmVDYXQgPT09IGMuaWQgPyAndmFyKC0taW5rLTEpJyA6ICd2YXIoLS1iZy1zb2Z0KScsXG4gICAgICAgICAgICAgIGNvbG9yOiBhY3RpdmVDYXQgPT09IGMuaWQgPyAnd2hpdGUnIDogJ3ZhcigtLWluay0yKScsXG4gICAgICAgICAgICAgIGZsZXhTaHJpbms6IDAsXG4gICAgICAgICAgICB9fT57Yy5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExldmVsIGZpbHRlciAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgbWFyZ2luVG9wOiA4IH19PlxuICAgICAgICAgIHtsZXZlbHMubWFwKGx2ID0+IChcbiAgICAgICAgICAgIDxidXR0b24ga2V5PXtsdn0gb25DbGljaz17KCkgPT4gc2V0QWN0aXZlTGV2ZWwobHYpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEycHgnLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLXBpbGwpJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGFjdGl2ZUxldmVsID09PSBsdiA/ICd2YXIoLS1wbHVtLXNvZnQpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIGNvbG9yOiBhY3RpdmVMZXZlbCA9PT0gbHYgPyAndmFyKC0tcGx1bS1kZWVwKScgOiAndmFyKC0taW5rLTMpJyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkJyxcbiAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGFjdGl2ZUxldmVsID09PSBsdiA/ICd2YXIoLS1wbHVtLXNvZnQpJyA6ICd2YXIoLS1pbmstNCknLFxuICAgICAgICAgICAgfX0+e2x2ID09PSAnYWxsJyA/ICflhajjgaYnIDogbHZ9PC9idXR0b24+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzhweCAyMHB4IDEwMHB4JyB9fT5cbiAgICAgICAge3NjZW5hcmlvcy5tYXAoKHMsIGkpID0+IChcbiAgICAgICAgICA8U2NlbmFyaW9Sb3cga2V5PXtzLmlkfSB7Li4uc30gb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZSgncHJldmlldycpfSBkZWxheT17aSAqIDMwfSAvPlxuICAgICAgICApKX1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuY29uc3QgU2NlbmFyaW9Sb3cgPSAoeyBqYSwga28sIGxldmVsLCBkaWZmLCB0aW1lLCBpY29uLCB0b25lLCByZWNvbW1lbmRlZCwgaW5Qcm9ncmVzcywgb25DbGljaywgZGVsYXkgfSkgPT4ge1xuICBjb25zdCB0b25lcyA9IHtcbiAgICBibHVzaDogeyBiZzogJ3ZhcigtLWJnLWJsdXNoKScsIGZnOiAndmFyKC0tcm9zZS1kZWVwKScgfSxcbiAgICBtaW50OiB7IGJnOiAndmFyKC0tYmctbWludCknLCBmZzogJyM1Qjk0NzcnIH0sXG4gICAgbGlsYWM6IHsgYmc6ICd2YXIoLS1iZy1saWxhYyknLCBmZzogJ3ZhcigtLXBsdW0tZGVlcCknIH0sXG4gICAgY3JlYW06IHsgYmc6ICd2YXIoLS1iZy1jcmVhbSknLCBmZzogJ3ZhcigtLWdvbGQpJyB9LFxuICB9W3RvbmVdO1xuXG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfSBjbGFzc05hbWU9XCJmYWRlLXVwXCIgc3R5bGU9e3tcbiAgICAgIHdpZHRoOiAnMTAwJScsIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLWNhcmQpJyxcbiAgICAgIGJvcmRlclJhZGl1czogJ3ZhcigtLXItbWQpJyxcbiAgICAgIHBhZGRpbmc6ICcxNHB4IDE2cHgnLFxuICAgICAgYm94U2hhZG93OiAndmFyKC0tc2gtc20pJyxcbiAgICAgIG1hcmdpbkJvdHRvbTogMTAsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDE0LFxuICAgICAgYW5pbWF0aW9uRGVsYXk6IGAke2RlbGF5fW1zYCxcbiAgICB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgd2lkdGg6IDUyLCBoZWlnaHQ6IDUyLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLXNtKScsXG4gICAgICAgIGJhY2tncm91bmQ6IHRvbmVzLmJnLCBjb2xvcjogdG9uZXMuZmcsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgZmxleFNocmluazogMCxcbiAgICAgIH19PlxuICAgICAgICA8SWNvbiBuYW1lPXtpY29ufSBzaXplPXsyMn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBtaW5XaWR0aDogMCB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGdhcDogNiwgYWxpZ25JdGVtczogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogNCwgZmxleFdyYXA6ICd3cmFwJyB9fT5cbiAgICAgICAgICB7cmVjb21tZW5kZWQgJiYgKFxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2hpcFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICd2YXIoLS1yb3NlLXNvZnQpJywgY29sb3I6ICd2YXIoLS1yb3NlLWRlZXApJywgZm9udFdlaWdodDogNjAwIH19PlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwic3BhcmtsZVwiIHNpemU9ezEwfSAvPiDjgYrjgZnjgZnjgoFcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICApfVxuICAgICAgICAgIHtpblByb2dyZXNzICYmIChcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImNoaXBcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tcGx1bS1zb2Z0KScsIGNvbG9yOiAndmFyKC0tcGx1bS1kZWVwKScsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAgICAgICAg57aa44GN44GL44KJXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1iYXNlKScsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS4zIH19PntqYX08L2Rpdj5cbiAgICAgICAgPGRpdiBsYW5nPVwia29cIiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0taW5rLTMpJywgbWFyZ2luVG9wOiAyIH19Pntrb308L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAxMCwgbWFyZ2luVG9wOiA2LFxuICAgICAgICAgIGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1pbmstMyknLFxuICAgICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8c3Bhbj57bGV2ZWx9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAzLCBoZWlnaHQ6IDMsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6ICd2YXIoLS1pbmstNCknIH19IC8+XG4gICAgICAgICAgPHNwYW4+eyfimIUnLnJlcGVhdChkaWZmKX17J+KYhicucmVwZWF0KDMtZGlmZil9PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IHdpZHRoOiAzLCBoZWlnaHQ6IDMsIGJvcmRlclJhZGl1czogJzUwJScsIGJhY2tncm91bmQ6ICd2YXIoLS1pbmstNCknIH19IC8+XG4gICAgICAgICAgPHNwYW4+e3RpbWV95YiGPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYnV0dG9uPlxuICApO1xufTtcblxud2luZG93LlNjZW5hcmlvc1NjcmVlbiA9IFNjZW5hcmlvc1NjcmVlbjtcbiAgIl0sIm1hcHBpbmdzIjoiO0FBQ0E7QUFDQTtBQUNBLE1BQU1BLGVBQWUsR0FBR0EsQ0FBQztFQUFFQyxVQUFVO0VBQUVDO0FBQU8sQ0FBQyxLQUFLO0VBQ2xELE1BQU0sQ0FBQ0MsU0FBUyxFQUFFQyxZQUFZLENBQUMsR0FBR0MsS0FBSyxDQUFDQyxRQUFRLENBQUMsS0FBSyxDQUFDO0VBQ3ZELE1BQU0sQ0FBQ0MsV0FBVyxFQUFFQyxjQUFjLENBQUMsR0FBR0gsS0FBSyxDQUFDQyxRQUFRLENBQUMsS0FBSyxDQUFDO0VBRTNELE1BQU1HLFVBQVUsR0FBRyxDQUNqQjtJQUFFQyxFQUFFLEVBQUUsS0FBSztJQUFFQyxLQUFLLEVBQUU7RUFBTSxDQUFDLEVBQzNCO0lBQUVELEVBQUUsRUFBRSxPQUFPO0lBQUVDLEtBQUssRUFBRTtFQUFLLENBQUMsRUFDNUI7SUFBRUQsRUFBRSxFQUFFLE1BQU07SUFBRUMsS0FBSyxFQUFFO0VBQUssQ0FBQyxFQUMzQjtJQUFFRCxFQUFFLEVBQUUsUUFBUTtJQUFFQyxLQUFLLEVBQUU7RUFBSyxDQUFDLEVBQzdCO0lBQUVELEVBQUUsRUFBRSxNQUFNO0lBQUVDLEtBQUssRUFBRTtFQUFNLENBQUMsRUFD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</script><script>/* ─── screen-preview.jsx ─── */
// PreviewScreen.jsx — 場面プレビュー
const PreviewScreen = ({
  onNavigate,
  onBack
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll-area",
    style: {
      background: 'var(--bg-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      background: 'linear-gradient(135deg, #F2DCE2 0%, #ECE4F4 60%, #F7EFD9 120%)',
      padding: '12px 20px 28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 18
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 88,
      height: 88,
      borderRadius: '50%',
      background: 'rgba(255,255,255,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 14px',
      color: 'var(--rose-deep)',
      boxShadow: '0 8px 20px rgba(185,113,137,0.18)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "coffee",
    size: 42,
    strokeWidth: 1.4
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      justifyContent: 'center',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: 'rgba(255,255,255,0.7)'
    }
  }, "\u98F2\u98DF"), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: 'rgba(255,255,255,0.7)'
    }
  }, "Lv.2 \u521D\u7D1A"), /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      background: 'rgba(255,255,255,0.7)'
    }
  }, "\u2605\u2605\u2606")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-2xl)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em'
    }
  }, "\u30AB\u30D5\u30A7\u3067\u30E9\u30C6\u3092", /*#__PURE__*/React.createElement("br", null), "\u6CE8\u6587\u3059\u308B"), /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      marginTop: 6,
      fontSize: 'var(--fs-base)',
      color: 'var(--rose-deep)',
      fontWeight: 600
    }
  }, "\uCE74\uD398\uC5D0\uC11C \uB77C\uB5BC \uC8FC\uBB38\uD558\uAE30"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      boxShadow: 'var(--sh-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 20
    }
  }, "\u273F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)'
    }
  }, "\u3042\u306A\u305F\u306E\u76F8\u624B"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 600
    }
  }, "\u30B8\u30B9\uFF08\u30AB\u30D5\u30A7\u5E97\u54E1\uFF09"), /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)'
    }
  }, "\uC9C0\uC218 \xB7 \u660E\u308B\u304420\u4EE3\u5973\u6027")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 'var(--fs-xs)',
      color: 'var(--plum-deep)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "volume",
    size: 14
  }), " Kore"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-md)',
      fontWeight: 700,
      marginBottom: 10
    }
  }, "\u9054\u6210\u76EE\u6A19"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-mint)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "#5B9477"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-1)',
      lineHeight: 1.6
    }
  }, "\u98F2\u307F\u7269\u306E\u30B5\u30A4\u30BA\u3068\u6E29\u5EA6\u3092\u4F1D\u3048\u3001", /*#__PURE__*/React.createElement("br", null), "\u652F\u6255\u3044\u65B9\u6CD5\u307E\u3067\u4F1A\u8A71\u3092\u5B8C\u4E86\u3059\u308B"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-md)',
      fontWeight: 700,
      marginBottom: 10
    }
  }, "\u30AD\u30FC\u30D5\u30EC\u30FC\u30BA"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Phrase, {
    ko: "\uC544\uC774\uC2A4 \uB77C\uB5BC \uD55C \uC794 \uC8FC\uC138\uC694",
    ruby: "\u30A2\u30A4\u30B9 \u30E9\u30C3\u30C6 \u30CF\u30F3 \u30B8\u30E3\u30F3 \u30B8\u30E5\u30BB\u30E8",
    ja: "\u30A2\u30A4\u30B9\u30E9\u30C6\u3092\u3072\u3068\u3064\u304F\u3060\u3055\u3044"
  }), /*#__PURE__*/React.createElement(Phrase, {
    ko: "\uC0AC\uC774\uC988\uB294 \uC5B4\uB5BB\uAC8C \uB4DC\uB9B4\uAE4C\uC694?",
    ruby: "\u30B5\u30A4\u30B8\u30E5\u30CC\u30F3 \u30AA\u30C3\u30C8\u30B1 \u30C9\u30A5\u30EA\u30EB\u30C3\u30AB\u30E8?",
    ja: "\u30B5\u30A4\u30BA\u306F\u3069\u3046\u3055\u308C\u307E\u3059\u304B\uFF1F"
  }), /*#__PURE__*/React.createElement(Phrase, {
    ko: "\uC5EC\uAE30\uC11C \uB4DC\uC138\uC694?",
    ruby: "\u30E8\u30AE\u30BD \u30C9\u30A5\u30BB\u30E8?",
    ja: "\u5E97\u5185\u3067\u304A\u53EC\u3057\u4E0A\u304C\u308A\u3067\u3059\u304B\uFF1F"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-cream)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 20,
    color: "var(--gold)"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-sm)',
      fontWeight: 700,
      marginBottom: 4
    }
  }, "\u30AB\u30EB\u30C1\u30E3\u30FC\u30E1\u30E2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-2)',
      lineHeight: 1.6
    }
  }, "\u97D3\u56FD\u306E\u30AB\u30D5\u30A7\u3067\u306F\u300C\uC0F7 \uCD94\uAC00\uFF08\u30B7\u30E7\u30C3\u30C8\u8FFD\u52A0\uFF09\u300D\u304C\u5B9A\u756A\u3002\u6C37\u5C11\u306A\u3081\u306F\u300C\uC5BC\uC74C \uC801\uAC8C\u300D\u3068\u4F1D\u3048\u307E\u3057\u3087\u3046\u3002")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 100px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => onNavigate('chat'),
    style: {
      width: '100%'
    }
  }, "\u4F1A\u8A71\u3092\u59CB\u3081\u308B"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)'
    }
  }, "\u4ECA\u65E5\u306E\u6B8B\u308A\u56DE\u6570 \xB7 1/3 \u56DE")));
};
const Phrase = ({
  ko,
  ruby,
  ja
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--bg-card)',
    borderRadius: 'var(--r-md)',
    padding: '12px 14px',
    boxShadow: 'var(--sh-sm)',
    display: 'flex',
    alignItems: 'center',
    gap: 12
  }
}, /*#__PURE__*/React.createElement("button", {
  style: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'var(--plum-soft)',
    color: 'var(--plum-deep)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: "play",
  size: 14
})), /*#__PURE__*/React.createElement("div", {
  style: {
    flex: 1,
    minWidth: 0
  }
}, /*#__PURE__*/React.createElement("div", {
  lang: "ko",
  style: {
    fontSize: 'var(--fs-base)',
    fontWeight: 600,
    lineHeight: 1.3
  }
}, ko), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--rose-deep)',
    marginTop: 2
  }
}, ruby), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 'var(--fs-xs)',
    color: 'var(--ink-3)',
    marginTop: 2
  }
}, ja)));
window.PreviewScreen = PreviewScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJQcmV2aWV3U2NyZWVuIiwib25OYXZpZ2F0ZSIsIm9uQmFjayIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwiYmFja2dyb3VuZCIsInBvc2l0aW9uIiwicGFkZGluZyIsImRpc3BsYXkiLCJqdXN0aWZ5Q29udGVudCIsImFsaWduSXRlbXMiLCJvbkNsaWNrIiwid2lkdGgiLCJoZWlnaHQiLCJib3JkZXJSYWRpdXMiLCJJY29uIiwibmFtZSIsInNpemUiLCJtYXJnaW5Ub3AiLCJ0ZXh0QWxpZ24iLCJtYXJnaW4iLCJjb2xvciIsImJveFNoYWRvdyIsInN0cm9rZVdpZHRoIiwiZ2FwIiwibWFyZ2luQm90dG9tIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibGluZUhlaWdodCIsImxldHRlclNwYWNpbmciLCJsYW5nIiwiZmxleCIsImZsZXhEaXJlY3Rpb24iLCJQaHJhc2UiLCJrbyIsInJ1YnkiLCJqYSIsImZsZXhTaHJpbmsiLCJtaW5XaWR0aCIsIndpbmRvdyJdLCJzb3VyY2VzIjpbIklubGluZSBCYWJlbCBzY3JpcHQgKDYpIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLyog4pSA4pSA4pSAIHNjcmVlbi1wcmV2aWV3LmpzeCDilIDilIDilIAgKi9cbi8vIFByZXZpZXdTY3JlZW4uanN4IOKAlCDloLTpnaLjg5fjg6zjg5Pjg6Xjg7xcbmNvbnN0IFByZXZpZXdTY3JlZW4gPSAoeyBvbk5hdmlnYXRlLCBvbkJhY2sgfSkgPT4ge1xuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsLWFyZWFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tYmctYXBwKScgfX0+XG4gICAgICB7LyogSGVybyAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjRjJEQ0UyIDAlLCAjRUNFNEY0IDYwJSwgI0Y3RUZEOSAxMjAlKScsXG4gICAgICAgIHBhZGRpbmc6ICcxMnB4IDIwcHggMjhweCcsXG4gICAgICB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsIGFsaWduSXRlbXM6ICdjZW50ZXInIH19PlxuICAgICAgICAgIDxidXR0b24gb25DbGljaz17b25CYWNrfSBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IDM2LCBoZWlnaHQ6IDM2LCBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjU1LDI1NSwyNTUsMC43KScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPVwiYXJyb3ctbGVmdFwiIHNpemU9ezE4fSAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b24gc3R5bGU9e3tcbiAgICAgICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNyknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPEljb24gbmFtZT1cImJvb2ttYXJrXCIgc2l6ZT17MTh9IC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgbWFyZ2luVG9wOiAyNCwgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICB3aWR0aDogODgsIGhlaWdodDogODgsIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAncmdiYSgyNTUsMjU1LDI1NSwwLjg1KScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICAgICAgICBtYXJnaW46ICcwIGF1dG8gMTRweCcsXG4gICAgICAgICAgICBjb2xvcjogJ3ZhcigtLXJvc2UtZGVlcCknLFxuICAgICAgICAgICAgYm94U2hhZG93OiAnMCA4cHggMjBweCByZ2JhKDE4NSwxMTMsMTM3LDAuMTgpJyxcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJjb2ZmZWVcIiBzaXplPXs0Mn0gc3Ryb2tlV2lkdGg9ezEuNH0gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA2LCBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsIG1hcmdpbkJvdHRvbTogMTAgfX0+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJjaGlwXCIgc3R5bGU9e3sgYmFja2dyb3VuZDogJ3JnYmEoMjU1LDI1NSwyNTUsMC43KScgfX0+6aOy6aOfPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2hpcFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNyknIH19Pkx2LjIg5Yid57SaPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiY2hpcFwiIHN0eWxlPXt7IGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNyknIH19PuKYheKYheKYhjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtMnhsKScsIGZvbnRXZWlnaHQ6IDcwMCwgbGluZUhlaWdodDogMS4yLCBsZXR0ZXJTcGFjaW5nOiAnLTAuMDFlbScgfX0+XG4gICAgICAgICAgICDjgqvjg5Xjgqfjgafjg6njg4bjgpI8YnIvPuazqOaWh+OBmeOCi1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgbGFuZz1cImtvXCIgc3R5bGU9e3sgbWFyZ2luVG9wOiA2LCBmb250U2l6ZTogJ3ZhcigtLWZzLWJhc2UpJywgY29sb3I6ICd2YXIoLS1yb3NlLWRlZXApJywgZm9udFdlaWdodDogNjAwIH19PlxuICAgICAgICAgICAg7Lm07Y6Y7JeQ7IScIOudvOuWvCDso7zrrLjtlZjquLBcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENhc3QgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcyMHB4IDIwcHggMCcgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgICAgICAgcGFkZGluZzogJzE0cHggMTZweCcsIGJveFNoYWRvdzogJ3ZhcigtLXNoLXNtKScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMixcbiAgICAgICAgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgICAgd2lkdGg6IDQ0LCBoZWlnaHQ6IDQ0LCBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICNGOUU4RTQsICNFQ0U0RjQpJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgIGZvbnRTaXplOiAyMCxcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIOKcv1xuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSB9fT5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScgfX0+44GC44Gq44Gf44Gu55u45omLPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtYmFzZSknLCBmb250V2VpZ2h0OiA2MDAgfX0+44K444K577yI44Kr44OV44Kn5bqX5ZOh77yJPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGxhbmc9XCJrb1wiIHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1pbmstMyknIH19PuyngOyImCDCtyDmmI7jgovjgYQyMOS7o+Wls+aApzwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA0LCBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0tcGx1bS1kZWVwKScsIGZvbnRXZWlnaHQ6IDYwMCB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJ2b2x1bWVcIiBzaXplPXsxNH0gLz4gS29yZVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogR29hbCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHggMjBweCAwJyB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLW1kKScsIGZvbnRXZWlnaHQ6IDcwMCwgbWFyZ2luQm90dG9tOiAxMCB9fT7pgZTmiJDnm67mqJk8L2Rpdj5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1taW50KScsIGJvcmRlclJhZGl1czogJ3ZhcigtLXItbWQpJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTRweCAxNnB4JyxcbiAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogMTIsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JyxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPEljb24gbmFtZT1cImNoZWNrXCIgc2l6ZT17MTh9IGNvbG9yPVwiIzVCOTQ3N1wiIC8+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXNtKScsIGNvbG9yOiAndmFyKC0taW5rLTEpJywgbGluZUhlaWdodDogMS42IH19PlxuICAgICAgICAgICAg6aOy44G/54mp44Gu44K144Kk44K644Go5rip5bqm44KS5Lyd44GI44CBPGJyLz7mlK/miZXjgYTmlrnms5Xjgb7jgafkvJroqbHjgpLlrozkuobjgZnjgotcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEtleSBwaHJhc2VzICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCAyMHB4IDAnIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtbWQpJywgZm9udFdlaWdodDogNzAwLCBtYXJnaW5Cb3R0b206IDEwIH19PuOCreODvOODleODrOODvOOCujwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogOCB9fT5cbiAgICAgICAgICA8UGhyYXNlIGtvPVwi7JWE7J207IqkIOudvOuWvCDtlZwg7J6UIOyjvOyEuOyalFwiIHJ1Ynk9XCLjgqLjgqTjgrkg44Op44OD44OGIOODj+ODsyDjgrjjg6Pjg7Mg44K444Ol44K744OoXCIgamE9XCLjgqLjgqTjgrnjg6njg4bjgpLjgbLjgajjgaTjgY/jgaDjgZXjgYRcIiAvPlxuICAgICAgICAgIDxQaHJhc2Uga289XCLsgqzsnbTspojripQg7Ja065a76rKMIOuTnOumtOq5jOyalD9cIiBydWJ5PVwi44K144Kk44K444Ol44OM44OzIOOCquODg+ODiOOCsSDjg4njgqXjg6rjg6vjg4Pjgqvjg6g/XCIgamE9XCLjgrXjgqTjgrrjga/jganjgYbjgZXjgozjgb7jgZnjgYvvvJ9cIiAvPlxuICAgICAgICAgIDxQaHJhc2Uga289XCLsl6zquLDshJwg65Oc7IS47JqUP1wiIHJ1Ynk9XCLjg6jjgq7jgr0g44OJ44Kl44K744OoP1wiIGphPVwi5bqX5YaF44Gn44GK5Y+s44GX5LiK44GM44KK44Gn44GZ44GL77yfXCIgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEN1bHR1cmUgbm90ZSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHggMjBweCAwJyB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1jcmVhbSknLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgICAgICAgcGFkZGluZzogJzE0cHggMTZweCcsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDEyLCBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gICAgICAgIH19PlxuICAgICAgICAgIDxJY29uIG5hbWU9XCJsaWdodGJ1bGJcIiBzaXplPXsyMH0gY29sb3I9XCJ2YXIoLS1nb2xkKVwiIC8+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1zbSknLCBmb250V2VpZ2h0OiA3MDAsIG1hcmdpbkJvdHRvbTogNCB9fT7jgqvjg6vjg4Hjg6Pjg7zjg6Hjg6I8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1zbSknLCBjb2xvcjogJ3ZhcigtLWluay0yKScsIGxpbmVIZWlnaHQ6IDEuNiB9fT5cbiAgICAgICAgICAgICAg6Z+T5Zu944Gu44Kr44OV44Kn44Gn44Gv44CM7IO3IOy2lOqwgO+8iOOCt+ODp+ODg+ODiOi/veWKoO+8ieOAjeOBjOWumueVquOAguawt+WwkeOBquOCgeOBr+OAjOyWvOydjCDsoIHqsozjgI3jgajkvJ3jgYjjgb7jgZfjgofjgYbjgIJcbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQ1RBICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjRweCAyMHB4IDEwMHB4JyB9fT5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tcHJpbWFyeVwiIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGUoJ2NoYXQnKX0gc3R5bGU9e3sgd2lkdGg6ICcxMDAlJyB9fT5cbiAgICAgICAgICDkvJroqbHjgpLlp4vjgoHjgotcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiAnY2VudGVyJywgbWFyZ2luVG9wOiAxMCwgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScgfX0+XG4gICAgICAgICAg5LuK5pel44Gu5q6L44KK5Zue5pWwIMK3IDEvMyDlm55cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmNvbnN0IFBocmFzZSA9ICh7IGtvLCBydWJ5LCBqYSB9KSA9PiAoXG4gIDxkaXYgc3R5bGU9e3tcbiAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgcGFkZGluZzogJzEycHggMTRweCcsIGJveFNoYWRvdzogJ3ZhcigtLXNoLXNtKScsXG4gICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiAxMixcbiAgfX0+XG4gICAgPGJ1dHRvbiBzdHlsZT17e1xuICAgICAgd2lkdGg6IDM2LCBoZWlnaHQ6IDM2LCBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLXBsdW0tc29mdCknLCBjb2xvcjogJ3ZhcigtLXBsdW0tZGVlcCknLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgZmxleFNocmluazogMCxcbiAgICB9fT5cbiAgICAgIDxJY29uIG5hbWU9XCJwbGF5XCIgc2l6ZT17MTR9IC8+XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxLCBtaW5XaWR0aDogMCB9fT5cbiAgICAgIDxkaXYgbGFuZz1cImtvXCIgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1iYXNlKScsIGZvbnRXZWlnaHQ6IDYwMCwgbGluZUhlaWdodDogMS4zIH19Pntrb308L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLXJvc2UtZGVlcCknLCBtYXJnaW5Ub3A6IDIgfX0+e3J1Ynl9PC9kaXY+XG4gICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1pbmstMyknLCBtYXJnaW5Ub3A6IDIgfX0+e2phfTwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbndpbmRvdy5QcmV2aWV3U2NyZWVuID0gUHJldmlld1NjcmVlbjtcbiAgIl0sIm1hcHBpbmdzIjoiQUFDQTtBQUNBO0FBQ0EsTUFBTUEsYUFBYSxHQUFHQSxDQUFDO0VBQUVDLFVBQVU7RUFBRUM7QUFBTyxDQUFDLEtBQUs7RUFDaEQsb0JBQ0VDLEtBQUEsQ0FBQUMsYUFBQTtJQUFLQyxTQUFTLEVBQUMsYUFBYTtJQUFDQyxLQUFLLEVBQUU7TUFBRUMsVUFBVSxFQUFFO0lBQWdCO0VB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</script><script>function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* ─── screen-chat.jsx ─── */
// ChatScreen.jsx — 会話画面（メイン）
const ChatScreen = ({
  onNavigate,
  onBack
}) => {
  const [showTranslation, setShowTranslation] = React.useState(true);
  const [showRuby, setShowRuby] = React.useState(true);
  const [recording, setRecording] = React.useState(false);
  const messages = [{
    role: 'ai',
    name: 'ジス',
    ko: '안녕하세요! 어서 오세요 ☕',
    ruby: 'アンニョンハセヨ! オソ オセヨ',
    ja: 'こんにちは！いらっしゃいませ'
  }, {
    role: 'user',
    ko: '안녕하세요. 아이스 라떼 한 잔 주세요.',
    ruby: 'アンニョンハセヨ. アイス ラッテ ハン ジャン ジュセヨ',
    ja: 'こんにちは。アイスラテをひとつください。',
    score: 92
  }, {
    role: 'ai',
    name: 'ジス',
    ko: '네, 사이즈는 어떻게 드릴까요? 톨, 그란데 있어요.',
    ruby: 'ネ, サイジュヌン オットケ ドゥリルッカヨ? トル, グランデ イッソヨ',
    ja: 'はい、サイズはどうされますか？トールとグランデがあります。',
    hint: '「グランデでお願いします」と伝えてみよう'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#FAF6F1'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 14px 12px',
      background: 'rgba(255,252,248,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(200,191,208,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--bg-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, "\u273F"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 700,
      lineHeight: 1.2
    }
  }, "\u30B8\u30B9"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)'
    }
  }, "\u30AB\u30D5\u30A7 \xB7 \u30BF\u30FC\u30F3 2/8")), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--bg-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 16,
    color: "var(--ink-2)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 14px',
      display: 'flex',
      gap: 6,
      borderBottom: '1px solid rgba(200,191,208,0.2)',
      background: '#FAF6F1'
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    active: showRuby,
    onClick: () => setShowRuby(!showRuby),
    icon: "globe",
    label: "\u30EB\u30D3"
  }), /*#__PURE__*/React.createElement(Toggle, {
    active: showTranslation,
    onClick: () => setShowTranslation(!showTranslation),
    icon: "translate",
    label: "\u65E5\u672C\u8A9E\u8A33"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '6px 10px',
      borderRadius: 'var(--r-pill)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 600,
      background: 'var(--bg-soft)',
      color: 'var(--ink-2)',
      display: 'flex',
      gap: 4,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lightbulb",
    size: 12
  }), " \u30D2\u30F3\u30C8")), /*#__PURE__*/React.createElement("div", {
    className: "scroll-area",
    style: {
      padding: '16px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'center',
      padding: '6px 14px',
      borderRadius: 'var(--r-pill)',
      background: 'rgba(255,255,255,0.7)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      fontWeight: 500
    }
  }, "\u5834\u9762 \xB7 \u30AB\u30D5\u30A7\u3067\u30E9\u30C6\u3092\u6CE8\u6587\u3059\u308B"), messages.map((m, i) => /*#__PURE__*/React.createElement(Message, _extends({
    key: i
  }, m, {
    showRuby: showRuby,
    showTranslation: showTranslation,
    delay: i * 80
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 30,
      height: 30,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 14
    }
  }, "\u273F"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'white',
      padding: '10px 14px',
      borderRadius: '4px 18px 18px 18px',
      display: 'flex',
      gap: 4,
      alignItems: 'center',
      boxShadow: 'var(--sh-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "typing-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "typing-dot"
  }), /*#__PURE__*/React.createElement("div", {
    className: "typing-dot"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px 14px',
      background: 'rgba(255,252,248,0.96)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(200,191,208,0.3)'
    }
  }, recording ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 16px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--rose-soft)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 3,
      alignItems: 'flex-end',
      height: 18
    }
  }, [8, 14, 10, 16, 12, 8, 14].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 3,
      height: h,
      background: 'var(--rose-deep)',
      borderRadius: 2,
      animation: `typing 1s ${i * 0.1}s infinite`
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontSize: 'var(--fs-sm)',
      color: 'var(--rose-deep)',
      fontWeight: 600
    }
  }, "\u805E\u3044\u3066\u3044\u307E\u3059..."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setRecording(false),
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--rose-deep)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16
  }))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => onNavigate('feedback'),
    style: {
      padding: '10px 14px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--bg-soft)',
      color: 'var(--ink-2)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " \u7D42\u4E86"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => setRecording(true),
    className: "pulse-ring",
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      background: 'linear-gradient(180deg, #9888CF 0%, var(--plum-deep) 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 20px rgba(111,93,171,0.35)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mic",
    size: 26,
    strokeWidth: 1.8
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: {
      padding: '10px 14px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--bg-soft)',
      color: 'var(--ink-2)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 600
    }
  }, "\u6587\u5B57\u5165\u529B"))));
};
const Toggle = ({
  active,
  onClick,
  icon,
  label
}) => /*#__PURE__*/React.createElement("button", {
  onClick: onClick,
  style: {
    padding: '6px 10px',
    borderRadius: 'var(--r-pill)',
    fontSize: 'var(--fs-xs)',
    fontWeight: 600,
    background: active ? 'var(--plum-soft)' : 'transparent',
    color: active ? 'var(--plum-deep)' : 'var(--ink-3)',
    border: '1px solid',
    borderColor: active ? 'var(--plum-soft)' : 'var(--ink-4)',
    display: 'flex',
    gap: 4,
    alignItems: 'center'
  }
}, /*#__PURE__*/React.createElement(Icon, {
  name: icon,
  size: 12
}), " ", label);
const Message = ({
  role,
  name,
  ko,
  ruby,
  ja,
  score,
  hint,
  showRuby,
  showTranslation,
  delay
}) => {
  const isAI = role === 'ai';
  if (isAI) {
    return /*#__PURE__*/React.createElement("div", {
      className: "fade-up",
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8,
        animationDelay: `${delay}ms`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
        flexShrink: 0
      }
    }, "\u273F"), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        maxWidth: '85%'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--ink-3)',
        marginBottom: 4,
        marginLeft: 4
      }
    }, name), /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'white',
        padding: '12px 14px',
        borderRadius: '4px 18px 18px 18px',
        boxShadow: 'var(--sh-sm)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      lang: "ko",
      style: {
        fontSize: 'var(--fs-base)',
        fontWeight: 600,
        lineHeight: 1.4,
        color: 'var(--ink-1)'
      }
    }, ko), showRuby && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--rose-deep)',
        marginTop: 4,
        lineHeight: 1.4
      }
    }, ruby), showTranslation && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 'var(--fs-xs)',
        color: 'var(--ink-3)',
        marginTop: 4,
        lineHeight: 1.5
      }
    }, ja)), /*#__PURE__*/React.createElement("button", {
      style: {
        width: 30,
        height: 30,
        borderRadius: '50%',
        background: 'var(--plum-soft)',
        color: 'var(--plum-deep)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "play",
      size: 12
    })))), hint && /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 6,
        padding: '6px 10px',
        background: 'var(--bg-cream)',
        borderRadius: 'var(--r-sm)',
        fontSize: 'var(--fs-xs)',
        color: 'var(--gold)',
        fontWeight: 600,
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        alignSelf: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "lightbulb",
      size: 11
    }), " ", hint)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "fade-up",
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      animationDelay: `${delay}ms`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '85%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'linear-gradient(135deg, #B6A7E0 0%, var(--plum) 100%)',
      padding: '12px 14px',
      borderRadius: '18px 4px 18px 18px',
      boxShadow: '0 4px 12px rgba(139,122,199,0.2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 600,
      lineHeight: 1.4,
      color: 'white'
    }
  }, ko), showRuby && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'rgba(255,255,255,0.85)',
      marginTop: 4
    }
  }, ruby), showTranslation && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'rgba(255,255,255,0.75)',
      marginTop: 4
    }
  }, ja)), score && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontSize: 'var(--fs-xs)',
      color: 'var(--success)',
      fontWeight: 600,
      textAlign: 'right',
      display: 'flex',
      gap: 4,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 11
  }), " \u767A\u97F3 ", score, "\u70B9 \xB7 \u81EA\u7136\u306A\u767A\u8A71")));
};
window.ChatScreen = ChatScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDaGF0U2NyZWVuIiwib25OYXZpZ2F0ZSIsIm9uQmFjayIsInNob3dUcmFuc2xhdGlvbiIsInNldFNob3dUcmFuc2xhdGlvbiIsIlJlYWN0IiwidXNlU3RhdGUiLCJzaG93UnVieSIsInNldFNob3dSdWJ5IiwicmVjb3JkaW5nIiwic2V0UmVjb3JkaW5nIiwibWVzc2FnZXMiLCJyb2xlIiwibmFtZSIsImtvIiwicnVieSIsImphIiwic2NvcmUiLCJoaW50IiwiY3JlYXRlRWxlbWVudCIsInN0eWxlIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJoZWlnaHQiLCJiYWNrZ3JvdW5kIiwicGFkZGluZyIsImJhY2tkcm9wRmlsdGVyIiwiYm9yZGVyQm90dG9tIiwiYWxpZ25JdGVtcyIsImdhcCIsIm9uQ2xpY2siLCJ3aWR0aCIsImJvcmRlclJhZGl1cyIsImp1c3RpZnlDb250ZW50IiwiSWNvbiIsInNpemUiLCJmbGV4IiwibWluV2lkdGgiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJsaW5lSGVpZ2h0IiwiY29sb3IiLCJUb2dnbGUiLCJhY3RpdmUiLCJpY29uIiwibGFiZWwiLCJjbGFzc05hbWUiLCJhbGlnblNlbGYiLCJtYXAiLCJtIiwiaSIsIk1lc3NhZ2UiLCJfZXh0ZW5kcyIsImtleSIsImRlbGF5IiwiYm94U2hhZG93IiwiYm9yZGVyVG9wIiwiaCIsImFuaW1hdGlvbiIsInN0cm9rZVdpZHRoIiwiYm9yZGVyIiwiYm9yZGVyQ29sb3IiLCJpc0FJIiwiYW5pbWF0aW9uRGVsYXkiLCJmbGV4U2hyaW5rIiwibWF4V2lkdGgiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5MZWZ0IiwibGFuZyIsIm1hcmdpblRvcCIsInRleHRBbGlnbiIsIndpbmRvdyJdLCJzb3VyY2VzIjpbIklubGluZSBCYWJlbCBzY3JpcHQgKDcpIl0sInNvdXJjZXNDb250ZW50IjpbIlxuLyog4pSA4pSA4pSAIHNjcmVlbi1jaGF0LmpzeCDilIDilIDilIAgKi9cbi8vIENoYXRTY3JlZW4uanN4IOKAlCDkvJroqbHnlLvpnaLvvIjjg6HjgqTjg7PvvIlcbmNvbnN0IENoYXRTY3JlZW4gPSAoeyBvbk5hdmlnYXRlLCBvbkJhY2sgfSkgPT4ge1xuICBjb25zdCBbc2hvd1RyYW5zbGF0aW9uLCBzZXRTaG93VHJhbnNsYXRpb25dID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtzaG93UnVieSwgc2V0U2hvd1J1YnldID0gUmVhY3QudXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtyZWNvcmRpbmcsIHNldFJlY29yZGluZ10gPSBSZWFjdC51c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgbWVzc2FnZXMgPSBbXG4gICAge1xuICAgICAgcm9sZTogJ2FpJywgbmFtZTogJ+OCuOOCuScsXG4gICAgICBrbzogJ+yViOuFle2VmOyEuOyalCEg7Ja07IScIOyYpOyEuOyalCDimJUnLFxuICAgICAgcnVieTogJ+OCouODs+ODi+ODp+ODs+ODj+OCu+ODqCEg44Kq44K9IOOCquOCu+ODqCcsXG4gICAgICBqYTogJ+OBk+OCk+OBq+OBoeOBr++8geOBhOOCieOBo+OBl+OCg+OBhOOBvuOBmycsXG4gICAgfSxcbiAgICB7XG4gICAgICByb2xlOiAndXNlcicsXG4gICAgICBrbzogJ+yViOuFle2VmOyEuOyalC4g7JWE7J207IqkIOudvOuWvCDtlZwg7J6UIOyjvOyEuOyalC4nLFxuICAgICAgcnVieTogJ+OCouODs+ODi+ODp+ODs+ODj+OCu+ODqC4g44Ki44Kk44K5IOODqeODg+ODhiDjg4/jg7Mg44K444Oj44OzIOOCuOODpeOCu+ODqCcsXG4gICAgICBqYTogJ+OBk+OCk+OBq+OBoeOBr+OAguOCouOCpOOCueODqeODhuOCkuOBsuOBqOOBpOOBj+OBoOOBleOBhOOAgicsXG4gICAgICBzY29yZTogOTIsXG4gICAgfSxcbiAgICB7XG4gICAgICByb2xlOiAnYWknLCBuYW1lOiAn44K444K5JyxcbiAgICAgIGtvOiAn64SkLCDsgqzsnbTspojripQg7Ja065a76rKMIOuTnOumtOq5jOyalD8g7YaoLCDqt7jrnoDrjbAg7J6I7Ja07JqULicsXG4gICAgICBydWJ5OiAn44ONLCDjgrXjgqTjgrjjg6Xjg4zjg7Mg44Kq44OD44OI44KxIOODieOCpeODquODq+ODg+OCq+ODqD8g44OI44OrLCDjgrDjg6njg7Pjg4cg44Kk44OD44K944OoJyxcbiAgICAgIGphOiAn44Gv44GE44CB44K144Kk44K644Gv44Gp44GG44GV44KM44G+44GZ44GL77yf44OI44O844Or44Go44Kw44Op44Oz44OH44GM44GC44KK44G+44GZ44CCJyxcbiAgICAgIGhpbnQ6ICfjgIzjgrDjg6njg7Pjg4fjgafjgYrpoZjjgYTjgZfjgb7jgZnjgI3jgajkvJ3jgYjjgabjgb/jgojjgYYnLFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGhlaWdodDogJzEwMCUnLCBiYWNrZ3JvdW5kOiAnI0ZBRjZGMScgfX0+XG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICBwYWRkaW5nOiAnNnB4IDE0cHggMTJweCcsXG4gICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTIsMjQ4LDAuOTUpJyxcbiAgICAgICAgYmFja2Ryb3BGaWx0ZXI6ICdibHVyKDEycHgpJyxcbiAgICAgICAgYm9yZGVyQm90dG9tOiAnMXB4IHNvbGlkIHJnYmEoMjAwLDE5MSwyMDgsMC4zKScsXG4gICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTAsXG4gICAgICB9fT5cbiAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXtvbkJhY2t9IHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IDM2LCBoZWlnaHQ6IDM2LCBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1zb2Z0KScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwiYXJyb3ctbGVmdFwiIHNpemU9ezE4fSAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0Y5RThFNCwgI0VDRTRGNCknLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgfX0+4py/PC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgbWluV2lkdGg6IDAgfX0+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLWJhc2UpJywgZm9udFdlaWdodDogNzAwLCBsaW5lSGVpZ2h0OiAxLjIgfX0+44K444K5PC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0taW5rLTMpJyB9fT7jgqvjg5Xjgqcgwrcg44K/44O844OzIDIvODwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJ1dHRvbiBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctc29mdCknLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPEljb24gbmFtZT1cImNsb3NlXCIgc2l6ZT17MTZ9IGNvbG9yPVwidmFyKC0taW5rLTIpXCIgLz5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIERpc3BsYXkgdG9nZ2xlcyAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcGFkZGluZzogJzhweCAxNHB4JyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsXG4gICAgICAgIGJvcmRlckJvdHRvbTogJzFweCBzb2xpZCByZ2JhKDIwMCwxOTEsMjA4LDAuMiknLFxuICAgICAgICBiYWNrZ3JvdW5kOiAnI0ZBRjZGMScsXG4gICAgICB9fT5cbiAgICAgICAgPFRvZ2dsZSBhY3RpdmU9e3Nob3dSdWJ5fSBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UnVieSghc2hvd1J1YnkpfSBpY29uPVwiZ2xvYmVcIiBsYWJlbD1cIuODq+ODk1wiIC8+XG4gICAgICAgIDxUb2dnbGUgYWN0aXZlPXtzaG93VHJhbnNsYXRpb259IG9uQ2xpY2s9eygpID0+IHNldFNob3dUcmFuc2xhdGlvbighc2hvd1RyYW5zbGF0aW9uKX0gaWNvbj1cInRyYW5zbGF0ZVwiIGxhYmVsPVwi5pel5pys6Kqe6KizXCIgLz5cbiAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgIDxidXR0b24gc3R5bGU9e3tcbiAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEwcHgnLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLXBpbGwpJyxcbiAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctc29mdCknLCBjb2xvcjogJ3ZhcigtLWluay0yKScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDQsIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwibGlnaHRidWxiXCIgc2l6ZT17MTJ9IC8+IOODkuODs+ODiFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWVzc2FnZXMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNjcm9sbC1hcmVhXCIgc3R5bGU9e3sgcGFkZGluZzogJzE2cHggMTRweCcsIGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogMTQgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBhbGlnblNlbGY6ICdjZW50ZXInLFxuICAgICAgICAgIHBhZGRpbmc6ICc2cHggMTRweCcsIGJvcmRlclJhZGl1czogJ3ZhcigtLXItcGlsbCknLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNyknLFxuICAgICAgICAgIGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1pbmstMyknLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgfX0+XG4gICAgICAgICAg5aC06Z2iIMK3IOOCq+ODleOCp+OBp+ODqeODhuOCkuazqOaWh+OBmeOCi1xuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7bWVzc2FnZXMubWFwKChtLCBpKSA9PiAoXG4gICAgICAgICAgPE1lc3NhZ2Uga2V5PXtpfSB7Li4ubX0gc2hvd1J1Ynk9e3Nob3dSdWJ5fSBzaG93VHJhbnNsYXRpb249e3Nob3dUcmFuc2xhdGlvbn0gZGVsYXk9e2kgKiA4MH0gLz5cbiAgICAgICAgKSl9XG5cbiAgICAgICAgey8qIFR5cGluZyAqL31cbiAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LWVuZCcsIGdhcDogOCB9fT5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICB3aWR0aDogMzAsIGhlaWdodDogMzAsIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0Y5RThFNCwgI0VDRTRGNCknLFxuICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgICAgIH19PuKcvzwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICd3aGl0ZScsIHBhZGRpbmc6ICcxMHB4IDE0cHgnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnNHB4IDE4cHggMThweCAxOHB4JyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA0LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgICAgIGJveFNoYWRvdzogJ3ZhcigtLXNoLXNtKScsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInR5cGluZy1kb3RcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0eXBpbmctZG90XCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidHlwaW5nLWRvdFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiA4IH19IC8+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIElucHV0IGJhciAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcGFkZGluZzogJzEwcHggMTRweCAxNHB4JyxcbiAgICAgICAgYmFja2dyb3VuZDogJ3JnYmEoMjU1LDI1MiwyNDgsMC45NiknLFxuICAgICAgICBiYWNrZHJvcEZpbHRlcjogJ2JsdXIoMTJweCknLFxuICAgICAgICBib3JkZXJUb3A6ICcxcHggc29saWQgcmdiYSgyMDAsMTkxLDIwOCwwLjMpJyxcbiAgICAgIH19PlxuICAgICAgICB7cmVjb3JkaW5nID8gKFxuICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogMTAsXG4gICAgICAgICAgICBwYWRkaW5nOiAnMTRweCAxNnB4JywgYm9yZGVyUmFkaXVzOiAndmFyKC0tci1waWxsKScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tcm9zZS1zb2Z0KScsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZ2FwOiAzLCBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLCBoZWlnaHQ6IDE4IH19PlxuICAgICAgICAgICAgICB7WzgsMTQsMTAsMTYsMTIsOCwxNF0ubWFwKChoLGkpID0+IChcbiAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHdpZHRoOiAzLCBoZWlnaHQ6IGgsIGJhY2tncm91bmQ6ICd2YXIoLS1yb3NlLWRlZXApJywgYm9yZGVyUmFkaXVzOiAyLFxuICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiBgdHlwaW5nIDFzICR7aSowLjF9cyBpbmZpbml0ZWAsXG4gICAgICAgICAgICAgICAgfX0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgZm9udFNpemU6ICd2YXIoLS1mcy1zbSknLCBjb2xvcjogJ3ZhcigtLXJvc2UtZGVlcCknLCBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgICAgICAgIOiBnuOBhOOBpuOBhOOBvuOBmS4uLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFJlY29yZGluZyhmYWxzZSl9IHN0eWxlPXt7XG4gICAgICAgICAgICAgIHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLXJvc2UtZGVlcCknLCBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJjaGVja1wiIHNpemU9ezE2fSAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEwIH19PlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlKCdmZWVkYmFjaycpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCAxNHB4JywgYm9yZGVyUmFkaXVzOiAndmFyKC0tci1waWxsKScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1zb2Z0KScsIGNvbG9yOiAndmFyKC0taW5rLTIpJyxcbiAgICAgICAgICAgICAgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGdhcDogNCxcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxMn0gLz4g57WC5LqGXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSB9fSAvPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRSZWNvcmRpbmcodHJ1ZSl9IGNsYXNzTmFtZT1cInB1bHNlLXJpbmdcIiBzdHlsZT17e1xuICAgICAgICAgICAgICB3aWR0aDogNjQsIGhlaWdodDogNjQsIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjOTg4OENGIDAlLCB2YXIoLS1wbHVtLWRlZXApIDEwMCUpJyxcbiAgICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgYm94U2hhZG93OiAnMCA4cHggMjBweCByZ2JhKDExMSw5MywxNzEsMC4zNSknLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIDxJY29uIG5hbWU9XCJtaWNcIiBzaXplPXsyNn0gc3Ryb2tlV2lkdGg9ezEuOH0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmbGV4OiAxIH19IC8+XG4gICAgICAgICAgICA8YnV0dG9uIHN0eWxlPXt7XG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcxMHB4IDE0cHgnLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLXBpbGwpJyxcbiAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLXNvZnQpJywgY29sb3I6ICd2YXIoLS1pbmstMiknLFxuICAgICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICDmloflrZflhaXliptcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBUb2dnbGUgPSAoeyBhY3RpdmUsIG9uQ2xpY2ssIGljb24sIGxhYmVsIH0pID0+IChcbiAgPGJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrfSBzdHlsZT17e1xuICAgIHBhZGRpbmc6ICc2cHggMTBweCcsIGJvcmRlclJhZGl1czogJ3ZhcigtLXItcGlsbCknLFxuICAgIGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgZm9udFdlaWdodDogNjAwLFxuICAgIGJhY2tncm91bmQ6IGFjdGl2ZSA/ICd2YXIoLS1wbHVtLXNvZnQpJyA6ICd0cmFuc3BhcmVudCcsXG4gICAgY29sb3I6IGFjdGl2ZSA/ICd2YXIoLS1wbHVtLWRlZXApJyA6ICd2YXIoLS1pbmstMyknLFxuICAgIGJvcmRlcjogJzFweCBzb2xpZCcsXG4gICAgYm9yZGVyQ29sb3I6IGFjdGl2ZSA/ICd2YXIoLS1wbHVtLXNvZnQpJyA6ICd2YXIoLS1pbmstNCknLFxuICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA0LCBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgfX0+XG4gICAgPEljb24gbmFtZT17aWNvbn0gc2l6ZT17MTJ9IC8+IHtsYWJlbH1cbiAgPC9idXR0b24+XG4pO1xuXG5jb25zdCBNZXNzYWdlID0gKHsgcm9sZSwgbmFtZSwga28sIHJ1YnksIGphLCBzY29yZSwgaGludCwgc2hvd1J1YnksIHNob3dUcmFuc2xhdGlvbiwgZGVsYXkgfSkgPT4ge1xuICBjb25zdCBpc0FJID0gcm9sZSA9PT0gJ2FpJztcblxuICBpZiAoaXNBSSkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZhZGUtdXBcIiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiA4LCBhbmltYXRpb25EZWxheTogYCR7ZGVsYXl9bXNgIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgd2lkdGg6IDMwLCBoZWlnaHQ6IDMwLCBib3JkZXJSYWRpdXM6ICc1MCUnLFxuICAgICAgICAgIGJhY2tncm91bmQ6ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjRjlFOEU0LCAjRUNFNEY0KScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIGZvbnRTaXplOiAxNCwgZmxleFNocmluazogMCxcbiAgICAgICAgfX0+4py/PC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSwgbWF4V2lkdGg6ICc4NSUnIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpbkJvdHRvbTogNCwgbWFyZ2luTGVmdDogNCB9fT57bmFtZX08L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnd2hpdGUnLCBwYWRkaW5nOiAnMTJweCAxNHB4JyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzRweCAxOHB4IDE4cHggMThweCcsXG4gICAgICAgICAgICBib3hTaGFkb3c6ICd2YXIoLS1zaC1zbSknLFxuICAgICAgICAgIH19PlxuICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0JywgZ2FwOiA4IH19PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZsZXg6IDEgfX0+XG4gICAgICAgICAgICAgICAgPGRpdiBsYW5nPVwia29cIiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLWJhc2UpJywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjQsIGNvbG9yOiAndmFyKC0taW5rLTEpJyB9fT5cbiAgICAgICAgICAgICAgICAgIHtrb31cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7c2hvd1J1YnkgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0tcm9zZS1kZWVwKScsIG1hcmdpblRvcDogNCwgbGluZUhlaWdodDogMS40IH19PlxuICAgICAgICAgICAgICAgICAgICB7cnVieX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAge3Nob3dUcmFuc2xhdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1pbmstMyknLCBtYXJnaW5Ub3A6IDQsIGxpbmVIZWlnaHQ6IDEuNSB9fT5cbiAgICAgICAgICAgICAgICAgICAge2phfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aWR0aDogMzAsIGhlaWdodDogMzAsIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLXBsdW0tc29mdCknLCBjb2xvcjogJ3ZhcigtLXBsdW0tZGVlcCknLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgICBmbGV4U2hyaW5rOiAwLFxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwicGxheVwiIHNpemU9ezEyfSAvPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtoaW50ICYmIChcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgbWFyZ2luVG9wOiA2LCBwYWRkaW5nOiAnNnB4IDEwcHgnLFxuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY3JlYW0pJywgYm9yZGVyUmFkaXVzOiAndmFyKC0tci1zbSknLFxuICAgICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0tZ29sZCknLCBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA0LCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgYWxpZ25TZWxmOiAnZmxleC1zdGFydCcsXG4gICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgPEljb24gbmFtZT1cImxpZ2h0YnVsYlwiIHNpemU9ezExfSAvPiB7aGludH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmYWRlLXVwXCIgc3R5bGU9e3sgZGlzcGxheTogJ2ZsZXgnLCBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJywgYW5pbWF0aW9uRGVsYXk6IGAke2RlbGF5fW1zYCB9fT5cbiAgICAgIDxkaXYgc3R5bGU9e3sgbWF4V2lkdGg6ICc4NSUnIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgYmFja2dyb3VuZDogJ2xpbmVhci1ncmFkaWVudCgxMzVkZWcsICNCNkE3RTAgMCUsIHZhcigtLXBsdW0pIDEwMCUpJyxcbiAgICAgICAgICBwYWRkaW5nOiAnMTJweCAxNHB4JyxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6ICcxOHB4IDRweCAxOHB4IDE4cHgnLFxuICAgICAgICAgIGJveFNoYWRvdzogJzAgNHB4IDEycHggcmdiYSgxMzksMTIyLDE5OSwwLjIpJyxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPGRpdiBsYW5nPVwia29cIiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLWJhc2UpJywgZm9udFdlaWdodDogNjAwLCBsaW5lSGVpZ2h0OiAxLjQsIGNvbG9yOiAnd2hpdGUnIH19PlxuICAgICAgICAgICAge2tvfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtzaG93UnVieSAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuODUpJywgbWFyZ2luVG9wOiA0IH19PlxuICAgICAgICAgICAgICB7cnVieX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgICAge3Nob3dUcmFuc2xhdGlvbiAmJiAoXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICdyZ2JhKDI1NSwyNTUsMjU1LDAuNzUpJywgbWFyZ2luVG9wOiA0IH19PlxuICAgICAgICAgICAgICB7amF9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3Njb3JlICYmIChcbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBtYXJnaW5Ub3A6IDYsIGZvbnRTaXplOiAndmFyKC0tZnMteHMpJywgY29sb3I6ICd2YXIoLS1zdWNjZXNzKScsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiA2MDAsIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgZ2FwOiA0LCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gICAgICAgICAgfX0+XG4gICAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxMX0gLz4g55m66Z+zIHtzY29yZX3ngrkgwrcg6Ieq54S244Gq55m66KmxXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbndpbmRvdy5DaGF0U2NyZWVuID0gQ2hhdFNjcmVlbjtc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</script><script>/* ─── screen-feedback.jsx ─── */
// FeedbackScreen.jsx — フィードバック画面
const FeedbackScreen = ({
  onNavigate,
  onBack
}) => {
  const total = 87;
  const breakdown = [{
    label: '流暢さ',
    score: 28,
    max: 30,
    color: 'var(--plum)'
  }, {
    label: '正確さ',
    score: 25,
    max: 30,
    color: 'var(--rose)'
  }, {
    label: '語彙',
    score: 17,
    max: 20,
    color: '#5B9477'
  }, {
    label: 'タスク達成',
    score: 17,
    max: 20,
    color: 'var(--gold)'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll-area",
    style: {
      background: 'var(--bg-app)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 14px 0',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    style: {
      width: 36,
      height: 36,
      borderRadius: '50%',
      background: 'var(--bg-soft)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 12px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 12px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--bg-mint)',
      color: '#5B9477',
      fontSize: 'var(--fs-xs)',
      fontWeight: 600,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 12
  }), " \u4F1A\u8A71\u5B8C\u4E86 \xB7 \u3088\u304F\u3067\u304D\u307E\u3057\u305F"), /*#__PURE__*/React.createElement(ScoreRing, {
    score: total
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 'var(--fs-xl)',
      fontWeight: 700
    }
  }, "\u7D20\u6575\u306A\u4F1A\u8A71\u3067\u3057\u305F \u273F"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-sm)',
      color: 'var(--ink-3)',
      marginTop: 4
    }
  }, "\u81EA\u7136\u306A\u3084\u308A\u53D6\u308A\u3067\u6CE8\u6587\u3092\u5B8C\u4E86\u3067\u304D\u307E\u3057\u305F"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '8px 14px',
      borderRadius: 'var(--r-pill)',
      background: 'var(--bg-cream)',
      color: 'var(--gold)',
      fontSize: 'var(--fs-sm)',
      fontWeight: 700
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 14
  }), " +45 XP \u7372\u5F97")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-md)',
      padding: '16px 18px',
      boxShadow: 'var(--sh-sm)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, breakdown.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 'var(--fs-sm)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600
    }
  }, b.label), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-3)',
      fontWeight: 600
    }
  }, b.score, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-4)'
    }
  }, "/", b.max))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: 'var(--bg-soft)',
      borderRadius: 999,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${b.score / b.max * 100}%`,
      height: '100%',
      background: b.color,
      borderRadius: 999,
      transition: 'width .8s ease'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-md)',
      fontWeight: 700,
      marginBottom: 10
    }
  }, "\u3082\u3063\u3068\u81EA\u7136\u306B"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      boxShadow: 'var(--sh-sm)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      marginBottom: 6
    }
  }, "\u3042\u306A\u305F\u306E\u767A\u8A71"), /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 600,
      color: 'var(--ink-1)'
    }
  }, "\uD070 \uC0AC\uC774\uC988\uB85C \uC8FC\uC138\uC694"), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '12px 0',
      padding: '8px 0',
      borderTop: '1px dashed var(--ink-4)',
      borderBottom: '1px dashed var(--ink-4)',
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      fontSize: 'var(--fs-xs)',
      color: 'var(--rose-deep)',
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkle",
    size: 12
  }), " \u30CD\u30A4\u30C6\u30A3\u30D6\u306F\u3053\u3046\u8A00\u3044\u307E\u3059"), /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 600,
      color: 'var(--plum-deep)'
    }
  }, "\uADF8\uB780\uB370 \uC0AC\uC774\uC988\uB85C \uBD80\uD0C1\uB4DC\uB824\uC694"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      marginTop: 4
    }
  }, "\u30B0\u30E9\u30F3\u30C7\u3067 \xB7 \u3088\u308A\u30AB\u30D5\u30A7\u6163\u308C\u3057\u305F\u8868\u73FE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 20px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-md)',
      fontWeight: 700,
      marginBottom: 10
    }
  }, "\u65B0\u3057\u3044\u5358\u8A9E"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    ko: '얼음',
    ruby: 'オルム',
    ja: '氷'
  }, {
    ko: '뜨거운',
    ruby: 'トゥゴウン',
    ja: '熱い'
  }, {
    ko: '한 잔',
    ruby: 'ハン ジャン',
    ja: '一杯'
  }].map((w, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-md)',
      padding: '12px 14px',
      boxShadow: 'var(--sh-sm)',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 'var(--fs-base)',
      fontWeight: 600
    }
  }, w.ko), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--rose-deep)',
      marginTop: 2
    }
  }, w.ruby, " \xB7 ", w.ja)), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--bg-soft)',
      color: 'var(--ink-2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: 'var(--plum-soft)',
      color: 'var(--plum-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play",
    size: 12
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 20px 100px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: () => onNavigate('home'),
    style: {
      width: '100%'
    }
  }, "\u30DB\u30FC\u30E0\u3078\u623B\u308B"), /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost",
    onClick: () => onNavigate('chat'),
    style: {
      width: '100%'
    }
  }, "\u3082\u3046\u4E00\u5EA6\u8A71\u3059")));
};
const ScoreRing = ({
  score
}) => {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 140,
      height: 140,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "140",
    height: "140",
    viewBox: "0 0 140 140",
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: r,
    fill: "none",
    stroke: "var(--bg-soft)",
    strokeWidth: "10"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: r,
    fill: "none",
    stroke: "url(#g)",
    strokeWidth: "10",
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke-dashoffset 1s ease'
    }
  }), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "g",
    x1: "0",
    y1: "0",
    x2: "1",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#D69AAE"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#8B7AC7"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      fontWeight: 700,
      lineHeight: 1,
      color: 'var(--ink-1)'
    }
  }, score), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--fs-xs)',
      color: 'var(--ink-3)',
      marginTop: 4
    }
  }, "/ 100")));
};
window.FeedbackScreen = FeedbackScreen;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGZWVkYmFja1NjcmVlbiIsIm9uTmF2aWdhdGUiLCJvbkJhY2siLCJ0b3RhbCIsImJyZWFrZG93biIsImxhYmVsIiwic2NvcmUiLCJtYXgiLCJjb2xvciIsIlJlYWN0IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTmFtZSIsInN0eWxlIiwiYmFja2dyb3VuZCIsInBhZGRpbmciLCJkaXNwbGF5IiwiYWxpZ25JdGVtcyIsIm9uQ2xpY2siLCJ3aWR0aCIsImhlaWdodCIsImJvcmRlclJhZGl1cyIsImp1c3RpZnlDb250ZW50IiwiSWNvbiIsIm5hbWUiLCJzaXplIiwidGV4dEFsaWduIiwiZ2FwIiwiZm9udFNpemUiLCJmb250V2VpZ2h0IiwibWFyZ2luQm90dG9tIiwiU2NvcmVSaW5nIiwibWFyZ2luVG9wIiwiYm94U2hhZG93IiwiZmxleERpcmVjdGlvbiIsIm1hcCIsImIiLCJrZXkiLCJvdmVyZmxvdyIsInRyYW5zaXRpb24iLCJsYW5nIiwibWFyZ2luIiwiYm9yZGVyVG9wIiwiYm9yZGVyQm90dG9tIiwia28iLCJydWJ5IiwiamEiLCJ3IiwiaSIsImZsZXgiLCJyIiwiYyIsIk1hdGgiLCJQSSIsIm9mZnNldCIsInBvc2l0aW9uIiwidmlld0JveCIsInRyYW5zZm9ybSIsImN4IiwiY3kiLCJmaWxsIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJzdHJva2VMaW5lY2FwIiwic3Ryb2tlRGFzaGFycmF5Iiwic3Ryb2tlRGFzaG9mZnNldCIsImlkIiwieDEiLCJ5MSIsIngyIiwieTIiLCJzdG9wQ29sb3IiLCJpbnNldCIsImxpbmVIZWlnaHQiLCJ3aW5kb3ciXSwic291cmNlcyI6WyJJbmxpbmUgQmFiZWwgc2NyaXB0ICg4KSJdLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qIOKUgOKUgOKUgCBzY3JlZW4tZmVlZGJhY2suanN4IOKUgOKUgOKUgCAqL1xuLy8gRmVlZGJhY2tTY3JlZW4uanN4IOKAlCDjg5XjgqPjg7zjg4njg5Djg4Pjgq/nlLvpnaJcbmNvbnN0IEZlZWRiYWNrU2NyZWVuID0gKHsgb25OYXZpZ2F0ZSwgb25CYWNrIH0pID0+IHtcbiAgY29uc3QgdG90YWwgPSA4NztcbiAgY29uc3QgYnJlYWtkb3duID0gW1xuICAgIHsgbGFiZWw6ICfmtYHmmqLjgZUnLCBzY29yZTogMjgsIG1heDogMzAsIGNvbG9yOiAndmFyKC0tcGx1bSknIH0sXG4gICAgeyBsYWJlbDogJ+ato+eiuuOBlScsIHNjb3JlOiAyNSwgbWF4OiAzMCwgY29sb3I6ICd2YXIoLS1yb3NlKScgfSxcbiAgICB7IGxhYmVsOiAn6Kqe5b2ZJywgc2NvcmU6IDE3LCBtYXg6IDIwLCBjb2xvcjogJyM1Qjk0NzcnIH0sXG4gICAgeyBsYWJlbDogJ+OCv+OCueOCr+mBlOaIkCcsIHNjb3JlOiAxNywgbWF4OiAyMCwgY29sb3I6ICd2YXIoLS1nb2xkKScgfSxcbiAgXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic2Nyb2xsLWFyZWFcIiBzdHlsZT17eyBiYWNrZ3JvdW5kOiAndmFyKC0tYmctYXBwKScgfX0+XG4gICAgICB7LyogSGVhZGVyICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnNnB4IDE0cHggMCcsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfX0+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17b25CYWNrfSBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiAzNiwgaGVpZ2h0OiAzNiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctc29mdCknLFxuICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgfX0+XG4gICAgICAgICAgPEljb24gbmFtZT1cImNsb3NlXCIgc2l6ZT17MTh9IC8+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBTY29yZSAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3sgcGFkZGluZzogJzIwcHggMjBweCAxMnB4JywgdGV4dEFsaWduOiAnY2VudGVyJyB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDYsXG4gICAgICAgICAgcGFkZGluZzogJzRweCAxMnB4JywgYm9yZGVyUmFkaXVzOiAndmFyKC0tci1waWxsKScsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLW1pbnQpJywgY29sb3I6ICcjNUI5NDc3JyxcbiAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICBtYXJnaW5Cb3R0b206IDE2LFxuICAgICAgICB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwiY2hlY2tcIiBzaXplPXsxMn0gLz4g5Lya6Kmx5a6M5LqGIMK3IOOCiOOBj+OBp+OBjeOBvuOBl+OBn1xuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8U2NvcmVSaW5nIHNjb3JlPXt0b3RhbH0gLz5cblxuICAgICAgICA8ZGl2IHN0eWxlPXt7IG1hcmdpblRvcDogMTYsIGZvbnRTaXplOiAndmFyKC0tZnMteGwpJywgZm9udFdlaWdodDogNzAwIH19PlxuICAgICAgICAgIOe0oOaVteOBquS8muipseOBp+OBl+OBnyDinL9cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1zbSknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpblRvcDogNCB9fT5cbiAgICAgICAgICDoh6rnhLbjgarjgoTjgorlj5bjgorjgafms6jmlofjgpLlrozkuobjgafjgY3jgb7jgZfjgZ9cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIG1hcmdpblRvcDogMTQsIGRpc3BsYXk6ICdpbmxpbmUtZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDYsXG4gICAgICAgICAgcGFkZGluZzogJzhweCAxNHB4JywgYm9yZGVyUmFkaXVzOiAndmFyKC0tci1waWxsKScsXG4gICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLWJnLWNyZWFtKScsIGNvbG9yOiAndmFyKC0tZ29sZCknLFxuICAgICAgICAgIGZvbnRTaXplOiAndmFyKC0tZnMtc20pJywgZm9udFdlaWdodDogNzAwLFxuICAgICAgICB9fT5cbiAgICAgICAgICA8SWNvbiBuYW1lPVwic3BhcmtsZVwiIHNpemU9ezE0fSAvPiArNDUgWFAg542y5b6XXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBCcmVha2Rvd24gKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcxNnB4IDIwcHggMCcgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgICAgICAgcGFkZGluZzogJzE2cHggMThweCcsIGJveFNoYWRvdzogJ3ZhcigtLXNoLXNtKScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgZ2FwOiAxMixcbiAgICAgICAgfX0+XG4gICAgICAgICAge2JyZWFrZG93bi5tYXAoYiA9PiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17Yi5sYWJlbH0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICd2YXIoLS1mcy1zbSknLCBtYXJnaW5Cb3R0b206IDYsXG4gICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt7IGZvbnRXZWlnaHQ6IDYwMCB9fT57Yi5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gc3R5bGU9e3sgY29sb3I6ICd2YXIoLS1pbmstMyknLCBmb250V2VpZ2h0OiA2MDAgfX0+XG4gICAgICAgICAgICAgICAgICB7Yi5zY29yZX08c3BhbiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0taW5rLTQpJyB9fT4ve2IubWF4fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogNiwgYmFja2dyb3VuZDogJ3ZhcigtLWJnLXNvZnQpJywgYm9yZGVyUmFkaXVzOiA5OTksIG92ZXJmbG93OiAnaGlkZGVuJyB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICB3aWR0aDogYCR7Yi5zY29yZSAvIGIubWF4ICogMTAwfSVgLCBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGIuY29sb3IsIGJvcmRlclJhZGl1czogOTk5LFxuICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3dpZHRoIC44cyBlYXNlJyxcbiAgICAgICAgICAgICAgICB9fSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSW1wcm92ZW1lbnQgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcyMHB4IDIwcHggMCcgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1tZCknLCBmb250V2VpZ2h0OiA3MDAsIG1hcmdpbkJvdHRvbTogMTAgfX0+44KC44Gj44Go6Ieq54S244GrPC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgICAgICAgcGFkZGluZzogJzE0cHggMTZweCcsIGJveFNoYWRvdzogJ3ZhcigtLXNoLXNtKScsXG4gICAgICAgIH19PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpbkJvdHRvbTogNiB9fT5cbiAgICAgICAgICAgIOOBguOBquOBn+OBrueZuuipsVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgbGFuZz1cImtvXCIgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1iYXNlKScsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6ICd2YXIoLS1pbmstMSknIH19PlxuICAgICAgICAgICAg7YGwIOyCrOydtOymiOuhnCDso7zshLjsmpRcbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgICAgICBtYXJnaW46ICcxMnB4IDAnLCBwYWRkaW5nOiAnOHB4IDAnLFxuICAgICAgICAgICAgYm9yZGVyVG9wOiAnMXB4IGRhc2hlZCB2YXIoLS1pbmstNCknLCBib3JkZXJCb3R0b206ICcxcHggZGFzaGVkIHZhcigtLWluay00KScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGdhcDogOCwgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgICAgICBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0tcm9zZS1kZWVwKScsIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICB9fT5cbiAgICAgICAgICAgIDxJY29uIG5hbWU9XCJzcGFya2xlXCIgc2l6ZT17MTJ9IC8+IOODjeOCpOODhuOCo+ODluOBr+OBk+OBhuiogOOBhOOBvuOBmVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgbGFuZz1cImtvXCIgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy1iYXNlKScsIGZvbnRXZWlnaHQ6IDYwMCwgY29sb3I6ICd2YXIoLS1wbHVtLWRlZXApJyB9fT5cbiAgICAgICAgICAgIOq3uOuegOuNsCDsgqzsnbTspojroZwg67aA7YOB65Oc66Ck7JqUXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0taW5rLTMpJywgbWFyZ2luVG9wOiA0IH19PlxuICAgICAgICAgICAg44Kw44Op44Oz44OH44GnIMK3IOOCiOOCiuOCq+ODleOCp+aFo+OCjOOBl+OBn+ihqOePvlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTmV3IHdvcmRzICovfVxuICAgICAgPGRpdiBzdHlsZT17eyBwYWRkaW5nOiAnMjBweCAyMHB4IDAnIH19PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtbWQpJywgZm9udFdlaWdodDogNzAwLCBtYXJnaW5Cb3R0b206IDEwIH19PuaWsOOBl+OBhOWNmOiqnjwvZGl2PlxuICAgICAgICA8ZGl2IHN0eWxlPXt7IGRpc3BsYXk6ICdmbGV4JywgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsIGdhcDogOCB9fT5cbiAgICAgICAgICB7W1xuICAgICAgICAgICAgeyBrbzogJ+yWvOydjCcsIHJ1Ynk6ICfjgqrjg6vjg6AnLCBqYTogJ+awtycgfSxcbiAgICAgICAgICAgIHsga286ICfrnKjqsbDsmrQnLCBydWJ5OiAn44OI44Kl44K044Km44OzJywgamE6ICfnhrHjgYQnIH0sXG4gICAgICAgICAgICB7IGtvOiAn7ZWcIOyelCcsIHJ1Ynk6ICfjg4/jg7Mg44K444Oj44OzJywgamE6ICfkuIDmna8nIH0sXG4gICAgICAgICAgXS5tYXAoKHcsIGkpID0+IChcbiAgICAgICAgICAgIDxkaXYga2V5PXtpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctY2FyZCknLCBib3JkZXJSYWRpdXM6ICd2YXIoLS1yLW1kKScsXG4gICAgICAgICAgICAgIHBhZGRpbmc6ICcxMnB4IDE0cHgnLCBib3hTaGFkb3c6ICd2YXIoLS1zaC1zbSknLFxuICAgICAgICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBnYXA6IDEyLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZmxleDogMSB9fT5cbiAgICAgICAgICAgICAgICA8ZGl2IGxhbmc9XCJrb1wiIHN0eWxlPXt7IGZvbnRTaXplOiAndmFyKC0tZnMtYmFzZSknLCBmb250V2VpZ2h0OiA2MDAgfX0+e3cua299PC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBmb250U2l6ZTogJ3ZhcigtLWZzLXhzKScsIGNvbG9yOiAndmFyKC0tcm9zZS1kZWVwKScsIG1hcmdpblRvcDogMiB9fT5cbiAgICAgICAgICAgICAgICAgIHt3LnJ1Ynl9IMK3IHt3LmphfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT17e1xuICAgICAgICAgICAgICAgIHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiAnNTAlJyxcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAndmFyKC0tYmctc29mdCknLCBjb2xvcjogJ3ZhcigtLWluay0yKScsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgICAgICB9fT5cbiAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPVwiYm9va21hcmtcIiBzaXplPXsxNH0gLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b24gc3R5bGU9e3tcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIsIGhlaWdodDogMzIsIGJvcmRlclJhZGl1czogJzUwJScsXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJ3ZhcigtLXBsdW0tc29mdCknLCBjb2xvcjogJ3ZhcigtLXBsdW0tZGVlcCknLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicsIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgPEljb24gbmFtZT1cInBsYXlcIiBzaXplPXsxMn0gLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIENUQXMgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7IHBhZGRpbmc6ICcyNHB4IDIwcHggMTAwcHgnLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLCBnYXA6IDEwIH19PlxuICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0bi1wcmltYXJ5XCIgb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZSgnaG9tZScpfSBzdHlsZT17eyB3aWR0aDogJzEwMCUnIH19PlxuICAgICAgICAgIOODm+ODvOODoOOBuOaIu+OCi1xuICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4tZ2hvc3RcIiBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlKCdjaGF0Jyl9IHN0eWxlPXt7IHdpZHRoOiAnMTAwJScgfX0+XG4gICAgICAgICAg44KC44GG5LiA5bqm6Kmx44GZXG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5jb25zdCBTY29yZVJpbmcgPSAoeyBzY29yZSB9KSA9PiB7XG4gIGNvbnN0IHIgPSA1NjtcbiAgY29uc3QgYyA9IDIgKiBNYXRoLlBJICogcjtcbiAgY29uc3Qgb2Zmc2V0ID0gYyAqICgxIC0gc2NvcmUgLyAxMDApO1xuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3sgcG9zaXRpb246ICdyZWxhdGl2ZScsIHdpZHRoOiAxNDAsIGhlaWdodDogMTQwLCBtYXJnaW46ICcwIGF1dG8nIH19PlxuICAgICAgPHN2ZyB3aWR0aD1cIjE0MFwiIGhlaWdodD1cIjE0MFwiIHZpZXdCb3g9XCIwIDAgMTQwIDE0MFwiIHN0eWxlPXt7IHRyYW5zZm9ybTogJ3JvdGF0ZSgtOTBkZWcpJyB9fT5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjcwXCIgY3k9XCI3MFwiIHI9e3J9IGZpbGw9XCJub25lXCIgc3Ryb2tlPVwidmFyKC0tYmctc29mdClcIiBzdHJva2VXaWR0aD1cIjEwXCIgLz5cbiAgICAgICAgPGNpcmNsZSBjeD1cIjcwXCIgY3k9XCI3MFwiIHI9e3J9IGZpbGw9XCJub25lXCIgc3Ryb2tlPVwidXJsKCNnKVwiIHN0cm9rZVdpZHRoPVwiMTBcIlxuICAgICAgICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiIHN0cm9rZURhc2hhcnJheT17Y30gc3Ryb2tlRGFzaG9mZnNldD17b2Zmc2V0fVxuICAgICAgICAgIHN0eWxlPXt7IHRyYW5zaXRpb246ICdzdHJva2UtZGFzaG9mZnNldCAxcyBlYXNlJyB9fSAvPlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9XCJnXCIgeDE9XCIwXCIgeTE9XCIwXCIgeDI9XCIxXCIgeTI9XCIxXCI+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIwJVwiIHN0b3BDb2xvcj1cIiNENjlBQUVcIi8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiIzhCN0FDN1wiLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuICAgICAgICA8L2RlZnM+XG4gICAgICA8L3N2Zz5cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsIGluc2V0OiAwLFxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgfX0+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDM4LCBmb250V2VpZ2h0OiA3MDAsIGxpbmVIZWlnaHQ6IDEsIGNvbG9yOiAndmFyKC0taW5rLTEpJyB9fT57c2NvcmV9PC9kaXY+XG4gICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6ICd2YXIoLS1mcy14cyknLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpblRvcDogNCB9fT4vIDEwMDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG53aW5kb3cuRmVlZGJhY2tTY3JlZW4gPSBGZWVkYmFja1NjcmVlbjtcbiAgIl0sIm1hcHBpbmdzIjoiQUFDQTtBQUNBO0FBQ0EsTUFBTUEsY0FBYyxHQUFHQSxDQUFDO0VBQUVDLFVBQVU7RUFBRUM7QUFBTyxDQUFDLEtBQUs7RUFDakQsTUFBTUMsS0FBSyxHQUFHLEVBQUU7RUFDaEIsTUFBTUMsU0FBUyxHQUFHLENBQ2hCO0lBQUVDLEtBQUssRUFBRSxLQUFLO0lBQUVDLEtBQUssRUFBRSxFQUFFO0lBQUVDLEdBQUcsRUFBRSxFQUFFO0lBQUVDLEtBQUssRUFBRTtFQUFjLENBQUMsRUFDMUQ7SUFBRUgsS0FBSyxFQUFFLEtBQUs7SUFBRUMsS0FBSyxFQUFFLEVBQUU7SUFBRUMsR0FBRyxFQUFFLEVBQUU7SUFBRUMsS0FBSyxFQUFFO0VBQWMsQ0FBQyxFQUMxRDtJQUFFSCxLQUFLLEVBQUUsSUFBSTtJQUFFQyxLQUFLLEVBQUUsRUFBRTtJQUFFQyxHQUFHLEVBQUUsRUFBRTtJQUFFQyxL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QUk7SUFBQ0MsRUFBRSxFQUFDLElBQUk7SUFBQ1QsQ0FBQyxFQUFFQSxDQUFFO0lBQUNVLElBQUksRUFBQyxNQUFNO0lBQUNDLE1BQU0sRUFBQyxTQUFTO0lBQUNDLFdBQVcsRUFBQyxJQUFJO0lBQ3pFQyxhQUFhLEVBQUMsT0FBTztJQUFDQyxlQUFlLEVBQUViLENBQUU7SUFBQ2MsZ0JBQWdCLEVBQUVYLE1BQU87SUFDbkV6QyxLQUFLLEVBQUU7TUFBRTBCLFVBQVUsRUFBRTtJQUE0QjtFQUFFLENBQUUsQ0FBQyxlQUN4RDdCLEtBQUEsQ0FBQUMsYUFBQSw0QkFDRUQsS0FBQSxDQUFBQyxhQUFBO0lBQWdCdUQsRUFBRSxFQUFDLEdBQUc7SUFBQ0MsRUFBRSxFQUFDLEdBQUc7SUFBQ0MsRUFBRSxFQUFDLEdBQUc7SUFBQ0MsRUFBRSxFQUFDLEdBQUc7SUFBQ0MsRUFBRSxFQUFDO0VBQUcsZ0JBQ2hENUQsS0FBQSxDQUFBQyxhQUFBO0lBQU0yQyxNQUFNLEVBQUMsSUFBSTtJQUFDaUIsU0FBUyxFQUFDO0VBQVMsQ0FBQyxDQUFDLGVBQ3ZDN0QsS0FBQSxDQUFBQyxhQUFBO0lBQU0yQyxNQUFNLEVBQUMsTUFBTTtJQUFDaUIsU0FBUyxFQUFDO0VBQVMsQ0FBQyxDQUMxQixDQUNaLENBQ0gsQ0FBQyxlQUNON0QsS0FBQSxDQUFBQyxhQUFBO0lBQUtFLEtBQUssRUFBRTtNQUNWMEMsUUFBUSxFQUFFLFVBQVU7TUFBRWlCLEtBQUssRUFBRSxDQUFDO01BQzlCeEQsT0FBTyxFQUFFLE1BQU07TUFBRWtCLGFBQWEsRUFBRSxRQUFRO01BQ3hDakIsVUFBVSxFQUFFLFFBQVE7TUFBRUssY0FBYyxFQUFFO0lBQ3hDO0VBQUUsZ0JBQ0FaLEtBQUEsQ0FBQUMsYUFBQTtJQUFLRSxLQUFLLEVBQUU7TUFBRWUsUUFBUSxFQUFFLEVBQUU7TUFBRUMsVUFBVSxFQUFFLEdBQUc7TUFBRTRDLFVBQVUsRUFBRSxDQUFDO01BQUVoRSxLQUFLLEVBQUU7SUFBZTtFQUFFLEdBQUVGLEtBQVcsQ0FBQyxlQUNsR0csS0FBQSxDQUFBQyxhQUFBO0lBQUtFLEtBQUssRUFBRTtNQUFFZSxRQUFRLEVBQUUsY0FBYztNQUFFbkIsS0FBSyxFQUFFLGNBQWM7TUFBRXVCLFNBQVMsRUFBRTtJQUFFO0VBQUUsR0FBQyxPQUFVLENBQ3RGLENBQ0YsQ0FBQztBQUVWLENBQUM7QUFFRDBDLE1BQU0sQ0FBQ3pFLGNBQWMsR0FBR0EsY0FBYyIsImlnbm9yZUxpc3QiOltdfQ==</script><script>/* ─── app.jsx ─── */
// app.jsx — main shell wiring screens together with screen transitions
const {
  useState,
  useEffect
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontSize": "standard"
} /*EDITMODE-END*/;
const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState('forward');
  useEffect(() => {
    document.documentElement.dataset.fontsize = tweaks.fontSize;
  }, [tweaks.fontSize]);
  const navigate = next => {
    if (next === screen) return;
    setDirection('forward');
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setHistory(h => [...h, next]);
      setTransitioning(false);
    }, 180);
  };
  const back = () => {
    setDirection('back');
    setTransitioning(true);
    setTimeout(() => {
      setHistory(h => {
        const newH = h.length > 1 ? h.slice(0, -1) : ['home'];
        setScreen(newH[newH.length - 1]);
        return newH;
      });
      setTransitioning(false);
    }, 180);
  };
  const goHome = () => {
    setDirection('back');
    setTransitioning(true);
    setTimeout(() => {
      setScreen('home');
      setHistory(['home']);
      setTransitioning(false);
    }, 180);
  };
  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return /*#__PURE__*/React.createElement(HomeScreen, {
          onNavigate: navigate
        });
      case 'scenarios':
        return /*#__PURE__*/React.createElement(ScenariosScreen, {
          onNavigate: navigate,
          onBack: back
        });
      case 'preview':
        return /*#__PURE__*/React.createElement(PreviewScreen, {
          onNavigate: navigate,
          onBack: back
        });
      case 'chat':
        return /*#__PURE__*/React.createElement(ChatScreen, {
          onNavigate: navigate,
          onBack: back
        });
      case 'feedback':
        return /*#__PURE__*/React.createElement(FeedbackScreen, {
          onNavigate: s => s === 'home' ? goHome() : navigate(s),
          onBack: back
        });
      default:
        return /*#__PURE__*/React.createElement(HomeScreen, {
          onNavigate: navigate
        });
    }
  };
  const tabItems = [{
    id: 'home',
    icon: 'home',
    label: 'ホーム'
  }, {
    id: 'scenarios',
    icon: 'book',
    label: '場面'
  }, {
    id: 'chat',
    icon: 'chat',
    label: '会話'
  }, {
    id: 'progress',
    icon: 'chart',
    label: '記録'
  }, {
    id: 'profile',
    icon: 'user',
    label: 'マイ'
  }];
  const showTabBar = ['home', 'scenarios'].includes(screen);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'var(--bg-canvas)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundImage: `
        radial-gradient(circle at 12% 18%, rgba(217,154,174,0.10) 0%, transparent 38%),
        radial-gradient(circle at 88% 82%, rgba(139,122,199,0.10) 0%, transparent 38%),
        radial-gradient(circle at 78% 12%, rgba(200,163,107,0.08) 0%, transparent 32%)
      `
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 24,
      left: 24,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: "'Noto Sans KR', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 32,
      height: 32,
      borderRadius: 10,
      background: 'linear-gradient(135deg, #D69AAE 0%, #8B7AC7 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 700,
      fontSize: 14
    },
    lang: "ko"
  }, "\uB9D0"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    lang: "ko",
    style: {
      fontSize: 16,
      fontWeight: 700,
      lineHeight: 1,
      color: 'var(--ink-1)'
    }
  }, "\uB9D0\uD574\uBD10"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: 'var(--ink-3)',
      marginTop: 2
    }
  }, "\u30DE\u30EC\u30D0"))), /*#__PURE__*/React.createElement(PhoneShell, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      opacity: transitioning ? 0 : 1,
      transform: transitioning ? direction === 'forward' ? 'translateX(20px)' : 'translateX(-20px)' : 'translateX(0)',
      transition: 'opacity .18s ease, transform .18s ease',
      minHeight: 0
    }
  }, renderScreen(), showTabBar && /*#__PURE__*/React.createElement("div", {
    className: "tab-bar",
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0
    }
  }, tabItems.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    className: `tab-item ${screen === t.id ? 'active' : ''}`,
    onClick: () => {
      if (t.id === 'home') goHome();else if (t.id === 'scenarios') navigate('scenarios');
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "tab-icon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: t.icon,
    size: 22,
    strokeWidth: screen === t.id ? 2 : 1.6
  })), /*#__PURE__*/React.createElement("div", null, t.label)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 12,
      color: 'var(--ink-3)'
    }
  }, [{
    id: 'home',
    label: 'ホーム'
  }, {
    id: 'scenarios',
    label: '場面選択'
  }, {
    id: 'preview',
    label: '場面プレビュー'
  }, {
    id: 'chat',
    label: '会話'
  }, {
    id: 'feedback',
    label: 'フィードバック'
  }].map((s, i, arr) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.id
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => navigate(s.id),
    style: {
      padding: '6px 12px',
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
      background: screen === s.id ? 'var(--ink-1)' : 'rgba(255,255,255,0.7)',
      color: screen === s.id ? 'white' : 'var(--ink-2)',
      boxShadow: screen === s.id ? '0 4px 12px rgba(42,34,48,0.2)' : 'var(--sh-sm)'
    }
  }, i + 1, ". ", s.label), i < arr.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--ink-4)'
    }
  }, "\u2192")))), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    title: "\u8868\u793A\u8A2D\u5B9A"
  }, /*#__PURE__*/React.createElement(TweakRadio, {
    label: "\u6587\u5B57\u30B5\u30A4\u30BA",
    value: tweaks.fontSize,
    options: [{
      value: 'standard',
      label: '標準'
    }, {
      value: 'large',
      label: '大'
    }],
    onChange: v => setTweak('fontSize', v)
  }))));
};
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlJlYWN0IiwiVFdFQUtfREVGQVVMVFMiLCJBcHAiLCJ0d2Vha3MiLCJzZXRUd2VhayIsInVzZVR3ZWFrcyIsInNjcmVlbiIsInNldFNjcmVlbiIsImhpc3RvcnkiLCJzZXRIaXN0b3J5IiwidHJhbnNpdGlvbmluZyIsInNldFRyYW5zaXRpb25pbmciLCJkaXJlY3Rpb24iLCJzZXREaXJlY3Rpb24iLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImRhdGFzZXQiLCJmb250c2l6ZSIsImZvbnRTaXplIiwibmF2aWdhdGUiLCJuZXh0Iiwic2V0VGltZW91dCIsImgiLCJiYWNrIiwibmV3SCIsImxlbmd0aCIsInNsaWNlIiwiZ29Ib21lIiwicmVuZGVyU2NyZWVuIiwiY3JlYXRlRWxlbWVudCIsIkhvbWVTY3JlZW4iLCJvbk5hdmlnYXRlIiwiU2NlbmFyaW9zU2NyZWVuIiwib25CYWNrIiwiUHJldmlld1NjcmVlbiIsIkNoYXRTY3JlZW4iLCJGZWVkYmFja1NjcmVlbiIsInMiLCJ0YWJJdGVtcyIsImlkIiwiaWNvbiIsImxhYmVsIiwic2hvd1RhYkJhciIsImluY2x1ZGVzIiwic3R5bGUiLCJtaW5IZWlnaHQiLCJiYWNrZ3JvdW5kIiwiZGlzcGxheSIsImZsZXhEaXJlY3Rpb24iLCJhbGlnbkl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJwYWRkaW5nIiwiYmFja2dyb3VuZEltYWdlIiwicG9zaXRpb24iLCJ0b3AiLCJsZWZ0IiwiZ2FwIiwiZm9udEZhbWlseSIsIndpZHRoIiwiaGVpZ2h0IiwiYm9yZGVyUmFkaXVzIiwiY29sb3IiLCJmb250V2VpZ2h0IiwibGFuZyIsImxpbmVIZWlnaHQiLCJtYXJnaW5Ub3AiLCJQaG9uZVNoZWxsIiwiZmxleCIsIm9wYWNpdHkiLCJ0cmFuc2Zvcm0iLCJ0cmFuc2l0aW9uIiwiY2xhc3NOYW1lIiwiYm90dG9tIiwicmlnaHQiLCJtYXAiLCJ0Iiwia2V5Iiwib25DbGljayIsIkljb24iLCJuYW1lIiwic2l6ZSIsInN0cm9rZVdpZHRoIiwiZmxleFdyYXAiLCJpIiwiYXJyIiwiRnJhZ21lbnQiLCJib3hTaGFkb3ciLCJUd2Vha3NQYW5lbCIsIlR3ZWFrU2VjdGlvbiIsInRpdGxlIiwiVHdlYWtSYWRpbyIsInZhbHVlIiwib3B0aW9ucyIsIm9uQ2hhbmdlIiwidiIsIlJlYWN0RE9NIiwiY3JlYXRlUm9vdCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIl0sInNvdXJjZXMiOlsiSW5saW5lIEJhYmVsIHNjcmlwdCAoOSkiXSwic291cmNlc0NvbnRlbnQiOlsiXG4vKiDilIDilIDilIAgYXBwLmpzeCDilIDilIDilIAgKi9cbi8vIGFwcC5qc3gg4oCUIG1haW4gc2hlbGwgd2lyaW5nIHNjcmVlbnMgdG9nZXRoZXIgd2l0aCBzY3JlZW4gdHJhbnNpdGlvbnNcbmNvbnN0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9ID0gUmVhY3Q7XG5cbmNvbnN0IFRXRUFLX0RFRkFVTFRTID0gLypFRElUTU9ERS1CRUdJTiove1xuICBcImZvbnRTaXplXCI6IFwic3RhbmRhcmRcIlxufS8qRURJVE1PREUtRU5EKi87XG5cbmNvbnN0IEFwcCA9ICgpID0+IHtcbiAgY29uc3QgW3R3ZWFrcywgc2V0VHdlYWtdID0gdXNlVHdlYWtzKFRXRUFLX0RFRkFVTFRTKTtcbiAgY29uc3QgW3NjcmVlbiwgc2V0U2NyZWVuXSA9IHVzZVN0YXRlKCdob21lJyk7XG4gIGNvbnN0IFtoaXN0b3J5LCBzZXRIaXN0b3J5XSA9IHVzZVN0YXRlKFsnaG9tZSddKTtcbiAgY29uc3QgW3RyYW5zaXRpb25pbmcsIHNldFRyYW5zaXRpb25pbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbZGlyZWN0aW9uLCBzZXREaXJlY3Rpb25dID0gdXNlU3RhdGUoJ2ZvcndhcmQnKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5kYXRhc2V0LmZvbnRzaXplID0gdHdlYWtzLmZvbnRTaXplO1xuICB9LCBbdHdlYWtzLmZvbnRTaXplXSk7XG5cbiAgY29uc3QgbmF2aWdhdGUgPSAobmV4dCkgPT4ge1xuICAgIGlmIChuZXh0ID09PSBzY3JlZW4pIHJldHVybjtcbiAgICBzZXREaXJlY3Rpb24oJ2ZvcndhcmQnKTtcbiAgICBzZXRUcmFuc2l0aW9uaW5nKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U2NyZWVuKG5leHQpO1xuICAgICAgc2V0SGlzdG9yeShoID0+IFsuLi5oLCBuZXh0XSk7XG4gICAgICBzZXRUcmFuc2l0aW9uaW5nKGZhbHNlKTtcbiAgICB9LCAxODApO1xuICB9O1xuXG4gIGNvbnN0IGJhY2sgPSAoKSA9PiB7XG4gICAgc2V0RGlyZWN0aW9uKCdiYWNrJyk7XG4gICAgc2V0VHJhbnNpdGlvbmluZyh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEhpc3RvcnkoaCA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0ggPSBoLmxlbmd0aCA+IDEgPyBoLnNsaWNlKDAsIC0xKSA6IFsnaG9tZSddO1xuICAgICAgICBzZXRTY3JlZW4obmV3SFtuZXdILmxlbmd0aCAtIDFdKTtcbiAgICAgICAgcmV0dXJuIG5ld0g7XG4gICAgICB9KTtcbiAgICAgIHNldFRyYW5zaXRpb25pbmcoZmFsc2UpO1xuICAgIH0sIDE4MCk7XG4gIH07XG5cbiAgY29uc3QgZ29Ib21lID0gKCkgPT4ge1xuICAgIHNldERpcmVjdGlvbignYmFjaycpO1xuICAgIHNldFRyYW5zaXRpb25pbmcodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRTY3JlZW4oJ2hvbWUnKTtcbiAgICAgIHNldEhpc3RvcnkoWydob21lJ10pO1xuICAgICAgc2V0VHJhbnNpdGlvbmluZyhmYWxzZSk7XG4gICAgfSwgMTgwKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJTY3JlZW4gPSAoKSA9PiB7XG4gICAgc3dpdGNoIChzY3JlZW4pIHtcbiAgICAgIGNhc2UgJ2hvbWUnOiByZXR1cm4gPEhvbWVTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGV9IC8+O1xuICAgICAgY2FzZSAnc2NlbmFyaW9zJzogcmV0dXJuIDxTY2VuYXJpb3NTY3JlZW4gb25OYXZpZ2F0ZT17bmF2aWdhdGV9IG9uQmFjaz17YmFja30gLz47XG4gICAgICBjYXNlICdwcmV2aWV3JzogcmV0dXJuIDxQcmV2aWV3U2NyZWVuIG9uTmF2aWdhdGU9e25hdmlnYXRlfSBvbkJhY2s9e2JhY2t9IC8+O1xuICAgICAgY2FzZSAnY2hhdCc6IHJldHVybiA8Q2hhdFNjcmVlbiBvbk5hdmlnYXRlPXtuYXZpZ2F0ZX0gb25CYWNrPXtiYWNrfSAvPjtcbiAgICAgIGNhc2UgJ2ZlZWRiYWNrJzogcmV0dXJuIDxGZWVkYmFja1NjcmVlbiBvbk5hdmlnYXRlPXsocykgPT4gcyA9PT0gJ2hvbWUnID8gZ29Ib21lKCkgOiBuYXZpZ2F0ZShzKX0gb25CYWNrPXtiYWNrfSAvPjtcbiAgICAgIGRlZmF1bHQ6IHJldHVybiA8SG9tZVNjcmVlbiBvbk5hdmlnYXRlPXtuYXZpZ2F0ZX0gLz47XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHRhYkl0ZW1zID0gW1xuICAgIHsgaWQ6ICdob21lJywgaWNvbjogJ2hvbWUnLCBsYWJlbDogJ+ODm+ODvOODoCcgfSxcbiAgICB7IGlkOiAnc2NlbmFyaW9zJywgaWNvbjogJ2Jvb2snLCBsYWJlbDogJ+WgtOmdoicgfSxcbiAgICB7IGlkOiAnY2hhdCcsIGljb246ICdjaGF0JywgbGFiZWw6ICfkvJroqbEnIH0sXG4gICAgeyBpZDogJ3Byb2dyZXNzJywgaWNvbjogJ2NoYXJ0JywgbGFiZWw6ICfoqJjpjLInIH0sXG4gICAgeyBpZDogJ3Byb2ZpbGUnLCBpY29uOiAndXNlcicsIGxhYmVsOiAn44Oe44KkJyB9LFxuICBdO1xuXG4gIGNvbnN0IHNob3dUYWJCYXIgPSBbJ2hvbWUnLCAnc2NlbmFyaW9zJ10uaW5jbHVkZXMoc2NyZWVuKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgIG1pbkhlaWdodDogJzEwMHZoJyxcbiAgICAgIGJhY2tncm91bmQ6ICd2YXIoLS1iZy1jYW52YXMpJyxcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICBwYWRkaW5nOiAnNDBweCAyMHB4JyxcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYFxuICAgICAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IDEyJSAxOCUsIHJnYmEoMjE3LDE1NCwxNzQsMC4xMCkgMCUsIHRyYW5zcGFyZW50IDM4JSksXG4gICAgICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgODglIDgyJSwgcmdiYSgxMzksMTIyLDE5OSwwLjEwKSAwJSwgdHJhbnNwYXJlbnQgMzglKSxcbiAgICAgICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCA3OCUgMTIlLCByZ2JhKDIwMCwxNjMsMTA3LDAuMDgpIDAlLCB0cmFuc3BhcmVudCAzMiUpXG4gICAgICBgLFxuICAgIH19PlxuICAgICAgey8qIEJyYW5kIG1hcmsgKi99XG4gICAgICA8ZGl2IHN0eWxlPXt7XG4gICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLCB0b3A6IDI0LCBsZWZ0OiAyNCxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgZ2FwOiA4LFxuICAgICAgICBmb250RmFtaWx5OiBcIidOb3RvIFNhbnMgS1InLCBzYW5zLXNlcmlmXCIsXG4gICAgICB9fT5cbiAgICAgICAgPGRpdiBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiAzMiwgaGVpZ2h0OiAzMiwgYm9yZGVyUmFkaXVzOiAxMCxcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAnbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0Q2OUFBRSAwJSwgIzhCN0FDNyAxMDAlKScsXG4gICAgICAgICAgZGlzcGxheTogJ2ZsZXgnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgICAgIGNvbG9yOiAnd2hpdGUnLCBmb250V2VpZ2h0OiA3MDAsIGZvbnRTaXplOiAxNCxcbiAgICAgICAgfX0gbGFuZz1cImtvXCI+66eQPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGRpdiBsYW5nPVwia29cIiBzdHlsZT17eyBmb250U2l6ZTogMTYsIGZvbnRXZWlnaHQ6IDcwMCwgbGluZUhlaWdodDogMSwgY29sb3I6ICd2YXIoLS1pbmstMSknIH19PuunkO2VtOu0kDwvZGl2PlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgZm9udFNpemU6IDExLCBjb2xvcjogJ3ZhcigtLWluay0zKScsIG1hcmdpblRvcDogMiB9fT7jg57jg6zjg5A8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPFBob25lU2hlbGw+XG4gICAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgICBmbGV4OiAxLCBkaXNwbGF5OiAnZmxleCcsIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgICAgICAgIG9wYWNpdHk6IHRyYW5zaXRpb25pbmcgPyAwIDogMSxcbiAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zaXRpb25pbmdcbiAgICAgICAgICAgID8gKGRpcmVjdGlvbiA9PT0gJ2ZvcndhcmQnID8gJ3RyYW5zbGF0ZVgoMjBweCknIDogJ3RyYW5zbGF0ZVgoLTIwcHgpJylcbiAgICAgICAgICAgIDogJ3RyYW5zbGF0ZVgoMCknLFxuICAgICAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IC4xOHMgZWFzZSwgdHJhbnNmb3JtIC4xOHMgZWFzZScsXG4gICAgICAgICAgbWluSGVpZ2h0OiAwLFxuICAgICAgICB9fT5cbiAgICAgICAgICB7cmVuZGVyU2NyZWVuKCl9XG4gICAgICAgICAge3Nob3dUYWJCYXIgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItYmFyXCIgc3R5bGU9e3sgcG9zaXRpb246ICdhYnNvbHV0ZScsIGJvdHRvbTogMCwgbGVmdDogMCwgcmlnaHQ6IDAgfX0+XG4gICAgICAgICAgICAgIHt0YWJJdGVtcy5tYXAodCA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e3QuaWR9IGNsYXNzTmFtZT17YHRhYi1pdGVtICR7c2NyZWVuID09PSB0LmlkID8gJ2FjdGl2ZScgOiAnJ31gfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodC5pZCA9PT0gJ2hvbWUnKSBnb0hvbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodC5pZCA9PT0gJ3NjZW5hcmlvcycpIG5hdmlnYXRlKCdzY2VuYXJpb3MnKTtcbiAgICAgICAgICAgICAgICAgIH19PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWItaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICA8SWNvbiBuYW1lPXt0Lmljb259IHNpemU9ezIyfSBzdHJva2VXaWR0aD17c2NyZWVuID09PSB0LmlkID8gMiA6IDEuNn0gLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj57dC5sYWJlbH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvUGhvbmVTaGVsbD5cblxuICAgICAgey8qIFNjcmVlbiBmbG93IGxlZ2VuZCAqL31cbiAgICAgIDxkaXYgc3R5bGU9e3tcbiAgICAgICAgbWFyZ2luVG9wOiAzMiwgZGlzcGxheTogJ2ZsZXgnLCBnYXA6IDYsIGZsZXhXcmFwOiAnd3JhcCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJywgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICAgIGZvbnRTaXplOiAxMiwgY29sb3I6ICd2YXIoLS1pbmstMyknLFxuICAgICAgfX0+XG4gICAgICAgIHtbXG4gICAgICAgICAgeyBpZDogJ2hvbWUnLCBsYWJlbDogJ+ODm+ODvOODoCcgfSxcbiAgICAgICAgICB7IGlkOiAnc2NlbmFyaW9zJywgbGFiZWw6ICfloLTpnaLpgbjmip4nIH0sXG4gICAgICAgICAgeyBpZDogJ3ByZXZpZXcnLCBsYWJlbDogJ+WgtOmdouODl+ODrOODk+ODpeODvCcgfSxcbiAgICAgICAgICB7IGlkOiAnY2hhdCcsIGxhYmVsOiAn5Lya6KmxJyB9LFxuICAgICAgICAgIHsgaWQ6ICdmZWVkYmFjaycsIGxhYmVsOiAn44OV44Kj44O844OJ44OQ44OD44KvJyB9LFxuICAgICAgICBdLm1hcCgocywgaSwgYXJyKSA9PiAoXG4gICAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17cy5pZH0+XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IG5hdmlnYXRlKHMuaWQpfSBzdHlsZT17e1xuICAgICAgICAgICAgICBwYWRkaW5nOiAnNnB4IDEycHgnLCBib3JkZXJSYWRpdXM6IDk5OSxcbiAgICAgICAgICAgICAgZm9udFNpemU6IDEyLCBmb250V2VpZ2h0OiA2MDAsXG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHNjcmVlbiA9PT0gcy5pZCA/ICd2YXIoLS1pbmstMSknIDogJ3JnYmEoMjU1LDI1NSwyNTUsMC43KScsXG4gICAgICAgICAgICAgIGNvbG9yOiBzY3JlZW4gPT09IHMuaWQgPyAnd2hpdGUnIDogJ3ZhcigtLWluay0yKScsXG4gICAgICAgICAgICAgIGJveFNoYWRvdzogc2NyZWVuID09PSBzLmlkID8gJzAgNHB4IDEycHggcmdiYSg0MiwzNCw0OCwwLjIpJyA6ICd2YXIoLS1zaC1zbSknLFxuICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgIHtpICsgMX0uIHtzLmxhYmVsfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICB7aSA8IGFyci5sZW5ndGggLSAxICYmIDxzcGFuIHN0eWxlPXt7IGNvbG9yOiAndmFyKC0taW5rLTQpJyB9fT7ihpI8L3NwYW4+fVxuICAgICAgICAgIDwvUmVhY3QuRnJhZ21lbnQ+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBUd2Vha3MgcGFuZWwgKi99XG4gICAgICA8VHdlYWtzUGFuZWw+XG4gICAgICAgIDxUd2Vha1NlY3Rpb24gdGl0bGU9XCLooajnpLroqK3lrppcIj5cbiAgICAgICAgICA8VHdlYWtSYWRpbyBsYWJlbD1cIuaWh+Wtl+OCteOCpOOCulwiXG4gICAgICAgICAgICB2YWx1ZT17dHdlYWtzLmZvbnRTaXplfVxuICAgICAgICAgICAgb3B0aW9ucz17W1xuICAgICAgICAgICAgICB7IHZhbHVlOiAnc3RhbmRhcmQnLCBsYWJlbDogJ+aomea6licgfSxcbiAgICAgICAgICAgICAgeyB2YWx1ZTogJ2xhcmdlJywgbGFiZWw6ICflpKcnIH0sXG4gICAgICAgICAgICBdfVxuICAgICAgICAgICAgb25DaGFuZ2U9e3YgPT4gc2V0VHdlYWsoJ2ZvbnRTaXplJywgdil9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9Ud2Vha1NlY3Rpb24+XG4gICAgICA8L1R3ZWFrc1BhbmVsPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKS5yZW5kZXIoPEFwcCAvPik7XG4gICJdLCJtYXBwaW5ncyI6IkFBQ0E7QUFDQTtBQUNBLE1BQU07RUFBRUEsUUFBUTtFQUFFQztBQUFVLENBQUMsR0FBR0MsS0FBSztBQUVyQyxNQUFNQyxjQUFjLEdBQUcsa0JBQWtCO0VBQ3ZDLFVBQVUsRUFBRTtBQUNkLENBQUM7QUFFRCxNQUFNQyxHQUFHLEdBQUdBLENBQUEsS0FBTTtFQUNoQixNQUFNLENBQUNDLE1BQU0sRUFBRUMsUUFBUSxDQUFDLEdBQUdDLFNB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</script></head>
<body>
  <div id="root"><div style="min-height: 100vh; background-image: radial-gradient(circle at 12% 18%, rgba(217, 154, 174, 0.1) 0%, transparent 38%), radial-gradient(circle at 88% 82%, rgba(139, 122, 199, 0.1) 0%, transparent 38%), radial-gradient(circle at 78% 12%, rgba(200, 163, 107, 0.08) 0%, transparent 32%); background-position-x: ; background-position-y: ; background-size: ; background-repeat: ; background-attachment: ; background-origin: ; background-clip: ; background-color: ; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px 20px;"><div style="position: absolute; top: 24px; left: 24px; display: flex; align-items: center; gap: 8px; font-family: &quot;Noto Sans KR&quot;, sans-serif;"><div lang="ko" style="width: 32px; height: 32px; border-radius: 10px; background: linear-gradient(135deg, rgb(214, 154, 174) 0%, rgb(139, 122, 199) 100%); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 14px;">말</div><div><div lang="ko" style="font-size: 16px; font-weight: 700; line-height: 1; color: var(--ink-1);">말해봐</div><div style="font-size: 11px; color: var(--ink-3); margin-top: 2px;">マレバ</div></div></div><div class="phone"><div class="phone-notch"></div><div class="phone-screen"><div class="status-bar"><span>9:41</span><div class="icons"><svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="7" width="3" height="4" rx="0.5"></rect><rect x="4.3" y="5" width="3" height="6" rx="0.5"></rect><rect x="8.6" y="2.5" width="3" height="8.5" rx="0.5"></rect><rect x="12.9" y="0" width="3" height="11" rx="0.5"></rect></svg><svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 2.8c1.9 0 3.6.7 4.9 1.9l1-1A8 8 0 0 0 7.5 1.3 8 8 0 0 0 1.6 3.7l1 1A6.7 6.7 0 0 1 7.5 2.8zm0 3a4 4 0 0 1 2.8 1.2l1-1A5.5 5.5 0 0 0 7.5 4.3 5.5 5.5 0 0 0 3.7 6l1 1A4 4 0 0 1 7.5 5.8zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"></path></svg><svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke="currentColor" opacity="0.4"></rect><rect x="2" y="2" width="17" height="7" rx="1.5" fill="currentColor"></rect><path d="M22 4v3c.7-.2 1.2-.9 1.2-1.5S22.7 4.2 22 4z" fill="currentColor" opacity="0.5"></path></svg></div></div><div style="flex: 1 1 0%; display: flex; flex-direction: column; opacity: 1; transform: translateX(0px); transition: opacity 0.18s, transform 0.18s; min-height: 0px;"><div class="scroll-area" style="background: var(--bg-app);"><div style="padding: 12px 20px 16px; background: linear-gradient(180deg, var(--bg-blush) 0%, var(--bg-app) 100%);"><div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;"><div><div style="font-size: var(--fs-xs); color: var(--ink-3); letter-spacing: 0.5px; font-weight: 500;">안녕하세요 ✿</div><div style="font-size: var(--fs-xl); font-weight: 700; margin-top: 2px; letter-spacing: -0.01em;">おかえりなさい、<span style="color: var(--plum-deep);">みお</span>さん</div></div><button style="width: 40px; height: 40px; border-radius: 50%; background: var(--bg-card); box-shadow: var(--sh-sm); display: flex; align-items: center; justify-content: center;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"></path></svg></button></div><div style="background: var(--bg-card); border-radius: var(--r-lg); padding: 18px 20px; box-shadow: var(--sh-sm); display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 4px;"><div style="text-align: center; padding: 4px 6px;"><div style="width: 36px; height: 36px; border-radius: 50%; background: var(--rose-soft); color: var(--rose-deep); display: flex; align-items: center; justify-content: center; margin: 0px auto 6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1 3 4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 1-5 1.5 0 2-1 3-3z"></path></svg></div><div style="font-size: var(--fs-lg); font-weight: 700; line-height: 1; color: var(--ink-1);">12</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 4px;">連続<span style="margin-left: 2px;">日</span></div></div><div style="text-align: center; padding: 4px 6px;"><div style="width: 36px; height: 36px; border-radius: 50%; background: var(--plum-soft); color: var(--plum-deep); display: flex; align-items: center; justify-content: center; margin: 0px auto 6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9z"></path></svg></div><div style="font-size: var(--fs-lg); font-weight: 700; line-height: 1; color: var(--ink-1);">Lv.2</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 4px;">レベル<span style="margin-left: 2px;">初級</span></div></div><div style="text-align: center; padding: 4px 6px;"><div style="width: 36px; height: 36px; border-radius: 50%; background: rgb(240, 228, 204); color: var(--gold); display: flex; align-items: center; justify-content: center; margin: 0px auto 6px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"></path></svg></div><div style="font-size: var(--fs-lg); font-weight: 700; line-height: 1; color: var(--ink-1);">2/3</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 4px;">今日<span style="margin-left: 2px;">回</span></div></div></div></div><div style="padding: 20px 20px 0px;"><div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 12px;"><div><div style="font-size: var(--fs-md); font-weight: 700;">今日のおすすめ</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 2px;">あなたのレベルに合わせて</div></div></div><button style="width: 100%; text-align: left; background: linear-gradient(135deg, rgb(242, 220, 226) 0%, rgb(236, 228, 244) 100%); border-radius: var(--r-lg); padding: 20px 22px; position: relative; overflow: hidden; box-shadow: var(--sh-sm);"><div style="position: absolute; right: -30px; top: -30px; width: 120px; height: 120px; border-radius: 50%; background: rgba(255, 255, 255, 0.5);"></div><div style="position: relative;"><span class="chip" style="background: rgba(255, 255, 255, 0.7); color: var(--plum-deep);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9zM17 11h2a2 2 0 0 1 0 4h-2M7 3c0 1 .5 1.5 0 3M11 3c0 1 .5 1.5 0 3"></path></svg> 飲食 · Lv.2</span><div style="margin-top: 12px; font-size: var(--fs-xl); font-weight: 700; line-height: 1.3;">カフェで<br>ラテを注文する</div><div lang="ko" style="margin-top: 4px; font-size: var(--fs-base); color: var(--rose-deep); font-weight: 600;">카페에서 라떼 주문하기</div><div style="margin-top: 14px; display: flex; align-items: center; gap: 8px; font-size: var(--fs-sm); color: var(--ink-2);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 7v5l3 2"></path></svg> 5分<span style="width: 3px; height: 3px; border-radius: 50%; background: var(--ink-3);"></span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9z"></path></svg> ★★☆</div></div></button></div><div style="padding: 20px 20px 0px;"><div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 12px;"><div><div style="font-size: var(--fs-md); font-weight: 700;">続きから</div></div></div><button style="width: 100%; text-align: left; background: var(--bg-card); border-radius: var(--r-md); padding: 14px 16px; box-shadow: var(--sh-sm); display: flex; align-items: center; gap: 14px;"><div style="width: 48px; height: 48px; border-radius: var(--r-sm); background: var(--bg-mint); display: flex; align-items: center; justify-content: center; color: rgb(91, 148, 119);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l3-1 3 4 3-1-7-9 2-1 9 8 4-1a2 2 0 0 1 0 4l-15 5v-2l4-3z"></path></svg></div><div style="flex: 1 1 0%; min-width: 0px;"><div style="font-size: var(--fs-base); font-weight: 600;">タクシーに乗る</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 2px;">途中まで · 残り3ターン</div><div style="margin-top: 8px; height: 4px; border-radius: 999px; background: var(--bg-soft); overflow: hidden;"><div style="width: 60%; height: 100%; background: var(--plum); border-radius: 999px;"></div></div></div><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"></path></svg></button></div><div style="padding: 20px 20px 0px;"><div style="display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 12px;"><div><div style="font-size: var(--fs-md); font-weight: 700;">カテゴリーで探す</div></div><button style="font-size: var(--fs-sm); color: var(--plum-deep); font-weight: 500;">すべて見る →</button></div><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;"><button style="background: var(--bg-lilac); border-radius: var(--r-md); padding: 16px 16px 14px; text-align: left; display: flex; flex-direction: column; gap: 12px; min-height: 100px;"><div style="width: 36px; height: 36px; border-radius: var(--r-sm); background: rgba(255, 255, 255, 0.7); display: flex; align-items: center; justify-content: center; color: var(--plum-deep);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"></path></svg></div><div><div style="font-size: var(--fs-base); font-weight: 700;">日常</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 2px;">4つの場面</div></div></button><button style="background: var(--bg-blush); border-radius: var(--r-md); padding: 16px 16px 14px; text-align: left; display: flex; flex-direction: column; gap: 12px; min-height: 100px;"><div style="width: 36px; height: 36px; border-radius: var(--r-sm); background: rgba(255, 255, 255, 0.7); display: flex; align-items: center; justify-content: center; color: var(--rose-deep);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9zM17 11h2a2 2 0 0 1 0 4h-2M7 3c0 1 .5 1.5 0 3M11 3c0 1 .5 1.5 0 3"></path></svg></div><div><div style="font-size: var(--fs-base); font-weight: 700;">飲食</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 2px;">5つの場面</div></div></button><button style="background: var(--bg-mint); border-radius: var(--r-md); padding: 16px 16px 14px; text-align: left; display: flex; flex-direction: column; gap: 12px; min-height: 100px;"><div style="width: 36px; height: 36px; border-radius: var(--r-sm); background: rgba(255, 255, 255, 0.7); display: flex; align-items: center; justify-content: center; color: rgb(91, 148, 119);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l3-1 3 4 3-1-7-9 2-1 9 8 4-1a2 2 0 0 1 0 4l-15 5v-2l4-3z"></path></svg></div><div><div style="font-size: var(--fs-base); font-weight: 700;">旅行</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 2px;">3つの場面</div></div></button><button style="background: var(--bg-cream); border-radius: var(--r-md); padding: 16px 16px 14px; text-align: left; display: flex; flex-direction: column; gap: 12px; min-height: 100px;"><div style="width: 36px; height: 36px; border-radius: var(--r-sm); background: rgba(255, 255, 255, 0.7); display: flex; align-items: center; justify-content: center; color: var(--gold);"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"></path></svg></div><div><div style="font-size: var(--fs-base); font-weight: 700;">ビジネス</div><div style="font-size: var(--fs-xs); color: var(--ink-3); margin-top: 2px;">3つの場面</div></div></button></div></div><div style="height: 100px;"></div></div><div class="tab-bar" style="position: absolute; bottom: 0px; left: 0px; right: 0px;"><button class="tab-item active"><div class="tab-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9z"></path></svg></div><div>ホーム</div></button><button class="tab-item "><div class="tab-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"></path><path d="M4 17a3 3 0 0 1 3-3h11"></path></svg></div><div>場面</div></button><button class="tab-item "><div class="tab-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16v11H8l-4 4V5z"></path></svg></div><div>会話</div></button><button class="tab-item "><div class="tab-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"></path></svg></div><div>記録</div></button><button class="tab-item "><div class="tab-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"></path></svg></div><div>マイ</div></button></div></div><div class="home-indicator"></div></div></div><div style="margin-top: 32px; display: flex; gap: 6px; flex-wrap: wrap; justify-content: center; align-items: center; font-size: 12px; color: var(--ink-3);"><button style="padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: var(--ink-1); color: white; box-shadow: rgba(42, 34, 48, 0.2) 0px 4px 12px;">1. ホーム</button><span style="color: var(--ink-4);">→</span><button style="padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(255, 255, 255, 0.7); color: var(--ink-2); box-shadow: var(--sh-sm);">2. 場面選択</button><span style="color: var(--ink-4);">→</span><button style="padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(255, 255, 255, 0.7); color: var(--ink-2); box-shadow: var(--sh-sm);">3. 場面プレビュー</button><span style="color: var(--ink-4);">→</span><button style="padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(255, 255, 255, 0.7); color: var(--ink-2); box-shadow: var(--sh-sm);">4. 会話</button><span style="color: var(--ink-4);">→</span><button style="padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 600; background: rgba(255, 255, 255, 0.7); color: var(--ink-2); box-shadow: var(--sh-sm);">5. フィードバック</button></div></div></div>

  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>

  <script type="text/babel" data-presets="react">
/* ─── tweaks-panel.jsx ─── */

// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;width:100%;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;height:22px;
    border-radius:6px;cursor:default;padding:0}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  const setTweak = React.useCallback((key, val) => {
    setValues((prev) => ({ ...prev, [key]: val }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [key]: val } }, '*');
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel"
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">{children}</div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

function TweakColor({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <input type="color" className="twk-swatch" value={value}
             onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});
  </script>

  <script type="text/babel" data-presets="react">
/* ─── icons.jsx ─── */
// Icons.jsx — minimal line icons for マレバ
const Icon = ({ name, size = 22, color = 'currentColor', strokeWidth = 1.6 }) => {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round',
  };
  switch (name) {
    case 'home':
      return <svg {...props}><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-6h-6v6H5a2 2 0 0 1-2-2v-9z"/></svg>;
    case 'book':
      return <svg {...props}><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3V4z"/><path d="M4 17a3 3 0 0 1 3-3h11"/></svg>;
    case 'chat':
      return <svg {...props}><path d="M4 5h16v11H8l-4 4V5z"/></svg>;
    case 'chart':
      return <svg {...props}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>;
    case 'user':
      return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>;
    case 'mic':
      return <svg {...props}><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></svg>;
    case 'play':
      return <svg {...props}><path d="M7 5l12 7-12 7V5z" fill={color}/></svg>;
    case 'volume':
      return <svg {...props}><path d="M4 9h4l5-4v14l-5-4H4V9z"/><path d="M16 8c1.5 1 2.5 2.4 2.5 4s-1 3-2.5 4"/></svg>;
    case 'translate':
      return <svg {...props}><path d="M3 6h10M8 4v2M5 6c0 4 3 7 8 8M11 11c-2 3-5 5-8 5"/><path d="M13 20l4-9 4 9M14.5 17h5"/></svg>;
    case 'lightbulb':
      return <svg {...props}><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-4 10c.7.7 1 1.5 1 2.5V17h6v-1.5c0-1 .3-1.8 1-2.5a6 6 0 0 0-4-10z"/></svg>;
    case 'flame':
      return <svg {...props}><path d="M12 3c1 3 4 4 4 8a4 4 0 1 1-8 0c0-2 1-3 1-5 1.5 0 2-1 3-3z"/></svg>;
    case 'sparkle':
      return <svg {...props}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>;
    case 'arrow-right':
      return <svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
    case 'arrow-left':
      return <svg {...props}><path d="M19 12H5M11 6l-6 6 6 6"/></svg>;
    case 'check':
      return <svg {...props}><path d="M5 12l4 4 10-10"/></svg>;
    case 'star':
      return <svg {...props}><path d="M12 3l2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.9z"/></svg>;
    case 'gift':
      return <svg {...props}><rect x="3" y="9" width="18" height="11" rx="1.5"/><path d="M3 13h18M12 9v11M8 9c-1.7 0-3-1.1-3-2.5S6.3 4 8 4c2 0 3 3 4 5-1 0-3 0-4 0zM16 9c1.7 0 3-1.1 3-2.5S17.7 4 16 4c-2 0-3 3-4 5 1 0 3 0 4 0z"/></svg>;
    case 'clock':
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'pin':
      return <svg {...props}><path d="M12 21s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'bookmark':
      return <svg {...props}><path d="M6 4h12v17l-6-4-6 4V4z"/></svg>;
    case 'settings':
      return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
    case 'close':
      return <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'menu':
      return <svg {...props}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'crown':
      return <svg {...props}><path d="M3 18h18M4 7l4 4 4-6 4 6 4-4-2 11H6L4 7z"/></svg>;
    case 'coffee':
      return <svg {...props}><path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V9zM17 11h2a2 2 0 0 1 0 4h-2M7 3c0 1 .5 1.5 0 3M11 3c0 1 .5 1.5 0 3"/></svg>;
    case 'plane':
      return <svg {...props}><path d="M3 12l3-1 3 4 3-1-7-9 2-1 9 8 4-1a2 2 0 0 1 0 4l-15 5v-2l4-3z"/></svg>;
    case 'briefcase':
      return <svg {...props}><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>;
    case 'heart':
      return <svg {...props}><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>;
    case 'shopping':
      return <svg {...props}><path d="M5 8h14l-1 12H6L5 8zM9 8a3 3 0 1 1 6 0"/></svg>;
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    default:
      return null;
  }
};

window.Icon = Icon;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── phone-shell.jsx ─── */
// PhoneShell.jsx — device chrome wrapper
const PhoneShell = ({ children, time = '9:41' }) => {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">
        <div className="status-bar">
          <span>{time}</span>
          <div className="icons">
            <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor">
              <rect x="0" y="7" width="3" height="4" rx="0.5"/>
              <rect x="4.3" y="5" width="3" height="6" rx="0.5"/>
              <rect x="8.6" y="2.5" width="3" height="8.5" rx="0.5"/>
              <rect x="12.9" y="0" width="3" height="11" rx="0.5"/>
            </svg>
            <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor">
              <path d="M7.5 2.8c1.9 0 3.6.7 4.9 1.9l1-1A8 8 0 0 0 7.5 1.3 8 8 0 0 0 1.6 3.7l1 1A6.7 6.7 0 0 1 7.5 2.8zm0 3a4 4 0 0 1 2.8 1.2l1-1A5.5 5.5 0 0 0 7.5 4.3 5.5 5.5 0 0 0 3.7 6l1 1A4 4 0 0 1 7.5 5.8zm0 3a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            </svg>
            <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
              <rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke="currentColor" opacity="0.4"/>
              <rect x="2" y="2" width="17" height="7" rx="1.5" fill="currentColor"/>
              <path d="M22 4v3c.7-.2 1.2-.9 1.2-1.5S22.7 4.2 22 4z" fill="currentColor" opacity="0.5"/>
            </svg>
          </div>
        </div>
        {children}
        <div className="home-indicator" />
      </div>
    </div>
  );
};

window.PhoneShell = PhoneShell;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── screen-home.jsx ─── */
// HomeScreen.jsx — ホーム
const HomeScreen = ({ onNavigate }) => {
  return (
    <div className="scroll-area" style={{ background: 'var(--bg-app)' }}>
      {/* Header */}
      <div style={{
        padding: '12px 20px 16px',
        background: 'linear-gradient(180deg, var(--bg-blush) 0%, var(--bg-app) 100%)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', letterSpacing: '0.5px', fontWeight: 500 }}>
              안녕하세요 ✿
            </div>
            <div style={{ fontSize: 'var(--fs-xl)', fontWeight: 700, marginTop: 2, letterSpacing: '-0.01em' }}>
              おかえりなさい、<span style={{ color: 'var(--plum-deep)' }}>みお</span>さん
            </div>
          </div>
          <button style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--bg-card)', boxShadow: 'var(--sh-sm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="settings" size={18} color="var(--ink-2)" />
          </button>
        </div>

        {/* Streak + level card */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--r-lg)',
          padding: '18px 20px',
          boxShadow: 'var(--sh-sm)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 4,
        }}>
          <Stat icon="flame" label="連続" value="12" unit="日" tone="rose" />
          <Stat icon="star" label="レベル" value="Lv.2" unit="初級" tone="plum" />
          <Stat icon="sparkle" label="今日" value="2/3" unit="回" tone="gold" />
        </div>
      </div>

      {/* Today's recommendation */}
      <Section title="今日のおすすめ" sub="あなたのレベルに合わせて">
        <button onClick={() => onNavigate('preview')} style={{
          width: '100%', textAlign: 'left',
          background: 'linear-gradient(135deg, #F2DCE2 0%, #ECE4F4 100%)',
          borderRadius: 'var(--r-lg)',
          padding: '20px 22px',
          position: 'relative', overflow: 'hidden',
          boxShadow: 'var(--sh-sm)',
        }}>
          {/* decorative blob */}
          <div style={{
            position: 'absolute', right: -30, top: -30, width: 120, height: 120,
            borderRadius: '50%', background: 'rgba(255,255,255,0.5)',
          }} />
          <div style={{ position: 'relative' }}>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.7)', color: 'var(--plum-deep)' }}>
              <Icon name="coffee" size={12} /> 飲食 · Lv.2
            </span>
            <div style={{ marginTop: 12, fontSize: 'var(--fs-xl)', fontWeight: 700, lineHeight: 1.3 }}>
              カフェで<br/>ラテを注文する
            </div>
            <div lang="ko" style={{ marginTop: 4, fontSize: 'var(--fs-base)', color: 'var(--rose-deep)', fontWeight: 600 }}>
              카페에서 라떼 주문하기
            </div>
            <div style={{
              marginTop: 14, display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 'var(--fs-sm)', color: 'var(--ink-2)',
            }}>
              <Icon name="clock" size={14} /> 5分
              <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-3)' }} />
              <Icon name="star" size={14} /> ★★☆
            </div>
          </div>
        </button>
      </Section>

      {/* Continue */}
      <Section title="続きから">
        <ContinueCard onClick={() => onNavigate('chat')} />
      </Section>

      {/* Categories */}
      <Section title="カテゴリーで探す" cta="すべて見る" onCta={() => onNavigate('scenarios')}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <CategoryTile icon="globe" label="日常" count={4} tone="lilac" onClick={() => onNavigate('scenarios')} />
          <CategoryTile icon="coffee" label="飲食" count={5} tone="blush" onClick={() => onNavigate('scenarios')} />
          <CategoryTile icon="plane" label="旅行" count={3} tone="mint" onClick={() => onNavigate('scenarios')} />
          <CategoryTile icon="briefcase" label="ビジネス" count={3} tone="cream" onClick={() => onNavigate('scenarios')} />
        </div>
      </Section>

      <div style={{ height: 100 }} />
    </div>
  );
};

const Stat = ({ icon, label, value, unit, tone }) => {
  const colors = {
    rose: { bg: 'var(--rose-soft)', fg: 'var(--rose-deep)' },
    plum: { bg: 'var(--plum-soft)', fg: 'var(--plum-deep)' },
    gold: { bg: '#F0E4CC', fg: 'var(--gold)' },
  }[tone];
  return (
    <div style={{ textAlign: 'center', padding: '4px 6px' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: colors.bg, color: colors.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 6px',
      }}>
        <Icon name={icon} size={18} />
      </div>
      <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, lineHeight: 1, color: 'var(--ink-1)' }}>
        {value}
      </div>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 4 }}>
        {label}<span style={{ marginLeft: 2 }}>{unit}</span>
      </div>
    </div>
  );
};

const Section = ({ title, sub, cta, onCta, children }) => (
  <div style={{ padding: '20px 20px 0' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
      <div>
        <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700 }}>{title}</div>
        {sub && <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 2 }}>{sub}</div>}
      </div>
      {cta && (
        <button onClick={onCta} style={{ fontSize: 'var(--fs-sm)', color: 'var(--plum-deep)', fontWeight: 500 }}>
          {cta} →
        </button>
      )}
    </div>
    {children}
  </div>
);

const ContinueCard = ({ onClick }) => (
  <button onClick={onClick} style={{
    width: '100%', textAlign: 'left',
    background: 'var(--bg-card)',
    borderRadius: 'var(--r-md)',
    padding: '14px 16px',
    boxShadow: 'var(--sh-sm)',
    display: 'flex', alignItems: 'center', gap: 14,
  }}>
    <div style={{
      width: 48, height: 48, borderRadius: 'var(--r-sm)',
      background: 'var(--bg-mint)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#5B9477',
    }}>
      <Icon name="plane" size={22} />
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 'var(--fs-base)', fontWeight: 600 }}>タクシーに乗る</div>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 2 }}>
        途中まで · 残り3ターン
      </div>
      <div style={{
        marginTop: 8, height: 4, borderRadius: 999,
        background: 'var(--bg-soft)', overflow: 'hidden',
      }}>
        <div style={{ width: '60%', height: '100%', background: 'var(--plum)', borderRadius: 999 }} />
      </div>
    </div>
    <Icon name="arrow-right" size={18} color="var(--ink-3)" />
  </button>
);

const CategoryTile = ({ icon, label, count, tone, onClick }) => {
  const bg = {
    lilac: 'var(--bg-lilac)',
    blush: 'var(--bg-blush)',
    mint: 'var(--bg-mint)',
    cream: 'var(--bg-cream)',
  }[tone];
  const fg = {
    lilac: 'var(--plum-deep)',
    blush: 'var(--rose-deep)',
    mint: '#5B9477',
    cream: 'var(--gold)',
  }[tone];
  return (
    <button onClick={onClick} style={{
      background: bg, borderRadius: 'var(--r-md)',
      padding: '16px 16px 14px', textAlign: 'left',
      display: 'flex', flexDirection: 'column', gap: 12,
      minHeight: 100,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 'var(--r-sm)',
        background: 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: fg,
      }}>
        <Icon name={icon} size={18} />
      </div>
      <div>
        <div style={{ fontSize: 'var(--fs-base)', fontWeight: 700 }}>{label}</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 2 }}>{count}つの場面</div>
      </div>
    </button>
  );
};

window.HomeScreen = HomeScreen;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── screen-scenarios.jsx ─── */
// ScenariosScreen.jsx — 場面選択
const ScenariosScreen = ({ onNavigate, onBack }) => {
  const [activeCat, setActiveCat] = React.useState('all');
  const [activeLevel, setActiveLevel] = React.useState('all');

  const categories = [
    { id: 'all', label: 'すべて' },
    { id: 'daily', label: '日常' },
    { id: 'food', label: '飲食' },
    { id: 'travel', label: '旅行' },
    { id: 'shop', label: '買い物' },
    { id: 'biz', label: 'ビジネス' },
    { id: 'culture', label: '文化' },
  ];
  const levels = ['all', 'Lv.1', 'Lv.2', 'Lv.3', 'Lv.4', 'Lv.5'];

  const scenarios = [
    { id: 1, ja: 'カフェでラテを注文する', ko: '카페에서 라떼 주문하기', cat: '飲食', level: 'Lv.2', diff: 2, time: 5, icon: 'coffee', tone: 'blush', recommended: true },
    { id: 2, ja: 'タクシーに乗る', ko: '택시 타기', cat: '旅行', level: 'Lv.2', diff: 2, time: 5, icon: 'plane', tone: 'mint', inProgress: true },
    { id: 3, ja: '趣味について話す', ko: '취미에 대해 이야기하기', cat: '日常', level: 'Lv.2', diff: 2, time: 10, icon: 'heart', tone: 'lilac' },
    { id: 4, ja: 'コンビニで買い物', ko: '편의점에서 쇼핑', cat: '買い物', level: 'Lv.2', diff: 1, time: 5, icon: 'shopping', tone: 'cream' },
    { id: 5, ja: 'ホテルで困った時', ko: '호텔에서 곤란할 때', cat: '旅行', level: 'Lv.3', diff: 3, time: 10, icon: 'plane', tone: 'mint' },
    { id: 6, ja: 'アレルギーを伝える', ko: '알레르기 알리기', cat: '飲食', level: 'Lv.3', diff: 3, time: 10, icon: 'coffee', tone: 'blush' },
  ];

  return (
    <div className="scroll-area" style={{ background: 'var(--bg-app)' }}>
      <div style={{
        position: 'sticky', top: 0, zIndex: 5,
        background: 'rgba(255,252,248,0.95)',
        backdropFilter: 'blur(12px)',
        padding: '6px 20px 12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--bg-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="arrow-left" size={18} />
          </button>
          <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 700 }}>場面を選ぶ</div>
        </div>

        {/* Category tabs */}
        <div style={{
          display: 'flex', gap: 6, overflowX: 'auto',
          margin: '0 -20px', padding: '0 20px 4px',
          scrollbarWidth: 'none',
        }}>
          {categories.map(c => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
              padding: '8px 14px', borderRadius: 'var(--r-pill)',
              fontSize: 'var(--fs-sm)', fontWeight: 600, whiteSpace: 'nowrap',
              background: activeCat === c.id ? 'var(--ink-1)' : 'var(--bg-soft)',
              color: activeCat === c.id ? 'white' : 'var(--ink-2)',
              flexShrink: 0,
            }}>{c.label}</button>
          ))}
        </div>

        {/* Level filter */}
        <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
          {levels.map(lv => (
            <button key={lv} onClick={() => setActiveLevel(lv)} style={{
              padding: '6px 12px', borderRadius: 'var(--r-pill)',
              fontSize: 'var(--fs-xs)', fontWeight: 600,
              background: activeLevel === lv ? 'var(--plum-soft)' : 'transparent',
              color: activeLevel === lv ? 'var(--plum-deep)' : 'var(--ink-3)',
              border: '1px solid',
              borderColor: activeLevel === lv ? 'var(--plum-soft)' : 'var(--ink-4)',
            }}>{lv === 'all' ? '全て' : lv}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: '8px 20px 100px' }}>
        {scenarios.map((s, i) => (
          <ScenarioRow key={s.id} {...s} onClick={() => onNavigate('preview')} delay={i * 30} />
        ))}
      </div>
    </div>
  );
};

const ScenarioRow = ({ ja, ko, level, diff, time, icon, tone, recommended, inProgress, onClick, delay }) => {
  const tones = {
    blush: { bg: 'var(--bg-blush)', fg: 'var(--rose-deep)' },
    mint: { bg: 'var(--bg-mint)', fg: '#5B9477' },
    lilac: { bg: 'var(--bg-lilac)', fg: 'var(--plum-deep)' },
    cream: { bg: 'var(--bg-cream)', fg: 'var(--gold)' },
  }[tone];

  return (
    <button onClick={onClick} className="fade-up" style={{
      width: '100%', textAlign: 'left',
      background: 'var(--bg-card)',
      borderRadius: 'var(--r-md)',
      padding: '14px 16px',
      boxShadow: 'var(--sh-sm)',
      marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 14,
      animationDelay: `${delay}ms`,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 'var(--r-sm)',
        background: tones.bg, color: tones.fg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon name={icon} size={22} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' }}>
          {recommended && (
            <span className="chip" style={{ background: 'var(--rose-soft)', color: 'var(--rose-deep)', fontWeight: 600 }}>
              <Icon name="sparkle" size={10} /> おすすめ
            </span>
          )}
          {inProgress && (
            <span className="chip" style={{ background: 'var(--plum-soft)', color: 'var(--plum-deep)', fontWeight: 600 }}>
              続きから
            </span>
          )}
        </div>
        <div style={{ fontSize: 'var(--fs-base)', fontWeight: 600, lineHeight: 1.3 }}>{ja}</div>
        <div lang="ko" style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 2 }}>{ko}</div>
        <div style={{
          display: 'flex', gap: 10, marginTop: 6,
          fontSize: 'var(--fs-xs)', color: 'var(--ink-3)',
          alignItems: 'center',
        }}>
          <span>{level}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-4)' }} />
          <span>{'★'.repeat(diff)}{'☆'.repeat(3-diff)}</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-4)' }} />
          <span>{time}分</span>
        </div>
      </div>
    </button>
  );
};

window.ScenariosScreen = ScenariosScreen;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── screen-preview.jsx ─── */
// PreviewScreen.jsx — 場面プレビュー
const PreviewScreen = ({ onNavigate, onBack }) => {
  return (
    <div className="scroll-area" style={{ background: 'var(--bg-app)' }}>
      {/* Hero */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #F2DCE2 0%, #ECE4F4 60%, #F7EFD9 120%)',
        padding: '12px 20px 28px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button onClick={onBack} style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="arrow-left" size={18} />
          </button>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="bookmark" size={18} />
          </button>
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%',
            background: 'rgba(255,255,255,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 14px',
            color: 'var(--rose-deep)',
            boxShadow: '0 8px 20px rgba(185,113,137,0.18)',
          }}>
            <Icon name="coffee" size={42} strokeWidth={1.4} />
          </div>
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 10 }}>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.7)' }}>飲食</span>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.7)' }}>Lv.2 初級</span>
            <span className="chip" style={{ background: 'rgba(255,255,255,0.7)' }}>★★☆</span>
          </div>
          <div style={{ fontSize: 'var(--fs-2xl)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
            カフェでラテを<br/>注文する
          </div>
          <div lang="ko" style={{ marginTop: 6, fontSize: 'var(--fs-base)', color: 'var(--rose-deep)', fontWeight: 600 }}>
            카페에서 라떼 주문하기
          </div>
        </div>
      </div>

      {/* Cast */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--r-md)',
          padding: '14px 16px', boxShadow: 'var(--sh-sm)',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>
            ✿
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)' }}>あなたの相手</div>
            <div style={{ fontSize: 'var(--fs-base)', fontWeight: 600 }}>ジス（カフェ店員）</div>
            <div lang="ko" style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)' }}>지수 · 明るい20代女性</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--fs-xs)', color: 'var(--plum-deep)', fontWeight: 600 }}>
            <Icon name="volume" size={14} /> Kore
          </div>
        </div>
      </div>

      {/* Goal */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 10 }}>達成目標</div>
        <div style={{
          background: 'var(--bg-mint)', borderRadius: 'var(--r-md)',
          padding: '14px 16px',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <Icon name="check" size={18} color="#5B9477" />
          <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-1)', lineHeight: 1.6 }}>
            飲み物のサイズと温度を伝え、<br/>支払い方法まで会話を完了する
          </div>
        </div>
      </div>

      {/* Key phrases */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 10 }}>キーフレーズ</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Phrase ko="아이스 라떼 한 잔 주세요" ruby="アイス ラッテ ハン ジャン ジュセヨ" ja="アイスラテをひとつください" />
          <Phrase ko="사이즈는 어떻게 드릴까요?" ruby="サイジュヌン オットケ ドゥリルッカヨ?" ja="サイズはどうされますか？" />
          <Phrase ko="여기서 드세요?" ruby="ヨギソ ドゥセヨ?" ja="店内でお召し上がりですか？" />
        </div>
      </div>

      {/* Culture note */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{
          background: 'var(--bg-cream)', borderRadius: 'var(--r-md)',
          padding: '14px 16px',
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <Icon name="lightbulb" size={20} color="var(--gold)" />
          <div>
            <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 700, marginBottom: 4 }}>カルチャーメモ</div>
            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-2)', lineHeight: 1.6 }}>
              韓国のカフェでは「샷 추가（ショット追加）」が定番。氷少なめは「얼음 적게」と伝えましょう。
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 20px 100px' }}>
        <button className="btn-primary" onClick={() => onNavigate('chat')} style={{ width: '100%' }}>
          会話を始める
        </button>
        <div style={{ textAlign: 'center', marginTop: 10, fontSize: 'var(--fs-xs)', color: 'var(--ink-3)' }}>
          今日の残り回数 · 1/3 回
        </div>
      </div>
    </div>
  );
};

const Phrase = ({ ko, ruby, ja }) => (
  <div style={{
    background: 'var(--bg-card)', borderRadius: 'var(--r-md)',
    padding: '12px 14px', boxShadow: 'var(--sh-sm)',
    display: 'flex', alignItems: 'center', gap: 12,
  }}>
    <button style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'var(--plum-soft)', color: 'var(--plum-deep)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon name="play" size={14} />
    </button>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div lang="ko" style={{ fontSize: 'var(--fs-base)', fontWeight: 600, lineHeight: 1.3 }}>{ko}</div>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--rose-deep)', marginTop: 2 }}>{ruby}</div>
      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 2 }}>{ja}</div>
    </div>
  </div>
);

window.PreviewScreen = PreviewScreen;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── screen-chat.jsx ─── */
// ChatScreen.jsx — 会話画面（メイン）
const ChatScreen = ({ onNavigate, onBack }) => {
  const [showTranslation, setShowTranslation] = React.useState(true);
  const [showRuby, setShowRuby] = React.useState(true);
  const [recording, setRecording] = React.useState(false);

  const messages = [
    {
      role: 'ai', name: 'ジス',
      ko: '안녕하세요! 어서 오세요 ☕',
      ruby: 'アンニョンハセヨ! オソ オセヨ',
      ja: 'こんにちは！いらっしゃいませ',
    },
    {
      role: 'user',
      ko: '안녕하세요. 아이스 라떼 한 잔 주세요.',
      ruby: 'アンニョンハセヨ. アイス ラッテ ハン ジャン ジュセヨ',
      ja: 'こんにちは。アイスラテをひとつください。',
      score: 92,
    },
    {
      role: 'ai', name: 'ジス',
      ko: '네, 사이즈는 어떻게 드릴까요? 톨, 그란데 있어요.',
      ruby: 'ネ, サイジュヌン オットケ ドゥリルッカヨ? トル, グランデ イッソヨ',
      ja: 'はい、サイズはどうされますか？トールとグランデがあります。',
      hint: '「グランデでお願いします」と伝えてみよう',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FAF6F1' }}>
      {/* Header */}
      <div style={{
        padding: '6px 14px 12px',
        background: 'rgba(255,252,248,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(200,191,208,0.3)',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--bg-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="arrow-left" size={18} />
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>✿</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 'var(--fs-base)', fontWeight: 700, lineHeight: 1.2 }}>ジス</div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)' }}>カフェ · ターン 2/8</div>
        </div>
        <button style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--bg-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="close" size={16} color="var(--ink-2)" />
        </button>
      </div>

      {/* Display toggles */}
      <div style={{
        padding: '8px 14px',
        display: 'flex', gap: 6,
        borderBottom: '1px solid rgba(200,191,208,0.2)',
        background: '#FAF6F1',
      }}>
        <Toggle active={showRuby} onClick={() => setShowRuby(!showRuby)} icon="globe" label="ルビ" />
        <Toggle active={showTranslation} onClick={() => setShowTranslation(!showTranslation)} icon="translate" label="日本語訳" />
        <div style={{ flex: 1 }} />
        <button style={{
          padding: '6px 10px', borderRadius: 'var(--r-pill)',
          fontSize: 'var(--fs-xs)', fontWeight: 600,
          background: 'var(--bg-soft)', color: 'var(--ink-2)',
          display: 'flex', gap: 4, alignItems: 'center',
        }}>
          <Icon name="lightbulb" size={12} /> ヒント
        </button>
      </div>

      {/* Messages */}
      <div className="scroll-area" style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{
          alignSelf: 'center',
          padding: '6px 14px', borderRadius: 'var(--r-pill)',
          background: 'rgba(255,255,255,0.7)',
          fontSize: 'var(--fs-xs)', color: 'var(--ink-3)',
          fontWeight: 500,
        }}>
          場面 · カフェでラテを注文する
        </div>

        {messages.map((m, i) => (
          <Message key={i} {...m} showRuby={showRuby} showTranslation={showTranslation} delay={i * 80} />
        ))}

        {/* Typing */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14,
          }}>✿</div>
          <div style={{
            background: 'white', padding: '10px 14px',
            borderRadius: '4px 18px 18px 18px',
            display: 'flex', gap: 4, alignItems: 'center',
            boxShadow: 'var(--sh-sm)',
          }}>
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        </div>

        <div style={{ height: 8 }} />
      </div>

      {/* Input bar */}
      <div style={{
        padding: '10px 14px 14px',
        background: 'rgba(255,252,248,0.96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(200,191,208,0.3)',
      }}>
        {recording ? (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 16px', borderRadius: 'var(--r-pill)',
            background: 'var(--rose-soft)',
          }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end', height: 18 }}>
              {[8,14,10,16,12,8,14].map((h,i) => (
                <div key={i} style={{
                  width: 3, height: h, background: 'var(--rose-deep)', borderRadius: 2,
                  animation: `typing 1s ${i*0.1}s infinite`,
                }} />
              ))}
            </div>
            <div style={{ flex: 1, fontSize: 'var(--fs-sm)', color: 'var(--rose-deep)', fontWeight: 600 }}>
              聞いています...
            </div>
            <button onClick={() => setRecording(false)} style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--rose-deep)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="check" size={16} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button onClick={() => onNavigate('feedback')} style={{
              padding: '10px 14px', borderRadius: 'var(--r-pill)',
              background: 'var(--bg-soft)', color: 'var(--ink-2)',
              fontSize: 'var(--fs-xs)', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <Icon name="check" size={12} /> 終了
            </button>
            <div style={{ flex: 1 }} />
            <button onClick={() => setRecording(true)} className="pulse-ring" style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'linear-gradient(180deg, #9888CF 0%, var(--plum-deep) 100%)',
              color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(111,93,171,0.35)',
            }}>
              <Icon name="mic" size={26} strokeWidth={1.8} />
            </button>
            <div style={{ flex: 1 }} />
            <button style={{
              padding: '10px 14px', borderRadius: 'var(--r-pill)',
              background: 'var(--bg-soft)', color: 'var(--ink-2)',
              fontSize: 'var(--fs-xs)', fontWeight: 600,
            }}>
              文字入力
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const Toggle = ({ active, onClick, icon, label }) => (
  <button onClick={onClick} style={{
    padding: '6px 10px', borderRadius: 'var(--r-pill)',
    fontSize: 'var(--fs-xs)', fontWeight: 600,
    background: active ? 'var(--plum-soft)' : 'transparent',
    color: active ? 'var(--plum-deep)' : 'var(--ink-3)',
    border: '1px solid',
    borderColor: active ? 'var(--plum-soft)' : 'var(--ink-4)',
    display: 'flex', gap: 4, alignItems: 'center',
  }}>
    <Icon name={icon} size={12} /> {label}
  </button>
);

const Message = ({ role, name, ko, ruby, ja, score, hint, showRuby, showTranslation, delay }) => {
  const isAI = role === 'ai';

  if (isAI) {
    return (
      <div className="fade-up" style={{ display: 'flex', alignItems: 'flex-start', gap: 8, animationDelay: `${delay}ms` }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'linear-gradient(135deg, #F9E8E4, #ECE4F4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0,
        }}>✿</div>
        <div style={{ flex: 1, maxWidth: '85%' }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginBottom: 4, marginLeft: 4 }}>{name}</div>
          <div style={{
            background: 'white', padding: '12px 14px',
            borderRadius: '4px 18px 18px 18px',
            boxShadow: 'var(--sh-sm)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div lang="ko" style={{ fontSize: 'var(--fs-base)', fontWeight: 600, lineHeight: 1.4, color: 'var(--ink-1)' }}>
                  {ko}
                </div>
                {showRuby && (
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--rose-deep)', marginTop: 4, lineHeight: 1.4 }}>
                    {ruby}
                  </div>
                )}
                {showTranslation && (
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 4, lineHeight: 1.5 }}>
                    {ja}
                  </div>
                )}
              </div>
              <button style={{
                width: 30, height: 30, borderRadius: '50%',
                background: 'var(--plum-soft)', color: 'var(--plum-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon name="play" size={12} />
              </button>
            </div>
          </div>
          {hint && (
            <div style={{
              marginTop: 6, padding: '6px 10px',
              background: 'var(--bg-cream)', borderRadius: 'var(--r-sm)',
              fontSize: 'var(--fs-xs)', color: 'var(--gold)', fontWeight: 600,
              display: 'flex', gap: 4, alignItems: 'center', alignSelf: 'flex-start',
            }}>
              <Icon name="lightbulb" size={11} /> {hint}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-up" style={{ display: 'flex', justifyContent: 'flex-end', animationDelay: `${delay}ms` }}>
      <div style={{ maxWidth: '85%' }}>
        <div style={{
          background: 'linear-gradient(135deg, #B6A7E0 0%, var(--plum) 100%)',
          padding: '12px 14px',
          borderRadius: '18px 4px 18px 18px',
          boxShadow: '0 4px 12px rgba(139,122,199,0.2)',
        }}>
          <div lang="ko" style={{ fontSize: 'var(--fs-base)', fontWeight: 600, lineHeight: 1.4, color: 'white' }}>
            {ko}
          </div>
          {showRuby && (
            <div style={{ fontSize: 'var(--fs-xs)', color: 'rgba(255,255,255,0.85)', marginTop: 4 }}>
              {ruby}
            </div>
          )}
          {showTranslation && (
            <div style={{ fontSize: 'var(--fs-xs)', color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
              {ja}
            </div>
          )}
        </div>
        {score && (
          <div style={{
            marginTop: 6, fontSize: 'var(--fs-xs)', color: 'var(--success)',
            fontWeight: 600, textAlign: 'right',
            display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'flex-end',
          }}>
            <Icon name="check" size={11} /> 発音 {score}点 · 自然な発話
          </div>
        )}
      </div>
    </div>
  );
};

window.ChatScreen = ChatScreen;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── screen-feedback.jsx ─── */
// FeedbackScreen.jsx — フィードバック画面
const FeedbackScreen = ({ onNavigate, onBack }) => {
  const total = 87;
  const breakdown = [
    { label: '流暢さ', score: 28, max: 30, color: 'var(--plum)' },
    { label: '正確さ', score: 25, max: 30, color: 'var(--rose)' },
    { label: '語彙', score: 17, max: 20, color: '#5B9477' },
    { label: 'タスク達成', score: 17, max: 20, color: 'var(--gold)' },
  ];

  return (
    <div className="scroll-area" style={{ background: 'var(--bg-app)' }}>
      {/* Header */}
      <div style={{ padding: '6px 14px 0', display: 'flex', alignItems: 'center' }}>
        <button onClick={onBack} style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--bg-soft)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="close" size={18} />
        </button>
      </div>

      {/* Score */}
      <div style={{ padding: '20px 20px 12px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: 'var(--r-pill)',
          background: 'var(--bg-mint)', color: '#5B9477',
          fontSize: 'var(--fs-xs)', fontWeight: 600,
          marginBottom: 16,
        }}>
          <Icon name="check" size={12} /> 会話完了 · よくできました
        </div>

        <ScoreRing score={total} />

        <div style={{ marginTop: 16, fontSize: 'var(--fs-xl)', fontWeight: 700 }}>
          素敵な会話でした ✿
        </div>
        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--ink-3)', marginTop: 4 }}>
          自然なやり取りで注文を完了できました
        </div>

        <div style={{
          marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 'var(--r-pill)',
          background: 'var(--bg-cream)', color: 'var(--gold)',
          fontSize: 'var(--fs-sm)', fontWeight: 700,
        }}>
          <Icon name="sparkle" size={14} /> +45 XP 獲得
        </div>
      </div>

      {/* Breakdown */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--r-md)',
          padding: '16px 18px', boxShadow: 'var(--sh-sm)',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {breakdown.map(b => (
            <div key={b.label}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontSize: 'var(--fs-sm)', marginBottom: 6,
              }}>
                <span style={{ fontWeight: 600 }}>{b.label}</span>
                <span style={{ color: 'var(--ink-3)', fontWeight: 600 }}>
                  {b.score}<span style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-4)' }}>/{b.max}</span>
                </span>
              </div>
              <div style={{ height: 6, background: 'var(--bg-soft)', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{
                  width: `${b.score / b.max * 100}%`, height: '100%',
                  background: b.color, borderRadius: 999,
                  transition: 'width .8s ease',
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 10 }}>もっと自然に</div>
        <div style={{
          background: 'var(--bg-card)', borderRadius: 'var(--r-md)',
          padding: '14px 16px', boxShadow: 'var(--sh-sm)',
        }}>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginBottom: 6 }}>
            あなたの発話
          </div>
          <div lang="ko" style={{ fontSize: 'var(--fs-base)', fontWeight: 600, color: 'var(--ink-1)' }}>
            큰 사이즈로 주세요
          </div>
          <div style={{
            margin: '12px 0', padding: '8px 0',
            borderTop: '1px dashed var(--ink-4)', borderBottom: '1px dashed var(--ink-4)',
            display: 'flex', gap: 8, alignItems: 'center',
            fontSize: 'var(--fs-xs)', color: 'var(--rose-deep)', fontWeight: 600,
          }}>
            <Icon name="sparkle" size={12} /> ネイティブはこう言います
          </div>
          <div lang="ko" style={{ fontSize: 'var(--fs-base)', fontWeight: 600, color: 'var(--plum-deep)' }}>
            그란데 사이즈로 부탁드려요
          </div>
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 4 }}>
            グランデで · よりカフェ慣れした表現
          </div>
        </div>
      </div>

      {/* New words */}
      <div style={{ padding: '20px 20px 0' }}>
        <div style={{ fontSize: 'var(--fs-md)', fontWeight: 700, marginBottom: 10 }}>新しい単語</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { ko: '얼음', ruby: 'オルム', ja: '氷' },
            { ko: '뜨거운', ruby: 'トゥゴウン', ja: '熱い' },
            { ko: '한 잔', ruby: 'ハン ジャン', ja: '一杯' },
          ].map((w, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', borderRadius: 'var(--r-md)',
              padding: '12px 14px', boxShadow: 'var(--sh-sm)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ flex: 1 }}>
                <div lang="ko" style={{ fontSize: 'var(--fs-base)', fontWeight: 600 }}>{w.ko}</div>
                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--rose-deep)', marginTop: 2 }}>
                  {w.ruby} · {w.ja}
                </div>
              </div>
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--bg-soft)', color: 'var(--ink-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="bookmark" size={14} />
              </button>
              <button style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--plum-soft)', color: 'var(--plum-deep)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon name="play" size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ padding: '24px 20px 100px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary" onClick={() => onNavigate('home')} style={{ width: '100%' }}>
          ホームへ戻る
        </button>
        <button className="btn-ghost" onClick={() => onNavigate('chat')} style={{ width: '100%' }}>
          もう一度話す
        </button>
      </div>
    </div>
  );
};

const ScoreRing = ({ score }) => {
  const r = 56;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - score / 100);
  return (
    <div style={{ position: 'relative', width: 140, height: 140, margin: '0 auto' }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--bg-soft)" strokeWidth="10" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="url(#g)" strokeWidth="10"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }} />
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D69AAE"/>
            <stop offset="100%" stopColor="#8B7AC7"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ fontSize: 38, fontWeight: 700, lineHeight: 1, color: 'var(--ink-1)' }}>{score}</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--ink-3)', marginTop: 4 }}>/ 100</div>
      </div>
    </div>
  );
};

window.FeedbackScreen = FeedbackScreen;
  </script>

  <script type="text/babel" data-presets="react">
/* ─── app.jsx ─── */
// app.jsx — main shell wiring screens together with screen transitions
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "fontSize": "standard"
}/*EDITMODE-END*/;

const App = () => {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('home');
  const [history, setHistory] = useState(['home']);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState('forward');

  useEffect(() => {
    document.documentElement.dataset.fontsize = tweaks.fontSize;
  }, [tweaks.fontSize]);

  const navigate = (next) => {
    if (next === screen) return;
    setDirection('forward');
    setTransitioning(true);
    setTimeout(() => {
      setScreen(next);
      setHistory(h => [...h, next]);
      setTransitioning(false);
    }, 180);
  };

  const back = () => {
    setDirection('back');
    setTransitioning(true);
    setTimeout(() => {
      setHistory(h => {
        const newH = h.length > 1 ? h.slice(0, -1) : ['home'];
        setScreen(newH[newH.length - 1]);
        return newH;
      });
      setTransitioning(false);
    }, 180);
  };

  const goHome = () => {
    setDirection('back');
    setTransitioning(true);
    setTimeout(() => {
      setScreen('home');
      setHistory(['home']);
      setTransitioning(false);
    }, 180);
  };

  const renderScreen = () => {
    switch (screen) {
      case 'home': return <HomeScreen onNavigate={navigate} />;
      case 'scenarios': return <ScenariosScreen onNavigate={navigate} onBack={back} />;
      case 'preview': return <PreviewScreen onNavigate={navigate} onBack={back} />;
      case 'chat': return <ChatScreen onNavigate={navigate} onBack={back} />;
      case 'feedback': return <FeedbackScreen onNavigate={(s) => s === 'home' ? goHome() : navigate(s)} onBack={back} />;
      default: return <HomeScreen onNavigate={navigate} />;
    }
  };

  const tabItems = [
    { id: 'home', icon: 'home', label: 'ホーム' },
    { id: 'scenarios', icon: 'book', label: '場面' },
    { id: 'chat', icon: 'chat', label: '会話' },
    { id: 'progress', icon: 'chart', label: '記録' },
    { id: 'profile', icon: 'user', label: 'マイ' },
  ];

  const showTabBar = ['home', 'scenarios'].includes(screen);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-canvas)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      backgroundImage: `
        radial-gradient(circle at 12% 18%, rgba(217,154,174,0.10) 0%, transparent 38%),
        radial-gradient(circle at 88% 82%, rgba(139,122,199,0.10) 0%, transparent 38%),
        radial-gradient(circle at 78% 12%, rgba(200,163,107,0.08) 0%, transparent 32%)
      `,
    }}>
      {/* Brand mark */}
      <div style={{
        position: 'absolute', top: 24, left: 24,
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: "'Noto Sans KR', sans-serif",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 10,
          background: 'linear-gradient(135deg, #D69AAE 0%, #8B7AC7 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 14,
        }} lang="ko">말</div>
        <div>
          <div lang="ko" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1, color: 'var(--ink-1)' }}>말해봐</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>マレバ</div>
        </div>
      </div>

      <PhoneShell>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          opacity: transitioning ? 0 : 1,
          transform: transitioning
            ? (direction === 'forward' ? 'translateX(20px)' : 'translateX(-20px)')
            : 'translateX(0)',
          transition: 'opacity .18s ease, transform .18s ease',
          minHeight: 0,
        }}>
          {renderScreen()}
          {showTabBar && (
            <div className="tab-bar" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
              {tabItems.map(t => (
                <button key={t.id} className={`tab-item ${screen === t.id ? 'active' : ''}`}
                  onClick={() => {
                    if (t.id === 'home') goHome();
                    else if (t.id === 'scenarios') navigate('scenarios');
                  }}>
                  <div className="tab-icon">
                    <Icon name={t.icon} size={22} strokeWidth={screen === t.id ? 2 : 1.6} />
                  </div>
                  <div>{t.label}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </PhoneShell>

      {/* Screen flow legend */}
      <div style={{
        marginTop: 32, display: 'flex', gap: 6, flexWrap: 'wrap',
        justifyContent: 'center', alignItems: 'center',
        fontSize: 12, color: 'var(--ink-3)',
      }}>
        {[
          { id: 'home', label: 'ホーム' },
          { id: 'scenarios', label: '場面選択' },
          { id: 'preview', label: '場面プレビュー' },
          { id: 'chat', label: '会話' },
          { id: 'feedback', label: 'フィードバック' },
        ].map((s, i, arr) => (
          <React.Fragment key={s.id}>
            <button onClick={() => navigate(s.id)} style={{
              padding: '6px 12px', borderRadius: 999,
              fontSize: 12, fontWeight: 600,
              background: screen === s.id ? 'var(--ink-1)' : 'rgba(255,255,255,0.7)',
              color: screen === s.id ? 'white' : 'var(--ink-2)',
              boxShadow: screen === s.id ? '0 4px 12px rgba(42,34,48,0.2)' : 'var(--sh-sm)',
            }}>
              {i + 1}. {s.label}
            </button>
            {i < arr.length - 1 && <span style={{ color: 'var(--ink-4)' }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection title="表示設定">
          <TweakRadio label="文字サイズ"
            value={tweaks.fontSize}
            options={[
              { value: 'standard', label: '標準' },
              { value: 'large', label: '大' },
            ]}
            onChange={v => setTweak('fontSize', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>


</body></html>