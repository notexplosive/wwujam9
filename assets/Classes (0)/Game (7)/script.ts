// Global singleton tracked across all minigames
class Game {
  players:Player[];
  currentMiniGame:MinigameBehavior;
  gamesLeft:number;
  camera:Sup.Camera;
  scoreboard:ScoreBoardBehavior;
  
  constructor(){
    this.players = [];
    this.gamesLeft = 5;
    this.currentMiniGame = null;
    
    let cameraActor = new Sup.Actor("Camera");
    cameraActor.setZ(10);
    
    this.camera = new Sup.Camera(cameraActor);
    this.camera.setOrthographicMode(true);
    this.camera.setOrthographicScale(6.5);
  }
  
  startNewMiniGame(miniGame:Sup.Actor):boolean{
    if(this.scoreboard && !this.scoreboard.isDestroyed()){
      this.scoreboard.actor.destroy();
      this.scoreboard == null;
    }
    if(!this.miniGameInProgress()){
      if(this.currentMiniGame && !this.currentMiniGame.actor.isDestroyed()){
        this.currentMiniGame.actor.destroy();
      }
      this.currentMiniGame = miniGame.getBehavior(MinigameBehavior);
      this.currentMiniGame.init();
      return true;
    }else{
      Sup.log('action blocked because minigame in progress')
      // Destroy the passed in actor
      miniGame.destroy();
      return false;
    }
  }
  
  miniGameInProgress():boolean{
    if(this.currentMiniGame == null ){
      // No minigame means minigame not in progress
      return false;
    }
    
    return !this.currentMiniGame.isComplete();
  }
  
  alert(text:string){
    let actor = new Sup.Actor("TextAlert");
    actor.setZ(3);
    new Sup.TextRenderer(actor,text,"Font");
    actor.addBehavior(PopTextBehavior);
  }
}

GAME = new Game();