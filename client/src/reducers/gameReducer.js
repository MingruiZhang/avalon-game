import { FAKE_GAME_STATE } from '../fake';

const DEFAULT_STATE = {
  gameState: [],
  gameSetup: {},
  gameStarted: false
};

const gameReducer = (state = DEFAULT_STATE, action) => {
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
};

export default gameReducer;
