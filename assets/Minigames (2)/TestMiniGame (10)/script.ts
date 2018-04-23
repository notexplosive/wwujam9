class TestMiniGameBehavior extends MinigameBehavior {
  instructions = ["THIS IS A TEST","PLEASE IGNORE"]
  controlStyle = ControlStyle.Flying;  
  

  awake() {
    
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("SPACE")){
      this.completeGame();
    }
    if(Sup.Input.wasKeyJustPressed("C")){
      let collidable = this.createObstacle("my obstakl");
      collidable.getBehavior(ObstacleBehavior).isCollidable = true;
      collidable.spriteRenderer.setSprite("TopDownPlayer");
    }
  }
}
Sup.registerBehavior(TestMiniGameBehavior);
