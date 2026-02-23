import { PLAYER_SIZE } from './constants'

// Crash Bandicoot-inspired pixel art colors
const C = {
  fur: '#FF6B00',       // orange fur
  furDark: '#CC5500',   // darker orange for shading
  furLight: '#FF9640',  // lighter orange highlights
  belly: '#FFB366',     // lighter belly
  jeans: '#2255BB',     // blue jeans
  jeansDark: '#1A4490', // jeans shadow
  shoes: '#DD2222',     // red sneakers
  shoeSole: '#881111',  // shoe sole
  eyeWhite: '#FFFFFF',
  eyeBlack: '#000000',
  eyebrow: '#442200',
  nose: '#DD4400',
  mouth: '#CC3300',
  outline: '#221100',
}

export default class SpriteSheet {
  constructor() {
    this.sprites = {}
    this._generate()
  }

  _generate() {
    const dirs = ['down', 'up', 'left', 'right']
    dirs.forEach(dir => {
      this.sprites[`player_${dir}_0`] = this._drawCrash(dir, 0)
      this.sprites[`player_${dir}_1`] = this._drawCrash(dir, 1)
    })
  }

  _createCanvas(w, h) {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    return c
  }

  // px helper - draws a pixel at scale (2x)
  _px(ctx, x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
  }

  _drawCrash(dir, frame) {
    const s = PLAYER_SIZE
    const c = this._createCanvas(s, s)
    const ctx = c.getContext('2d')

    // Crash Bandicoot: big head, small body, blue jeans, red shoes
    // Sprite is 28x28 — let's use every pixel

    const walkOffset = frame === 1 ? 1 : 0

    if (dir === 'down') {
      this._drawCrashFront(ctx, walkOffset)
    } else if (dir === 'up') {
      this._drawCrashBack(ctx, walkOffset)
    } else if (dir === 'left') {
      this._drawCrashSide(ctx, walkOffset, false)
    } else {
      this._drawCrashSide(ctx, walkOffset, true)
    }

    return c
  }

  _drawCrashFront(ctx, walk) {
    // --- BIG HEAD (rows 0-13) ---
    // Ears
    this._rect(ctx, 3, 3, 2, 3, C.fur)
    this._rect(ctx, 23, 3, 2, 3, C.fur)

    // Head shape - wide oval
    this._rect(ctx, 6, 0, 16, 2, C.fur)        // top of head
    this._rect(ctx, 5, 2, 18, 2, C.fur)         // upper head
    this._rect(ctx, 4, 4, 20, 4, C.fur)         // mid head
    this._rect(ctx, 5, 8, 18, 3, C.furLight)    // lower face / muzzle area
    this._rect(ctx, 6, 11, 16, 2, C.furLight)   // chin

    // Hair / mohawk spikes on top
    this._rect(ctx, 9, 0, 3, 1, C.furDark)
    this._rect(ctx, 14, 0, 3, 1, C.furDark)
    this._rect(ctx, 11, 0, 2, 1, C.fur)

    // Eyes (big Crash eyes)
    this._rect(ctx, 8, 5, 4, 4, C.eyeWhite)
    this._rect(ctx, 16, 5, 4, 4, C.eyeWhite)
    // Pupils
    this._rect(ctx, 10, 6, 2, 2, C.eyeBlack)
    this._rect(ctx, 17, 6, 2, 2, C.eyeBlack)
    // Eyebrows (thick)
    this._rect(ctx, 7, 4, 5, 1, C.eyebrow)
    this._rect(ctx, 16, 4, 5, 1, C.eyebrow)

    // Nose
    this._rect(ctx, 12, 8, 4, 2, C.nose)

    // Big goofy grin
    this._rect(ctx, 9, 10, 10, 2, C.eyeWhite)
    this._rect(ctx, 9, 10, 1, 2, C.mouth)
    this._rect(ctx, 18, 10, 1, 2, C.mouth)
    this._rect(ctx, 9, 11, 10, 1, C.mouth)

    // --- BODY (rows 13-19) ---
    this._rect(ctx, 8, 13, 12, 6, C.fur)       // orange torso
    this._rect(ctx, 10, 14, 8, 4, C.belly)     // lighter belly patch

    // Arms
    this._rect(ctx, 5, 14, 3, 5, C.fur)
    this._rect(ctx, 20, 14, 3, 5, C.fur)
    // Hands / gloves
    this._rect(ctx, 4, 18, 4, 2, C.furLight)
    this._rect(ctx, 20, 18, 4, 2, C.furLight)

    // --- JEANS (rows 19-23) ---
    const legSpread = walk
    this._rect(ctx, 9 - legSpread, 19, 5, 5, C.jeans)
    this._rect(ctx, 15 + legSpread, 19, 5, 5, C.jeans)
    // Belt
    this._rect(ctx, 9, 19, 11, 1, C.jeansDark)

    // --- RED SHOES (rows 24-27) ---
    this._rect(ctx, 8 - legSpread, 24, 6, 3, C.shoes)
    this._rect(ctx, 15 + legSpread, 24, 6, 3, C.shoes)
    // Soles
    this._rect(ctx, 8 - legSpread, 27, 6, 1, C.shoeSole)
    this._rect(ctx, 15 + legSpread, 27, 6, 1, C.shoeSole)
  }

  _drawCrashBack(ctx, walk) {
    // Ears
    this._rect(ctx, 3, 3, 2, 3, C.fur)
    this._rect(ctx, 23, 3, 2, 3, C.fur)

    // Head (back view - all fur)
    this._rect(ctx, 6, 0, 16, 2, C.furDark)
    this._rect(ctx, 5, 2, 18, 2, C.fur)
    this._rect(ctx, 4, 4, 20, 4, C.fur)
    this._rect(ctx, 5, 8, 18, 3, C.fur)
    this._rect(ctx, 6, 11, 16, 2, C.furDark)

    // Mohawk spikes from behind
    this._rect(ctx, 10, 0, 3, 1, C.furLight)
    this._rect(ctx, 14, 0, 3, 1, C.furLight)

    // Body
    this._rect(ctx, 8, 13, 12, 6, C.fur)

    // Arms
    this._rect(ctx, 5, 14, 3, 5, C.fur)
    this._rect(ctx, 20, 14, 3, 5, C.fur)
    this._rect(ctx, 4, 18, 4, 2, C.furLight)
    this._rect(ctx, 20, 18, 4, 2, C.furLight)

    // Jeans
    const legSpread = walk
    this._rect(ctx, 9 - legSpread, 19, 5, 5, C.jeans)
    this._rect(ctx, 15 + legSpread, 19, 5, 5, C.jeans)
    this._rect(ctx, 9, 19, 11, 1, C.jeansDark)

    // Shoes
    this._rect(ctx, 8 - legSpread, 24, 6, 3, C.shoes)
    this._rect(ctx, 15 + legSpread, 24, 6, 3, C.shoes)
    this._rect(ctx, 8 - legSpread, 27, 6, 1, C.shoeSole)
    this._rect(ctx, 15 + legSpread, 27, 6, 1, C.shoeSole)
  }

  _drawCrashSide(ctx, walk, flipRight) {
    const mx = (x, w) => flipRight ? (28 - x - w) : x

    // Head (side profile - slightly narrower)
    this._rect(ctx, mx(6, 14), 0, 14, 2, C.fur)
    this._rect(ctx, mx(5, 16), 2, 16, 2, C.fur)
    this._rect(ctx, mx(4, 18), 4, 18, 4, C.fur)
    this._rect(ctx, mx(5, 16), 8, 16, 3, C.furLight)
    this._rect(ctx, mx(6, 14), 11, 14, 2, C.furLight)

    // Ear (only the visible one)
    this._rect(ctx, mx(3, 2), 3, 2, 3, C.fur)

    // Mohawk
    this._rect(ctx, mx(9, 4), 0, 4, 1, C.furDark)

    // Eye (one visible)
    this._rect(ctx, mx(7, 4), 5, 4, 4, C.eyeWhite)
    this._rect(ctx, mx(8, 2), 6, 2, 2, C.eyeBlack)
    // Eyebrow
    this._rect(ctx, mx(6, 5), 4, 5, 1, C.eyebrow)

    // Snout sticking out
    this._rect(ctx, mx(18, 4), 7, 4, 3, C.furLight)
    this._rect(ctx, mx(19, 3), 8, 3, 2, C.nose)

    // Grin
    this._rect(ctx, mx(14, 6), 10, 6, 2, C.eyeWhite)
    this._rect(ctx, mx(14, 6), 11, 6, 1, C.mouth)

    // Body
    this._rect(ctx, mx(9, 10), 13, 10, 6, C.fur)
    this._rect(ctx, mx(11, 6), 14, 6, 4, C.belly)

    // Arm (one visible, in front)
    this._rect(ctx, mx(7, 3), 14, 3, 5, C.fur)
    this._rect(ctx, mx(6, 4), 18, 4, 2, C.furLight)

    // Jeans
    const lo = walk
    this._rect(ctx, mx(10, 4), 19, 4, 5 - lo, C.jeans)
    this._rect(ctx, mx(14, 4), 19, 4, 5 - (walk ? 0 : 0), C.jeans)
    this._rect(ctx, mx(10, 8), 19, 8, 1, C.jeansDark)

    // Shoes
    this._rect(ctx, mx(9 - lo, 6), 24, 6, 3, C.shoes)
    this._rect(ctx, mx(13 + lo, 6), 24 - lo, 6, 3 + lo, C.shoes)
    this._rect(ctx, mx(9 - lo, 6), 27, 6, 1, C.shoeSole)
    this._rect(ctx, mx(13 + lo, 6), 27, 6, 1, C.shoeSole)
  }

  _rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }

  get(name) {
    return this.sprites[name] || null
  }
}
