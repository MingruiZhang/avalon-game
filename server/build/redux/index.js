'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _redux = require('redux');

var _playerData = require('./playerData');

var _playerData2 = _interopRequireDefault(_playerData);

var _gameData = require('./gameData');

var _gameData2 = _interopRequireDefault(_gameData);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _redux.createStore)((0, _redux.combineReducers)({ playerData: _playerData2.default, gameData: _gameData2.default }), (0, _redux.applyMiddleware)(_reduxThunk2.default));