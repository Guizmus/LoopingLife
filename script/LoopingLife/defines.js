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
  },
  statistics : {
    resting : {
      libel : 'statistics>resting',
    },
    stamina : {
      libel : 'statistics>stamina',
    },
    imagination : {
      libel : 'statistics>imagination',
    },
  },
  actions : {
    changeLifeStage : {
      tutorialPhase : {
        libel : 'actions>tutorialPhase>changeLifeStage',
        needs : {
          lifeMater : 100,
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
    resting : {
      tutorialPhase : {
        libel : 'actions>tutorialPhase>resting',
        needs : {},
        duration : 5,
        statistics : {
          resting : 0.9,
          stamina : 0.1,
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
          resting : 0.8,
          stamina : 0.1,
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
