// Global singleton tracked across all minigames
class Game {
  players:Player[];
  currentMiniGame:MinigameBehavior;
  gamesLeft:number;
  camera:Sup.Camera;
  scoreboard:ScoreBoardBehavior;
  currentMusicTrack:Sup.Audio.SoundPlayer;

  constructor(){
    this.players = [];
    this.gamesLeft = 5;
    this.currentMiniGame = null;
    
    let cameraActor = new Sup.Actor("Camera");
    cameraActor.setZ(10);
    
    this.camera = new Sup.Camera(cameraActor);
    this.camera.setOrthographicMode(true);
    this.camera.setOrthographicScale(6.5);
    
    this.changeTrack("Titlescreen");
  }

  changeTrack(assetName:string){
    if(this.currentMusicTrack && this.currentMusicTrack.isPlaying()){
      this.currentMusicTrack.stop();
    }
    if(assetName == ""){
      return;
    }
    this.currentMusicTrack = new Sup.Audio.SoundPlayer("Music/"+assetName);
    this.currentMusicTrack.play();
  }
  
  startNewMiniGame(miniGame:Sup.Actor):boolean{
    this.changeTrack("");
    if(this.scoreboard && !this.scoreboard.isDestroyed()){
      this.scoreboard.actor.destroy();
      this.scoreboard == null;
    }
    if(!this.miniGameInProgress()){
      if(this.currentMiniGame && !this.currentMiniGame.actor.isDestroyed()){
        this.currentMiniGame.actor.destroy();
      }
      
      for(let player of this.players){
        if(player.score == 0){
          let act = new Sup.Actor("Score Screen");
          act.addBehavior(EndScreenBehavior);
          miniGame.destroy();
          return false;
        }
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
    let rend = new Sup.TextRenderer(actor,text,"Font");
    rend.setColor(new Sup.Color(0xFF9999));
    actor.addBehavior(PopTextBehavior);
  }
}

GAME = new Game();