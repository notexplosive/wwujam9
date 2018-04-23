class TopDownBehavior extends BaseControlBehavior {
  awake() {
    super.awake();
    this.facingVector = new Sup.Math.Vector2(0,1);
  }

  update() {
    this.handleAcceleratedMovement();
    this.collideWithCollidableSolids();
    this.previousPositionVector = this.positionVector.clone();
    this.actor.setPosition(this.positionVector);
    
    // Handle turning
    let inputVec = new Sup.Math.Vector2(Controller.getXAxis(this.minigamePlayer.gamePlayer.controllerIndex),Controller.getYAxis(this.minigamePlayer.gamePlayer.controllerIndex));
    
    let inputTargetLocation:Sup.Math.Vector2 = this.actor.getPosition().toVector2().add(inputVec.normalize());
    if(inputVec.length() > 0){
      this.facingVector = inputVec;
      let angle = inputVec.angle();
      this.actor.setEulerZ(angle-Math.PI/2);
    }
  }
  
  getFacingVector():Sup.Math.Vector2{
    return this.facingVector;
  }
  setFaceingVector(vector:Sup.Math.Vector2){
    this.facingVector = vector;
  }
  
  private facingVector:Sup.Math.Vector2;
}
Sup.registerBehavior(TopDownBehavior);
