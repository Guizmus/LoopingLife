function ActionList () {
  var debug = false;
  var queue = [];
  var currentIndex = false;
  var that = this;
  
  function startQueue () {
    if (queue.length == 0) {
      if (debug)
        console.warn("Trying to start the queue with nothing queued");
      return false;
    }
    currentIndex = 0;
    return true;
  }
  
  function stopQueue () {
    currentIndex = false;
    $(queue).each(function(x,action) {action.done = 0;})
  }
  
  this.queue = function(actID) {
    if (typeof(actID) == "undefined")
      return false;
    queue.push({
      actID : actID,
      count : 1,
      done : 0,
    })
  }
  this.tick = function(tickCount) {
    while (tickCount > 0) {
      if (currentIndex === false) { // if the list isn't started yet
        if (!startQueue())
          return;
      }
      
      var currentAction = queue[currentIndex];
      if (typeof(currentAction) == "undefined") { // no more actions to do
        stopQueue();
        return;
      }
      
      
    }
  }
  this.items = function  () {
    return queue;
  }
  this.item = function(x) {
    return queue[x];
  }
  this.itemHtml = function (x) {
    return GameState.vars.Actions.get(queue[x].actID).txt("libel") + " x " + queue[x].count;
  }
  this.index = function () {
    return currentIndex;
  }
  this.loadGameState = function (d) {
    if (debug)
      console.log("loading ActionList data",d);
    var loadedData = [];
    $(d).each(function(x,action) {
      loadedData.push({
        actID : action.actID,
        count : action.count,
        done : 0,
      })
    })
    queue = loadedData;
  }
  this.saveGameState = function () {
    var savedData = [];
    $(queue).each(function(x,action) {
      savedData.push({
        actID : action.actID,
        count : action.count,
      })
    })
    if (debug)
      console.log("saving ActionList data",savedData);
    return savedData;
  }
}