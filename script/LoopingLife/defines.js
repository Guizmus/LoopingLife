window.defines = {
  lifeStages : {
    tutorialPhase : {
      libel : 'lifeStages>tutorialPhase',
    },
    learningPhase : {
      libel : 'lifeStages>learningPhase',
    },
  },
  needs : {
    lifeMater : {
      libel : 'needs>lifeMater',
      mechanic : {
        tutorialPhase : {
          type : 'decay',
          rate : -1,
        },
        learningPhase : {
          type : 'decay',
          rate : -2,
        },
      },
      triggerCondition : function(gameState,value) {
        return value < 0;
      },
    },
    enjoyment : {
      libel : 'needs>enjoyment',
      mechanic : {
        tutorialPhase : {
          type : 'tendsTo',
          method : 'percent',
          rate : 0.01,
          goal : 0
        },
        learningPhase : {
          type : 'tendsTo',
          method : 'percent',
          rate : 0.05,
          goal : 0
        },
      },
      triggerCondition : function(gameState,value) {
        return false;
      },
    },
  },
  statistics : {
    stamina : {
      libel : 'statistics>stamina',
    },
    imagination : {
      libel : 'statistics>imagination',
    },
    charisma : {
      libel : 'statistics>charisma',
    }
  },
  actions : {
    changeLifeStage : {
      tutorialPhase : {
        libel : 'actions>tutorialPhase>changeLifeStage',
        needs : {
          lifeMater : 100,
          enjoyment : 20,
        },
        duration : 15,
        statistics : {
          stamina : 1,
        },
        reward : function(gameState) {
          return {
            type : 'progressPhase',
            step : 'learningPhase',
          };
        },
      },
    },
    crying : {
      tutorialPhase : {
        libel : 'actions>tutorialPhase>crying',
        needs : {
          lifeMater : 10,
        },
        duration : 10,
        statistics : {
          stamina : 0.7,
          charisma : 0.3,
        },
        reward : function(gameState) {
          return {
            type : 'earnNeed',
            need : 'enjoyment',
            value : -10,
          };
        },
      },
    },
    playing : {
      tutorialPhase : {
        libel : 'actions>tutorialPhase>playing',
        needs : {
          lifeMater : 10,
        },
        duration : 10,
        statistics : {
          stamina : 0.3,
          imagination : 0.7,
        },
        reward : function(gameState) {
          return {
            type : 'earnNeed',
            need : 'enjoyment',
            value : 10,
          };
        },
      },
    },
    resting : {
      tutorialPhase : {
        libel : 'actions>tutorialPhase>resting',
        needs : {},
        duration : 5,
        statistics : {
          stamina : 1,
        },
        reward : function(gameState) {
          return {
            type : 'earnNeed',
            need : 'lifeMater',
            value : 20,
          };
        },
      },
      learningPhase : {
        libel : 'actions>learningPhase>resting',
        needs : {},
        duration : 20,
        statistics : {
          stamina : 0.9,
          imagination : 0.1,
        },
        reward : function(gameState) {
          return {
            type : 'earnNeed',
            need : 'lifeMater',
            value : 15,
          };
        },
      },
    },
  },
}
