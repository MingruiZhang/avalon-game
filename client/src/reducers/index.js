import { combineReducers } from 'redux';

import preGameReducer from './preGameReducer';
import gameReducer from './gameReducer';

export default combineReducers({
  preGame: preGameReducer,
  game: gameReducer
});
