import { FAKE_GAME_STATE } from '../fake';

const DEFAULT_STATE = {
  gameState: [],
  gameSetup: {}
};

const gameReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'GAME_STARTED':
      return {
        ...state,
        gameSetup: action.payload.gameSetup
      };
    default:
      return state;
  }
};

export default gameReducer;
