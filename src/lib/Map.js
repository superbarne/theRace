'use strict'

theRace.Map = class {
  constructor (width, height) {
    this.width = width
    this.height = height
  }

  render ({ viewport, ctx }) { // Zeichnet einfach ein schachbrettmuster
    for (let i = 0; i < this.height; i += 50) {
      for (let j = 0; j < this.width; j += 50) {
        if ((i / 50 + j / 50) & 1) {
          ctx.fillStyle = 'hsl(' + (360 - (i + j) / 12) + ', 52%, 60%)'
          ctx.fillRect(j + viewport.x, i + viewport.y, 50, 50)
        }
      }
    }
  }
}
