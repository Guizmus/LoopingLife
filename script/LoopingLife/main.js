window.Main = {
  dependancies : {
    js : [
      'script/gamestate.js',
      'script/ui.js',
      'GAMEDIR/defines.js',
    ],
  },
  onDependanciesLoaded: function () {
    GameState.init();
    UI.init();
  }
}
