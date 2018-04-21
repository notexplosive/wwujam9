let Behavior = Sup.Behavior; // just trust me, replace any "Sup.Behavior" with "Behavior"

enum ControlStyle{Tank,TopDown,Platformer,PlatformerWithDoubleJump,Flying,Static};

let playerColors = [0xFF0000,0x00FF00,0x0000FF,0xF0FF00];

let GAME:Game; // Gets defined later, this is where all global game state lives 