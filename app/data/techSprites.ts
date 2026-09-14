/**
 * 16x16 tech icons, drawn as inventory-style item sprites.
 *
 * These are deliberately stylised marks rather than faithful logo traces: at
 * 16 pixels a logo is a silhouette, and a clean silhouette reads better than a
 * bad likeness.
 *
 * They carry their real brand colours: against an indigo UI these read as
 * distinct objects, and a recruiter scanning the page recognises the stack
 * faster from colour than from a 16-pixel silhouette. `toMono` below can flatten
 * any of them to grey if a future scheme needs it.
 */
import type { Sprite } from './sprites'

/* --- Monochrome mapping ---------------------------------------------------
   Desaturating brand colours by luminance does not work: Angular red and C#
   purple are both dark, so they collapse to near-black and vanish against a
   dark panel. Instead each sprite's own colours are ranked by luminance and
   spread across a fixed legible ramp, so every icon reads at the same strength
   whatever it started as.
   ------------------------------------------------------------------------ */

/** Perceptual luminance of an #rrggbb colour, 0-1. */
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!
}

function grey(t: number): string {
  const v = Math.round(Math.min(1, Math.max(0, t)) * 255)
  return `#${v.toString(16).padStart(2, '0').repeat(3)}`
}

/** Darkest and lightest greys any icon is allowed to use. */
const RAMP_LOW = 0.24
const RAMP_HIGH = 0.91
/** Where a single-colour icon lands: bright enough to read on a dark panel. */
const RAMP_SOLO = 0.68

export function toMono(sprite: Sprite): Sprite {
  const keys = Object.keys(sprite.palette)
  const ranked = [...keys].sort(
    (a, b) => luminance(sprite.palette[a]!) - luminance(sprite.palette[b]!),
  )

  const palette: Record<string, string> = {}
  ranked.forEach((key, i) => {
    palette[key]
      = ranked.length === 1
        ? grey(RAMP_SOLO)
        : grey(RAMP_LOW + (RAMP_HIGH - RAMP_LOW) * (i / (ranked.length - 1)))
  })

  return { rows: sprite.rows, palette }
}

/**
 * Most language marks share a chassis: a filled tile with an 8x8 glyph inset.
 * Building them from one template keeps the set visually consistent.
 */
const tile = (mark: string[], base: string, ink: string): Sprite => ({
  rows: [
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OO............OO',
    'OO............OO',
    ...mark.map(m => `OO..${m}..OO`),
    'OO............OO',
    'OO............OO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
  ],
  palette: { O: base, W: ink },
})

/* --- Marks (8x8, drawn in ink over the tile) ----------------------------- */

const MARK_T = [
  'WWWWWWWW',
  'WWWWWWWW',
  '...WW...',
  '...WW...',
  '...WW...',
  '...WW...',
  '...WW...',
  '...WW...',
]

const MARK_J = [
  '....WWWW',
  '....WWWW',
  '......WW',
  '......WW',
  '......WW',
  'WW....WW',
  'WWWWWWWW',
  '..WWWW..',
]

const MARK_HASH = [
  '.W...W..',
  '.W...W..',
  'WWWWWWW.',
  '.W...W..',
  '.W...W..',
  'WWWWWWW.',
  '.W...W..',
  '.W...W..',
]

const MARK_DOT = [
  '........',
  '........',
  '..WWWW..',
  '.WWWWWW.',
  '.WWWWWW.',
  '..WWWW..',
  '........',
  '........',
]

const MARK_SNAKE = [
  'WWWWW...',
  'W...W...',
  'W...WWWW',
  'W......W',
  'W......W',
  'WWWW...W',
  '...W...W',
  '...WWWWW',
]

/* --- Icons --------------------------------------------------------------- */

/** Vue — the chevron, in two greens. */
const vueColour: Sprite = {
  rows: [
    '................',
    '................',
    'OO............OO',
    'OOO..........OOO',
    '.OOO...DD...OOO.',
    '..OOO.DDDD.OOO..',
    '...OOODDDDOOO...',
    '....OOODDOOO....',
    '.....OOOOOO.....',
    '......OOOO......',
    '.......OO.......',
    '................',
    '................',
    '................',
    '................',
    '................',
  ],
  palette: { O: '#41b883', D: '#35495e' },
}

/** Nuxt — the mountain. */
const nuxtColour: Sprite = {
  rows: [
    '................',
    '................',
    '................',
    '.......OO.......',
    '......OOOO......',
    '......OOOO......',
    '.....OOOOOO.....',
    '....OOOOOOOO....',
    '....OOOOOOOO....',
    '...OOOOOOOOOO...',
    '..OOOOOOOOOOOO..',
    '.OOOOOOOOOOOOOO.',
    'OOOOOOOOOOOOOOOO',
    '................',
    '................',
    '................',
  ],
  palette: { O: '#00dc82' },
}

/** Node — a hex token. */
const nodeColour: Sprite = {
  rows: [
    '................',
    '......OOOO......',
    '....OOOOOOOO....',
    '..OOOOOOOOOOOO..',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    '..OOOOOOOOOOOO..',
    '....OOOOOOOO....',
    '......OOOO......',
    '................',
  ],
  palette: { O: '#5fa04e' },
}

/** Angular — the shield. */
const angularColour: Sprite = {
  rows: [
    '................',
    '.OOOOOOOOOOOOOO.',
    '.OOOOOOOOOOOOOO.',
    '.OOOOOOOOOOOOOO.',
    '..OOOOOOOOOOOO..',
    '..OOOOOOOOOOOO..',
    '...OOOOOOOOOO...',
    '...OOOOOOOOOO...',
    '....OOOOOOOO....',
    '....OOOOOOOO....',
    '.....OOOOOO.....',
    '......OOOO......',
    '.......OO.......',
    '................',
    '................',
    '................',
  ],
  palette: { O: '#dd0031' },
}

/** React — the orbit ring. */
const reactColour: Sprite = {
  rows: [
    '................',
    '.....OOOOOO.....',
    '...OO......OO...',
    '..O..........O..',
    '.O............O.',
    '.O............O.',
    'O..............O',
    'O......OO......O',
    'O......OO......O',
    'O..............O',
    '.O............O.',
    '.O............O.',
    '..O..........O..',
    '...OO......OO...',
    '.....OOOOOO.....',
    '................',
  ],
  palette: { O: '#61dafb' },
}

/** Azure — the cloud. */
const azureColour: Sprite = {
  rows: [
    '................',
    '................',
    '................',
    '......OOOO......',
    '....OOOOOOOO....',
    '...OOOOOOOOOO...',
    '.OOOOOOOOOOOOOO.',
    'OOOOOOOOOOOOOOOO',
    'OOOOOOOOOOOOOOOO',
    '.OOOOOOOOOOOOOO.',
    '................',
    '................',
    '................',
    '................',
    '................',
    '................',
  ],
  palette: { O: '#0078d4' },
}

export const vue = vueColour
export const nuxt = nuxtColour
export const node = nodeColour
export const angular = angularColour
export const react = reactColour
export const azure = azureColour

export const typescript = tile(MARK_T, '#3178c6', '#ffffff')
export const javascript = tile(MARK_J, '#f0db4f', '#23241f')
export const csharp = tile(MARK_HASH, '#8a3f9e', '#ffffff')
export const dotnet = tile(MARK_DOT, '#5f3f9e', '#ffffff')
export const python = tile(MARK_SNAKE, '#2f6fa8', '#ffd343')

export const techSprites = {
  vue,
  nuxt,
  node,
  angular,
  react,
  azure,
  typescript,
  javascript,
  csharp,
  dotnet,
  python,
}

/**
 * Maps the tech strings used across the content files to an icon.
 * Anything unmapped simply renders as a plain text chip.
 */
const BY_NAME: Record<string, Sprite> = {
  'vue.js': vue,
  'vue': vue,
  'nuxt.js': nuxt,
  'nuxt': nuxt,
  'nuxt.js ssr': nuxt,
  'node.js': node,
  'angular': angular,
  'react': react,
  'next.js': react,
  'azure': azure,
  'typescript': typescript,
  'javascript': javascript,
  'c#': csharp,
  'c#/.net': csharp,
  '.net': dotnet,
  'python': python,
  'django': python,
}

export const techIcon = (name: string): Sprite | undefined =>
  BY_NAME[name.trim().toLowerCase()]
