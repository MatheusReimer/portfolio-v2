/**
 * Hand-authored pixel art, stored as data.
 *
 * Each sprite is a grid of single characters; every character maps to a colour
 * in its palette, and "." means transparent. Rendering happens in PixelSprite,
 * which merges horizontal runs of the same colour into single <rect> elements —
 * so a 16x16 sprite costs a few dozen nodes, not 256.
 */

export interface Sprite {
  rows: string[]
  palette: Record<string, string>
}

/* Shared palette entries keep the sprites consistent with the CSS tokens. */
const INK = '#1b1f2e'
const ACCENT = '#ffb43f'
const SHIRT = '#2b3654'
const SKIN = '#e8b48c'
const HAIR = '#2a2118'
const MOUTH = '#a8624a'

/** 16x16 bust. A stylised mascot, not a portrait — swap in a real pixelated photo any time. */
export const avatar: Sprite = {
  rows: [
    '................',
    '.....KKKKKK.....',
    '....KKKKKKKK....',
    '...KKKKKKKKKK...',
    '...HKKKKKKKKH...',
    '...HKSSSSSSKH...',
    '...HSSSSSSSSH...',
    '...HSEESSEESH...',
    '...HSSSSSSSSH...',
    '...HSSSMMSSSH...',
    '....SSSSSSSS....',
    '.....SSSSSS.....',
    '......SSSS......',
    '...BBBBBBBBBB...',
    '..BBBBBBBBBBBB..',
    '..BBBBBBBBBBBB..',
  ],
  palette: { K: HAIR, S: SKIN, E: INK, M: MOUTH, H: ACCENT, B: SHIRT },
}

/** 8x8 envelope. */
export const mail: Sprite = {
  rows: [
    '........',
    'OOOOOOOO',
    'OO....OO',
    'O.O..O.O',
    'O..OO..O',
    'O......O',
    'OOOOOOOO',
    '........',
  ],
  palette: { O: 'currentColor' },
}

/** 8x8 diagonal arrow — external links. */
export const arrow: Sprite = {
  rows: [
    '........',
    '...OOOOO',
    '......OO',
    '.....O.O',
    '....O..O',
    '...O....',
    '..O.....',
    '........',
  ],
  palette: { O: 'currentColor' },
}

/** 8x8 chevron — list bullets and prompts. */
export const chevron: Sprite = {
  rows: [
    '........',
    '.OO.....',
    '..OO....',
    '...OO...',
    '...OO...',
    '..OO....',
    '.OO.....',
    '........',
  ],
  palette: { O: 'currentColor' },
}

/** 8x8 diamond — metric bullets. */
export const diamond: Sprite = {
  rows: [
    '........',
    '...OO...',
    '..OOOO..',
    '.OOOOOO.',
    '.OOOOOO.',
    '..OOOO..',
    '...OO...',
    '........',
  ],
  palette: { O: 'currentColor' },
}

export const sprites = { avatar, mail, arrow, chevron, diamond }
