
function Resource (resID,resData) {
  var debug = false;
  
  if (debug)
    console.log("loading resource",resID,resData)
    
  var value =  (typeof(resData) == "number") ? resData : resData.unlock.initialValue;
  this.resID = resID;
  var that = this;
  this.getValue = function () {
    return value;
  }
  this.add = function (count) {
    value += count;
  }
}