var Utils = {
  init : function() {
    this.loading.loadMotherScript('script/main.js','Main');
  },
  loading : { // loading logic. Will load motherScript, and then all dependancies mentioned in it. Then, will call motherClass.onDependanciesLoaded
    loadMotherScript : function (motherScript,motherClass) {// motherclass is the name of the class in the motherscript script
      $.getScript(motherScript,Utils.loading.loadDependancies(motherScript,motherClass));
    },
    dependanciesLoaded : {}, // used to check
    loadDependancies : function (motherScript,motherClass) { // creates the callback function to be used once motherScript is loaded, to initiate the loading of the dependancies
      Utils.loading.dependanciesLoaded[motherClass] = [];
      return function () {
          $.each(window[motherClass].dependancies,function(scriptType,scriptList){
            Utils.loading.dependanciesLoaded[motherClass][scriptType] = false;
          });
          $.each(window[motherClass].dependancies,function(scriptType,scriptList){
            switch (scriptType) {
              case 'js' :
                Utils.loading.loadScripts(window[motherClass].dependancies.js,Utils.loading.doneLoading('js',motherClass));
                break;
              default : console.warn('loading unsupported dependancie type : '+scriptType)
            }
          });
      }
    },
    loadScripts : function(scripts,callback) { // handling sequential loading for js scripts
      if (scripts.length == 0) {
        return callback.call(this);
      }
      script = scripts.pop();
      $.getScript(script, function() {
        Utils.loading.loadScripts(scripts,callback);
      });
    },
    doneLoading : function(loadingCat,motherClass) { // creates the callback that will updates the dependanciesLoaded after loading them
      return function () {
        Utils.loading.dependanciesLoaded[motherClass][loadingCat] = true;
        Utils.loading.finishLoading(motherClass);
      }
    },
    finishLoading : function (motherClass) { // checks if the dependancies are all loaded, to fire the callback
      var done = true;
      $.each(Utils.loading.dependanciesLoaded[motherClass],function(scriptType,loadState){
        done = done && loadState;
      });
      if (done)
        typeof(window[motherClass].onDependanciesLoaded) != "undefined" ? window[motherClass].onDependanciesLoaded() : false;
    },
  }
}
