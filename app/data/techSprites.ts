/**
 * 16x16 multi-colour tech icons, drawn as inventory-style item sprites.
 *
 * These are deliberately stylised marks rather than faithful logo traces: at
 * 16 pixels a logo is a silhouette, and a clean silhouette reads better than a
 * bad likeness. They carry their own brand-ish colour so they pop as objects
 * against the monochrome phosphor UI.
 */
import type { Sprite } from './sprites'

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
export const vue: Sprite = {
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
export const nuxt: Sprite = {
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
export const node: Sprite = {
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
export const angular: Sprite = {
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
export const react: Sprite = {
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
export const azure: Sprite = {
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
