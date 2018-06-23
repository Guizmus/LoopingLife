window.GameState = {
  init : function (gameName) {
    GameState.gameName = gameName;
    GameState.parseSavefile() ? GameState.load() : GameState.newSaveFile();
  },
  parseSavefile : function () { // parse the local storage, and returns if there is an active save loaded.
    if (localStorage.getItem(GameState.gameName) === null) {
      localStorage.setItem(GameState.gameName,JSON.stringify({}));
      return false;
    }
    
    return true;

  },
  save : function () {
    var saveData = {};
    $.each(GameState.registeredVars,function(className) {
      saveData[className] = window[className].saveGameState.call(this);
    });
    localStorage.setItem(GameState.gameName,JSON.stringify(saveData));
  },
  load : function () {
    var saveData = JSON.parse(localStorage.getItem(GameState.gameName));
    $.each(saveData,function(className,data) {
      window[className].laodGameState.call(this,data);
      GameState.registerVar(className);
    });
  },
  newSaveFile : function () {

  },
  registeredVars : {},
  registerVar :  function (className) {
    GameState.registeredVars.push(className);
  }
}
