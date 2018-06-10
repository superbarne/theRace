import { Entity } from './Entity.js'
import { EntityBarrel } from './EntityBarrel.js'
import { EntityBarricade } from './EntityBarricade.js'

export class EntityCar extends Entity {
  constructor () {
    super(...arguments)
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
    this.rv = 0
    this.accelerationForce = 0.06
    this.decelerationForce = 0.02
    this.friction = 0.9
    this.rotationSpeed = 0.005
    this.size = 20
    this.collisionMap = [[[0,0], [this.size*2, 0]]]
  }
  render ({ viewport, ctx }) {
    super.render(...arguments)
    ctx.strokeStyle = 'blue'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(this.size / 1.2, 0)
    ctx.stroke()
    ctx.fillStyle = this.color
    ctx.fillRect(
      this.size / -2,
      this.size / -2,
      this.size,
      this.size
    )
    ctx.strokeRect(
      this.size / -2,
      this.size / -2,
      this.size,
      this.size
    )
    ctx.restore()
  }

  update () {
    super.update(...arguments)
    if(this.colides) {
      this.vx = 0
      this.vy = 0
    }
    this.angle += this.rv // * (this.ax * this.ay)
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx * Math.cos(this.angle)
    this.y += this.vy * Math.sin(this.angle)
    this.ax *= this.friction
    this.ay *= this.friction
    this.vx *= this.friction
    this.vy *= this.friction
    this.rv *= this.friction
  }

  accelerate () {
    this.ax += this.accelerationForce
    this.ay += this.accelerationForce
  }

  decelerate () {
    this.ax -= this.decelerationForce
    this.ay -= this.decelerationForce
  }

  left () {
    this.rv -= this.rotationSpeed
  }

  right () {
    this.rv += this.rotationSpeed
  }

  placeBarrel () {
    this.game.entities.push(new EntityBarrel(
      this.x,
      this.y,
      this.angle, 20,
      this
    ))
  }

  placeBarricade () {
    this.game.entities.push(new EntityBarricade(
      this.x,
      this.y,
      this.angle, 20,
      this
    ))
    console.log('barrels: ', JSON.stringify(this.game.entities.map(item => ({
      type: item.constructor.name,
      x: item.x,
      y: item.y,
      angle: item.angle
    }))))
  }
}
