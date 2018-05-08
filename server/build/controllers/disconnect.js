'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = controller;

var _utils = require('../utils');

var _player = require('../data/player');

var PlayerStore = _interopRequireWildcard(_player);

var _game = require('../data/game');

var GameStore = _interopRequireWildcard(_game);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var tooLessPlayers = function tooLessPlayers() {
  return PlayerStore.allPlayers().length < 4;
};
var noRealPlayer = function noRealPlayer() {
  return PlayerStore.allPlayers().findIndex(function (player) {
    return player.isDummy;
  }) >= 0;
};

function controller(socket) {
  var playerInfo = socket.playerInfo;

  if (playerInfo) {
    PlayerStore.removePlayerIndexByName(playerInfo.name);

    socket.broadcast.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: playerInfo.name + ' left the game', type: 'normal' }
    });
  }

  if (tooLessPlayers() || noRealPlayer()) {
    GameStore.gamePrepare();
    (0, _utils.socketEmitAll)(socket, 'serverGameEnd', {
      players: []
    });
  }
}