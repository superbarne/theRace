theRace.PreGame = class extends window.HTMLElement {
  constructor ({ gameId, playerName }) {
    super()
    this.gameId = gameId
    this.playerName = playerName
    this.shadow = this.attachShadow({mode: 'open'})
    const template = document.createRange().createContextualFragment(`
      <style>
        .container {
          width: 400px;
          margin: auto;
          text-align:center;
        }

        h1 {
          color: #f890e7;
          letter-spacing: 7px;
          border-bottom: 7px solid #0bd3d3;
          display: inline-block;
        }

        nav a {
          text-decoration: none;
          color: #f890e7;
          font-weight: bold;
          padding:7px;
        }

        nav a:hover {
          background-color: #0bd3d3;
          color:#fff;
        }
      </style>
      <div class="container" id="highscore">
        <h1>theRace</h1>
        <nav>
          <a href="#/game/01/${Math.round(Math.random() * 100)}">Level 01</a>
          <a href="#/game/01/${Math.round(Math.random() * 100)}">Level 02</a>
          <a href="#/game/01/${Math.round(Math.random() * 100)}">Level 03</a>
        </nav>
      </div>
    `)
    this.shadow.appendChild(document.importNode(template, true))
  }
}
