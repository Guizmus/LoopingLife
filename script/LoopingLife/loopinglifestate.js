function LoopingLifeState () {
  var debug = false;
  this.data = {};
  var that = this;
  this.generateStageData = function (stageTarget) {

    this.data.stage = typeof(stageTarget) == "undefined" ? this.data.stage : stageTarget;
    stageTarget = this.data.stage;
    
    if (debug) 
      console.log("generating Stage Data",stageTarget)
    
    $(Object.keys(defines.resources)).each(function(x,resID) {
      if (defines.resources[resID].unlock.stage == stageTarget) {
        GameState.vars.Resources.new(resID);
      }
    });
    
    $(Object.keys(defines.actions)).each(function(x,actID) {
      var actConfig = defines.actions[actID];
      if(typeof(actConfig) == "undefined")
        return true;
      if ((typeof(actConfig[stageTarget]) != "undefined") && (typeof(GameState.vars.Actions.get(actID)) == "undefined")){
        GameState.vars.Actions.new(actID,actConfig[stageTarget]);
      }
    });
  };
  
  this.loadGameState = function (data) {
    var loadedData = {
      stage : data.stage,
    }
    that.data = loadedData;
  };
  this.saveGameState = function () {
    var savedData = {
      stage : that.data.stage,
    }
    return savedData;
  };
};
