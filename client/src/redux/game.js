import { FAKE_GAME_STATE } from '../fake';
import { socket } from '../utils';

const DEFAULT_STATE = {
  gameState: [],
  gameSetup: {},
  gameStarted: false
};

export default function reducer(state = FAKE_GAME_STATE, action) {
  switch (action.type) {
    case 'GAME_STARTED':
      return {
        ...state,
        gameSetup: action.payload.gameSetup,
        gameStarted: true
      };
    case 'GAME_ENDED':
      return {
        ...state,
        gameStarted: false
      };
    default:
      return state;
  }
}

export const onGameUpdateAction = () => {
  return dispatch => {
    socket.on('serverGameUpdate', payload => {
      dispatch({ type: 'GAME_UPDATED', payload });
    });
  };
};

export const onGameStartAction = () => {
  return dispatch => {
    socket.on('serverGameStart', payload => {
      dispatch({ type: 'GAME_STARTED', payload });
    });
  };
};

export const onGameEndAction = () => {
  return dispatch => {
    socket.on('serverGameEnd', payload => {
      dispatch({ type: 'GAME_ENDED', payload });
    });
  };
};
