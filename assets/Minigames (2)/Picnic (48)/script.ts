class PicnicBehavior extends MinigameBehavior {
  instructions = ["Get the cake!","Jump button randomized!", "Movement stick randomized!"]
  controlStyle = ControlStyle.Platformer;
  backgroundSpritePath = "PicnicBasket";
  tick = 0;
  winplayer;
  
  start() {
    let plate = this.createObstacle("Plate");
    plate.getBehavior(ObstacleBehavior).isCollidable = true;
    plate.getBehavior(ObstacleBehavior).width = 2.2;
    plate.getBehavior(ObstacleBehavior).height = 0.1;
    plate.setPosition(-2.6,.6);
    
    let ground = this.createObstacle("Ground");
    ground.getBehavior(ObstacleBehavior).isCollidable = true;
    ground.getBehavior(ObstacleBehavior).width = 15;
    ground.setPosition(0,-3.5);
    
    let platform = this.createObstacle("Platform");
    platform.getBehavior(ObstacleBehavior).isCollidable = true;
    platform.getBehavior(ObstacleBehavior).width = 2.5;
    platform.getBehavior(ObstacleBehavior).height = 0.005;
    platform.setPosition(3,-1.3);
    
    for(let player of this.players) {
      player.actor.getBehavior(PlatformerBehavior).jump = Sup.Math.Random.integer(1,11);
      player.actor.getBehavior(PlatformerBehavior).xAxis = Sup.Math.Random.integer(1,3);
    }
    let vec = [new Sup.Math.Vector2(-3,-2),new Sup.Math.Vector2(-1,-2),new Sup.Math.Vector2(1,-2),new Sup.Math.Vector2(3,-2)];
    for(let i = 0; i < this.players.length; i++){
      this.players[i].getControlBehavior().positionVector = vec[i];
      this.players[i].actor.setPosition(vec[i]);
    }
  }

  update() {
    for(let player of this.players){
      if(player.getPositionVector().x > -3.85 && player.getPositionVector().x < -1 && player.getPositionVector().y > 0.75 && player.getPositionVector().y < 3.25){
        for(let play of this.players){
            if(play.actor != player.actor){
              play.kill();
            } else{
              this.winplayer = play;
            }
        }
        if(this.tick == 0){
          this.tick = 60; 
        }
      }
    }
    if(this.tick > 0){
      this.tick--;
      if(this.tick == 0){
        this.winplayer.kill();
      }
    }
    
  }
}
Sup.registerBehavior(PicnicBehavior);
