function LoopingLifeState () {
  this.data = {};
  var that = this;
  this.generateStageData = function (stageTarget) {

    this.data.stage = stageTarget;

    this.data.resources = (typeof(this.data.resources) == "undefined") ? {} : this.data.resources;
    
    $(Object.keys(defines.resources)).each(function(x,resID) {
      var resData = defines.resources[resID];
      if (resData.unlock.stage == stageTarget) {
        that.data.resources[resID] = new Resource(resID,resData);
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
