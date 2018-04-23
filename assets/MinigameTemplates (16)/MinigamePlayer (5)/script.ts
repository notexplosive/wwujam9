class MinigamePlayerBehavior extends Behavior {
  public gamePlayer:Player;
  private controlBehavior:BaseControlBehavior;
  
  init(gamePlayer:Player,controlStyle:ControlStyle,minigame:MinigameBehavior) {
    this.gamePlayer = gamePlayer;
    let controlBehavior:BaseControlBehavior;
    switch(controlStyle){
      case ControlStyle.Tank:
        controlBehavior = this.actor.addBehavior(TankBehavior);
        break;
      case ControlStyle.TopDown:
        controlBehavior = this.actor.addBehavior(TopDownBehavior);
        break;
      case ControlStyle.Platformer:
        controlBehavior = this.actor.addBehavior(PlatformerBehavior);
        break;
      case ControlStyle.PlatformerWithDoubleJump:
        let b = this.actor.addBehavior(PlatformerBehavior)
        b.doubleJump = true;
        controlBehavior = b;
        break;
      case ControlStyle.Flying:
        controlBehavior = this.actor.addBehavior(FlyingBehavior);
        break;
      case ControlStyle.Static:
        controlBehavior = this.actor.addBehavior(BaseControlBehavior);
        // You do this one yourself
        break;
    }
    
    controlBehavior.minigamePlayer = this;
    this.controlBehavior = controlBehavior;
    
    this.actor.spriteRenderer.setColor(new Sup.Color(this.gamePlayer.color));
  }
  
  awake() {
    Sup.log(this.actor.getName() + " created!");
    // TODO: Map controlstyle to sprite
    new Sup.SpriteRenderer(this.actor,"TopDownPlayer");
  }

  update() {
    if(this.gamePlayer == null){
      Sup.log("You forgot to call init")
    }
  }
  
  getControlBehavior(){
    return this.controlBehavior;
  }
  
  kill() {
    if(GAME.currentMiniGame.getPlayers().length == 1){
      GAME.currentMiniGame.winner = this.gamePlayer;
    }else{
      GAME.alert("Player " + this.gamePlayer.playerNumber + " died!");
    }
    
    GAME.currentMiniGame.killPlayer(this);
  }
  
  setVelocityX(x:number){
    this.controlBehavior.netVelocityVector.x = x;
  }

  setVelocityY(y:number){
    this.controlBehavior.netVelocityVector.y = y;
  }
  
  setNetAccelerationX(x:number){
    this.controlBehavior.netAccelerationVector.x = x;
  }
  
  setNetAccelerationY(y:number){
    this.controlBehavior.netAccelerationVector.y = y;
  }
  
  getPositionVector(){
    return new Sup.Math.Vector2(this.actor.getX(), this.actor.getY());
  }
}
Sup.registerBehavior(MinigamePlayerBehavior);

enum Side{top, bottom, left, right};