'use strict'

theRace.Register = class extends window.HTMLElement {
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
          margin-bottom:7px;
          display: block;
          width: 100%;
          text-align: center;
          box-sizing: border-box;
          background-color:#fff;
          border:none;
          padding: 15px;
          color: #000;
        }
        button {
          
          border-bottom: 7px solid #f890e7;
        }
        button:hover {
          background-color:#0bd3d3;
        }

        p {
          text-align:center;
        }
    
        a {
          color: #000;
          text-decoration: none;
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
  }

  register () { // wird beim klick auf regisrieren aufgerufen
    let username = this.shadow.querySelector('#username').value
    let password = this.shadow.querySelector('#password').value

    let userdata = JSON.parse(window.localStorage.getItem('userdata') || '{}')
    if (!userdata[`${username}:${password}`]) { // überprüfen ob es den Nutzer schon gibt
      userdata[`${username}:${password}`] = { // und dann ein leeren inistaliesieren
        name: username
      }
      window.localStorage.setItem('userdata', JSON.stringify(userdata)) // speicher und bekanntgeben
      window.location.href = '#/login' // nach login weiterleiten
    } else {
      window.alert('Benutzer schon vergeben') // Fehlermedlung
    }
  }
}
