import { Entity } from './Entity.js'

export class EntityBarricade extends Entity {
  render ({ viewport, ctx }) {
    const size = 20
    const length = 150
    super.render(...arguments)
    ctx.fillStyle = '#FF0000'
    ctx.fillRect(
      size / -2,
      size / -2,
      size + length,
      size
    )
    ctx.strokeRect(
      size / -2,
      size / -2,
      size + length,
      size
    )
    ctx.restore()
  }
}
