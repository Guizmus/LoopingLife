LoopingLifeState = {
  generateLifeStageData : function (stageTarget) {
    var data = LoopingLifeState.data;

    data.stage = stageTarget;

    data.resources = (typeof(data.resources) == "undefined") ? {} : data.resources;

    $(Object.keys(defines.resources)).each(function(x,resID) {
      var resData = defines.resources[resID];
      if (resData.unlock.stage == stageTarget) {
        data.resources[resID] = {
          value : resData.unlock.initialValue,
        }
      }
    //   if ((typeof(data.needs[needID]) != "undefined") && (typeof(needData.mechanic[lifeStageTarget]) != "undefined"))
    //     data.needs[needID].mechanic = needData.mechanic[lifeStageTarget];
    });

     LoopingLifeState.data = data;
  },
  data : {},
  loadGameState : function (data) {
    this.data = data;
  },
  saveGameState : function () {
    return this.data;
  },
};
