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

/** Scene pixels. Each one renders as a chunky block once scaled up.
 *
 *  The 256x112 ratio (~2.3:1) is chosen to sit close to the hero's own shape.
 *  The scene is painted with background-size: cover, so a mismatched ratio gets
 *  centre-cropped — at 16:9 the top of the frame was being cut away entirely,
 *  taking the flight paths with it. Matching the ratio keeps the whole scene,
 *  sky and street, actually on screen. */
export const SCENE_W = 256
export const SCENE_H = 112
const W = SCENE_W
const H = SCENE_H
/** Where the ground meets the sky. */
export const HORIZON = 58
/**
 * The light source sits right of centre, so the left two thirds stay dark and
 * the hero copy has somewhere quiet to live.
 */
const LIGHT_X = 178

/**
 * No building may rise above this line, and nothing that flies may drop below
 * it. Aircraft cross the sky strictly above the skyline — they never pass in
 * front of, or into, a building.
 */
export const SKYLINE_CEILING = 24
/** The road surface, where street traffic runs. */
export const ROAD_Y = 88

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
  skyTop: '#0e0f1c',
  skyHorizon: '#353c72',
  star: '#cfd6ff',
  starDim: '#5b639c',
  glow: '#8a6a1f',
  beamHot: '#ffc53d',
  hot: '#fff3c4',
  floor: '#121427',
  floorLine: '#3a4070',
  rackMid: '#1a1d33',
  rackNear: '#0b0c17',
  rimMid: '#6a73b8',
  rimNear: '#3d4478',
  ledOn: '#4fd6c4',
  ledDim: '#ff7d6e',
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
  out.push({ x: x - 1, y: HORIZON, w: w + 2, h: 2, f: '#070812', o: 0.85 })

  // Lit windows: a grid down the face, with enough dark ones that the building
  // reads as occupied rather than as a lamp.
  for (let wy = top + 3; wy < HORIZON - 2; wy += 3) {
    for (let wx = x + 1; wx < x + w - 1; wx += 3) {
      if (rng() < 0.52) continue
      out.push({
        x: wx,
        y: wy,
        w: 1,
        h: 2,
        f: rng() < 0.12 ? palette.ledDim : palette.ledOn,
        o: 0.35 + rng() * 0.5,
      })
    }
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
    const y = Math.floor(rng() * (HORIZON - 34))
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

  // A low wash of light over the middle distance — city glow, not a beam.
  // There is nothing standing here any more for a shaft to come from.
  for (let i = 0; i < 12; i++) {
    const y = HORIZON - 2 - i * 2
    if (y < 0) break
    const half = Math.round(10 + i * 2.4)
    far.push({
      x: LIGHT_X - half,
      y,
      w: half * 2,
      h: 2,
      f: palette.glow,
      o: Math.max(0.02, 0.13 * (1 - i / 12)),
    })
  }

  // --- Mid: the street and the buildings ---------------------------------
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

  // --- Street level ------------------------------------------------------
  // Asphalt, kerbs, and a dashed centre line. The road runs across the frame
  // rather than receding, so cars can cross it at a constant size.
  mid.push({ x: 0, y: ROAD_Y - 8, w: W, h: 2, f: palette.floorLine, o: 0.5 })
  mid.push({ x: 0, y: ROAD_Y - 6, w: W, h: 18, f: '#0c0e1b' })
  mid.push({ x: 0, y: ROAD_Y - 6, w: W, h: 1, f: palette.floorLine, o: 0.7 })
  mid.push({ x: 0, y: ROAD_Y + 11, w: W, h: 1, f: palette.floorLine, o: 0.7 })

  for (let x = 2; x < W; x += 12) {
    mid.push({ x, y: ROAD_Y + 3, w: 6, h: 1, f: palette.floorLine, o: 0.85 })
  }

  // City light reflected on wet asphalt.
  for (let i = 0; i < 26; i++) {
    mid.push({
      x: Math.floor(rng() * W),
      y: ROAD_Y - 5 + Math.floor(rng() * 4),
      w: 1,
      h: 1,
      f: palette.ledOn,
      o: 0.08 + rng() * 0.14,
    })
  }

  // Distant blocks, small and set back.
  const midCols = [
    { x: 96, w: 11, top: 36 },
    { x: 112, w: 9, top: 41 },
    { x: 126, w: 7, top: 45 },
    { x: 140, w: 6, top: 48 },
    { x: 200, w: 7, top: 46 },
    { x: 212, w: 9, top: 40 },
    { x: 226, w: 11, top: 34 },
  ]
  for (const c of midCols) rack(mid, c.x, c.top, c.w, palette.rackMid, palette.rimMid, rng)

  // --- Near: the framing architecture ------------------------------------
  // The near blocks frame the view. Their tops are held at or below
  // SKYLINE_CEILING so the sky above stays clear for air traffic.
  const nearCols = [
    { x: -2, w: 26, top: 24 },
    { x: 28, w: 19, top: 30 },
    { x: 52, w: 15, top: 36 },
    { x: 72, w: 11, top: 42 },
    { x: 238, w: 20, top: 26 },
  ]
  for (const c of nearCols) rack(near, c.x, c.top, c.w, palette.rackNear, palette.rimNear, rng)

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
