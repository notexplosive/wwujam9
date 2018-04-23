class JumpRopeBehavior extends MinigameBehavior {
  instructions = ["Press A to jump!","Jump when the hand comes."]
  controlStyle = ControlStyle.Static;
  backgroundSpritePath = "Kitchen";

  private hand:Sup.Actor;
  private floorPosition = -1.5;
  private angle = -Math.PI/2;
  private oscSpeed = .01;
  
  start(){
    let startPos = [
      new Sup.Math.Vector2(-1.25,0),
      new Sup.Math.Vector2(-.5,0),
      new Sup.Math.Vector2(.5,0),
      new Sup.Math.Vector2(1.5,0)
    ]
    
    for(let i = 0; i < this.players.length; i++){
      this.players[i].actor.setPosition(startPos[i]);
      this.players[i].actor.spriteRenderer.setSprite("PlatformPlayer");
    }
    
    this.hand = this.createObstacle("Hand");
    this.hand.getBehavior(ObstacleBehavior).height = 10;
    this.hand.getBehavior(ObstacleBehavior).isCollidable = true;
    new Sup.SpriteRenderer(this.hand,"Hand");
    this.hand.spriteRenderer.setAnimation("Left");
    this.hand.setPosition(new Sup.Math.Vector2(-4,this.floorPosition+.5));
    this.hand.setX(Math.sin(this.angle)*6);
  }

  update() {
    let width = 4;
    if(this.hand.getX() < -width){
      this.hand.spriteRenderer.setAnimation("Left");
    }else if(this.hand.getX() > width){
      this.hand.spriteRenderer.setAnimation("Right");
    }else {
      this.hand.spriteRenderer.setAnimation("Middle");
    }
    
    if(this.ready()){
      this.angle += this.oscSpeed;
      this.oscSpeed += .0001;
      this.hand.setX(Math.sin(this.angle)*6);
    }
    
    for(let i = 0; i < this.players.length; i++){
      if(this.players[i].actor.getY() < this.floorPosition){
        this.players[i].actor.spriteRenderer.setAnimation('Stand')
        this.players[i].getControlBehavior().positionVector.y = this.floorPosition;
        this.players[i].getControlBehavior().netVelocityVector.y = 0;
        
        if(this.players[i].getPositionVector().distanceTo(this.hand.getPosition()) < 1){
          this.players[i].kill();
          continue;
        }
      }else{
        this.players[i].getControlBehavior().netVelocityVector.y -= .02;
        this.players[i].actor.spriteRenderer.setAnimation('Jump')
      }
      
      this.players[i].actor.setY(this.players[i].actor.getY() + this.players[i].getControlBehavior().netVelocityVector.y);
      
      if(Controller.wasButtonJustPressed(this.players[i].gamePlayer.controllerIndex, Controller.A_BUTTON)){
        if(this.players[i].actor.getY() <= this.floorPosition){
          Sup.Audio.playSound("Music/Jump");
          this.players[i].getControlBehavior().netVelocityVector = new Sup.Math.Vector2(0,.4);
          this.players[i].actor.setY(this.players[i].actor.getY() + this.players[i].getControlBehavior().netVelocityVector.y);
        }
      }
      
    }
  }
}
Sup.registerBehavior(JumpRopeBehavior);
