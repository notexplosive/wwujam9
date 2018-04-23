class Player{
  // Number displayed in game
  playerNumber:number;
  // Number associated with the controller
  controllerIndex:number;
  // Hex value for color
  color:number;
  // Score
  score:number;
  
  constructor(controllerIndex){
    Sup.log("Player has entered with controller index: " + controllerIndex);
    this.playerNumber = GAME.players.length + 1;
    this.controllerIndex = controllerIndex;
    this.score = 5;
    this.color = playerColors[this.controllerIndex];
    
    GAME.alert("Player " + this.playerNumber + " joined!\nAs controller " + controllerIndex);
    GAME.players.push(this);
  }
}