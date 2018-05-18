import { Entity } from './Entity.js'

export class EntityBarrel extends Entity {
  constructor() {
    super(...arguments)
  }

  render({ viewport, ctx }) {
    const size = 20
    super.render(...arguments)
    ctx.lineWidth = 3
    ctx.beginPath();
    ctx.arc(0,0,15,0,2*Math.PI);
    ctx.fillStyle = '#FFFF00'
    ctx.fill();
    ctx.stroke();


    ctx.restore();
  }

}