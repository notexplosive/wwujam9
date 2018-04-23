class SumoBehavior extends MinigameBehavior {
  instructions = ["Push them off the edge!","Press A to zoom!", "Don't get rained on!"]
  controlStyle = ControlStyle.TopDown;
  backgroundSpritePath = "LilypadPool";
  lilypadRadius = 3;
  lilypadCenter = new Sup.Math.Vector2(-0.1,0);
  playerBounceDistance = .6;
  playerBounceAmount = .5;
  launchStrength = .5;
  raindropAsset:string = "Raindrop";
  raindropFrequency = .0001;
  framesElapsed:number = 0;
  killPlayerTick:number;
  

  // Positioning code must happen in START, not awake
  start(){
    let startPos = [new Sup.Math.Vector2(0,2.5),new Sup.Math.Vector2(2.5,0),new Sup.Math.Vector2(0,-2.5),new Sup.Math.Vector2(-2.5,0)];
    for(let i = 0; i < this.players.length; i++){
      this.players[i].getControlBehavior().positionVector = startPos[i];
      this.players[i].actor.setEulerZ((Math.PI/2) * (2 + (i * -1)));
      this.players[i].actor.getBehavior(TopDownBehavior).setFaceingVector(Sup.Math.Vector2.up().rotate((Math.PI/2) * (2 + (i * -1))));
      this.players[i].isDashing = 0;
    }
    this.bgPlayer = new Sup.Audio.SoundPlayer("Rain");
    this.killPlayerTick = 0;
  }

  update() {
    this.framesElapsed++;
      if(this.raindropFrequency > .95){
        this.raindropFrequency = .95;
      }
      if(this.players.length == 1){
        this.killPlayerTick++;
      }
    for( let i = 0; i < this.players.length; i++) {
      this.players[i].isDashing--;
      let makeRaindrop = Sup.Math.Random.float(0,1);
      if(this.framesElapsed > 1000) {
        this.raindropFrequency+=.0001;
        if(this.players.length == 1){
          this.raindropFrequency+=.002;
        }
        if(GAME.currentMiniGame.ready() && makeRaindrop > (1-this.raindropFrequency)) {
          this.createRaindrop();
        }
      }
      if(this.framesElapsed == 1000){
        Sup.Audio.playSound("Thunder");
      }
      if(this.framesElapsed == 1200){
        this.bgPlayer.setVolume(0.6);
        this.bgPlayer.play();
      }
      for(let otherPlayer of this.players){
        if(otherPlayer != this.players[i]){
          if(otherPlayer.getPositionVector().distanceTo(this.players[i].getPositionVector()) <= this.playerBounceDistance){
            if(otherPlayer.isDashing < 1) {
              otherPlayer.setVelocityX(this.playerBounceAmount * (otherPlayer.actor.getX() - this.players[i].actor.getX()));
              otherPlayer.setVelocityY(this.playerBounceAmount * (otherPlayer.actor.getY() - this.players[i].actor.getY()));
            }
            if(this.players[i].isDashing < 1){
              this.players[i].setVelocityX(this.playerBounceAmount * (this.players[i].actor.getX() - otherPlayer.actor.getX()));
              this.players[i].setVelocityY(this.playerBounceAmount * (this.players[i].actor.getY() - otherPlayer.actor.getY()));
            }
          }
        }
      }
      if(this.players[i].getPositionVector().distanceTo(this.lilypadCenter) >= this.lilypadRadius)//this.distanceFromLillypadCenterSquared(this.players[i]) >= this.lilypadRadius)\
      {
        Sup.Audio.playSound("Music/Splash");
        this.players[i].kill();
        continue;
      }
      if(Controller.wasButtonJustPressed(this.players[i].gamePlayer.controllerIndex,Controller.A_BUTTON)) {
        let unitDirectionVector = this.players[i].actor.getBehavior(TopDownBehavior).getFacingVector().clone().normalize().multiplyScalar(this.launchStrength);
        this.players[i].setVelocityX(unitDirectionVector.x);
        this.players[i].setVelocityY(unitDirectionVector.y);
        this.players[i].isDashing = 20;
        let pitch = Sup.Math.Random.float(-0.2,0.8);
        Sup.Audio.playSound("WOW", 1, {pitch:pitch});
        Sup.log("player " + i + "zoomed");
      }
      for(let collidable of GAME.currentMiniGame.obstacles){
        if(collidable.getName() == "raindrop"){
          collidable.getBehavior(ObstacleBehavior).life--;
          collidable.spriteRenderer.setOpacity(collidable.getBehavior(ObstacleBehavior).life/100)
          if(collidable.getBehavior(ObstacleBehavior).life < 0){
            collidable.getBehavior(ObstacleBehavior).kill();
            continue;
          }
        }
        if(collidable.getName() == "raindrop" && collidable.getBehavior(ObstacleBehavior).life > 90 &&
           this.players[i].getControlBehavior().positionVector.distanceTo(new Sup.Math.Vector2(collidable.getX(), collidable.getY()))
           <= .85 * (collidable.getLocalScale().x * collidable.getBehavior(ObstacleBehavior).width/2 + this.players[i].getControlBehavior().width/2)){
          
          this.players[i].setVelocityX(this.playerBounceAmount * (this.players[i].actor.getX() - collidable.getX()));
          this.players[i].setVelocityY(this.playerBounceAmount * (this.players[i].actor.getY() - collidable.getY()));
        }
      }
    }
  }

  createRaindrop(){
    let raindrop = GAME.currentMiniGame.createObstacle("raindrop");
    raindrop.getBehavior(ObstacleBehavior).life = 100;
    let size = Sup.Math.Random.float(.2,.5);
    let x = Sup.Math.Random.float(-6,6);
    let y = Sup.Math.Random.float(-5,5);
    if(this.killPlayerTick > 100) {
      x = Sup.Math.Random.float(this.players[0].actor.getX() - 1.5,this.players[0].actor.getX() + 1.5)
      y = Sup.Math.Random.float(this.players[0].actor.getY() - 1.5,this.players[0].actor.getY())
    }
    raindrop.setLocalScale(size);
    new Sup.SpriteRenderer(raindrop, this.raindropAsset);
    raindrop.spriteRenderer.setColor(new Sup.Color(0x2020aa))
    raindrop.setPosition(x,y);
    raindrop.spriteRenderer.setAnimation('Go');
    raindrop.spriteRenderer.playAnimation(false);
  }

  distanceFromLillypadCenterSquared(player:MinigamePlayerBehavior){
    let lillypadCenter = new Sup.Math.Vector2( -0.1 , 0);
    let playerPosition = new Sup.Math.Vector2(player.actor.getX(), player.actor.getY());
    return lillypadCenter.distanceTo(playerPosition);
  }
}
Sup.registerBehavior(SumoBehavior);
