'use strict'

theRace.Gamepad = class extends window.HTMLElement {
  constructor ({ gameId, playerName }) {
    super()
    this.gameId = gameId
    this.playerName = playerName
    this.shadow = this.attachShadow({mode: 'open'})
    const template = document.createRange().createContextualFragment(`
      <style>
        .container {
          padding-top: 250px;
          width: 400px;
          margin: auto;
        }
      </style>
      <div class="container">
          Kippen
      </div>
    `)
    this.shadow.appendChild(document.importNode(template, true))
    this.socket = new Socket()

    window.addEventListener('deviceorientation', e => this.handleOrientation(e), true) // bei änderungen der Orientierung
  }

  handleOrientation ({ beta, gamma }) {
    const controls = {
      right: false,
      left: false,
      accelerate: false,
      decelerate: false
    }
    // bei entsprechender Ausrichtung werden die controls auf true gesetzt
    if (beta > 25) controls.right = true
    if (beta < -25) controls.left = true
    if (gamma > -45) controls.accelerate = true
    if (gamma < 45) controls.decelerate = true
    const data = {
      c: controls, // die kurzen variablen namen wurden gewählt, weil der server nur eine bestimmte nachrichtenlänge nimmt
      g: this.gameId,
      p: this.playerName
    }
    this.socket.broadcast('controls', { data: data }) // und hier an den broadcastServer gesendet
  }
}
