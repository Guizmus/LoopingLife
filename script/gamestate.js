GameState = {
  vars : {},
  init : function () {
    return this.parseSavefile() ? this.loadData() : false;
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
    $.each(GameState.vars,function(className,classObject) {
      saveData[className] = GameState.vars[className].saveGameState.call(GameState);
    });
    localStorage.setItem(Utils.gameName,JSON.stringify(saveData));
  },
  load : function () {
    var data = GameState.loadData();
    UI.redraw();
    return data;
  },
  loadData : function () {
    var saveData = localStorage.getItem(Utils.gameName);
    if (saveData === "{}")
      return false;
    saveData = JSON.parse(saveData);
    $.each(saveData,function(className,data) {
      if (GameState.registerVar(className)) {
          GameState.vars[className].loadGameState.call(this,data);
      }
    });
    return GameState.vars;
  },
  registerVar :  function (className) { // every registered var is a class, that needs to have 2 functions : loadGameState and saveGameSate
    // console.log(typeof(className))
    var newClass = typeof(className) =="function" ? new className() : new (window[className])();
    
    var errors = [];
    if (typeof(newClass.saveGameState) == "undefined")
      errors.push("No saveGameState method declared");
    if (typeof(newClass.loadGameState) == "undefined")
      errors.push("No loadGameState method declared");
    if (errors.length > 0) {
      console.error("Trying to register the class ",className," with errors");
      $(errors).each(function(x,error){console.log(error)});
      return false;
    }
    GameState.vars[typeof(className) =="function" ? className.name : className] = newClass;
    return true;
  }
}
