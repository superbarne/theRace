export class Level {
  constructor () {
    this.polylines = []
  }

  
  update({ entities }) {
    const polylines = this.polylines
    
    for(const entity of entities) {
      let i = 0;
      let colides = false
      for (const polyline of polylines) {
        if(i == 0) {
          i++
          continue
        }
        for(const entityCollision of entity.collisionMap) {
          if (
            this.intersects(
              polylines[i-1][0], polylines[i-1][1], 
              polylines[i][0], polylines[i][1],
              entityCollision[0][0]+entity.x,entityCollision[0][1]+entity.y,
              entityCollision[1][0]+entity.x,entityCollision[1][1]+entity.y
            )
          ) colides = true
        }
        i++
      }
      entity.colides = colides
      console.log(colides, entity)
    }
  }

  intersects(a,b,c,d,p,q,r,s) {
    var det, gamma, lambda;
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false;
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
    }
  };
  

  render({ ctx, viewport }) {

    const offset = (point) => [
      point[0] + viewport.x,
      point[1] + viewport.y
    ]

    if(this.polylines.length >= 2) {
      ctx.beginPath();
      ctx.lineWidth = 4
      ctx.strokeStyle = 'blue'
      ctx.moveTo(...offset(this.polylines[0]))
      this.polylines.slice(1).forEach(point => ctx.lineTo(...offset(point)) )
      ctx.stroke()
    }
    ctx.restore()
  }

}