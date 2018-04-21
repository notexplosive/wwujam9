class TestBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    Sup.log("start");
    for(let i = 0; i < 13; i++) {
      if(Sup.Input.wasGamepadButtonJustPressed(0, i)) { Sup.log(i) };
      
    }
  }
}
Sup.registerBehavior(TestBehavior);
