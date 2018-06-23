window.Main = {
  dependancies : {
    js : [
      'script/defines.js',
      'script/gamestate.js',
    ],
  },
  onDependanciesLoaded: function () {
    GameState.init('LoopingLife');
    console.log(defines);
  }
}
