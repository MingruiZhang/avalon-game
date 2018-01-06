const DEFAULT_STATE = {
  myPlayer: undefined,
  players: [],
  joinedGame: false,
  error: undefined,
  logs: []
};

// const FAKE_STATE = {
//   myPlayer: { name: 'Ming', avatarId: 6, isReady: true, key: 0, isAdmin: true },
//   players: [
//     { name: 'Ming', avatarId: 6, isReady: true, key: 0 },
//     { name: 'Ya', avatarId: 9, isReady: false, key: 1 },
//     { name: 'Naixin', avatarId: 7, isReady: true, key: 2 },
//     { name: 'Shawn Xu', avatarId: 8, isReady: false, key: 3 },
//     { name: 'YuijngYujing', avatarId: 1, isReady: false, key: 4 },
//     { name: 'John Galt', avatarId: 2, isReady: false, key: 5 },
//     { name: 'Eric', avatarId: 3, isReady: true, key: 6 },
//     { name: 'Dummy someone', avatarId: 4, isReady: true, key: 7 },
//     { name: 'Dummy Tommy', avatarId: 5, isReady: true, key: 8 },
//     { name: 'Qian', avatarId: 11, isReady: true, key: 9 }
//   ],
//   joinedGame: true,
//   error: undefined,
//   logs: [
//     { message: 'Mingming joined the game', type: 'normal' },
//     { message: 'Ricky is ready', type: 'normal' },
//     { message: '6+ players needed to start the game', type: 'error' },
//     { message: 'Starting game in 5 sec', type: 'important' }
//   ]
// };

const modifyLogList = (oldLogs, newLog) => {
  return [...oldLogs, newLog].filter(log => log && !!log.message).slice(-4);
};

const preGameReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'PLAYERS_UPDATED':
      return {
        ...state,
        players: action.payload.players,
        logs: modifyLogList(state.logs, action.payload.log)
      };
    case 'JOIN_GAME_SUCCESS':
      return {
        ...state,
        myPlayer: action.payload.playerInfo,
        players: action.payload.players,
        logs: modifyLogList(state.logs, action.payload.log),
        joinedGame: true
      };
    case 'JOIN_GAME_ERROR':
      return {
        ...state,
        error: action.payload.error,
        joinedGame: false
      };
    case 'TOGGLE_READY_STATE':
      return {
        ...state,
        myPlayer: { ...state.myPlayer, isReady: !state.myPlayer.isReady }
      };
    default:
      return state;
  }
};

export default preGameReducer;
