const fakePlayers = [
  {
    avatarId: 12,
    name: 'Hello-6',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-6',
    role: {
      name: 'Servant of Arthur',
      isBad: false,
      specialities: [],
      message: []
    }
  },
  {
    avatarId: 7,
    name: '道长-7',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-7',
    role: {
      name: 'Merlin',
      isBad: false,
      specialities: [6, 1],
      message: ['bads are Hello-12,Hello-14,Admin']
    }
  },
  {
    avatarId: 11,
    name: 'Hello-8',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-8',
    role: {
      name: 'Percival',
      isBad: false,
      specialities: [2],
      message: ['magic people 道长-7,Hello-12']
    }
  },
  {
    avatarId: 3,
    name: '笑笑-11',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-11',
    role: {
      name: 'Mordred',
      isBad: true,
      specialities: [4],
      message: ['your teammates are Hello-12,Hello-14,Admin']
    }
  },
  {
    avatarId: 11,
    name: 'Hello-12',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-12',
    role: {
      name: 'Morgana',
      isBad: true,
      specialities: [1],
      message: ['your teammates are 笑笑-11,Hello-14,Admin']
    }
  },
  {
    avatarId: 6,
    name: 'BruoMars-13',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-13',
    role: {
      name: 'Servant of Arthur',
      isBad: false,
      specialities: [],
      message: []
    }
  },
  {
    avatarId: 3,
    name: 'Hello-14',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-14',
    role: {
      name: 'Servant of Mordred',
      isBad: true,
      specialities: [],
      message: ['your teammates are 笑笑-11,Hello-12,Admin']
    }
  },
  {
    avatarId: 1,
    name: '道长-15',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-15',
    role: {
      name: 'Servant of Arthur',
      isBad: false,
      specialities: [],
      message: []
    }
  },
  {
    avatarId: 5,
    name: 'BruoMars-16',
    isReady: true,
    isDummy: true,
    isAdmin: false,
    key: 'player-16',
    role: {
      name: 'Servant of Arthur',
      isBad: false,
      specialities: [],
      message: []
    }
  },
  {
    avatarId: 12,
    name: 'Admin',
    isReady: true,
    isDummy: false,
    isAdmin: true,
    key: 'player-24',
    role: {
      name: 'Assassin',
      isBad: true,
      specialities: [3],
      message: ['your teammates are 笑笑-11,Hello-12,Hello-14']
    }
  }
];

export const FAKE_PRE_GAME_STATE = {
  players: fakePlayers,
  joinedGame: true,
  myKey: 'player-24'
};

export const FAKE_GAME_STATE = {
  gameState: [],
  gameSetup: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  gameStarted: true
};
