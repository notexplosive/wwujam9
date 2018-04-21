class StartScreenBehavior extends Sup.Behavior {
  awake() {
    GAME.players = [];
  }

  update() {
    for (let i = 0; i < 4; i++) {
      if(Controller.wasButtonJustPressed( i, Controller.START_BUTTON ) && playerDoesNotExist(i)) {  
        let player = new Player();
        player.playerNumber = i + 1;
        player.controllerIndex = i;
        player.color = playerColors[i];
        GAME.players.push(player);
      }
    }
  }
}
Sup.registerBehavior(StartScreenBehavior);


  function playerDoesNotExist(playerNumber:number) {
    for(let i = 0; i < GAME.players.length; i++) {
      if (GAME.players[i].playerNumber == (playerNumber + 1)) {
        return false;
      }
    }
    
    return true;
  }