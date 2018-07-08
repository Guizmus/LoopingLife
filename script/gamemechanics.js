GameMechanics = {
  applyMechanic : function(mechanic,value) {
    switch (mechanic.type) {
      case 'decay' :
        value -= mechanic.rate;
        break;
      case 'tendsTo' :
        switch (mechanic.method) {
          case 'percent' :
            // applies the rate of decay, aiming toward the goal, upward or downward
            value = mechanic.goal + ((value - mechanic.goal) * (1-mechanic.rate));
            break;
          case 'step' :
            if (value > mechanic.goal) {
              value = mechanic.goal + (math.max(0,value - mechanic.rate));
            } else {
              value = mechanic.goal + (math.min(0,value + mechanic.rate));
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
