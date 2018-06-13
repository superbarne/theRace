'use strict'

theRace.EntityCar = class extends theRace.Entity {
  constructor () {
    super(...arguments)
    // Geschwindigkeit in beiden Achsen
    this.vx = 0
    this.vy = 0
    // Beschleunigung in beiden Achsen
    this.ax = 0
    this.ay = 0
    // Rotationsgeschwindigkeit
    this.rv = 0
    // Basiswerte für das Fahrzeug
    this.accelerationForce = 0.06
    this.decelerationForce = 0.02
    this.friction = 0.9
    this.rotationSpeed = 0.005
    this.size = 20
    // Die Kollisionsmap, hier sehr einfach gehlaten mit nur einer Strecke
    // das Array kann noch encapselt werden, war aber einfacher zu iterireren
    this.collisionMap = [[[0, 0], [this.size / 1.2, 0]]]
  }
  render ({ viewport, ctx }) {
    super.render(...arguments) // zeichenn des Fahrezeuges
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
    // prüfe ob die Zukünftige position zu Kollision führt
    if (this.game.level.collides(this, {
      x: this.x + this.vx * Math.cos(this.angle),
      y: this.y + this.vy * Math.sin(this.angle)
    })) {
      // console.log('collides')
    } else {
      this.x += this.vx * Math.cos(this.angle)
      this.y += this.vy * Math.sin(this.angle)
    }
    // wende die Reibung auf die Geschwindigkeit und die Beschelunigung an
    this.ax *= this.friction
    this.ay *= this.friction
    this.vx *= this.friction
    this.vy *= this.friction
    this.rv *= this.friction
  }

  // Bewegungsfunktionen

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
