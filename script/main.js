window.Main = {
  dependancies : {
    js : [
      'script/defines.js',
    ],
  },
  onDependanciesLoaded: function () {
    console.log(defines);
  }
}
