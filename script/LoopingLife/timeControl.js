function TimeControl () {
  var debug = false;
  var data = {
    ticked : 0,
    tickPer : 1,
  };
  var timeControledObjects = ["Resources"];
  var that = this;
  this.tick = function (ticks) {
    var d = data;
    $.each(timeControledObjects,function(x,k) {
      GameState.vars[k].tick(data.tickPer * ticks)
    })
  }
  
  this.loadGameState = function (d) {
    if (debug)
      console.log("loading TimeControl data",d)
    data = d;
  }
  this.saveGameState = function () {
    var savedData = data
    if (debug)
      console.log("saving TimeControl data",savedData)
    return savedData;
  }
}