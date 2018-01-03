import { combineReducers } from 'redux';

import preGameReducer from './preGameReducer';

export default combineReducers({
  preGame: preGameReducer
});
