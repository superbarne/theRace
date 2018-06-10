'use strict'

export class Entity {
  constructor (x, y, angle, game) {
    this.x = x
    this.y = y
    this.angle = angle
    this.game = game
    this.collisionMap = []
    this.colides = false
  }
  render ({ viewport, ctx }) {
    ctx.save()
    ctx.translate(this.x + viewport.x, this.y + viewport.y)
    ctx.rotate(this.angle)
  }

  update () { }
}
