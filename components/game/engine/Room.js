import { COLS, ROWS, TILE_SIZE, PORTAL_DEFS } from './constants'
import Portal from './Portal'

export default class Room {
  constructor() {
    this.tiles = this._buildTileMap()
    this.portals = PORTAL_DEFS.map(def => new Portal(def))
  }

  _buildTileMap() {
    const map = []
    for (let r = 0; r < ROWS; r++) {
      const row = []
      for (let c = 0; c < COLS; c++) {
        // 1 = wall, 0 = floor
        if (r === 0 || r === ROWS - 1 || c === 0 || c === COLS - 1) {
          row.push(1)
        } else {
          row.push(0)
        }
      }
      map.push(row)
    }
    return map
  }

  collidesWithWall(x, y, w, h) {
    // Check the four corners of the bounding box
    const corners = [
      { x: x, y: y },
      { x: x + w - 1, y: y },
      { x: x, y: y + h - 1 },
      { x: x + w - 1, y: y + h - 1 },
    ]

    for (const corner of corners) {
      const col = Math.floor(corner.x / TILE_SIZE)
      const row = Math.floor(corner.y / TILE_SIZE)
      if (row < 0 || row >= ROWS || col < 0 || col >= COLS) return true
      if (this.tiles[row][col] === 1) return true
    }

    return false
  }

  getSpawnX() {
    return Math.floor(COLS / 2) * TILE_SIZE + 2
  }

  getSpawnY() {
    return Math.floor(ROWS / 2) * TILE_SIZE + 2
  }
}
