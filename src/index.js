import { Router } from './lib/Router.js'
import { Game } from './lib/Game.js'
import { Login } from './lib/Login.js'
import { Register } from './lib/Register.js'
import { Gamepad } from './lib/Gamepad.js'
import { Highscore } from './lib/Highscore.js';
import { PreGame } from './lib/PreGame.js';

// add all Custome Elements to browser
// too sad extend native Elements is not possible in the latest chrome version
// https://www.chromestatus.com/feature/4670146924773376
window.customElements.define('the-race-game', Game)
window.customElements.define('the-race-login', Login)
window.customElements.define('the-race-register', Register)
window.customElements.define('the-race-gamepad', Gamepad)
window.customElements.define('the-race-highscore', Highscore)
window.customElements.define('the-race-pre-game', PreGame)

Promise.all([
  window.customElements.whenDefined('the-race-game'),
  window.customElements.whenDefined('the-race-login'),
  window.customElements.whenDefined('the-race-register'),
  window.customElements.whenDefined('the-race-gamepad'),
  window.customElements.whenDefined('the-race-highscore'),
  window.customElements.whenDefined('the-race-pre-game')
]).then(() => {
  window.customElements.define('the-race-router', Router)
})
