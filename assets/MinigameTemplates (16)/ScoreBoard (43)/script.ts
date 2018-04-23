class ScoreBoardBehavior extends Sup.Behavior {
  awake() {
    GAME.scoreboard = this;
    let scoreText = "Scoreboard:\n";
    for(let player of GAME.players){
      scoreText += "Player " + player.playerNumber + ": " + player.score + "\n";
    }
    new Sup.TextRenderer(this.actor,scoreText,"Font").setSize(24);
    this.actor.textRenderer.setOpacity(0);
  }

  update() {
    this.tick++;
    
    if(this.tick > 60){
      this.actor.textRenderer.setOpacity(1);
    }
    
    if(this.tick > 180){
      this.actor.textRenderer.setText("Next minigame starts in: " + this.nextGameCountdown)
      if(this.tick % 60 == 0){
        this.nextGameCountdown --;
      }
    }
    
    if(this.nextGameCountdown <= 0){
      GAME.startNewMiniGame(createRandomMinigameActor());
    }
  }
  
  tick = 0;
  nextGameCountdown = 5;
}
Sup.registerBehavior(ScoreBoardBehavior);
