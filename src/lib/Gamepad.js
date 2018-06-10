import { Socket } from './Socket.js'

export class Gamepad extends window.HTMLElement {
  constructor () {
    super()
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
    this.socket.broadcast('orientation', { beta, gamma })
  }
}
