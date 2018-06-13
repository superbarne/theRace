theRace.Level = class {
  constructor () {
    this.polylines = [
      [[189.33727592183348,302.19255152110605],[144.4433131940472,395.0716347389192],[103.24374147197601,489.70270215514944],[81.86456115426574,613.758351701436],[79.37454611562768,709.7187038290334],[82.64038179412708,799.6105003706366],[104.07971278483959,880.4881321032871],[136.68047962206154,957.8934196351671],[186.10757091812164,1039.779844188905],[234.37381208077787,1074.740862322654],[303.782745407417,1091.8519945707442],[366.96742226193265,1075.3786805511188],[416.00782102365207,1031.9229854734263],[450.4777905447309,975.70607232342],[499.8527988941473,900.5708376640663],[549.5250142021033,857.8707015544583],[613.4703394702696,845.1791895907153],[684.356319580285,874.5435018637537],[724.2639787622081,933.471636765367],[734.3928987181364,1010.382326276384],[734.6154157555867,1094.3709721859727],[747.8937037260979,1183.0725719427141],[788.6542499441507,1241.2724931607156],[889.2351160664671,1275.0961781613053],[967.2047014282067,1274.6850871243148],[1061.3640576235957,1257.0407376139212],[1136.72888723388,1236.9456554958244],[1210.829129988537,1212.6959927243327],[1277.9481433670567,1173.723942173717],[1334.5956858570112,1112.0588376056962],[1362.9340248227702,1059.229845209361],[1381.9280035321658,984.2161679469567],[1363.0487784933753,915.5193599234418],[1318.4167516832897,859.2923287345228],[1265.9827372420966,786.7897307978733],[1251.7243265428124,698.5101489178683],[1250.0513831716153,632.5314291641595],[1246.4913448397763,542.6050226628136],[1230.5907110065466,429.9758737455927],[1174.4213190934474,354.9368242244027],[1093.7784257911317,337.1549862978479],[1025.7413322201814,359.1996258472553],[957.3166229040125,396.483885668537],[886.7191667661531,405.6270325095503],[809.8527027735639,374.29471324046267],[760.5999216158633,300.430020355235],[742.0612336181466,230.87977040233898],[712.1481313344118,159.16467385441825],[663.4031979608521,115.76515337467868],[569.8805792134568,102.02957515175656],[493.3682667615921,116.85064320713481],[399.8533784398697,137.45948391920874],[277.69215287768685,180.31917047279052],[213.70522050800113,254.21250804150338],[181.14942252681658,310.9841711872346]],
      [[488.4083236274522,376.6967228695109],[456.95337845812037,391.6408632556897],[433.67008911818004,459.84158487720293],[453.9202838006841,504.8677547433038],[454.82680874261655,510.7486047014911],[456.1613584544176,528.8809403349323],[455.4249594833455,560.7489276553079],[437.9056766133908,615.5103714289061],[417.0685462243338,648.0737131598664],[407.4588495257659,662.7679359699017],[382.9391247845023,705.3946734346107],[365.3045278640192,755.0540953293656],[363.32992839286095,789.4443612356237],[369.0311906480756,800.914037319526],[388.43059453391515,813.0720459327403],[442.0596189053975,825.9303509219396],[463.3779069692023,828.2467526187396],[467.4367820947602,827.3719180035519],[487.4519666907178,812.560938050302],[522.2574191410364,783.7623972852045],[570.0511975569174,744.2969053064676],[600.8330237559072,719.945755585052],[616.682572549565,715.038295794202],[656.1346698806636,711.2299684507902],[757.4247200196677,703.5894970551983],[776.3982108036712,712.7055441876507],[824.6162094662193,743.1908842054054],[839.0573893291465,753.8232821825195],[865.1242120564567,781.8376302783093],[887.7382531575843,830.5905136712954],[898.6997736393705,859.4837961042591],[908.4036848487269,885.0031094255008],[938.4475986230756,950.9387800135659],[965.2591987279699,981.0546769221371],[989.004174334651,997.201320205182],[1031.1309659846727,1009.8456653446377],[1073.0962766229432,1007.9912824525638],[1112.871950688864,1001.5448843946153],[1124.15128421186,998.6473111302562],[1130.7893858040459,990.6874784923131],[1140.6457357713832,959.2241167108232],[1157.0707218051639,894.1397179417575],[1121.6432011087827,863.7987775417754],[1080.828134929842,829.3146050387927],[1060.5412550144354,811.1010398176682],[1046.8688469200647,779.9731075939461],[1026.7669863727504,726.2097256863156],[1027.6995422612708,688.947076940856],[1032.8515355609513,623.755514360891],[1036.8372075118755,567.1753043681554],[1022.5812520286314,548.3423561268714],[970.5803180332554,491.83387137352094],[941.0623658128301,496.1172757839762],[879.97755335234,513.1874984900147],[836.9958741003503,537.1575298879778],[824.5910400499339,540.1887945274364],[793.7995889919697,534.8228722787588],[724.1256404557951,488.43061810589865],[672.0388538232024,434.8312843900626],[610.8666086491208,371.9506199575344],[573.9999834533257,347.1877998992437],[428.93361979397713,396.2892058789767]]
    ]
  }

  update({ entities }) {
  }

  collides(entity, { x, y }) {
    const polylines = [].concat(...this.polylines)
    let i = 0
    for (const polyline of polylines) {
      if (i === 0) {
        i++
        continue
      }
      for (const entityCollision of entity.collisionMap) {
        if (
          this.intersects(
            polylines[i - 1][0], polylines[i - 1][1],
            polylines[i][0], polylines[i][1],
            entityCollision[0][0] + x, entityCollision[0][1] + y,
            entityCollision[1][0] + x, entityCollision[1][1] + y
          )
        ) return true
      }
      i++
    }
  }

  intersects (a, b, c, d, p, q, r, s) {
    var det, gamma, lambda
    det = (c - a) * (s - q) - (r - p) * (d - b);
    if (det === 0) {
      return false
    } else {
      lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det
      gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det
      return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1)
    }
  };
  
  render({ ctx, viewport }) {

    const offset = (point) => [
      point[0] + viewport.x,
      point[1] + viewport.y
    ]

    this.polylines.forEach(polylines => {
      if (polylines.length >= 2) {
        ctx.beginPath();
        ctx.lineWidth = 8
        ctx.strokeStyle = '#0bd3d3'
        ctx.moveTo(...offset(polylines[0]))
        polylines.slice(1).forEach(point => ctx.lineTo(...offset(point)) )
        ctx.stroke()
      }
    })
    ctx.restore()
   
  }

}