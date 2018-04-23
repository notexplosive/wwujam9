// Exists solely so Minigame doesn't need an awake() or update() function

class MinigameHandlerBehavior extends Behavior {
  awake() {
    this.frames = 0;
    this.currentInstructionIndex = 0;
    this.countdown = 3;
  }
  
  start() {
    Sup.log("Minigame handler created!")
    let bgActor = new Sup.Actor("Background",this.actor);
    bgActor.setZ(-5);
    
    if(this.miniGame.getBackgroundSpritePath() != ""){
      new Sup.SpriteRenderer(bgActor,"Background/"+this.miniGame.getBackgroundSpritePath());
      this.backgroundActor = bgActor;
      bgActor.setLocalScale(1,1,1)
    }
  }

  update() {
    this.frames++;
    
    if(this.frames > 1 && this.frames % 90 == 0){
      if(this.miniGame.getInstructions().length > 0){
        let instruction = this.miniGame.getInstructions()[this.currentInstructionIndex++];
        if(instruction){
          GAME.alert(instruction);
        }else if(this.countdown > 0){
          GAME.alert(this.countdown+'!');
          Sup.Audio.playSound("Music/Count")
          this.countdown--;
        }else if(this.countdown == 0){
          GAME.alert('GO!');
          Sup.Audio.playSound("Music/Go")
          GAME.changeTrack("Minigame");
          this.countdown = -1;
        }
      }else{
        // Skip the coundown if there's no instructions
        this.countdown = -1;
      }
    }
    
    if(this.miniGame.getPlayers().length == 0 && this.actor.getName() != "StartScreen"){
      this.miniGame.completeGame();
    }
    
    this.wasReadyLastFrame = this.ready();
  }
  
  ready(){
    return this.countdown == -1;
  }
  
  justGotReady(){
    return this.ready() && !this.wasReadyLastFrame;
  }
  
  
  public miniGame:MinigameBehavior;
  public backgroundActor:Sup.Actor;

  
  private currentInstructionIndex:number;
  private frames:number;
  private countdown:number;
  private wasReadyLastFrame:boolean;
}
Sup.registerBehavior(MinigameHandlerBehavior);