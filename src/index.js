// add all Custome Elements to browser
// too sad extend native Elements is not possible in the latest chrome version
// https://www.chromestatus.com/feature/4670146924773376
window.customElements.define('the-race-game', theRace.Game)
window.customElements.define('the-race-login', theRace.Login)
window.customElements.define('the-race-register', theRace.Register)
window.customElements.define('the-race-gamepad', theRace.Gamepad)
window.customElements.define('the-race-highscore', theRace.Highscore)
window.customElements.define('the-race-pre-game', theRace.PreGame)

Promise.all([
  window.customElements.whenDefined('the-race-game'),
  window.customElements.whenDefined('the-race-login'),
  window.customElements.whenDefined('the-race-register'),
  window.customElements.whenDefined('the-race-gamepad'),
  window.customElements.whenDefined('the-race-highscore'),
  window.customElements.whenDefined('the-race-pre-game')
]).then(() => {
  window.customElements.define('the-race-router', theRace.Router)
})
