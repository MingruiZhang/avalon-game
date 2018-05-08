'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('./utils');

var _playerJoinGame = require('./controllers/playerJoinGame');

var _playerJoinGame2 = _interopRequireDefault(_playerJoinGame);

var _playerToggleReady = require('./controllers/playerToggleReady');

var _playerToggleReady2 = _interopRequireDefault(_playerToggleReady);

var _disconnect = require('./controllers/disconnect');

var _disconnect2 = _interopRequireDefault(_disconnect);

var _addDummyPlayer = require('./controllers/addDummyPlayer');

var _addDummyPlayer2 = _interopRequireDefault(_addDummyPlayer);

var _removeDummyPlayer = require('./controllers/removeDummyPlayer');

var _removeDummyPlayer2 = _interopRequireDefault(_removeDummyPlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (socket) {
  // When a player join game
  (0, _utils.createSocketController)(socket, 'clientPlayerJoinGame', _playerJoinGame2.default);
  // When a player toggles his ready state
  (0, _utils.createSocketController)(socket, 'clientPlayerToggleReady', _playerToggleReady2.default);
  // ADMIN FEATURE: Add a fake player to store
  (0, _utils.createSocketController)(socket, 'clientAddDummyPlayer', _addDummyPlayer2.default);
  // ADMIN FEATURE: Remove a fake player from store
  (0, _utils.createSocketController)(socket, 'clientRemoveDummyPlayer', _removeDummyPlayer2.default);
  // When a player disconnect from game
  (0, _utils.createSocketController)(socket, 'disconnect', _disconnect2.default);
};

// All controllers