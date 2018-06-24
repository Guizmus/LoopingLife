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
    GameState.init(); // loading the save, calling each saved class laodGameState

    setInterval(UI.draw,1000);
  }
}
