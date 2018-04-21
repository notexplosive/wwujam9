class MinigameBehavior extends Behavior {
  init(controlStyle:ControlStyle){
    this.players = [];
    this.complete = false;
    this.miniGameHandler = new Sup.Actor("MinigameHandler",this.actor).addBehavior(MinigameHandlerBehavior)
    this.miniGameHandler.miniGame = this;
    
    for(let i = 0; i < GAME.players.length; i++){
      let player = new Sup.Actor("Player" + i);
      player.addBehavior(MinigamePlayerBehavior).init(GAME.players[i],controlStyle);
      this.players.push(player);
    }
  }
  
  completeGame(ranking:Player[]){
    this.complete = true;
    
    // TODO: give scores to players
    // first place: 3 points
    // second place: 2 points
    // third place: 1 points
    // forth place: 0 points
  }
  
  isComplete():boolean{
    return this.complete;
  }
  
  getInstructions():string[]{
    return this.instructions;
  }
  
  private players:Sup.Actor[];
  private complete:boolean = false;
  private miniGameHandler:MinigameHandlerBehavior;

  // THINGS TO INHERIT
  protected instructions:string[];
}
Sup.registerBehavior(MinigameBehavior);
