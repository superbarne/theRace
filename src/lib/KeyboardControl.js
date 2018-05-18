export class KeyboardControl {
  constructor(mapping, entity) {
    this.entity = entity
    this.controls = {
      accelerate: false,
      decelerate: false,
      left: false,
      right: false
    }

    const setControl = (key, val) => {
      let control = mapping[key]
      if(control) this.controls[control] = val
    }
    
    document.addEventListener("keydown", e => setControl(e.which, true))
    document.addEventListener("keyup", e => {
      setControl(e.which, false)
      if(e.which == 67) entity.placeBarrel()
      if(e.which == 88) entity.placeBarricade()
    })
  }

  update() {
    const { controls, entity } = this
    if(controls.accelerate) entity.accelerate()
    if(controls.decelerate) entity.decelerate()
    if(controls.left) entity.left()
    if(controls.right) entity.right()
  }
}