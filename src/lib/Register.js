import { Socket } from './Socket.js'

export class Register extends window.HTMLElement {
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

        input, button {
          display: block;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          background-color: #282828;
          border: 1px solid #181818;
          padding: 15px;
          color: #8b8b8b;
        }
      </style>
      <div class="container">
        <input id="username" type="text" placeholder="Benutzername">
        <input id="password" type="password" placeholder="passwort">
        <button id="register">Registrieren</button>
      </div>
    `)
    this.shadow.appendChild(document.importNode(template, true))
    this.shadow.querySelector('#register').addEventListener('click', () => this.register())
    this.socket = new Socket()
    this.socket.on(['info', 'join'], (e) => console.log(e))
  }

  register () { // wird beim klick auf regisrieren aufgerufen
    let username = this.shadow.querySelector('#username').value
    let password = this.shadow.querySelector('#password').value

    let userdata = JSON.parse(window.localStorage.getItem('userdata') || '{}')
    if (!userdata[`${username}:${password}`]) { // überprüfen ob es den Nutzer schon gibt
      userdata[`${username}:${password}`] = { // und dann ein leeren inistaliesieren
        name: username,
        playlists: {}
      }
      this.socket.meta.userdata = userdata
      this.socket.broadcast('info')
      window.localStorage.setItem('userdata',JSON.stringify(userdata)) // speicher und bekanntgeben
      window.location.href = '#/login' // nach login weiterleiten
    } else {
      window.alert('Benutzer schon vergeben') // Fehlermedlung
    }
  }
}
