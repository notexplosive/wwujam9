class PlatformerBehavior extends BaseControlBehavior {
  
  jump:number;
  xAxis:number;
  
  doubleJump:boolean = false;
  awake() {
    super.awake();
    this.speed = 0.03;
    this.jumpVelocity = 0.25;
    this.gravityVector = new Sup.Math.Vector2(0,-.0075);
    this.velocityDecay = 0.25;
    this.actor.spriteRenderer.setSprite('PlatformPlayer');
    this.jump = Controller.A_BUTTON;
    this.xAxis = 0;
  }

  update() {
    if(GAME.currentMiniGame.ready()){
      
      this.netAccelerationVector.x = 0;
      this.netAccelerationVector.y = 0;
      this.netAccelerationVector.y = this.gravityVector.y;
      this.netAccelerationVector.x += Sup.Input.getGamepadAxisValue(this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.controllerIndex, this.xAxis) * this.speed;
      this.netAccelerationVector.x += this.gravityVector.x;

      if(this.jumps > 0 && Controller.wasButtonJustPressed(this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.controllerIndex, this.jump)){
        this.netVelocityVector.y = this.jumpVelocity;
        this.jumps = 0;
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
}
Sup.registerBehavior(PlatformerBehavior);
