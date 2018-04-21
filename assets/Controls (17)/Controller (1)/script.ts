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

  static getXAxis(playerNumber:number) {
    return Sup.Input.getGamepadAxisValue(playerNumber, Controller.LEFT_X_AXIS)/* + Sup.Input.getGamepadButtonValue(playerNumber, Controller.DPAD_X_AXIS)*/;
  }
  
  static getYAxis(playerNumber:number) {
    return Sup.Input.getGamepadAxisValue(playerNumber, Controller.LEFT_Y_AXIS)/* + Sup.Input.getGamepadButtonValue(playerNumber, Controller.DPAD_Y_AXIS)*/;
  }
  
  static wasButtonJustPressed(playerNumber:number, button:number) {
    return Sup.Input.wasGamepadButtonJustPressed(playerNumber, button);
  }
  
  static isButtonDown(playerNumber:number, button) {
    return Sup.Input.isGamepadButtonDown(playerNumber, button);
  }
  
}