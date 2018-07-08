GameState = {
  debug : false,
  vars : {},
  init : function () {
    return this.parseSavefile() ? this.loadData() : false;
  },
  parseSavefile : function () { // parse the local storage, and returns if there is an active save loaded.
    // return false;
    if (localStorage.getItem(Utils.gameName) === null) {
      if (GameState.debug)
        console.log("No save file found")
      localStorage.setItem(Utils.gameName,JSON.stringify({}));
      return false;
    }
    
    if (GameState.debug)
      console.log("A save file was found")
    return true;

  },
  save : function () {
    var saveData = {
      version : game.version
    };
    $.each(GameState.vars,function(className,classObject) {
      saveData[className] = GameState.vars[className].saveGameState.call(GameState);
    });
    if (GameState.debug)
      console.log("saving data",saveData)
    localStorage.setItem(Utils.gameName,JSON.stringify(saveData));
  },
  load : function () {
    var data = GameState.loadData();
    UI.redraw();
    return data;
  },
  loadData : function () {
    var saveData = localStorage.getItem(Utils.gameName);
    if (GameState.debug)
      console.log("Loading save data",saveData)
    if (saveData === "{}") 
      return false;
    saveData = JSON.parse(saveData);
    if (typeof(saveData.version) == "undefined") {
      if (GameState.debug)
        console.log("invalid savefile, no game version mentioned",saveData)
      return false;
    }
    if (saveData.version != game.version) {
      if (GameState.debug)
        console.log("Upgrading save version from",saveData.version,"to",game.version);
      if (typeof(game.updateSaveFile) == "function")
        saveData = game.updateSaveFile(saveData.version,game.version,saveData);
    }
    if (GameState.debug)
      console.log("registering vars",saveData)
    $.each(saveData,function(className,data) {
      GameState.registerVar(className);
    });
    if (GameState.debug)
      console.log("loading datas",saveData)
    $.each(saveData,function(className,data) {
      if (typeof(GameState.vars[className]) != "undefined") {
          if (GameState.debug)
            console.log("loading data",className,data)
          GameState.vars[className].loadGameState.call(this,data);
      }
    });
    return true;
  },
  registerVar :  function (className) { // every registered var is a class, that needs to have 2 functions : loadGameState and saveGameSate
    
    if (GameState.debug)
      console.log("registering var",typeof(className) =="function" ? className.name : className);
    var className = typeof(className) =="function" ? className.name : className;
    if (typeof(window[className]) == "undefined") {
      if (GameState.debug)
        console.warn("asked to register a var that doesn't exist :",className)
      return false;
    }
    var newClass = new (window[className])();
    
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
