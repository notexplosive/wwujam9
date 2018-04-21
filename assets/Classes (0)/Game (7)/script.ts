// Global singleton tracked across all minigames
class Game {
  players:Player[];
  currentMiniGame:MinigameBehavior;
  gamesLeft:number;
  
  constructor(){
    this.players = [];
    this.gamesLeft = 5;
    this.currentMiniGame = null;
  }
  
  startNewMiniGame(miniGame:MinigameBehavior){
    if(this.currentMiniGame == null || this.currentMiniGame.isComplete()){
      if(this.currentMiniGame){
        this.currentMiniGame.actor.destroy();
      }
      this.currentMiniGame = miniGame;
    }
    
    // create minigame actors
  }
}

GAME = new Game();