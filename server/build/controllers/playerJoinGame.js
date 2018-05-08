'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = controller;

var _game = require('../data/game');

var GameStore = _interopRequireWildcard(_game);

var _redux = require('../redux');

var _redux2 = _interopRequireDefault(_redux);

var _playerData = require('../redux/playerData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function controller(socket, data) {
  var name = data.name;

  var allPlayers = _redux2.default.getState().playerData.players;
  if (!name.length) {
    socket.emit('serverPlayerJoinedError', { error: 'Please enter your nickname' });
  } else if (allPlayers.find(function (player) {
    return player.name === name;
  })) {
    socket.emit('serverPlayerJoinedError', { error: 'Nickname already taken in the game' });
  } else if (allPlayers.length >= 10) {
    socket.emit('serverPlayerJoinedError', { error: 'Too many players in game' });
  } else if (GameStore.isGameStarted()) {
    socket.emit('serverPlayerJoinedError', { error: 'A game have already started' });
  } else {
    GameStore.gamePrepare();
    _redux2.default.dispatch((0, _playerData.addPlayer)(data)).then(function (newAllPlayers) {
      socket.emit('serverPlayerJoinedSuccess', {
        key: name,
        players: newAllPlayers,
        log: { message: 'You joined the game', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: newAllPlayers,
        log: { message: name + ' joined the game', type: 'normal' }
      });
    });
  }
}