class MinigameHandlerBehavior extends Behavior {
  awake() {
    Sup.log("Minigame handler created!")
    this.currentInstructionIndex = 0;
  }

  update() {
    this.frames++;
  }
  
  public miniGame:MinigameBehavior;
  
  private currentInstructionIndex:number;
  private frames:number;
}
Sup.registerBehavior(MinigameHandlerBehavior);
