'use strict'

/**
 * Diese Klasse wird für jeden Spieler Instanziert und steuert immer ein Entity. Es wird ein Keyboard mapping übergeben für die Navigation.
 */
theRace.KeyboardControl = class {
  constructor (mapping, entity, playerCanvas) {
    this.entity = entity
    this.controls = {
      accelerate: false,
      decelerate: false,
      left: false,
      right: false
    }

    const setControl = (key, val) => { // eine kleine Helper Funktion um das mapping zu bedienen
      let control = mapping[key]
      if (control) this.controls[control] = val
    }

    document.addEventListener('keydown', e => setControl(e.which, true))
    document.addEventListener('keyup', e => {
      setControl(e.which, false)
      if (e.which === 80) {
        entity.game.level.polylines[1].unshift([entity.x, entity.y])
        console.log(JSON.stringify(entity.game.level.polylines[1]))
      }
    })

    this.socket = new theRace.Socket()

    this.socket.on('controls', ({data}) => { // wenn ein smarphone verbunden ist werden hier auch controls gehorcht
      if (playerCanvas.name !== data.p || playerCanvas.game.gameId !== data.g) return // faslche spieler oder spiele werden rausgefilter
      this.controls = data.c
    })

  }

  update () { // bei jedem update cycle werden die angeschlagnen tasten in aktion umgesetzt
    const { controls, entity } = this
    if (controls.accelerate) entity.accelerate()
    if (controls.decelerate) entity.decelerate()
    if (controls.left) entity.left()
    if (controls.right) entity.right()
  }
}
