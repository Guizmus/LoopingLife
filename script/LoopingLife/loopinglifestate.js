window.LoopingLifeState = jQuery.fn.extend(GameState.proto,{
  generateLifeStageData : function (lifeStageTarget) {
    var data = LoopingLifeState.data;

    data.lifeStage = lifeStageTarget;

    data.needs = (typeof(data.needs) == "undefined") ? {} : data.needs;

    $(Object.keys(defines.needs)).each(function(x,needID) {
      var needData = defines.needs[needID];
      if (needData.unlock.lifeStage == lifeStageTarget) {
        data.needs[needID] = {
          value : needData.unlock.initialValue,
        }
      }
      if ((typeof(data.needs[needID]) != "undefined") && (typeof(needData.mechanic[lifeStageTarget]) != "undefined"))
        data.needs[needID].mechanic = needData.mechanic[lifeStageTarget];
    });

     LoopingLifeState.data = data;
  },
});
