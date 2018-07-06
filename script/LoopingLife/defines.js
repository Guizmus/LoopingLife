window.defines = {
  stages : {
    stage_1 : {
      xmlKey : 'tutorialPhase',
    },
    stage_2 : {
      xmlKey : 'learningPhase',
    },
  },
  resources : {
    lifeMater : {
      xmlKey : 'lifeMater',
      unlock : {
        stage : 'stage_1',
        initialValue : 25,
      },
      mechanic : {
        stage_1 : {
          type : 'decay',
          rate : 1,
        },
        stage_2 : {
          type : 'decay',
          rate : 2,
        },
      },
      triggers : [
        {
          condition : function(gameState,value) {
            return value < 0;
          },
          consequence : function(gameState) {
            
          }
        },
      ],
    },
    enjoyment : {
      xmlKey : 'enjoyment',
      unlock : {
        stage : 'stage_1',
        initialValue : 0,
      },
      mechanic : {
        stage_1 : {
          type : 'tendsTo',
          method : 'percent',
          rate : 0.01,
          goal : 0
        },
        stage_2 : {
          type : 'tendsTo',
          method : 'percent',
          rate : 0.05,
          goal : 0
        },
      },
      triggers : [
        {
          condition : function(gameState,value) {
            return false;
          },
          consequence : function(gameState) {
            
          }
        },
      ],
    },
  },
  statistics : {
    stamina : {
      xmlKey : 'stamina',
    },
    imagination : {
      xmlKey : 'imagination',
    },
    charisma : {
      xmlKey : 'charisma',
    }
  },
  actions : {
    changeStage : {
      xmlKey : 'changeStage',
      stage_1 : {
        currencies : {
          lifeMater : 100,
          enjoyment : 20,
        },
        duration : 15,
        statistics : {
          stamina : 1,
        },
        reward : function(gameState) {
          return {
            type : 'progressStage',
            step : 'stage_2',
          };
        },
      },
    },
    crying : {
      xmlKey : 'crying',
      stage_1 : {
        currencies : {
          lifeMater : 10,
        },
        duration : 10,
        statistics : {
          stamina : 0.7,
          charisma : 0.3,
        },
        reward : function(gameState) {
          return {
            type : 'earnCurrency',
            currency : 'enjoyment',
            value : -10,
          };
        },
      },
    },
    playing : {
      xmlKey : 'playing',
      stage_1 : {
        currencies : {
          lifeMater : 10,
        },
        duration : 10,
        statistics : {
          stamina : 0.3,
          imagination : 0.7,
        },
        reward : function(gameState) {
          return {
            type : 'earnCurrency',
            need : 'enjoyment',
            value : 10,
          };
        },
      },
    },
    resting : {
      xmlKey : 'resting',
      stage_1 : {
        currencies : {},
        duration : 5,
        statistics : {
          stamina : 1,
        },
        reward : function(gameState) {
          return {
            type : 'earnCurrency',
            need : 'lifeMater',
            value : 20,
          };
        },
      },
      stage_2 : {
        currencies : {},
        duration : 20,
        statistics : {
          stamina : 0.9,
          imagination : 0.1,
        },
        reward : function(gameState) {
          return {
            type : 'earnCurrency',
            need : 'lifeMater',
            value : 15,
          };
        },
      },
    },
  },
}
