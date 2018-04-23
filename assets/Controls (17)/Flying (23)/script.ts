class FlyingBehavior extends BaseControlBehavior {
  
  laternDraw:number;
  
  awake() {
    super.awake();
    this.gravityVector = new Sup.Math.Vector2(0,-.0075);
    this.speed = 0.030;
    this.actor.spriteRenderer.setSprite('FlyingPlayer');
  }

  update() {
    this.netAccelerationVector.x = 0;
    this.netAccelerationVector.y = 0;
    this.netAccelerationVector.y = this.gravityVector.y;
    this.netAccelerationVector.x += Controller.getXAxis(this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.controllerIndex) * this.speed;
    this.netAccelerationVector.x += this.gravityVector.x;
    

    if(Controller.wasButtonJustPressed(this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.controllerIndex, 0)){
       this.netVelocityVector.y = this.jumpVelocity;
       Sup.log("player " + this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.playerNumber + "jumped");
       }

    if(GAME.currentMiniGame.ready()){
      this.netVelocityVector.x += this.netAccelerationVector.x;
      this.netVelocityVector.y += this.netAccelerationVector.y;
      this.netVelocityVector.x *= (1 - this.velocityDecay);
    }
    
    this.positionVector.x += this.netVelocityVector.x;
    this.positionVector.y += this.netVelocityVector.y;

    this.collideWithCollidableSolids();
    this.previousPositionVector = this.positionVector.clone();
    this.actor.setPosition(this.positionVector);
  }
}
Sup.registerBehavior(FlyingBehavior);

