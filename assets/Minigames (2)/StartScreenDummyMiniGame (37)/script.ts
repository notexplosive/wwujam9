class StartScreenDummyMiniGameBehavior extends MinigameBehavior {
  controlStyle = ControlStyle.TopDown;
  backgroundSpritePath = "StartMenu";
  
  awake() {
    GAME.alert("Press start and move to the right!");
    this.circle = this.createObstacle("Circle");
    this.circle.move(4.5,-1);
    new Sup.SpriteRenderer(this.circle);
  }

  update() {
    let everybodyIn = true;
    for(let player of this.players){
      let distance = player.actor.getPosition().distanceTo(this.circle.getPosition());
      
      if(distance > 2){
        everybodyIn = false;
        break;
      }
    }
    
    if(this.players.length > 0){
      if(everybodyIn){
        this.completeGame();
      }
    }
  }

  addPlayer(player:MinigamePlayerBehavior){
    this.players.push(player)
  }

  circle:Sup.Actor;
}
Sup.registerBehavior(StartScreenDummyMiniGameBehavior);
