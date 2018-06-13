theRace.Highscore = class extends window.HTMLElement {
  constructor ({ gameId, playerName }) {
    super()
    this.gameId = gameId
    this.playerName = playerName
    this.shadow = this.attachShadow({mode: 'open'})
    const template = document.createRange().createContextualFragment(`
      <style>
        .container {
          padding-top: 250px;
          width: 400px;
          margin: auto;
        }

        h1 {
          color: #f890e7;
          letter-spacing: 7px;
          border-bottom: 7px solid #0bd3d3;
          display: inline-block;
        }

        #highscore > div {
          letter-spacing:2px;
          margin-bottom:10px;
        }

        a {
          display:inline-block;
          margin-top; 14px;
          text-decoration: none;
          color: #f890e7;
          font-weight: bold;
          padding:7px;
        }

        a:hover {
          background-color: #0bd3d3;
          color:#fff;
        }
      </style>
      <div class="container">
        <h1>Highscore</h1>
        <div id="highscore"></div>
        <a href="#/game">Nochmal Spielen</a>
      </div>
    `)
    this.shadow.appendChild(document.importNode(template, true))
    const highscoreElement = this.shadow.querySelector('#highscore')
    const highscore = JSON.parse(window.localStorage.getItem('highscore') || '[]')
    highscore.sort((a, b) => a.time > b.time).forEach(item => {
      let score = document.createElement('div')
      score.innerHTML = `${Math.round(item.time / 10) / 100}s // ${item.user}  // ${item.player}`
      highscoreElement.appendChild(score)
    })
  }
}
