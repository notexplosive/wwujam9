class Controller {
  
  static A_BUTTON:number = 0;
  static B_BUTTON:number = 1;
  static X_BUTTON:number = 2;
  static Y_BUTTON:number = 3;  
  static LEFT_BUMPER:number = 4;
  static RIGHT_BUMPER:number = 5;
  static LEFT_TRIGGER:number = 6;
  static RIGHT_TRIGGER:number = 7;
  static SELECT_BUTTON:number = 8;
  static START_BUTTON:number = 9;
  static LEFT_STICK_BUTTON:number = 10;
  static RIGHT_STICK_BUTTON:number = 11;
  
  static LEFT_X_AXIS:number = 0;
  static LEFT_Y_AXIS:number = 1;
  static RIGHT_X_AXIS:number = 2;
  static RIGHT_Y_AXIS:number = 3;

  static getXAxis(controllerIndex:number) {
    if(!GAME.currentMiniGame.ready()){
      return 0;
    }
    return Sup.Input.getGamepadAxisValue(controllerIndex, Controller.LEFT_X_AXIS)/* + Sup.Input.getGamepadButtonValue(controllerIndex, Controller.DPAD_X_AXIS)*/;
  }
  
  static getYAxis(controllerIndex:number) {
    if(!GAME.currentMiniGame.ready()){
      return 0;
    }
    return -1 * Sup.Input.getGamepadAxisValue(controllerIndex, Controller.LEFT_Y_AXIS)/* + Sup.Input.getGamepadButtonValue(controllerIndex, Controller.DPAD_Y_AXIS)*/;
  }
  
  static wasButtonJustPressed(controllerIndex:number, button:number) {
    if(!GAME.currentMiniGame.ready()){
      return false;
    }
    return Sup.Input.wasGamepadButtonJustPressed(controllerIndex, button);
  }
  
  static isButtonDown(controllerIndex:number, button) {
    if(!GAME.currentMiniGame.ready()){
      return false;
    }
    return Sup.Input.isGamepadButtonDown(controllerIndex, button);
  }
  
}