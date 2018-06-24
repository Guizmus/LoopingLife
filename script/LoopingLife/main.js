window.Main = {
  dependancies : {
    js : [
      'script/gamestate.js',
      'script/ui.js',
      'GAMEDIR/defines.js',
      'script/gamemechanics.js',
    ],
  },
  lang : true,
  onDependanciesLoaded: function () {
    UI.init();// UI initialization is needed for compoents to be prepared during save loading
    if (GameState.init() === false) // loading the save, calling each saved class laodGameState. If there was no save, we'll generate one
      Main.newSaveFile();
    setInterval(UI.draw,100);
  },
  newSaveFile : function () {
    LoopingLifeState.generateLifeStageData('tutorialPhase');
    GameState.registerVar("LoopingLifeState");
    GameState.save();
  },
}

window.LoopingLifeState = {
  generateLifeStageData : function (lifeStageTarget) {
    var data = LoopingLifeState.data;

    data.lifeStage = lifeStageTarget;

    data.needs = (typeof(data.needs) == "undefined") ? {} : data.needs;

    $(Object.keys(defines.needs)).each(function(x,needID) {
      var needData = defines.needs[needID];
      if (needData.unlock.lifeStage == lifeStageTarget) {
        data.needs[needID] = {
          value : needData.unlock.initialValue,
        }
      }
      if ((typeof(data.needs[needID]) != "undefined") && (typeof(needData.mechanic[lifeStageTarget]) != "undefined"))
        data.needs[needID].mechanic = needData.mechanic[lifeStageTarget];
    });

     LoopingLifeState.data = data;
  },
  data : {

  },
  loadGameState : function (data) {
    LoopingLifeState.data = data;
  },
  saveGameState : function () {
    return LoopingLifeState.data;
  }
}
