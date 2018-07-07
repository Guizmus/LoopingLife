Main = {
  dependancies : {
    js : [
      'script/gamestate.js',
      'script/ui.js',
      'script/gamemechanics.js',
      'GAMEDIR/defines.js',
      'GAMEDIR/loopinglifestate.js',
      
      'VIEWDIR/view.js',
    ],
  },
  lang : true,
  onDependanciesLoaded: function () {
    UI.init();// UI initialization is needed for compoents to be prepared during save loading
    if (GameState.init() === false) // loading the save, calling each saved class laodGameState. If there was no save, we'll generate one
      Main.newSaveFile();
    View.init();
    // setInterval(UI.draw,100);
  },
  newSaveFile : function () {
    LoopingLifeState.generateLifeStageData('stage_1');
    GameState.registerVar("LoopingLifeState");
    GameState.save();
  },
}
