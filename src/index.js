import { Game } from './lib/game.js'

// add all Custome Elements to browser
// to sad extend native Elements is not possible in the latest chrome version
// https://www.chromestatus.com/feature/4670146924773376
customElements.define('the-race-game', Game, { extends: 'canvas' })