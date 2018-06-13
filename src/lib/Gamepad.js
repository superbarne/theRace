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

    window.addEventListener('deviceorientation', e => this.handleOrientation(e), true)
  }

  handleOrientation ({ beta, gamma }) {
    const controls = {
      right: false,
      left: false,
      accelerate: false,
      decelerate: false
    }
    if (beta > 25) controls.right = true
    if (beta < -25) controls.left = true
    if (gamma > -45) controls.accelerate = true
    if (gamma < 45) controls.decelerate = true
    const data = {
      c: controls,
      g: this.gameId,
      p: this.playerName
    }
    this.socket.broadcast('controls', { data: data })
  }
}
