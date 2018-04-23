let Behavior = Sup.Behavior; // just trust me, replace any "Sup.Behavior" with "Behavior"

enum ControlStyle{Tank,TopDown,Platformer,PlatformerWithDoubleJump,Flying,Static};

let playerColors = [0xbe82ff,0x98FB98,0xE0FFFF,0xFF7F50];

let GAME:Game; // Gets defined later, this is where all global game state lives 

let MINIGAMEPOOL:string[] = ['sumo','lantern','jumprope'];

function getRandomElement(array){
  let index = Math.floor(Math.random()*array.length);
  return array[index];
}

function createRandomMinigameActor(){
  let minigameName = getRandomElement(MINIGAMEPOOL);
  Sup.log(minigameName);
  let act = new Sup.Actor("Minigame")
  
  switch(minigameName){
    case 'sumo':
      act.addBehavior( SumoBehavior );
      break;
    case 'lantern':
      act.addBehavior( LanternGameBehavior );
      break;
    case 'jumprope':
      act.addBehavior( JumpRopeBehavior );
  }
  return act;
}