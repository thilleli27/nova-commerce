/* Nova Commerce – Dashboard */

/* ---------- Menu mobile (burger) ---------- */
const burger = document.getElementById("burger");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mobileQuery = window.matchMedia("(max-width: 767px)");

function openMenu() {
  sidebar.classList.add("is-open");
  overlay.hidden = false;
  burger.setAttribute("aria-expanded", "true");
  burger.setAttribute("aria-label", "Fermer le menu");
  sidebar.querySelector("a").focus();
}

function closeMenu({ restoreFocus = true } = {}) {
  sidebar.classList.remove("is-open");
  overlay.hidden = true;
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-label", "Ouvrir le menu");
  if (restoreFocus) burger.focus();
}

burger.addEventListener("click", () => {
  sidebar.classList.contains("is-open") ? closeMenu() : openMenu();
});
overlay.addEventListener("click", () => closeMenu());

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) closeMenu();
});

// Si on repasse en tablette/desktop avec le menu ouvert, on le referme proprement.
mobileQuery.addEventListener("change", (event) => {
  if (!event.matches && sidebar.classList.contains("is-open")) closeMenu({ restoreFocus: false });
});

/* ---------- Recherche ---------- */
const search = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const searchToggle = document.getElementById("search-toggle");

searchToggle.addEventListener("click", () => {
  const visible = search.classList.toggle("is-visible");
  searchToggle.setAttribute("aria-expanded", String(visible));
  if (visible) searchInput.focus();
});

search.addEventListener("submit", (event) => event.preventDefault());

// Raccourci ⌘K / Ctrl+K
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    if (mobileQuery.matches && !search.classList.contains("is-visible")) searchToggle.click();
    searchInput.focus();
  }
});

/* ---------- Graphique chiffre d'affaires ---------- */
const chartData = [
  { day: "Lun", value: 1200 },
  { day: "Mar", value: 5800 },
  { day: "Mer", value: 5200 },
  { day: "Jeu", value: 13100 },
  { day: "Ven", value: 13800 },
  { day: "Sam", value: 19600 },
  { day: "Dim", value: 27400 },
];
const chartMax = 30000;
const chartTicks = [0, 10000, 20000, 30000];
const chartEl = document.getElementById("chart");
const SVG_NS = "http://www.w3.org/2000/svg";

function svg(tag, attrs = {}) {
  const el = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
  return el;
}

// Courbe lissée (Catmull-Rom convertie en Bézier) : elle passe par tous les points.
function smoothPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

function renderChart() {
  const width = chartEl.clientWidth - parseFloat(getComputedStyle(chartEl).paddingLeft) * 2;
  const height = chartEl.clientHeight - parseFloat(getComputedStyle(chartEl).paddingBottom);
  if (width <= 0 || height <= 0) return;

  const pad = { top: 8, right: 8, bottom: 24, left: 32 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const compact = width < 480; // Mobile : un libellé de jour sur deux, comme la maquette

  const x = (i) => pad.left + (innerW / (chartData.length - 1)) * i;
  const y = (v) => pad.top + innerH - (v / chartMax) * innerH;

  const root = svg("svg", { viewBox: `0 0 ${width} ${height}`, "aria-hidden": "true", focusable: "false" });

  const primary = getComputedStyle(document.documentElement).getPropertyValue("--color-primary").trim();
  const defs = svg("defs");
  const gradient = svg("linearGradient", { id: "chart-gradient", x1: "0", y1: "0", x2: "0", y2: "1" });
  gradient.append(
    svg("stop", { offset: "0%", "stop-color": primary, "stop-opacity": "0.15" }),
    svg("stop", { offset: "100%", "stop-color": primary, "stop-opacity": "0" })
  );
  defs.append(gradient);
  root.append(defs);

  chartTicks.forEach((tick) => {
    root.append(svg("line", { class: "chart__grid", x1: pad.left, x2: width - pad.right, y1: y(tick), y2: y(tick) }));
    const label = svg("text", { class: "chart__label", x: pad.left - 8, y: y(tick) + 3, "text-anchor": "end" });
    label.textContent = tick === 0 ? "0" : `${tick / 1000}k`;
    root.append(label);
  });

  chartData.forEach((point, i) => {
    if (compact && i % 2 === 1) return;
    const label = svg("text", { class: "chart__label", x: x(i), y: height - 4, "text-anchor": "middle" });
    label.textContent = point.day;
    root.append(label);
  });

  const points = chartData.map((p, i) => ({ x: x(i), y: y(p.value) }));
  const line = smoothPath(points);
  const last = points[points.length - 1];

  root.append(
    svg("path", { class: "chart__area", d: `${line} L ${last.x} ${y(0)} L ${points[0].x} ${y(0)} Z` }),
    svg("path", { class: "chart__line", d: line })
  );
  points.forEach((p) => root.append(svg("circle", { class: "chart__point", cx: p.x, cy: p.y, r: 3.5 })));

  chartEl.replaceChildren(root);
}

new ResizeObserver(renderChart).observe(chartEl);
