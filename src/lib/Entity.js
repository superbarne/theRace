'use strict'
/**
 * Die Standart Entity Klasse
 */
theRace.Entity = class {
  constructor (x, y, angle, game) {
    this.x = x
    this.y = y
    this.angle = angle
    this.game = game
    this.collisionMap = []
    this.colides = false
  }
  render ({ viewport, ctx }) { // das ENtity wird relativ zum viewport verschoben, da wir eine mit dem Speiler mitbewegende Kamera haben
    ctx.save()
    ctx.translate(this.x + viewport.x, this.y + viewport.y)
    ctx.rotate(this.angle)
  }

  update () { }
}
