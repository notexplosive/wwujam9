class BaseControlBehavior extends Behavior{
  // child classes should not have to edit this!
  width:number;
  height:number;
  speed:number = .035;
  jumps:number;
  velocityDecay;
  jumpVelocity:number = 0.08;
  allOtherPlayers:Sup.Actor[] = [];
  previousPositionVector:Sup.Math.Vector2;
  positionVector:Sup.Math.Vector2;
  netVelocityVector:Sup.Math.Vector2;
  netAccelerationVector:Sup.Math.Vector2;
  gravityVector:Sup.Math.Vector2;
  bounds:{
    top:number;
    left:number;
    right:number;
    bottom:number;
  }
  sidesTouching:{
    left:boolean,
    right:boolean,
    bottom:boolean,
    top:boolean
  };
  
  minigamePlayer:MinigamePlayerBehavior;
  
  awake() {
    this.velocityDecay = .20;
    this.gravityVector = new Sup.Math.Vector2(0,-.02);
    this.jumps = 1;
    this.sidesTouching = {
      left:false,
      right:false,
      bottom:false,
      top:false
    }
    this. bounds = {
      top: 3.1,
      left: -5.7,
      right: 5.7,
      bottom: -3.1
  }
    
    
    
    let gridSize = this.actor.spriteRenderer.getSprite().getGridSize();
    this.width = gridSize.width/128;
    this.height = gridSize.height/128;
    this.previousPositionVector = new Sup.Math.Vector2(this.actor.getX(), this.actor.getY());
    this.positionVector = new Sup.Math.Vector2(this.actor.getX(), this.actor.getY());
    this.netVelocityVector = new Sup.Math.Vector2(0,0);
    this.netAccelerationVector = new Sup.Math.Vector2(0,0);
  }

  getCollidables():Sup.Actor[]{
    let output = [];
    for(let actor of GAME.currentMiniGame.obstacles){
      if(actor.getBehavior(ObstacleBehavior).isCollidable){
        output.push(actor);
      }
    }
    return output;
  }

  handleAcceleratedMovement() {
    // None of this happens if the minigame is still counting down
    if(GAME.currentMiniGame.ready()){
      this.netAccelerationVector.x = 0;
      this.netAccelerationVector.y = 0;
      this.netAccelerationVector.x += Controller.getXAxis(this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.controllerIndex) * this.speed;
      this.netAccelerationVector.y += Controller.getYAxis(this.actor.getBehavior(MinigamePlayerBehavior).gamePlayer.controllerIndex) * this.speed;

      this.netVelocityVector.x += this.netAccelerationVector.x;
      this.netVelocityVector.y += this.netAccelerationVector.y;
      this.netVelocityVector.multiplyScalar(1 - this.velocityDecay);

      this.positionVector.x += this.netVelocityVector.x;
      this.positionVector.y += this.netVelocityVector.y;
      
      if(this.positionVector.x < this.bounds.left){
        this.positionVector.x = this.bounds.left;
      }
      if(this.positionVector.x > this.bounds.right){
        this.positionVector.x = this.bounds.right;
      }
      if(this.positionVector.y > this.bounds.top){
        this.positionVector.y = this.bounds.top;
      }
      if(this.positionVector.y < this.bounds.bottom){
        this.positionVector.y = this.bounds.bottom;
      }
      
      
    }
  }

  collideWithCollidableSolids(){
    this.sidesTouching = {
      left:false,
      right:false,
      bottom:false,
      top:false
    }
    this.collideWithCollidableSolidsHelper()
  }

  collideWithCollidableSolidsHelper(){
    let collidables = this.getCollidables();
    
    for(let collidable of collidables) {
      let side = this.passedThroughSide(collidable.getBehavior(ObstacleBehavior));
      if(side == "top"){
        this.positionVector.y = collidable.getY() + collidable.getBehavior(ObstacleBehavior).height/2 + this.height/2 + .01;
        this.netVelocityVector.y = 0;
        this.sidesTouching.bottom = true;
        this.jumps = 1;
      }
      else if(side == "bot"){
        this.positionVector.y = collidable.getY() - collidable.getBehavior(ObstacleBehavior).height/2 - this.height/2;
        this.netVelocityVector.y = 0;
        this.sidesTouching.top = true;
      }
      else if(side == "left"){
        this.positionVector.x = collidable.getX() - collidable.getBehavior(ObstacleBehavior).width/2 - this.width/2;
        this.netVelocityVector.x = 0;
        this.sidesTouching.left = true;
      }
      else if(side == "right"){
        this.positionVector.x = collidable.getX() + collidable.getBehavior(ObstacleBehavior).width/2 + this.width/2;
        this.netVelocityVector.x = 0;
        this.sidesTouching.right = true;
      }
      if(side != "none"){
        this.collideWithCollidableSolidsHelper();
      }
    }
  }

  passedThroughSide(obstacle:ObstacleBehavior) {
    let playerRight = this.positionVector.x + this.width/2;
    let playerLeft = this.positionVector.x - this.width/2;
    let playerBottom = this.positionVector.y - this.height/2;
    let playerTop = this.positionVector.y + this.height/2;
    let objectRight = obstacle.actor.getX() + obstacle.width/2;
    let objectLeft = obstacle.actor.getX() - obstacle.width/2;
    let objectBottom = obstacle.actor.getY() - obstacle.height/2;
    let objectTop = obstacle.actor.getY() + obstacle.height/2;
    let playerRightPrevious = this.previousPositionVector.x + this.width/2;
    let playerLeftPrevious = this.previousPositionVector.x - this.width/2;
    let playerBottomPrevious = this.previousPositionVector.y - this.height/2;
    let playerTopPrevious = this.previousPositionVector.y + this.height/2;
    
    if(playerBottom < objectTop && playerTop > objectBottom) { // If doesnt work, make previous
      if(playerLeftPrevious >= objectRight && playerLeft < objectRight) { return "right"; }
      if(playerRightPrevious <= objectLeft && playerRight > objectLeft) { return "left"; }
    }
    if(playerLeft < objectRight && playerRight > objectLeft ) { // If doesnt work, make previous
      if(playerBottomPrevious >= objectTop && playerBottom <= objectTop) { return "top"; }
      if(playerTopPrevious <= objectBottom && playerTop > objectBottom) { return "bot" }
    }
    return "none";
  }
  

  // SAMPLE SNIPPET
  // allOtherPlayers[0].getBehavior(MinigamePlayerBehavior).velocityVector
  // allOtherPlayers[0].getPosition()
}
Sup.registerBehavior(BaseControlBehavior);