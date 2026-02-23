import { PLAYER_SIZE, PLAYER_SPEED, DIRECTIONS } from './constants'

export default class Player {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.width = PLAYER_SIZE
    this.height = PLAYER_SIZE
    this.facing = DIRECTIONS.DOWN
    this.frame = 0
    this.frameTimer = 0
    this.frameDuration = 10 // ticks per frame
    this.moving = false
  }

  update(direction, room) {
    this.moving = false

    if (!direction) return

    this.facing = direction
    this.moving = true

    let dx = 0, dy = 0
    if (direction === DIRECTIONS.UP) dy = -PLAYER_SPEED
    if (direction === DIRECTIONS.DOWN) dy = PLAYER_SPEED
    if (direction === DIRECTIONS.LEFT) dx = -PLAYER_SPEED
    if (direction === DIRECTIONS.RIGHT) dx = PLAYER_SPEED

    // Try X movement
    const nextX = this.x + dx
    if (!room.collidesWithWall(nextX, this.y, this.width, this.height)) {
      this.x = nextX
    }

    // Try Y movement
    const nextY = this.y + dy
    if (!room.collidesWithWall(this.x, nextY, this.width, this.height)) {
      this.y = nextY
    }

    // Walk animation
    this.frameTimer++
    if (this.frameTimer >= this.frameDuration) {
      this.frameTimer = 0
      this.frame = (this.frame + 1) % 2
    }
  }

  getSpriteName() {
    const f = this.moving ? this.frame : 0
    return `player_${this.facing}_${f}`
  }

  getCenterX() {
    return this.x + this.width / 2
  }

  getCenterY() {
    return this.y + this.height / 2
  }
}
