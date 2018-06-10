import { Socket } from './Socket.js'

export class Login extends window.HTMLElement {
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
    
        a {
          color: #1ed660;
          text-decoration: none;
        }
      </style>
      <div class="container">
          <input id="username" type="text" placeholder="Benutzername">
/bu
          <input id="password" type="password" placeholder="passwort">

          <button>Anmelden<tton>
          <p>
              Jetzt <a href="#/register">Registrieren</a>
          </p>
      </div>
    `)
    this.shadow.appendChild(document.importNode(template, true))
    this.shadow.querySelector('button').addEventListener('click', () => this.login()) // wenn auf Login gedrückt wird
    this.socket = new Socket()
  }

  login () {
    let username = this.shadow.querySelector('#username').value
    let password = this.shadow.querySelector('#password').value

    let data = JSON.parse(window.localStorage.getItem('userdata') || '{}') // die Nutzerdaten aus dem localstrage holen, falls keine vorhanden sind bekommt er ein leeres object

    if (data[`${username}:${password}`]) { // überprüft die Nutzerdaten, der key wird in user:pass format hinterlegt
      window.localStorage.setItem('me', `${username}:${password}`)
      this.socket.broadcast('info') // anmeldung wird bekanntgegeben
      window.location.href = '#/game' // stations auflistung weiterleiten
    } else {
      window.alert('Falsch') // Fehlermeldung bie faslcheingabe
    }
  }
}
