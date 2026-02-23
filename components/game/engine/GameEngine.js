import InputManager from './InputManager'
import SpriteSheet from './SpriteSheet'
import Player from './Player'
import Room from './Room'
import Renderer from './Renderer'

export default class GameEngine {
  constructor(canvas, callbacks = {}) {
    this.callbacks = callbacks
    this.input = new InputManager()
    this.sprites = new SpriteSheet()
    this.room = new Room()
    this.player = new Player(this.room.getSpawnX(), this.room.getSpawnY())
    this.renderer = new Renderer(canvas, this.sprites)
    this.paused = false
    this.running = false
    this.rafId = null
    this.nearbyPortal = null
    // Track which portal was just exited so we don't re-trigger it
    this._cooldownPortalId = null
  }

  start() {
    this.input.attach()
    this.running = true
    this._loop()
  }

  stop() {
    this.running = false
    this.input.detach()
    if (this.rafId) {
      cancelAnimationFrame(this.rafId)
      this.rafId = null
    }
  }

  pause() {
    this.paused = true
  }

  resume(exitedPortalId) {
    // Set cooldown so the same portal won't fire until player leaves it
    this._cooldownPortalId = exitedPortalId || null
    this.paused = false
  }

  _loop() {
    if (!this.running) return

    if (!this.paused) {
      this._update()
    }
    this._render()

    this.rafId = requestAnimationFrame(() => this._loop())
  }

  _update() {
    // Check ESC
    if (this.input.isEscPressed()) {
      this.input.consumeEsc()
      if (this.callbacks.onExit) {
        this.callbacks.onExit()
      }
      return
    }

    const direction = this.input.getDirection()
    this.player.update(direction, this.room)

    // Update portals
    this.room.portals.forEach(p => p.update())

    // Check portal proximity and collision
    this.nearbyPortal = null
    for (const portal of this.room.portals) {
      const touching = portal.isPlayerTouching(this.player)
      const nearby = portal.isPlayerNearby(this.player)

      // Clear cooldown once player has left the portal area
      if (this._cooldownPortalId === portal.id && !touching) {
        this._cooldownPortalId = null
      }

      // Skip if this portal is on cooldown
      if (this._cooldownPortalId === portal.id) continue

      if (touching) {
        this.pause()
        if (this.callbacks.onPortalEnter) {
          this.callbacks.onPortalEnter(portal.id)
        }
        return
      }
      if (nearby) {
        this.nearbyPortal = portal
      }
    }
  }

  _render() {
    this.renderer.render(this.room, this.player, this.nearbyPortal)
  }

  setTouchDirection(dir) {
    this.input.setTouchDirection(dir)
  }
}
