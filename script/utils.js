Utils = {
  debug : true,
  init : function(gameName) {
    this.gameName = gameName;
    Localization.init();
    Localization.loadLib(this.gameName,function() {
      Utils.loading.loadMotherScript('script/'+Utils.gameName+'/main.js','Main');
    })
  },
  loading : { // loading logic. Will load motherScript, and then all dependancies mentioned in it. Then, will call motherClass.onDependanciesLoaded
    loadMotherScript : function (motherScript,motherClass) {// motherclass is the name of the class in the motherscript script
      if (Utils.debug)
        console.log("Starting load of motherScript",motherScript);
      $.getScript(motherScript,Utils.loading.loadDependancies(motherScript,motherClass));
    },
    dependanciesLoaded : {}, // used to check
    loadDependancies : function (motherScript,motherClass) { // creates the callback function to be used once motherScript is loaded, to initiate the loading of the dependancies
      Utils.loading.dependanciesLoaded[motherClass] = [];
      return function () {
          if (Utils.debug)
            console.log("MotherScript loaded, loading dependancies",window[motherClass].dependancies);
          $.each(window[motherClass].dependancies,function(scriptType,scriptList){
            Utils.loading.dependanciesLoaded[motherClass][scriptType] = false;
          });
          $.each(window[motherClass].dependancies,function(scriptType,scriptList){
            switch (scriptType) {
              case 'js' :
                Utils.loading.loadScripts(scriptList,Utils.loading.doneLoading(scriptType,motherClass));
                break;
              default : console.warn('loading unsupported dependancie type : '+scriptType)
            }
          });
      }
    },
    loadScripts : function(scripts,callback) { // handling sequential loading for js scripts
      if (typeof(scripts) == "string")
        scripts = [scripts];
      if (scripts.length == 0) {
        return callback.call(this);
      }
      script = scripts.shift();
      script = script.replace("GAMEDIR","script/"+Utils.gameName);
      script = script.replace("VIEWDIR","script/views");
      $.getScript(script, function() {
        Utils.loading.loadScripts(scripts,callback);
      });
    },
    loadXML : function (xml,callback) {
      $.get(xml,null,callback);
    },
    doneLoading : function(loadingCat,motherClass) { // creates the callback that will updates the dependanciesLoaded after loading them
      return function () {
        if (Utils.debug)
          console.log("Dependandies loaded",loadingCat);
        Utils.loading.dependanciesLoaded[motherClass][loadingCat] = true;
        Utils.loading.finishLoading(motherClass);
      }
    },
    finishLoading : function (motherClass) { // checks if the dependancies are all loaded, to fire the callback
      var done = true;
      $.each(Utils.loading.dependanciesLoaded[motherClass],function(scriptType,loadState){
        done = done && loadState;
      });
      if (done) {
        if (Utils.debug)
          console.log("All dependancies loaded, starting localization");
        if (window[motherClass].lang)
          Localization.localizePage();
        typeof(window[motherClass].onDependanciesLoaded) != "undefined" ? window[motherClass].onDependanciesLoaded() : false;
      }
    },
  },
  getUrlVars : function() {
      var vars = {};
      var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
          vars[key] = value;
      });
      return vars;
  },
  
  validateMinitalParams : function (params,requirements) {
    // ckeck the keys of param, and the labels if in debug mode
    var missingKeys = [];
    $(requirements).each(function(x,k) {
      if(typeof(params[k]) == "undefined") 
        missingKeys.push(k);
    });
    if (missingKeys.length>0) {
      console.error("Using params ",params," with missing keys : ",missingKeys.join(", "));
      return false;// only hard stop, this is the minimal keys needed.
    }
    return true;
  }
}
