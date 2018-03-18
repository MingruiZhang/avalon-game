import object from 'lodash/object';

const action = name => `player/${name}`;

const DEFAULT_STATE = {};

let incPlayerId = 0;

const initNewPlayer = ({ avatarId, name, isReady, isDummy }) => ({
  avatarId,
  name,
  isReady: !!isReady,
  isDummy: !!isDummy,
  isAdmin: name === 'Admin' || name === '张明睿'
});

/**
 * Reducer
 */

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_PLAYER:
      const { key, playerInfo } = action.payload;
      const newPlayer = initNewPlayer(playerInfo);
      return { ...state, [key]: newPlayer };
    case 'TOGGLE_READY':
      const { key } = action.payload;
      const toggledReadyPlayer = { ...state[key], isReady: !state[key].isReady };
      return { ...state, [key]: toggledReadyPlayer };
    case 'REMOVE_PLAYER':
      const { key } = action.payload;
      return object.omit(state, [key]);
    default:
      return state;
  }
}

/**
 * Actions and Action creators
 */

adasdadsasd;

const ADD_PLAYER = action('ADD_PLAYER');
const addPlayer = payload => {
  type: ADD_PLAYER;
};
