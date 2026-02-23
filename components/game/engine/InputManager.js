import { DIRECTIONS } from './constants'

export default class InputManager {
  constructor() {
    this.keys = {}
    this.touchDir = null
    this._onKeyDown = this._onKeyDown.bind(this)
    this._onKeyUp = this._onKeyUp.bind(this)
  }

  attach() {
    window.addEventListener('keydown', this._onKeyDown)
    window.addEventListener('keyup', this._onKeyUp)
  }

  detach() {
    window.removeEventListener('keydown', this._onKeyDown)
    window.removeEventListener('keyup', this._onKeyUp)
    this.keys = {}
    this.touchDir = null
  }

  _onKeyDown(e) {
    this.keys[e.code] = true
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
      e.preventDefault()
    }
  }

  _onKeyUp(e) {
    this.keys[e.code] = false
  }

  setTouchDirection(dir) {
    this.touchDir = dir
  }

  getDirection() {
    // Touch input takes priority
    if (this.touchDir) return this.touchDir

    if (this.keys['ArrowUp'] || this.keys['KeyW']) return DIRECTIONS.UP
    if (this.keys['ArrowDown'] || this.keys['KeyS']) return DIRECTIONS.DOWN
    if (this.keys['ArrowLeft'] || this.keys['KeyA']) return DIRECTIONS.LEFT
    if (this.keys['ArrowRight'] || this.keys['KeyD']) return DIRECTIONS.RIGHT

    return null
  }

  isEscPressed() {
    return !!this.keys['Escape']
  }

  consumeEsc() {
    this.keys['Escape'] = false
  }
}
