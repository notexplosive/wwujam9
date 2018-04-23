class PopTextBehavior extends Sup.Behavior {
  private tick = 0;
  awake() {
    this.actor.setLocalScale(.5,.5,1);
    this.actor.textRenderer.setOpacity(1);
  }

  update() {
    this.tick++;
    let scl = this.actor.getLocalScaleX()
    let drama = .01
    if(this.tick < 10){
      scl *= 1 + drama;
    }else if(this.tick < 15){
      scl *= 1 - drama;
    }
    
    if(this.tick > 60 && this.tick < 120){
      this.actor.textRenderer.setOpacity(this.actor.textRenderer.getOpacity()*.95);
    }
    
    if(this.tick == 120){
      this.actor.destroy();
    }
    
    this.actor.setLocalScale(scl,scl,1);
  }
}
Sup.registerBehavior(PopTextBehavior);
