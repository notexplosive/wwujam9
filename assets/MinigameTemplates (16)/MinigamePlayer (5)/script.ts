class MinigamePlayerBehavior extends Behavior {
  init(gamePlayer:Player,controlStyle:ControlStyle) {
    this.gamePlayer = gamePlayer;
    this.controlStyle = controlStyle;
    
    // this.actor.spriteRenderer.setColor(new Sup.Color(this.gamePlayer.color));
  }
  
  awake() {
    Sup.log(this.actor.getName() + " created!")
  }

  update() {
    if(this.gamePlayer == null){
      Sup.log("You forgot to call init")
    }
  }
  
  private gamePlayer:Player;
  private controlStyle:ControlStyle;
}
Sup.registerBehavior(MinigamePlayerBehavior);
