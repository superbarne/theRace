import { Entity } from './Entity.js'

export class EntityBarrel extends Entity {
  render ({ viewport, ctx }) {
    super.render(...arguments)
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(0, 0, 15, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }
}
