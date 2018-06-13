'use strict'

theRace.Game = class extends window.HTMLElement {
  constructor ({ gameId, level }) {
    super()
    this.gameId = gameId
    this.width = 600
    this.height = 600
    this.level = new theRace.Level(this, level)
    this.map = new theRace.Map(2000, 2000)

    this.initEntities()

    this.playerCanvas = [ // spieler werden Instanziert
      new theRace.PlayerCanvas(this, this.followEntity[0], 'Player01'),
      new theRace.PlayerCanvas(this, this.followEntity[1], 'Player02')
    ]

    this.controls = [ // die Keyboardbindings werden festgelegt und den Spielern und enteties zugeordnet
      new theRace.KeyboardControl({
        87: 'accelerate',
        83: 'decelerate',
        65: 'left',
        68: 'right'
      }, this.followEntity[0], this.playerCanvas[0]),
      new theRace.KeyboardControl({
        38: 'accelerate',
        40: 'decelerate',
        37: 'left',
        39: 'right'
      }, this.followEntity[1], this.playerCanvas[1])
    ]

    this.playerCanvas.forEach(({canvas}) => this.appendChild(canvas)) // die beiden Speielr canvas werden dem Element hinzugefügt
    this.classList.add('gameholder')
    window.requestAnimationFrame(() => this.render())
  }

  initEntities () {
    let test = [
      new theRace.EntityCar(
        515,
        187,
        0,
        this
      ),
      new theRace.EntityCar(
        515,
        280,
        0,
        this
      )
    ]

    this.entities = [
      new theRace.EntityStart(505, 115, 0, this, 250),
      new theRace.EntityCheckpoint(624, 710, 0, this, 150),
      ...test
    ]

    this.followEntity = test
  }

  render () {
    this.udpate()
    this.playerCanvas.forEach(playerCanvas => playerCanvas.render())
    window.requestAnimationFrame(() => this.render())
  }

  udpate () {
    this.playerCanvas.forEach(playerCanvas => playerCanvas.update());
    [ ...this.entities, ...this.controls, this.level ].forEach(item => item.update(this))
  }

  finish () { // wenn beide Speielr fertig sind wird deren Zeit in den Highscore geschrieben und der Nutzer zum highscore geleitet
    const notFinished = this.playerCanvas.some(playerCanvas => !playerCanvas.timeEnd)
    let highscore = JSON.parse(window.localStorage.getItem('highscore') || '[]')
    const data = JSON.parse(window.localStorage.getItem('userdata') || '{}')
    const me = window.localStorage.getItem('me')
    if (!notFinished) {
      console.log('END')
      this.playerCanvas.forEach(playerCanvas =>
        highscore.push({
          time: playerCanvas.timeEnd - playerCanvas.timeStart,
          user: data[me].name,
          player: playerCanvas.name
        })
      )
      window.localStorage.setItem('highscore', JSON.stringify(highscore)) // speicher und bekanntgeben
      window.location.href = '#/highscore' // nach spielende auf highscore weiterleiten

    }
  }
}
