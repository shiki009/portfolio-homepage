import {
  CANVAS_WIDTH, CANVAS_HEIGHT, TILE_SIZE,
  COLS, ROWS, COLORS
} from './constants'

export default class Renderer {
  constructor(canvas, spriteSheet) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.sprites = spriteSheet
    this.canvas.width = CANVAS_WIDTH
    this.canvas.height = CANVAS_HEIGHT
    this.ctx.imageSmoothingEnabled = false
  }

  clear() {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  }

  drawRoom(room) {
    const ctx = this.ctx
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const x = c * TILE_SIZE
        const y = r * TILE_SIZE
        if (room.tiles[r][c] === 1) {
          // Wall
          ctx.fillStyle = COLORS.wall
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)
          // Wall top highlight
          ctx.fillStyle = COLORS.wallTop
          ctx.fillRect(x, y, TILE_SIZE, 4)
        } else {
          // Checkerboard floor
          ctx.fillStyle = (r + c) % 2 === 0 ? COLORS.floor : COLORS.floorAlt
          ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE)
        }
      }
    }
  }

  drawPortals(portals) {
    const ctx = this.ctx
    portals.forEach(portal => {
      const cx = portal.x + portal.width / 2
      const cy = portal.y + portal.height / 2
      const r = portal.width / 2

      // Outer glow
      const glowAlpha = portal.getGlowAlpha()
      ctx.beginPath()
      ctx.arc(cx, cy, r + 8, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0, 255, 204, ${glowAlpha * 0.3})`
      ctx.fill()

      // Portal frame
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.strokeStyle = COLORS.portalFrame
      ctx.lineWidth = 3
      ctx.stroke()

      // Inner fill
      ctx.beginPath()
      ctx.arc(cx, cy, r - 3, 0, Math.PI * 2)
      ctx.fillStyle = portal.color + '40'
      ctx.fill()

      // Inner swirl effect
      const swirl = portal.glowPhase
      ctx.beginPath()
      ctx.arc(cx + Math.cos(swirl) * 6, cy + Math.sin(swirl) * 6, r / 3, 0, Math.PI * 2)
      ctx.fillStyle = portal.color + '80'
      ctx.fill()

      // Label above portal
      ctx.fillStyle = COLORS.hudText
      ctx.font = 'bold 11px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(portal.label, cx, portal.y - 6)
    })
  }

  drawPlayer(player) {
    const sprite = this.sprites.get(player.getSpriteName())
    if (sprite) {
      this.ctx.drawImage(sprite, Math.round(player.x), Math.round(player.y))
    }
  }

  drawHUD(nearbyPortal) {
    const ctx = this.ctx

    // Controls hint
    ctx.fillStyle = COLORS.hudBg
    ctx.fillRect(0, 0, CANVAS_WIDTH, 24)
    ctx.fillStyle = COLORS.hudText
    ctx.font = '12px monospace'
    ctx.textAlign = 'left'
    ctx.fillText('WASD / Arrow Keys to move  |  ESC to exit', 10, 16)

    // Portal prompt
    if (nearbyPortal) {
      const text = `Press ENTER or walk into ${nearbyPortal.label}`
      const tw = ctx.measureText(text).width
      const bx = (CANVAS_WIDTH - tw) / 2 - 10
      ctx.fillStyle = COLORS.hudBg
      ctx.fillRect(bx, CANVAS_HEIGHT - 36, tw + 20, 28)
      ctx.fillStyle = COLORS.portalGlow
      ctx.font = 'bold 14px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(text, CANVAS_WIDTH / 2, CANVAS_HEIGHT - 16)
    }
  }

  render(room, player, nearbyPortal) {
    this.clear()
    this.drawRoom(room)
    this.drawPortals(room.portals)
    this.drawPlayer(player)
    this.drawHUD(nearbyPortal)
  }
}
