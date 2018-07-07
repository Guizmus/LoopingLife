function Main () {
  var that = this;
  this.dependancies = {
    js : [
      'script/gamestate.js',
      'script/ui.js',
      'script/gamemechanics.js',
      'GAMEDIR/defines.js',
      'GAMEDIR/loopinglifestate.js',
      'GAMEDIR/actions.js',
      'GAMEDIR/resources.js',
      
      'VIEWDIR/view.js',
    ],
  };
  this.lang = true;
  this.onDependanciesLoaded = function () {
    UI.init();// UI initialization is needed for compoents to be prepared during save loading
    if (GameState.init() === false) // loading the save, calling each saved class laodGameState. If there was no save, we'll generate one
      newSaveFile();
    View.init();
    // setInterval(UI.draw,100);
  };
  function newSaveFile () {
    // state = new LoopingLifeState();
    GameState.registerVar(LoopingLifeState);
    GameState.vars.LoopingLifeState.generateStageData('stage_1');
    GameState.save();
  };
}
