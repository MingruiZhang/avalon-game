import { FAKE_GAME_STATE } from '../fake';
import { createOnSocketCallBack } from '../utils';

const DEFAULT_STATE = {
  gameState: [],
  gameSetup: {},
  gameStarted: false
};

export default function reducer(state = DEFAULT_STATE, action) {
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
    createOnSocketCallBack('serverGameUpdate', payload => {
      dispatch({ type: 'GAME_UPDATED', payload });
    });
  };
};

export const onGameEndAction = () => {
  return dispatch => {
    createOnSocketCallBack('serverGameEnd', payload => {
      dispatch({ type: 'GAME_ENDED', payload });
    });
  };
};
