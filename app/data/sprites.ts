/**
 * Hand-authored pixel art, stored as data.
 *
 * Each sprite is a grid of single characters; every character maps to a colour
 * in its palette, and "." means transparent. Rendering happens in PixelSprite,
 * which merges horizontal runs of the same colour into single <rect> elements —
 * so a 16x16 sprite costs a few dozen nodes, not 256.
 *
 * Icons use "currentColor" so a single sprite can be tinted by whatever context
 * it sits in, the way an icon font would be.
 */

export interface Sprite {
  rows: string[]
  palette: Record<string, string>
}

/* --- Avatar --------------------------------------------------------------
   A Game Boy Color character sprite: warm skin against a cool shirt, with the
   headphones in teal so they read as a separate object. Two frames so it can
   blink.
   ---------------------------------------------------------------------- */

const PHOSPHOR = {
  K: '#3a2f52', // hair
  S: '#d99a6c', // skin shadow
  L: '#f2c49b', // skin
  E: '#14121f', // eyes / ink
  H: '#4fd6c4', // headphones — teal, so they read against the warm skin
  B: '#3a4070', // shoulders
}

/* Eyes are two pixels tall, so blinking can drop the upper half and leave the
   lower half as a closed lid. Both frames are written out in full — generating
   one from the other by string surgery is too easy to break silently. */

const HEAD_TOP = [
  '................',
  '.....KKKKKK.....',
  '....KKKKKKKK....',
  '...KKKKKKKKKK...',
  '...HKKKKKKKKH...',
  '...HKLLLLLLKH...',
  '...HLLLLLLLLH...',
]

const HEAD_BOTTOM = [
  '...HLLLSSLLLH...',
  '....LLLLLLLL....',
  '.....SSSSSS.....',
  '......SSSS......',
  '...BBBBBBBBBB...',
  '..BBBBBBBBBBBB..',
  '..BBBBBBBBBBBB..',
]

/** Eyes open. */
export const avatar: Sprite = {
  rows: [...HEAD_TOP, '...HLEELLEELH...', '...HLEELLEELH...', ...HEAD_BOTTOM],
  palette: PHOSPHOR,
}

/** Eyes closed — upper eye row becomes skin, lower row reads as the lid. */
export const avatarBlink: Sprite = {
  rows: [...HEAD_TOP, '...HLLLLLLLLH...', '...HLEELLEELH...', ...HEAD_BOTTOM],
  palette: PHOSPHOR,
}

/* --- Icons ---------------------------------------------------------------
   All 8x8, all single-colour, all inheriting currentColor.
   ---------------------------------------------------------------------- */

const mono = { O: 'currentColor' }

const icon = (rows: string[]): Sprite => ({ rows, palette: mono })

/** Envelope — contact. */
export const mail = icon([
  '........',
  'OOOOOOOO',
  'OO....OO',
  'O.O..O.O',
  'O..OO..O',
  'O......O',
  'OOOOOOOO',
  '........',
])

/** Diagonal arrow — external links. */
export const arrow = icon([
  '........',
  '...OOOOO',
  '......OO',
  '.....O.O',
  '....O..O',
  '...O....',
  '..O.....',
  '........',
])

/** Chevron — list bullets and prompts. */
export const chevron = icon([
  '........',
  '.OO.....',
  '..OO....',
  '...OO...',
  '...OO...',
  '..OO....',
  '.OO.....',
  '........',
])

/** Diamond — metric bullets. */
export const diamond = icon([
  '........',
  '...OO...',
  '..OOOO..',
  '.OOOOOO.',
  '.OOOOOO.',
  '..OOOO..',
  '...OO...',
  '........',
])

/** Terminal window — the site mark and the hero. */
export const terminal = icon([
  'OOOOOOOO',
  'O......O',
  'O.O....O',
  'O..O...O',
  'O.O....O',
  'O..OOO.O',
  'O......O',
  'OOOOOOOO',
])

/** Lightning bolt — performance. */
export const bolt = icon([
  '....OO..',
  '...OO...',
  '..OO....',
  '.OOOOO..',
  '....OO..',
  '...OO...',
  '..OO....',
  '........',
])

/** Ascending bars — scalability. */
export const bars = icon([
  '........',
  '......OO',
  '......OO',
  '...OO.OO',
  '...OO.OO',
  'OO.OO.OO',
  'OO.OO.OO',
  '........',
])

/** Stacked plates — front-end architecture. */
export const layers = icon([
  '........',
  '..OOOO..',
  '.OOOOOO.',
  '..OOOO..',
  '........',
  '..OOOO..',
  '.OOOOOO.',
  '..OOOO..',
])

/** Connected nodes — system design. */
export const nodes = icon([
  'OO....OO',
  'OO....OO',
  '..O..O..',
  '...OO...',
  '...OO...',
  '..O..O..',
  'OO....OO',
  'OO....OO',
])

/** Chip with pins — AI-assisted delivery. */
export const chip = icon([
  '..O..O..',
  'OOOOOOOO',
  'O......O',
  'O.OOOO.O',
  'O.OOOO.O',
  'O......O',
  'OOOOOOOO',
  '..O..O..',
])

/** Briefcase — experience. */
export const briefcase = icon([
  '..OOOO..',
  '..O..O..',
  'OOOOOOOO',
  'O......O',
  'OOO..OOO',
  'O......O',
  'OOOOOOOO',
  '........',
])

/** Folder — selected work. */
export const folder = icon([
  'OOO.....',
  'O..O....',
  'OOOOOOO.',
  'O.....O.',
  'O.....O.',
  'O.....O.',
  'OOOOOOO.',
  '........',
])

/** Gear — skills and toolkit. */
export const gear = icon([
  '..OOOO..',
  '.OOOOOO.',
  'OOO..OOO',
  'OO....OO',
  'OO....OO',
  'OOO..OOO',
  '.OOOOOO.',
  '..OOOO..',
])

/** Person — about. */
export const person = icon([
  '..OOOO..',
  '..OOOO..',
  '...OO...',
  '.OOOOOO.',
  'OOOOOOOO',
  'OOOOOOOO',
  'OO.OO.OO',
  'OO....OO',
])

/** Map pin — location. */
export const pin = icon([
  '..OOOO..',
  '.OOOOOO.',
  '.OO..OO.',
  '.OO..OO.',
  '.OOOOOO.',
  '..OOOO..',
  '...OO...',
  '...OO...',
])

/** Calendar — dates. */
export const calendar = icon([
  '.O....O.',
  'OOOOOOOO',
  'OOOOOOOO',
  'O......O',
  'O.OO.O.O',
  'O......O',
  'O.O.OO.O',
  'OOOOOOOO',
])

/** Building — employer. */
export const building = icon([
  '.OOOOOO.',
  '.O.OO.O.',
  '.OOOOOO.',
  '.O.OO.O.',
  '.OOOOOO.',
  '.O.OO.O.',
  '.OOOOOO.',
  '.OO..OO.',
])

/** Branch — GitHub. */
export const branch = icon([
  '.OO..OO.',
  '.OO..OO.',
  '.OO..OO.',
  '.OOOOOO.',
  '..OOOO..',
  '...OO...',
  '..OOOO..',
  '..OOOO..',
])

/** Badge — LinkedIn. */
export const badge = icon([
  'OOOOOOOO',
  'O......O',
  'O.OO...O',
  'O......O',
  'O.OO.O.O',
  'O.OO.O.O',
  'O......O',
  'OOOOOOOO',
])

/* --- Rocket ---------------------------------------------------------------
   A 16x24 booster, lit from the left: the two right-hand columns of the hull
   are a darker tone so the body reads as a cylinder rather than a rectangle.
   Three flame frames cycle underneath it.
   ---------------------------------------------------------------------- */

const ROCKET = {
  O: '#e8ebff', // hull, lit side
  D: '#7b83b8', // hull, shadow side
  W: '#4fd6c4', // window
  F: '#ff7d6e', // fins
  G: '#565e9c', // engine bell
}

export const rocket: Sprite = {
  rows: [
    '.......OD.......',
    '......OODD......',
    '......OODD......',
    '.....OOOODD.....',
    '.....OWWWWD.....',
    '.....OWWWWD.....',
    '.....OOOODD.....',
    '.....OOOODD.....',
    '....OOOOOODD....',
    '....OOOOOODD....',
    '....OOOOOODD....',
    '....OOOOOODD....',
    '....OOOOOODD....',
    '....OOOOOODD....',
    '...FOOOOOODDF...',
    '..FFOOOOOODDFF..',
    '.FFFOOOOOODDFFF.',
    'FFFFOOOOOODDFFFF',
    '....OOOOOODD....',
    '....OGGGGGGD....',
    '....OGGGGGGD....',
    '.....GGGGGG.....',
    '......GGGG......',
    '................',
  ],
  palette: ROCKET,
}

const FLAME = {
  W: '#fff3c4', // white hot core
  Y: '#ffc53d', // gold
  O: '#ff7d6e', // coral tip
}

/** Three exhaust frames, cycled in hard steps — fire does not cross-fade. */
export const flameFrames: Sprite[] = [
  {
    rows: [
      '.....YWWWWY.....',
      '.....YWWWWY.....',
      '......YYYY......',
      '......OOOO......',
      '.......OO.......',
      '................',
      '................',
      '................',
    ],
    palette: FLAME,
  },
  {
    rows: [
      '.....YWWWWY.....',
      '.....YWWWWY.....',
      '.....YWWWWY.....',
      '......YYYY......',
      '......OOOO......',
      '......OOOO......',
      '.......OO.......',
      '................',
    ],
    palette: FLAME,
  },
  {
    rows: [
      '.....YWWWWY.....',
      '......YYYY......',
      '......OOOO......',
      '.......OO.......',
      '................',
      '................',
      '................',
      '................',
    ],
    palette: FLAME,
  },
]

export const sprites = {
  avatar,
  rocket,
  avatarBlink,
  mail,
  arrow,
  chevron,
  diamond,
  terminal,
  bolt,
  bars,
  layers,
  nodes,
  chip,
  briefcase,
  folder,
  gear,
  person,
  pin,
  calendar,
  building,
  branch,
  badge,
}

/** Icons referenced by data id, so content files stay free of presentation. */
export const capabilityIcons: Record<string, Sprite> = {
  performance: bolt,
  scalability: bars,
  'frontend-architecture': layers,
  'system-design': nodes,
  'ai-delivery': chip,
}

export const socialIcons: Record<string, Sprite> = {
  github: branch,
  linkedin: badge,
}

/* --- Serialisation --------------------------------------------------------
   A 16x16 tech icon costs 25-40 rects. With ~46 chips on the page that is well
   over a thousand nodes for decoration nothing interacts with, so chips render
   their icon as a background image instead. Memoised: the same handful of
   sprites repeat all over the page.
   ------------------------------------------------------------------------ */

const uriCache = new WeakMap<Sprite, string>()

/** A sprite as an SVG data URI, with horizontal runs merged as in PixelSprite. */
export function spriteToDataUri(sprite: Sprite): string {
  const cached = uriCache.get(sprite)
  if (cached) return cached

  const width = sprite.rows[0]?.length ?? 0
  const height = sprite.rows.length
  const parts: string[] = []

  sprite.rows.forEach((row, y) => {
    let start = 0
    let current = ''

    const flush = (end: number) => {
      if (!current) return
      const fill = sprite.palette[current]
      if (fill) {
        parts.push(
          `<rect x="${start}" y="${y}" width="${end - start}" height="1" fill="${fill}"/>`,
        )
      }
    }

    for (let x = 0; x < row.length; x++) {
      const ch = row[x] ?? '.'
      if (ch !== current) {
        flush(x)
        current = ch === '.' ? '' : ch
        start = x
      }
    }
    flush(row.length)
  })

  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" `
      + `shape-rendering="crispEdges">${parts.join('')}</svg>`
  const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`

  uriCache.set(sprite, uri)
  return uri
}

/**
 * A sprite as a mask data URI.
 *
 * Single-colour icons cannot become background images without baking a colour
 * in, which would lose `currentColor` tinting. A mask keeps the tint — the
 * element paints `currentColor` and the mask cuts the shape out of it — while
 * still collapsing ~30 rects into one node.
 */
const maskCache = new WeakMap<Sprite, string>()

export function spriteToMaskUri(sprite: Sprite): string {
  const cached = maskCache.get(sprite)
  if (cached) return cached

  const width = sprite.rows[0]?.length ?? 0
  const height = sprite.rows.length
  const parts: string[] = []

  sprite.rows.forEach((row, y) => {
    let start = 0
    let on = false

    const flush = (end: number) => {
      if (!on) return
      parts.push(`<rect x="${start}" y="${y}" width="${end - start}" height="1"/>`)
    }

    for (let x = 0; x < row.length; x++) {
      const filled = (row[x] ?? '.') !== '.'
      if (filled !== on) {
        flush(x)
        on = filled
        start = x
      }
    }
    flush(row.length)
  })

  const svg
    = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" `
      + `shape-rendering="crispEdges" fill="#000">${parts.join('')}</svg>`
  const uri = `data:image/svg+xml,${encodeURIComponent(svg)}`

  maskCache.set(sprite, uri)
  return uri
}

/** True when every colour in the palette is currentColor. */
export function isMonochrome(sprite: Sprite): boolean {
  const values = Object.values(sprite.palette)
  return values.length > 0 && values.every(v => v === 'currentColor')
}
