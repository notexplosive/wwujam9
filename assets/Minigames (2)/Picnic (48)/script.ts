class PicnicBehavior extends MinigameBehavior {
  instructions = ["Get the cake!","Controls are randomized!"]
  controlStyle = ControlStyle.Platformer;
  backgroundSpritePath = "PicnicBasket";
  
  start() {
    let plate = this.createObstacle("Plate");
    plate.getBehavior(ObstacleBehavior).isCollidable = true;
    plate.getBehavior(ObstacleBehavior).width = 2;
    plate.getBehavior(ObstacleBehavior).height = 0.5;
    plate.setPosition(-2.25,.5);
    
    let ground = this.createObstacle("Ground");
    ground.getBehavior(ObstacleBehavior).isCollidable = true;
    ground.getBehavior(ObstacleBehavior).width = 15;
    ground.setPosition(0,-3.5);
    
    for(let player of this.players) {
      player.actor.getBehavior(PlatformerBehavior).jump = Sup.Math.Random.integer(1,11);
      player.actor.getBehavior(PlatformerBehavior).xAxis = Sup.Math.Random.integer(1,3);
    }
  }

  update() {
    for(let player of this.players){
      if(player.getPositionVector().y < -5){
        player.kill();
      }
    }
  }
}
Sup.registerBehavior(PicnicBehavior);
