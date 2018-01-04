const DEFAULT_STATE = {
  myPlayer: undefined,
  players: [],
  joinedGame: false,
  error: undefined,
  messages: []
};

const modifyMessageList = (oldMessage, newMessage) => {
  return [...oldMessage, newMessage].filter(msg => !!msg).slice(-5);
};

const preGameReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case 'PLAYERS_UPDATED':
      // TODO: Message log.
      return {
        ...state,
        players: action.payload.players,
        messages: modifyMessageList(state.messages, action.payload.message)
      };
    case 'JOIN_GAME_SUCCESS':
      return {
        ...state,
        myPlayer: action.payload.playerInfo,
        players: action.payload.players,
        messages: modifyMessageList(state.messages, action.payload.message),
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
