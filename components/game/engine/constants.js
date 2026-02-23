export const CANVAS_WIDTH = 640
export const CANVAS_HEIGHT = 480
export const TILE_SIZE = 32
export const COLS = CANVAS_WIDTH / TILE_SIZE   // 20
export const ROWS = CANVAS_HEIGHT / TILE_SIZE  // 15

export const PLAYER_SPEED = 2.5
export const PLAYER_SIZE = 28
export const PORTAL_SIZE = 48
export const PORTAL_HITBOX = 40

export const COLORS = {
  floor: '#2a1a4e',
  floorAlt: '#231442',
  wall: '#1a0f35',
  wallTop: '#3d2a6e',
  portalFrame: '#ffd700',
  portalGlow: '#00ffcc',
  portalInner: '#0a0a2e',
  hudText: '#ffffff',
  hudBg: 'rgba(0, 0, 0, 0.6)',
  playerOrange: '#ff6b35',
  playerJeans: '#3366cc',
  playerShoes: '#ffffff',
  playerSkin: '#ffcc99',
  playerHair: '#ff6b35',
}

export const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
}

export const PORTAL_DEFS = [
  { id: 'experience', label: 'Experience', col: 10, row: 2, color: '#ff6b6b' },
  { id: 'projects', label: 'Projects', col: 17, row: 7, color: '#4ecdc4' },
  { id: 'skills', label: 'Skills', col: 10, row: 12, color: '#ffe66d' },
  { id: 'about', label: 'About', col: 2, row: 7, color: '#a29bfe' },
]
