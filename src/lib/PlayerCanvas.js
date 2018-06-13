theRace.PlayerCanvas = class {
  constructor (game, followEntity, name) {
    this.name = name
    this.game = game
    this.followEntity = followEntity
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d', { alpha: true }) // apha false for litte performance boost
    this.canvas.setAttribute('width', game.width)
    this.canvas.setAttribute('height', game.height)
    this.timeStart = new Date()
    this.timeEnd = null
    this.viewport = {
      x: 0,
      y: 0
    }

    this.qr = qrcode(4, 'L')
    this.qr.addData(`${location.origin}/#/gamepad/${this.game.gameId}/${this.name}`)
    this.qr.make()
  }

  render () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.game.map.render(this)
    this.game.entities.forEach(entity => entity.render(this))
    this.game.level.render(this)
    this.ctx.font = '60px Arial'
    this.ctx.fillStyle = '#0bd3d3'
    let timePassed = this.timeStart ? (new Date() - this.timeStart) / 1000 : 0
    if (this.timeEnd) timePassed = (this.timeEnd - this.timeStart) / 1000
    this.ctx.fillText(`${Math.round(timePassed * 100) / 100}`, (this.canvas.width / 2) - 40, 60)
    this.qr.renderTo2dContext(this.ctx, 2)
  }

  update () {
    const boundries = (n, lo, hi) => n < lo ? lo : n > hi ? hi : n
    this.viewport.x = boundries(
      -this.followEntity.x + this.game.width / 2,
      this.canvas.width - this.game.map.width, 0
    )
    this.viewport.y = boundries(
      -this.followEntity.y + this.game.height / 2,
      this.canvas.height - this.game.map.height, 0
    )
  }
}