theRace.EntityCar = class extends theRace.Entity {
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
    this.collisionMap = [[[0, 0], [this.size / 1.2, 0]]]
  }
  render ({ viewport, ctx }) {
    super.render(...arguments)
    ctx.strokeStyle = '#f890e7'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(this.size / 1.2, 0)
    ctx.stroke()
    ctx.fillStyle = '#fff'
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
    this.angle += this.rv // * (this.ax * this.ay)
    this.vx += this.ax
    this.vy += this.ay
    if (this.game.level.collides(this, {
      x: this.x + this.vx * Math.cos(this.angle),
      y: this.y + this.vy * Math.sin(this.angle)
    })) {
      // console.log('collides')
    } else {
      this.x += this.vx * Math.cos(this.angle)
      this.y += this.vy * Math.sin(this.angle)
    }
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
}
