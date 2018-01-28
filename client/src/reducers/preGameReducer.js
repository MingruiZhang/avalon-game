import { FAKE_PRE_GAME_STATE } from '../fake';

const DEFAULT_STATE = {
  players: [],
  joinedGame: false,
  error: undefined,
  myKey: undefined,
  logs: []
};

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
        myKey: action.payload.key,
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
    case 'GAME_STARTED':
      return {
        ...state,
        players: action.payload.players
      };
    default:
      return state;
  }
};

export default preGameReducer;
