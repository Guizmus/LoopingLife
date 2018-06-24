window.GameState = {
  init : function () {
    return GameState.parseSavefile() ? GameState.load() : false;
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
    $.each(GameState.registeredVars,function(x,className) {
      saveData[className] = window[className].saveGameState.call(this);
    });
    localStorage.setItem(Utils.gameName,JSON.stringify(saveData));
  },
  load : function () {
    var saveData = localStorage.getItem(Utils.gameName);
    if (saveData === "{}")
      return false;
    saveData = JSON.parse(saveData);
    $.each(saveData,function(className,data) {
      if (GameState.registerVar(className))
        window[className].loadGameState.call(this,data);
    });
    return GameState.registeredVars;
  },
  registeredVars : [],
  registerVar :  function (className) { // every registered var is a class, that needs to have 2 functions : loadGameState and saveGameSate
    var errors = [];
    if (typeof(window[className].saveGameState) == "undefined")
      errors.push("No saveGameState method declared");
    if (typeof(window[className].loadGameState) == "undefined")
      errors.push("No loadGameState method declared");
    if (errors.length > 0) {
      console.error("Trying to register the class "+className+" with errors");
      $(errors).each(function(x,error){console.log(error)});
      return false;
    }
    GameState.registeredVars.push(className);
    return true;
  }
}
