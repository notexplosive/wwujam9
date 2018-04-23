class LanternGameBehavior extends MinigameBehavior { 
  instructions = ["Press A to flap","Don't get dragged into the light!"]
  controlStyle = ControlStyle.Flying;
  backgroundSpritePath = "LanternBackground"
  lanternCenter:Sup.Math.Vector2[] = [new Sup.Math.Vector2(-0.4,2), new Sup.Math.Vector2(-0.4,0.2)];
  lanternRadius:number[] = [1.8,1.6];
  flagForDead:boolean = false;
  lanternForce:number = 0.02;
  flashTimer = 0;

  awake(){
    
  }

  start(){
    let vec = [new Sup.Math.Vector2(5,0),new Sup.Math.Vector2(-5,0),new Sup.Math.Vector2(5,-2),new Sup.Math.Vector2(-5,-2)];
    for(let i = 0; i < this.players.length; i++){
      this.players[i].getControlBehavior().positionVector = vec[i];
    }
  }

  update() {
    this.lanternForce += .00001;
    if(this.flashTimer <= 0){
      this.getHandler().backgroundActor.spriteRenderer.setSprite("Background/LanternBackground");
    }else{
      this.flashTimer--;
    }
    
    for(let i = 0; i < this.players.length; i++){
      for(let j = 0; j < this.lanternCenter.length; j++){
        if(this.players[i].getPositionVector().distanceTo(this.lanternCenter[j]) <= this.lanternRadius[1] && this.ready())
        {
          this.getHandler().backgroundActor.spriteRenderer.setSprite("Background/LanternFlash");
          this.flashTimer = 10;
          this.players[i].kill();
          this.flagForDead = true;
          Sup.Audio.playSound("Music/Zap");
          break;
        }
      }
      if(this.flagForDead){
        this.flagForDead = false;
        continue;
      }
      if(this.players[i].getPositionVector().x > 5.835){
        this.players[i].getControlBehavior().positionVector.add(new Sup.Math.Vector2(-11.67, 0));
      }else if(this.players[i].getPositionVector().x < -5.835){
        this.players[i].getControlBehavior().positionVector.add(new Sup.Math.Vector2(11.67, 0));
      }else if(this.players[i].getPositionVector().y > 3.108){
        this.players[i].getControlBehavior().positionVector = new Sup.Math.Vector2(this.players[i].getControlBehavior().positionVector.x, 3.108);
      }else if(this.players[i].getPositionVector().y < -3.208){
        this.players[i].kill();
        continue;
      }
      if(this.players[i].getControlBehavior().positionVector.x > -0.4){
        this.players[i].actor.getBehavior(FlyingBehavior).gravityVector.x = -1 * this.lanternForce;
      }else if(this.players[i].getControlBehavior().positionVector.x < -0.4){
        this.players[i].actor.getBehavior(FlyingBehavior).gravityVector.x = this.lanternForce;
      }
    }
  }
}
Sup.registerBehavior(LanternGameBehavior);
