import { Socket } from './Socket.js'

export class KeyboardControl {
  constructor (mapping, entity) {
    this.entity = entity
    this.controls = {
      accelerate: false,
      decelerate: false,
      left: false,
      right: false
    }

    const setControl = (key, val) => {
      let control = mapping[key]
      if (control) this.controls[control] = val
    }

    document.addEventListener('keydown', e => setControl(e.which, true))
    document.addEventListener('keyup', e => {
      setControl(e.which, false)
      if (e.which === 67) entity.placeBarrel()
      if (e.which === 88) entity.placeBarricade()
      if (e.which === 80) entity.game.level.polylines.unshift([entity.x, entity.y])
    })

    this.socket = new Socket()
    /*
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
    */
  }

  update () {
    const { controls, entity } = this
    if (controls.accelerate) entity.accelerate()
    if (controls.decelerate) entity.decelerate()
    if (controls.left) entity.left()
    if (controls.right) entity.right()
  }
}
