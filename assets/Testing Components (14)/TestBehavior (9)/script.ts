class TestBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    /*for(let controller = 0; controller < 4; controller++){
      for(let i = 0; i < 13; i++) {
        if(Sup.Input.wasGamepadButtonJustPressed(controller, i)) { Sup.log(controller + ": " + i) };
      }
    }*/
    
    if(Sup.Input.wasKeyJustPressed('M')){
      GAME.startNewMiniGame(new Sup.Actor('Minigame').addBehavior(SumoBehavior).actor);
    }
    
    if(Sup.Input.wasKeyJustPressed('B')){
      GAME.startNewMiniGame(new Sup.Actor('Minigame').addBehavior(LanternGameBehavior).actor);
    }
    
    if(Sup.Input.wasKeyJustPressed('T')){
      GAME.startNewMiniGame(new Sup.Actor('Minigame').addBehavior(TestMiniGameBehavior).actor);
    }
    
    if(Sup.Input.wasKeyJustPressed('V')){
      GAME.startNewMiniGame(new Sup.Actor('Minigame').addBehavior(PicnicBehavior).actor);
    }
    
    if(Sup.Input.wasKeyJustPressed('C')){
      GAME.startNewMiniGame(new Sup.Actor('Minigame').addBehavior(JumpRopeBehavior).actor);
    }
  }
}
Sup.registerBehavior(TestBehavior);
