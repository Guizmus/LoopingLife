function Actions () {
  var debug = true;
  var data = {};
  var that = this;
  
  function Action (actID,actConfig,actData) {
    
    
    
    
    this.saveGameState = function () {
      return {
        actID : this.actID,
      }
    }
    
    this.loadGameState = function (d) {
      if (typeof(d.actID) != "undefined")
        that.actID = d.actID;
        
    }
      // changeStage : {
      //   xmlKey : 'changeStage',
      //   stage_1 : {
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
      //   },
      // },
      this.actID = actID;
      
      if(typeof(actData) != "undefined") {
        this.loadGameState(actData);
      }
  }
  
  this.get = function(actID) {
    return data[actID];
  }
  this.new = function(actID,actConfig,actData) {
    if (debug)
      console.log("new action",actID,actConfig,actData)
    data[actID] = new Action(actID,actData,actData);
    return data[actID]
  }
  this.loadGameState = function (d) {
    if (debug)
      console.log("loading action data",d)
    $(Object.keys(d)).each(function(x,actID) {
      var actConfig = defines.actions[actID][GameState.vars.LoopingLifeState.data.stage];
      var actData = d[actID];
      that.new(actID,actConfig,actData)
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
}

window.test = function() {
  console.log("runing the test")
  GameState.vars.LoopingLifeState.earnResource("lifeMater",1);
}