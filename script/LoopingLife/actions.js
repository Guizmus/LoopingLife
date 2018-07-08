function Actions () {
  var debug = false;
  var data = {};
  var that = this;
  
  function Action (actID,actConfig,actData) {
    
    
    this.txt = function (libelType) {
      return _txt("actions>"+GameState.vars.LoopingLifeState.data.stage+">"+actConfig.xmlKey+">"+libelType);
    }
    
    this.progressValue = function () {
      return 0;
    }
    this.progressMaxValue = function () {
      return 100;
    }
    this.eventListeners = [
      ['','click',function(){GameState.vars.Actions.queue(actID)}],
    ];
    this.saveGameState = function () {
      return {
        actID : this.actID,
      }
    }
    
    this.loadGameState = function (d) {
      if (typeof(d.actID) != "undefined")
        that.actID = d.actID;
        
    }
      //     xmlKey : 'changeStage',
      //     currencies : {
      //       lifeMater : 100,
      //       enjoyment : 20,
      //     },
      //     duration : 15,
      //     statistics : {
      //       stamina : 1,
      //     },
      //     reward : function(gameState) {
      //       return {
      //         type : 'progressStage',
      //         step : 'stage_2',
      //       };
      //     },
      this.actID = actID;
      
      if(typeof(actData) != "undefined") {
        this.loadGameState(actData);
      }
  }
  function getConfig (actID) {
    var config = defines.actions[actID][GameState.vars.LoopingLifeState.data.stage];
    config.xmlKey = defines.actions[actID].xmlKey;
    return config;
  }
  this.get = function(actID) {
    if (typeof(actID) == "undefined")
      return data;
    return data[actID];
  }
  this.new = function(actID,actData) {
    if (typeof(data[actID]) != "undefined")
      return false;
    var actConfig = getConfig(actID);
    if (debug)
      console.log("new action",actID,actConfig,actData)
    data[actID] = new Action(actID,actConfig,actData);
    return data[actID]
  }
  this.loadGameState = function (d) {
    if (debug)
      console.log("loading action data",d)
    $(Object.keys(d)).each(function(x,actID) {
      var actData = d[actID];
      that.new(actID,actData)
    })
    // that.data.actions[actID] = GameState.vars.Actions.new(actID,actData[stageTarget]);
    // data = d;
  }
  this.saveGameState = function () {
    var savedData = {};
    $(Object.keys(data)).each(function(x,actID) {
      savedData[actID] = data[actID].saveGameState();
    })
    return savedData;
  }
  this.queue = function (actID) {
  }
}

window.test = function() {
  console.log("runing the test")
  GameState.vars.Resources.earn("lifeMater",1);
}