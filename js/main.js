// ── PLOTLY CONFIG BASE ─────────────────────────────────────────────────────
// Usá plotlyConfig y plotlyLayout como punto de partida en cada gráfica
const plotlyLayout = {
  paper_bgcolor: 'transparent',
  plot_bgcolor:  'transparent',
  font: { family: "'JetBrains Mono', monospace", color: '#8890a4', size: 11 },
  margin: { l: 55, r: 30, t: 20, b: 50 },
  dragmode: 'zoom',
  xaxis: {
    gridcolor:     'rgba(255,255,255,0.05)',
    zerolinecolor: 'rgba(255,255,255,0.12)',
    linecolor:     'rgba(255,255,255,0.08)',
    tickfont: { size: 11 },
    autorange: true,
  },
  yaxis: {
    gridcolor:     'rgba(255,255,255,0.05)',
    zerolinecolor: 'rgba(255,255,255,0.12)',
    linecolor:     'rgba(255,255,255,0.08)',
    tickfont: { size: 11 },
    autorange: true,
  },
  legend: {
    bgcolor: 'rgba(0,0,0,0)',
    bordercolor: 'rgba(255,255,255,0.08)',
    borderwidth: 1,
    font: { size: 11 },
    orientation: 'h',
    y: -0.18,
  },
  hoverlabel: {
    bgcolor: '#1a1e28',
    bordercolor: 'rgba(255,255,255,0.14)',
    font: { family: "'JetBrains Mono', monospace", size: 11 },
  },
};

const plotlyConfig = {
  scrollZoom:  true,
  doubleClick: 'reset',
  responsive:  true,
  displayModeBar: true,
  modeBarButtonsToRemove: ['toImage', 'sendDataToCloud', 'lasso2d', 'select2d', 'autoScale2d'],
  displaylogo: false,
};

// ── COLORES DE CURVAS ──────────────────────────────────────────────────────
const COLORS = {
  blue:   '#4f8ef7',
  green:  '#7ecba1',
  orange: '#e07b54',
  purple: '#a78bfa',
  cyan:   '#38bdf8',
  yellow: '#facc15',
};

// ── ZOOM RESET ─────────────────────────────────────────────────────────────
function resetZoom(plotId, extraAxes = []) {
  const update = {
    'xaxis.autorange': true,
    'yaxis.autorange': true,
  };
  extraAxes.forEach(ax => { update[`${ax}.autorange`] = true; });
  Plotly.relayout(plotId, update);
}

// ── FETCH JSON de /data/ ───────────────────────────────────────────────────
async function loadData(filename) {
  try {
    const res = await fetch(`../data/${filename}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(`[loadData] Error cargando ${filename}:`, e);
    return null;
  }
}

// Versión para páginas en raíz (index.html)
async function loadDataRoot(filename) {
  try {
    const res = await fetch(`data/${filename}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.error(`[loadDataRoot] Error cargando ${filename}:`, e);
    return null;
  }
}

// ── MATHJAX: forzar re-render tras inserción dinámica ─────────────────────
function renderMath(element = document.body) {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([element]).catch(console.error);
  }
}

// ── NAV ACTIVO ─────────────────────────────────────────────────────────────
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.header-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && path.endsWith(href)) {
      a.classList.add('active');
    }
  });
}

// ── FORMATEO ──────────────────────────────────────────────────────────────
function fmt(n, decimals = 4) {
  return Number(n).toFixed(decimals);
}

function fmtSci(n) {
  return Number(n).toExponential(2);
}

// ── INIT ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
});
