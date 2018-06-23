window.Main = {
  dependancies : {
    js : [
      'script/gamestate.js',
      'script/ui.js',
      'script/localization.js',
      'GAMEDIR/defines.js',
    ],
  },
  onDependanciesLoaded: function () {
    UI.init();// UI initialization is needed for compoents to be prepared during save loading
    GameState.init(); // loading the save, calling each saved class laodGameState

    setInterval(UI.draw,1000);
  }
}
