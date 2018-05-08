import { FAKE_PRE_GAME_STATE } from '../fake';
import { socket } from '../utils';

const DEFAULT_STATE = {
  players: [],
  error: undefined,
  myName: undefined,
  logs: []
};

const modifyLogList = (oldLogs, newLog) => {
  return [...oldLogs, newLog].filter(log => log && !!log.message).slice(-4);
};

// Reducer
export default function reducer(state = FAKE_PRE_GAME_STATE, action) {
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
        myName: action.payload.key,
        players: action.payload.players,
        logs: modifyLogList(state.logs, action.payload.log)
      };
    case 'JOIN_GAME_ERROR':
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}

// selectors
export const selectMyName = state => state.player.myName;

// action creators
export const onJoinGameAction = () => dispatch => {
  socket.on('serverPlayerJoinedSuccess', payload => {
    dispatch({ type: 'JOIN_GAME_SUCCESS', payload });
  });
  socket.on('serverPlayerJoinedError', payload => {
    dispatch({ type: 'JOIN_GAME_ERROR', payload });
  });
};

export const onPlayersUpdateAction = () => dispatch => {
  socket.on('serverUpdatePlayers', payload => {
    dispatch({ type: 'PLAYERS_UPDATED', payload });
  });
  socket.on('serverGameStart', payload => {
    dispatch({ type: 'PLAYERS_UPDATED', payload });
  });
};

export const createEmitSocket = (eventName, data = {}) => (dispatch, getState) => {
  const myName = selectMyName(getState());
  socket.emit(eventName, { ...data, playerName: myName });
};
