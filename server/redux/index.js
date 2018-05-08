import { applyMiddleware, createStore, combineReducers } from 'redux';
import playerData from './playerData';
import gameData from './gameData';
import thunk from 'redux-thunk';

export default createStore(
	combineReducers({ playerData, gameData }), applyMiddleware(thunk)
);