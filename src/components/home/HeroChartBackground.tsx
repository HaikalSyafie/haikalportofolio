const WIDTH = 800;
const HEIGHT = 300;
const POINT_COUNT = 48;

/** Deterministic pseudo-random hash (no Math.random — must match on server/client). */
function hash(i: number, seed: number) {
  const h = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return h - Math.floor(h);
}

function generateSeries(seed: number) {
  const values: number[] = [];
  let v = 50;
  for (let i = 0; i < POINT_COUNT; i++) {
    v += (hash(i, seed) - 0.5) * 16;
    v = Math.max(15, Math.min(85, v));
    values.push(v);
  }
  return values;
}

function toPoints(values: number[]) {
  const step = WIDTH / (values.length - 1);
  return values.map((v, i) => `${i * step},${HEIGHT - (v / 100) * HEIGHT}`).join(" ");
}

const segmentA = toPoints(generateSeries(1));
const segmentB = toPoints(generateSeries(2));

/**
 * Faint, slowly-scrolling stock-chart-style polyline behind the hero text.
 * Decorative only — respects prefers-reduced-motion via the .hero-chart-track
 * rule in globals.css.
 */
export default function HeroChartBackground() {
  return (
    <div className="hero-chart absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="hero-chart-track flex h-full w-[200vw]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="h-full w-[100vw] shrink-0">
          <polyline points={segmentA} fill="none" stroke="#7c8cf5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" className="h-full w-[100vw] shrink-0">
          <polyline points={segmentB} fill="none" stroke="#7c8cf5" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </div>
  );
}
