function Actions () {
  var data = {};
  var that = this;
  this.get = function(actionID) {
    return data[actionID];
  }
  this.new = function(actionID) {
    data[actionID] = new Action(actionID);
    return data[actionID]
  }
  this.loadGameState = function (d) {
    that.data = d;
  }
  this.saveGameState = function () {
    return that.data;
  }
}

function Action (actionID) {
  this.actionID = actionID;
  
}
window.test = function() {
  console.log("runing the test")
  GameState.vars.LoopingLifeState.earnResource("lifeMater",1);
}