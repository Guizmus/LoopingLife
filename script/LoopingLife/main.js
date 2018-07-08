function Main () {
  var that = this;
  this.version = "0.0.2"; // save file version control
  this.dependancies = {
    js : [
      
      'GAMEDIR/defines.js',
      'GAMEDIR/loopinglifestate.js',
      'GAMEDIR/actions.js',
      'GAMEDIR/resources.js',
      'GAMEDIR/actionlist.js',
      
      'COMPONENT/infobox.js',
      'COMPONENT/progressbox.js',
      'COMPONENT/list.js',
      
      'VIEWDIR/view.js',
    ],
  };
  this.lang = true;
  this.onDependanciesLoaded = function () {
    UI.init();// UI initialization is needed for compoents to be prepared during save loading
    var gameLoaded = GameState.init();
    if (gameLoaded === false){ // loading the save, calling each saved class laodGameState. If there was no save, we'll generate one
      newSaveFile();
    } else {
      GameState.vars.LoopingLifeState.generateStageData();
    }
    View.init();
    // setInterval(UI.draw,100);
  };
  function newSaveFile () {
    // state = new LoopingLifeState();
    GameState.registerVar(LoopingLifeState);
    GameState.registerVar(Actions);
    GameState.registerVar(Resources);
    GameState.registerVar(ActionList);
    GameState.vars.LoopingLifeState.generateStageData('stage_1');
    // GameState.save();
  };
  this.updateSaveFile = function(from,to,saveData) {
    console.log("updating saveData version",saveData)
    switch  (from) {
      case '0.0.1' :// no break, to do all the upgrades in order
        saveData.ActionList = {};
      default:;
    }
    console.log(saveData)
    return saveData;
  }
}
