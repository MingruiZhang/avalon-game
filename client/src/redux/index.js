import { combineReducers } from 'redux';

import preGame from './preGame';
import game from './game';

export default combineReducers({ preGame, game });
