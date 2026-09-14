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
   Rendered in phosphor greens rather than natural skin tones: this is a face
   drawn by a CRT, not a photograph. Two frames so it can blink.
   ---------------------------------------------------------------------- */

const PHOSPHOR = {
  K: '#123a1c', // hair / darkest
  S: '#2f8f4f', // mid tone
  L: '#57d17f', // light tone
  E: '#04170a', // eyes / ink
  H: '#ffb000', // headphones (amber against the green)
  B: '#1b5730', // shoulders
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

export const sprites = {
  avatar,
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
