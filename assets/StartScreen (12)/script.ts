class StartScreenBehavior extends Sup.Behavior {
  awake() {
    this.actor.addBehavior(StartScreenDummyMiniGameBehavior).actor;
    GAME.startNewMiniGame(this.actor);
    GAME.changeTrack("Titlescreen");
  }

  update() {
    for (let i = 0; i < 4; i++) {
      if(Controller.wasButtonJustPressed( i, Controller.START_BUTTON ) && playerDoesNotExist(i)) {
        let pitch = Sup.Math.Random.float(-0.5,1.5);
        Sup.Audio.playSound("Music/EnterGame", 1, {pitch:pitch});
        let player = new Player(i);
        let dummy = new Sup.Actor("dummy no " + i,GAME.currentMiniGame.actor);
        dummy.setEulerZ(3 * Math.PI/2);
        new Sup.SpriteRenderer(dummy,"TopDownPlayer");
        dummy.addBehavior(MinigamePlayerBehavior).init(player,ControlStyle.TopDown,GAME.currentMiniGame);
        dummy.getBehavior(TopDownBehavior).positionVector = (new Sup.Math.Vector2(-4,2.8 - (i * 1.8)));
        
        this.actor.getBehavior(StartScreenDummyMiniGameBehavior).addPlayer(dummy.getBehavior(MinigamePlayerBehavior));
      }
    }
  }
}
Sup.registerBehavior(StartScreenBehavior);


function playerDoesNotExist(controllerIndex:number) {
  for(let i = 0; i < GAME.players.length; i++) {
    if (GAME.players[i].controllerIndex == controllerIndex) {
      Sup.log("controller index " + i + " already in use");
      return false;
    }
  }

  return true;
}