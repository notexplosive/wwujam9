class MinigameBehavior extends Behavior {
  init(){
    if(this.controlStyle == null){
      Sup.log("You forgot to set a control style on one of the minigames")
      return;
    }
    
    Sup.log("GAME START");
    
    this.players = [];
    this.complete = false;
    
    for(let i = 0; i < GAME.players.length; i++){
      let player = new Sup.Actor("Player" + i,this.actor);
      player.addBehavior(MinigamePlayerBehavior).init(GAME.players[i],this.controlStyle,this);
      this.players.push(player.getBehavior(MinigamePlayerBehavior));
    }
    
    this.miniGameHandler = this.actor.addBehavior(MinigameHandlerBehavior)
    this.miniGameHandler.miniGame = this;
  }
  
  // TODO: handle ranking
  completeGame(){
    GAME.changeTrack("Transition");
    if(this.bgPlayer && this.bgPlayer.isPlaying()){
      this.bgPlayer.stop();
    }
    Sup.log("GAME COMPLETE");
    GAME.alert("COMPLETE!");
    this.complete = true;
    
    if(this.winner){
      for(let player of GAME.players){
        if(this.winner != player){
          player.score--;
        }
      }
    }
    
    new Sup.Actor("Scoreboard").addBehavior(ScoreBoardBehavior);
    
    GAME.currentMiniGame = null;
    
    // TODO: give scores to players
    // first place: 3 points
    // second place: 2 points
    // third place: 1 points
    // forth place: 0 points
    
    this.actor.destroy();
  }
  
  createObstacle(obstacleName:string):Sup.Actor{
    let obstacle = new Sup.Actor(obstacleName,this.actor);
    obstacle.addBehavior(ObstacleBehavior).actor;
    this.obstacles.push(obstacle);
    return obstacle;
  }
  
  isComplete():boolean{
    return this.complete;
  }
  
  getInstructions():string[]{
    if(!this.instructions){
      return [];
    }
    return this.instructions;
  }

  getBackgroundSpritePath():string{
    if(!this.backgroundSpritePath){return ""}
    return this.backgroundSpritePath;
  }

  killPlayer(player:MinigamePlayerBehavior) {
    for(let i = 0; i < this.players.length; i++) {
      if(this.players[i] == player){
        player.actor.destroy();
        this.players.splice(i, 1);
      }
    }
  }

  killObstacle(actor:Sup.Actor){
    for(let i = 0; i < this.obstacles.length; i++){
      if(actor == this.obstacles[i]){
        actor.destroy();
        this.obstacles.splice(i,1);
      }
    }
  }

  ready(){
    return this.miniGameHandler.ready();
  }

  getPlayers(){
    return this.players;
  }

  getHandler(){
    return this.miniGameHandler;
  }

  winner:Player;
  bgPlayer:Sup.Audio.SoundPlayer;
  
  private complete:boolean = false;
  private miniGameHandler:MinigameHandlerBehavior;

  // THINGS YOU NEED TO OVERWRITE
  protected instructions:string[];
  protected controlStyle:ControlStyle;
  protected backgroundSpritePath:string;

  // THINGS YOU HAVE ACCESS TO
  protected players:MinigamePlayerBehavior[];

  obstacles:Sup.Actor[] = [];
}
Sup.registerBehavior(MinigameBehavior);
