import { EntityCar } from './EntityCar.js'
import { Map } from './Map.js'
import { KeyboardControl } from './KeyboardControl.js'
import { Socket } from './Socket.js'

export class Game extends window.HTMLElement {
  constructor () {
    super()
    this.canvas = document.createElement('canvas')
    this.width = 800
    this.height = 800
    this.canvas.setAttribute('width', this.width)
    this.canvas.setAttribute('height', this.height)
    this.ctx = this.canvas.getContext('2d', { alpha: true }) // apha false for litte performance boost
    this.socket = new Socket()

    this.socket.on('info', () => console.log(this.socket))

    this.map = new Map(2000, 2000)

    this.initEntities()

    this.controls = [
      new KeyboardControl({
        87: 'accelerate',
        83: 'decelerate',
        65: 'left',
        68: 'right'
      }, this.ownEntity)
    ]

    this.viewport = {
      x: 0,
      y: 0
    }

    this.appendChild(this.canvas)
    window.requestAnimationFrame(() => this.render())
  }

  initEntities () {
    let test = new EntityCar(
      this.canvas.width / 2,
      this.canvas.height / 2,
      0,
      this
    )

    this.entities = [
      test
    ]

    this.followEntity = test
    this.ownEntity = test
  }

  render () {
    const { ctx, canvas } = this
    this.udpate()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.map.render(this)
    this.entities.forEach(entity => entity.render(this))
    window.requestAnimationFrame(() => this.render())
  }

  udpate () {
    const { viewport, followEntity, canvas, map, entities, controls } = this
    const boundries = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n
    viewport.x = boundries(
      -followEntity.x + this.width / 2,
      canvas.width - map.width, 0
    )
    viewport.y = boundries(
      -followEntity.y + this.height / 2,
      canvas.height - map.height, 0
    );
    [ ...entities, ...controls ].forEach(item => item.update(this))
  }
}
