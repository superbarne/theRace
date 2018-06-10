import { Socket } from './Socket.js'

export class SocketControl {
  constructor (mapping, entity) {
    this.entity = entity
    this.controls = {
      accelerate: false,
      decelerate: false,
      left: false,
      right: false
    }

    this.socket = new Socket()
    this.socket.on('orientation', ({ beta, gamma }) => {
      this.controls.right = false
      this.controls.left = false
      this.controls.accelerate = false
      this.controls.decelerate = false
      if (beta > 25) this.controls.right = true
      if (beta < -25) this.controls.left = true
      if (gamma > -45) this.controls.accelerate = true
      if (gamma < 45) this.controls.decelerate = true
    })
  }

  update () {
    const { controls, entity } = this
    if (controls.accelerate) entity.accelerate()
    if (controls.decelerate) entity.decelerate()
    if (controls.left) entity.left()
    if (controls.right) entity.right()
  }
}
