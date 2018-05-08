const action = name => `gameData/${name}`;

export const GameState = Object.freeze({
  Prepare: 0,
  Starting: 1,
  Started: 2
});

export const gameSetupByPlayers = {
  6: { rounds: [2, 3, 4, 3, 4], specialRound4: false },
  7: { rounds: [2, 3, 3, 4, 4], specialRound4: true },
  8: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  9: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  10: { rounds: [3, 4, 4, 5, 5], specialRound4: true }
};


const DEFAULT_STATE = {
  gameState: GameState.Prepare
};

/**
 * Reducer
 */

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case NEW_GAME_STATE: {
      return {
        ...state,
        gameState: action.payload
      };
    }
    default:
      return state;
  }
}

/**
 * Selectors
 */

/**
 * Actions and Action creators
 */

const NEW_GAME_STATE = action('CHANGE_GAME_STATE');
export const newGameState = newState => ({ type: NEW_GAME_STATE, payload: newState });