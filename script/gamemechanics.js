window.gameMechanics = {
  applyMechanic : function(mechanic,value) {
    switch (mechanic.type) {
      case 'decay' :
        value -= mechanic.rate;
        break;
      case 'tendsTo' :
        switch (mechanic.method) {
          case 'percent' :
            // applies the rate of decay, aiming toward the goal, upward or downward
            value = goal + ((value - goal) * (1-mechanic.rate));
            break;
          case 'step' :
            if (value > goal) {
              value = goal + (math.max(0,value - mechanic.rate));
            } else {
              value = goal + (math.min(0,value + mechanic.rate));
            }
            break;
          default :
            console.warn("Unhandled gameMechanicMethod '"+mechanic.method+"' for the '"+mechanic.type+"' gameMechanicType, returning value unaltered.'");
        }
        break;
      default :
        console.warn("Unhandled gameMechanicType '"+mechanic.type+"', returning value unaltered.'");
    }
    return value;
  }
}
