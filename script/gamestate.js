window.GameState = {
  init : function () {
    GameState.parseSavefile() ? GameState.load() : GameState.newSaveFile();
  },
  parseSavefile : function () { // parse the local storage, and returns if there is an active save loaded.
    if (localStorage.getItem(Utils.gameName) === null) {
      localStorage.setItem(Utils.gameName,JSON.stringify({}));
      return false;
    }
    
    return true;

  },
  save : function () {
    var saveData = {};
    $.each(GameState.registeredVars,function(className) {
      saveData[className] = window[className].saveGameState.call(this);
    });
    localStorage.setItem(Utils.gameName,JSON.stringify(saveData));
  },
  load : function () {
    var saveData = JSON.parse(localStorage.getItem(Utils.gameName));
    $.each(saveData,function(className,data) {
      window[className].laodGameState.call(this,data);
      GameState.registerVar(className);
    });
  },
  newSaveFile : function () {

  },
  registeredVars : {},
  registerVar :  function (className) { // every registered var is a class, that needs to have 2 functions : laodGameState and saveGameSate
    GameState.registeredVars.push(className);
  }
}
