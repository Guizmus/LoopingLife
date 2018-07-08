function Resources () {
  var debug = true;
  var data = {};
  var that = this;
  
  function Resource (resID,resConfig,resData) {
    var debug = true;
    var that = this;
    this.resID = resID;
    
    if (debug)
      console.log("instanciating resource",resID,resConfig,resData)
    
    var value =  (typeof(resConfig) == "number") ? resConfig : resConfig.unlock.initialValue;
    
    this.getValue = function () {
      return value;
    }
    this.add = function (count) {
      value += count;
    }
    this.saveGameState = function () {
      return {
        resID : this.resID,
        value : value,
      }
    }
    
    this.loadGameState = function (d) {
      console.log("loading resource values",that.resID,d)
      if (typeof(d.resID) != "undefined")
        that.resID = d.resID;
      if (typeof(d.value) != "undefined")
        value = d.value;
    }
    
    if(typeof(resData) != "undefined") {
      this.loadGameState(resData);
    }
  }
  
  function getConfig (resID) {
    return defines.resources[resID];
  }
  this.get = function(resID) {
    if (typeof(resID) == "undefined")
      return data;
    return data[resID];
  }
  this.new = function(resID,resData) {
    if (typeof(data[resID]) != "undefined")
      return false;
    var resConfig = getConfig(resID)
    if (debug)
      console.log("new resource",resID,resConfig,resData)
    data[resID] = new Resource(resID,resConfig,resData);
    return data[resID]
  }
  
  this.earn = function (resID,count) {
    data[resID].add(count);
    UI.components.Resources.params.updateValue(resID)
  }
  this.loadGameState = function (d) {
    if (debug)
      console.log("loading resource data",d)
    $(Object.keys(d)).each(function(x,resID) {
      var resData = d[resID];
      that.new(resID,resData)
    })
  }
  this.saveGameState = function () {
    var savedData = {};
    console.log(data)
    $(Object.keys(data)).each(function(x,actID) {
      savedData[actID] = data[actID].saveGameState();
    })
    return savedData;
  }
}