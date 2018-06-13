import { Socket } from './Socket.js'

export class KeyboardControl {
  constructor (mapping, entity, playerCanvas) {
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
      if (e.which === 80) {
        entity.game.level.polylines[1].unshift([entity.x, entity.y])
        console.log(JSON.stringify(entity.game.level.polylines[1]))
      }
    })

    this.socket = new Socket()
    
    this.socket.on('controls', ({data}) => {
      if (playerCanvas.name !== data.p || playerCanvas.game.gameId !== data.g) return
      this.controls = data.c
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
