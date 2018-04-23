class EndScreenBehavior extends Sup.Behavior {
  awake() {
    new Sup.SpriteRenderer(this.actor);
    this.actor.spriteRenderer.setSprite("Background/FinalTrophy");
    let text = new Sup.Actor("Game Over Text",this.actor);
    new Sup.TextRenderer(text,"","Font");
    let loser = 0;
    for(let player of GAME.players){
      if(player.score == 0){
        loser = player.playerNumber;
      }
    }
    
    text.setLocalZ(2);
    text.textRenderer.setText("Player " + loser + " is a Loser!");
    text.textRenderer.setOpacity(1)
  }

  update() {
    for(let i = 0; i < 4; i++) {
      if(Sup.Input.wasGamepadButtonJustPressed(i, Controller.START_BUTTON)){
        GAME.currentMusicTrack.stop();
        GAME = new Game();
        new Sup.Actor("StartScreen").addBehavior(StartScreenBehavior);
        this.actor.destroy();
      }
    }
  }
}
Sup.registerBehavior(EndScreenBehavior);
