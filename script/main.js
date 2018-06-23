window.Main = {
  dependancies : {
    js : [
      'script/defines.js',
      'script/ui.js',
    ],
  },
  onDependanciesLoaded: function () {
    console.log(defines);
  }
}
