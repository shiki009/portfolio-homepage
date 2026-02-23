import { TILE_SIZE, PORTAL_SIZE, PORTAL_HITBOX } from './constants'

export default class Portal {
  constructor({ id, label, col, row, color }) {
    this.id = id
    this.label = label
    this.x = col * TILE_SIZE + (TILE_SIZE - PORTAL_SIZE) / 2
    this.y = row * TILE_SIZE + (TILE_SIZE - PORTAL_SIZE) / 2
    this.width = PORTAL_SIZE
    this.height = PORTAL_SIZE
    this.color = color
    this.glowPhase = Math.random() * Math.PI * 2
    this.glowSpeed = 0.05
  }

  update() {
    this.glowPhase += this.glowSpeed
  }

  getGlowAlpha() {
    return 0.4 + 0.4 * Math.sin(this.glowPhase)
  }

  isPlayerNearby(player) {
    const cx = this.x + this.width / 2
    const cy = this.y + this.height / 2
    const px = player.getCenterX()
    const py = player.getCenterY()
    const dist = Math.hypot(cx - px, cy - py)
    return dist < PORTAL_HITBOX + 20
  }

  isPlayerTouching(player) {
    const cx = this.x + this.width / 2
    const cy = this.y + this.height / 2
    const px = player.getCenterX()
    const py = player.getCenterY()
    const dist = Math.hypot(cx - px, cy - py)
    return dist < PORTAL_HITBOX
  }
}
