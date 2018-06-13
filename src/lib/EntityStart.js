'use strict'

theRace.EntityStart = class extends theRace.Entity {
  constructor (x, y, angle, game, length) {
    super(x, y, angle, game)
    this.length = length
  }

  render ({ viewport, ctx }) {
    super.render(...arguments)
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.fillRect(
      0,
      0,
      20,
      this.length
    )
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.stroke()
    ctx.restore()
  }

  update () {
    // prüfe ob ein Speiler mit diesem start kollidiert
    this.game.playerCanvas.forEach(playerCanvas => {
      for (const entityCollision of playerCanvas.followEntity.collisionMap) {
        if (this.game.level.intersects(
          this.x, this.y,
          this.x, this.y + this.length,
          entityCollision[0][0] + playerCanvas.followEntity.x, entityCollision[0][1] + playerCanvas.followEntity.y,
          entityCollision[1][0] + playerCanvas.followEntity.x, entityCollision[1][1] + playerCanvas.followEntity.y
        )) {
          // wenn dies der fall ist, wird der start beim spielr gesetzt
          if (!playerCanvas.timeEnd && playerCanvas.checkpoint) {
            playerCanvas.timeEnd = new Date()
            this.game.finish() // und es wird eine Prüfung veranlasst, ob das spiel beendet werden kann
          }
        }
      }
    })
  }
}
