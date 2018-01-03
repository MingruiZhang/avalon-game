const DEFAULT_STATE = {
  myPlayer: undefined,
  players: [],
  joinedGame: false,
  error: undefined,
  messages: []
};

const preGameReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'PLAYERS_UPDATED':
      // TODO: Message log.
      return {
        ...state,
        players: action.payload.players,
        messages: [...state.messages, action.payload.message]
      };
    case 'JOIN_GAME_SUCCESS':
      return {
        ...state,
        players: action.payload.players,
        myPlayer: action.payload.playerInfo,
        messages: [...state.messages, action.payload.message],
        joinedGame: true
      };
    case 'JOIN_GAME_ERROR':
      return {
        ...state,
        error: action.payload.error,
        joinedGame: false
      };
    default:
      return state;
  }
};

export default preGameReducer;
