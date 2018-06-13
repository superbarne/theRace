'use strict'

theRace.Router = class extends window.HTMLElement {
  constructor () {
    super()
    this.routes = { // routen auf CustomeElements mappen
      '/game/:gameId/:level': theRace.Game,
      '/game': theRace.PreGame,
      '/login': theRace.Login,
      '/register': theRace.Register,
      '/highscore': theRace.Highscore,
      '/gamepad/:gameId/:playerName': theRace.Gamepad
    }
    this.params = {}
  }

  connectedCallback () {
    this.checkRoute()
    window.addEventListener('hashchange', (e) => this.checkRoute(e)) // wenn die route geändert wurde die route checken
  }

  getRoute (hash) {
    hash = hash.split('/') // die Url wird immer als array untersucht
    for (let route in this.routes) {
      let routeSegments = route.split('/') // die routen werden auch in ein array umgewandelt
      let routeSegmentsParams = routeSegments.map(cur => cur[0] === ':' ? cur : false) // und die parameter ncohmal spieziel projeziert
      if (hash.length !== routeSegments.length) continue
      let match = true
      for (let i in hash) { // array position für position überprüft
        if (!(hash[i] === routeSegments[i] || routeSegmentsParams[i])) {
          match = false
        }
      }
      if (match) { // wenn alles übereinstimmt, die parameter sichern
        this.params = {}
        for (let i in routeSegmentsParams) {
          if (routeSegmentsParams[i]) {
            this.params[routeSegmentsParams[i].replace(':', '')] = hash[i]
          }
        }
        return this.routes[route] // und die passende route zurückgeben
      }
    }
    return false
  }

  checkRoute () {
    // if ((window.location.hash !== '#/login' && window.location.hash !== '#/register') && !window.localStorage.getItem('me')) window.location.hash = '#/login'
    // wenn man nicht eingelogt ist nur login und register
    const hash = window.location.hash.replace('#', '')
    const Element = this.routes[hash] || this.getRoute(hash) // Route in Element auflösen
    if (Element) {
      this.innerHTML = ''
      this.appendChild(new Element(this.params)) // Element ersetzen
      this.setActive(hash) // links setzen
    } else {
      window.location.hash = '#/login' // falls es nicht klapt auf login weiterleiten
    }
  }

  setActive (hash) {
    const links = document.querySelectorAll('.link-active')
    links.forEach((item) => {
      if (item.getAttribute('href').replace('#', '') === hash) {
        item.classList.add('active')
      } else {
        item.classList.remove('active')
      }
    })
  }
}
