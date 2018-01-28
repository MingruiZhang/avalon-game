const fakePlayers = [
  {
    avatarId: 8,
    name: 'Admin',
    isReady: true,
    isDummy: false,
    isAdmin: true,
    key: 'player-0',
    role: {
      name: 'Minion of Mordred',
      isEvil: true,
      specialities: [],
      description: ''
    },
    info: {
      yourInfo: {
        roleIsEvil: true,
        roleName: 'Minion of Mordred',
        knowMessage: 'Your teammates are',
        knowPlayers: ['player-2', 'player-5', 'player-9']
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 1,
    name: '笑笑-1',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-1',
    role: {
      name: 'Servant of Arthur',
      isEvil: false,
      specialities: [],
      description: 'You know nothing :)'
    },
    info: {
      yourInfo: {
        roleIsEvil: false,
        roleName: 'Servant of Arthur',
        knowMessage: 'You know nothing :)'
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 5,
    name: '笑笑-2',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-2',
    role: {
      name: 'ASSASSIN',
      isEvil: true,
      specialities: [3],
      description: 'You can kill Merlin'
    },
    info: {
      yourInfo: {
        roleIsEvil: true,
        roleName: 'ASSASSIN',
        knowMessage: 'You can kill Merlin, your teammates are',
        knowPlayers: ['player-0', 'player-5', 'player-9']
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 9,
    name: '笑笑-3',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-3',
    role: {
      name: 'Servant of Arthur',
      isEvil: false,
      specialities: [],
      description: 'You know nothing :)'
    },
    info: {
      yourInfo: {
        roleIsEvil: false,
        roleName: 'Servant of Arthur',
        knowMessage: 'You know nothing :)'
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 5,
    name: '奇葩-4',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-4',
    role: {
      name: 'Servant of Arthur',
      isEvil: false,
      specialities: [],
      description: 'You know nothing :)'
    },
    info: {
      yourInfo: {
        roleIsEvil: false,
        roleName: 'Servant of Arthur',
        knowMessage: 'You know nothing :)'
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 7,
    name: 'Hello-5',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-5',
    role: {
      name: 'MORDRED',
      isEvil: true,
      specialities: [4],
      description: 'You are unknown to Merlin'
    },
    info: {
      yourInfo: {
        roleIsEvil: true,
        roleName: 'MORDRED',
        knowMessage: 'You are unknown to Merlin, your teammates are',
        knowPlayers: ['player-0', 'player-2', 'player-9']
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 2,
    name: 'BruoMars-6',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-6',
    role: {
      name: 'MERLIN',
      isEvil: false,
      specialities: [6, 1],
      description: 'You know evil'
    },
    info: {
      yourInfo: {
        roleIsEvil: false,
        roleName: 'MERLIN',
        knowMessage: 'You know evil, they are',
        knowPlayers: ['player-0', 'player-2', 'player-9']
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 10,
    name: '道长-7',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-7',
    role: {
      name: 'Servant of Arthur',
      isEvil: false,
      specialities: [],
      description: 'You know nothing :)'
    },
    info: {
      yourInfo: {
        roleIsEvil: false,
        roleName: 'Servant of Arthur',
        knowMessage: 'You know nothing :)'
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 1,
    name: 'BruoMars-8',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-8',
    role: {
      name: 'PERCIVAL',
      isEvil: false,
      specialities: [2],
      description: 'You can detect people with magic'
    },
    info: {
      yourInfo: {
        roleIsEvil: false,
        roleName: 'PERCIVAL',
        knowMessage: 'You can detect people with magic, they are',
        knowPlayers: ['player-6', 'player-9']
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  },
  {
    avatarId: 10,
    name: 'BruoMars-9',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-9',
    role: {
      name: 'MORGANA',
      isEvil: true,
      specialities: [1],
      description: 'You appears as Merlin'
    },
    info: {
      yourInfo: {
        roleIsEvil: true,
        roleName: 'MORGANA',
        knowMessage: 'You appears as Merlin, your teammates are',
        knowPlayers: ['player-0', 'player-2', 'player-5']
      },
      overviewInfo: {
        goodList: [
          'MERLIN',
          'PERCIVAL',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur',
          'Servant of Arthur'
        ],
        evilList: ['MORGANA', 'ASSASSIN', 'MORDRED', 'Minion of Mordred']
      }
    }
  }
];

export const FAKE_PRE_GAME_STATE = {
  players: fakePlayers,
  joinedGame: true,
  myKey: 'player-0'
};

export const FAKE_GAME_STATE = {
  gameState: [],
  gameSetup: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  gameStarted: true
};
