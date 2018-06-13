import { EntityCar } from './EntityCar.js'
import { Map } from './Map.js'
import { KeyboardControl } from './KeyboardControl.js'
import { Socket } from './Socket.js'
import { Level } from './Level.js'
import { PlayerCanvas } from './PlayerCanvas.js'
import { EntityStart } from './EntityStart.js';
import { EntityCheckpoint } from './EntityCheckpoint.js';

export class Game extends window.HTMLElement {
  constructor ({ gameId }) {
    super()
    this.gameId = gameId
    this.width = 600
    this.height = 600
    this.socket = new Socket()
    this.level = new Level(this)

    this.socket.on('info', () => console.log(this.socket))

    this.map = new Map(2000, 2000)

    this.initEntities()

    this.playerCanvas = [
      new PlayerCanvas(this, this.followEntity[0], 'Player01'),
      new PlayerCanvas(this, this.followEntity[1], 'Player02')
    ]

    this.controls = [
      new KeyboardControl({
        87: 'accelerate',
        83: 'decelerate',
        65: 'left',
        68: 'right'
      }, this.followEntity[0], this.playerCanvas[0]),
      new KeyboardControl({
        38: 'accelerate',
        40: 'decelerate',
        37: 'left',
        39: 'right'
      }, this.followEntity[1], this.playerCanvas[1])
    ]

    this.playerCanvas.forEach(({canvas}) => this.appendChild(canvas))
    this.classList.add('gameholder')
    window.requestAnimationFrame(() => this.render())
  }

  initEntities () {
    let test = [
      new EntityCar(
        515,
        187,
        0,
        this
      ),
      new EntityCar(
        515,
        280,
        0,
        this
      )
    ]

    this.entities = [
      new EntityStart(505, 115, 0, this, 250),
      new EntityCheckpoint(624, 710, 0, this, 150),
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

  finish () {
    const finished = this.playerCanvas.some(playerCanvas => !playerCanvas.timeEnd)
    let highscore = JSON.parse(window.localStorage.getItem('highscore') || '[]')
    const data = JSON.parse(window.localStorage.getItem('userdata') || '{}')
    const me = window.localStorage.getItem('me')
    if (!finished) {
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
