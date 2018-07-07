function LoopingLifeState () {
  var debug = false;
  this.data = {};
  var that = this;
  this.generateStageData = function (stageTarget) {

    this.data.stage = typeof(stageTarget) == "undefined" ? this.data.stage : stageTarget;
    stageTarget = this.data.stage;
    
    this.data.resources = (typeof(this.data.resources) == "undefined") ? {} : this.data.resources;
    $(Object.keys(defines.resources)).each(function(x,resID) {
      if(typeof(that.data.resources[resID]) != "undefined")
        return true;
      var resData = defines.resources[resID];
      if (resData.unlock.stage == stageTarget) {
        that.data.resources[resID] = new Resource(resID,resData);
      }
    });
    
    this.data.actions = (typeof(this.data.actions) == "undefined") ? {} : this.data.actions;
    $(Object.keys(defines.actions)).each(function(x,actID) {
      var actData = defines.actions[actID];
      if(typeof(actData) != "undefined")
        return true;
      if (typeof(actData[stageTarget]) != "undefined") {
        that.data.actions[actID] = GameState.vars.Actions.new(actID,actData[stageTarget]);
      }
    });
  };
  
  this.earnResource = function (resID,count) {
    this.data.resources[resID].add(count);
    UI.components.Resources.params.updateValue(resID)
  }
  
  this.loadGameState = function (data) {
    var loadedData = {
      stage : data.stage,
      resources : {},
    }
    $(Object.keys(data.resources)).each(function (x,key) {
      loadedData.resources[key] = new Resource(key,data.resources[key]);
    })
    that.data = loadedData;
  };
  this.saveGameState = function () {
    var savedData = {
      stage : that.data.stage,
      resources : {},
    }
    $(Object.keys(that.data.resources)).each(function (x,key) {
      savedData.resources[key] = that.data.resources[key].getValue();
    })
    return savedData;
  };
};
