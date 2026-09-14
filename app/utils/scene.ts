/**
 * Procedural pixel-art scene generation.
 *
 * The background illustration is built from code rather than drawn as an image:
 * the pixel grid stays mathematically exact at any viewport size, the whole
 * scene costs a few KB instead of a few hundred, it re-colours with the theme,
 * and the layers can be parallaxed independently.
 *
 * Everything is generated from a seeded PRNG so the server and the client
 * produce byte-identical markup and hydration stays silent.
 *
 * Composition follows the rule that makes pixel scenes read: silhouettes need
 * something to be silhouetted *against*. A banded gradient sky and a glowing
 * core give the dark architecture something to bite into. Bands rather than a
 * smooth gradient, because hard colour steps are the point.
 */

export interface Rect {
  x: number
  y: number
  w: number
  h: number
  f: string
  /** Opacity, when not fully opaque. */
  o?: number
  /** Twinkle animation offset, in ms. Only set for stars. */
  t?: number
}

export interface Scene {
  width: number
  height: number
  far: Rect[]
  mid: Rect[]
  near: Rect[]
}

/** Scene pixels. Each one renders as a chunky block once scaled up. */
const W = 256
const H = 144
/** Where the floor meets the back wall. */
const HORIZON = 84
/**
 * The light source sits right of centre, so the left two thirds stay dark and
 * the hero copy has somewhere quiet to live.
 */
const LIGHT_X = 178

function makeRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 0x1_0000_0000
  }
}

/** Mix two #rrggbb colours. */
function mix(a: string, b: string, t: number): string {
  const pa = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16))
  const out = pa.map((v, i) => Math.round(v + (pb[i]! - v) * t))
  return `#${out.map(v => v.toString(16).padStart(2, '0')).join('')}`
}

const palette = {
  skyTop: '#070707',
  skyHorizon: '#2c2c2c',
  star: '#e0e0e0',
  starDim: '#6e6e6e',
  glow: '#4c4c4c',
  beamHot: '#cfcfcf',
  hot: '#ffffff',
  floor: '#0b0b0b',
  floorLine: '#323232',
  rackMid: '#101010',
  rackNear: '#050505',
  rimMid: '#606060',
  rimNear: '#3c3c3c',
  ledOn: '#e8e8e8',
  ledDim: '#9a9a9a',
}

/**
 * A rack: a dark slab with a lit edge facing the core, and a few status LEDs.
 * The rim light is what separates one slab from the next.
 */
function rack(
  out: Rect[],
  x: number,
  top: number,
  w: number,
  fill: string,
  rim: string,
  rng: () => number,
) {
  out.push({ x, y: top, w, h: HORIZON - top, f: fill })

  // Rim on the edge that faces the light.
  const rimX = x + w / 2 < LIGHT_X ? x + w - 1 : x
  out.push({ x: rimX, y: top, w: 1, h: HORIZON - top, f: rim, o: 0.8 })
  // Top edge catches light too.
  out.push({ x, y: top, w, h: 1, f: rim, o: 0.55 })
  // Contact shadow, so the slab sits on the floor instead of hovering.
  out.push({ x: x - 1, y: HORIZON, w: w + 2, h: 2, f: '#020202', o: 0.85 })

  for (let y = top + 4; y < HORIZON - 3; y += 6) {
    if (rng() < 0.45) continue
    out.push({
      x: rimX === x ? x + 2 : x + 1,
      y,
      w: 2,
      h: 1,
      f: rng() < 0.18 ? palette.ledDim : palette.ledOn,
      o: 0.55 + rng() * 0.45,
    })
  }
}

export function buildScene(seed = 20260914): Scene {
  const rng = makeRng(seed)
  const far: Rect[] = []
  const mid: Rect[] = []
  const near: Rect[] = []

  // --- Far: banded sky, glow, stars, the beam and the core ---------------
  const BANDS = 14
  const bandH = Math.ceil(HORIZON / BANDS)
  for (let i = 0; i < BANDS; i++) {
    far.push({
      x: 0,
      y: i * bandH,
      w: W,
      h: bandH,
      f: mix(palette.skyTop, palette.skyHorizon, (i / (BANDS - 1)) ** 1.7),
    })
  }

  // Stars, kept in the darker upper bands where they actually show.
  for (let i = 0; i < 80; i++) {
    const x = Math.floor(rng() * W)
    const y = Math.floor(rng() * (HORIZON - 30))
    const bright = rng() < 0.28
    far.push({
      x,
      y,
      w: 1,
      h: 1,
      f: bright ? palette.star : palette.starDim,
      o: 0.35 + rng() * 0.6,
      t: bright ? Math.floor(rng() * 4000) : undefined,
    })
  }

  // The shaft: a cone of light spilling upward from the core. Stacked bands
  // widening as they rise, each a hard step fainter — light as a staircase,
  // which is the only way it can look right on a pixel grid.
  for (let i = 0; i < 26; i++) {
    const y = HORIZON - 3 - i * 3
    if (y < -3) break
    const half = Math.round(4 + i * 1.7)
    far.push({
      x: LIGHT_X - half,
      y,
      w: half * 2,
      h: 3,
      f: palette.glow,
      o: Math.max(0.03, 0.3 * (1 - i / 26)),
    })
  }

  // The core: a bright slab standing on the horizon line.
  far.push({ x: LIGHT_X - 5, y: HORIZON - 26, w: 10, h: 26, f: palette.glow, o: 0.55 })
  far.push({ x: LIGHT_X - 3, y: HORIZON - 22, w: 6, h: 22, f: palette.beamHot, o: 0.75 })
  far.push({ x: LIGHT_X - 1, y: HORIZON - 30, w: 2, h: 30, f: palette.hot })

  // --- Mid: the floor and the receding racks -----------------------------
  mid.push({ x: 0, y: HORIZON, w: W, h: H - HORIZON, f: palette.floor })

  // The pool of light where the shaft meets the floor: a trapezoid widening
  // toward the viewer, so the core reads as standing on the ground rather
  // than floating in front of it.
  for (let j = 0; j < 12; j++) {
    const yy = HORIZON + j * 2
    if (yy >= H) break
    const half = Math.round(9 + j * 7)
    mid.push({
      x: LIGHT_X - half,
      y: yy,
      w: half * 2,
      h: 2,
      f: palette.glow,
      o: Math.max(0.03, 0.26 * (1 - j / 12)),
    })
  }

  // Floor bands, spaced wider as they come toward the viewer.
  let y = HORIZON + 2
  let gap = 2
  while (y < H) {
    mid.push({ x: 0, y, w: W, h: 1, f: palette.floorLine, o: 0.35 })
    y += gap
    gap = Math.round(gap * 1.45) + 1
  }

  // A handful of lines converging on the core. Few and faint: this is floor,
  // not the subject.
  for (let k = -5; k <= 5; k++) {
    if (k === 0) continue
    const endX = LIGHT_X + k * 52
    for (let yy = HORIZON; yy < H; yy += 3) {
      const p = (yy - HORIZON) / (H - HORIZON)
      const x = Math.round(LIGHT_X + (endX - LIGHT_X) * p * p)
      if (x < -4 || x > W + 4) break
      mid.push({ x, y: yy, w: 1, h: 3, f: palette.floorLine, o: 0.4 })
    }
  }

  const midCols = [
    { x: 96, w: 9, top: 58 },
    { x: 112, w: 7, top: 64 },
    { x: 126, w: 5, top: 69 },
    { x: 214, w: 7, top: 64 },
    { x: 228, w: 9, top: 58 },
  ]
  for (const c of midCols) rack(mid, c.x, c.top, c.w, palette.rackMid, palette.rimMid, rng)

  // --- Near: the framing architecture ------------------------------------
  const nearCols = [
    { x: -2, w: 26, top: 4 },
    { x: 28, w: 19, top: 20 },
    { x: 52, w: 14, top: 36 },
    { x: 72, w: 10, top: 48 },
    { x: 244, w: 14, top: 20 },
  ]
  for (const c of nearCols) rack(near, c.x, c.top, c.w, palette.rackNear, palette.rimNear, rng)

  // Overhead trays, tying the frame together across the top.
  near.push({ x: 0, y: 0, w: W, h: 4, f: palette.rackNear })
  near.push({ x: 0, y: 4, w: W, h: 1, f: palette.rimNear, o: 0.5 })

  return { width: W, height: H, far, mid, near }
}

/** A quieter variant for sections that sit behind dense text. */
export function buildQuietScene(seed = 77001): Scene {
  const scene = buildScene(seed)
  return {
    ...scene,
    near: scene.near.filter(r => r.h > 6),
  }
}

/* --- Serialisation --------------------------------------------------------
   The scene is ~390 rects per layer set. Rendering those as live DOM nodes is
   wasteful: they never change, they are not interactive, and they are not
   exposed to assistive tech. Serialising each layer to a data-URI background
   collapses hundreds of nodes into one, which keeps the document light — the
   whole point of the page being that its author cares about that.
   ------------------------------------------------------------------------ */

function rectToSvg(r: Rect): string {
  const o = r.o === undefined ? '' : ` opacity="${Number(r.o.toFixed(3))}"`
  return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${r.f}"${o}/>`
}

/** One parallax layer as an SVG data URI, ready for `background-image`. */
export function layerToDataUri(rects: Rect[], width = W, height = H): string {
  const body = rects.map(rectToSvg).join('')
  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" `
      + `shape-rendering="crispEdges" preserveAspectRatio="xMidYMid slice">${body}</svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/** The stars that animate. Kept as real nodes so CSS can drive them. */
export function twinklingStars(scene: Scene): Rect[] {
  return scene.far.filter(r => r.t !== undefined)
}

/** Everything that never changes, safe to flatten into an image. */
export function staticLayers(scene: Scene) {
  return {
    far: scene.far.filter(r => r.t === undefined),
    mid: scene.mid,
    near: scene.near,
  }
}
