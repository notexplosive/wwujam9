class ObstacleBehavior extends Sup.Behavior {
  awake() {
    this.width = 1;
    this.height = 1;
    
    if(this.actor.spriteRenderer){
      let gridSize = this.actor.spriteRenderer.getSprite().getGridSize();
      this.width = gridSize.width/128;
      this.height = gridSize.height/128;
    }
  }

  update() {
    
  }
  
  kill(){
    GAME.currentMiniGame.killObstacle(this.actor);
  }
  
  width:number;
  height:number;
  canKillYou:boolean;
  isCollidable:boolean;
  life:number;
}
Sup.registerBehavior(ObstacleBehavior);
