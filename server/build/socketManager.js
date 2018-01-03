'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var playerId = 0;
var players = [];

var doesNameExist = function doesNameExist(name) {
  return players.some(function (player) {
    player.name === name;
  });
};

var removePlayerIndexByName = function removePlayerIndexByName(name) {
  var index = players.findIndex(function (player) {
    return player.name === name;
  });
  players.splice(index, 1);
};

var socketManager = function socketManager(socket) {
  var playerInfo = undefined;

  socket.on('clientPlayerJoined', function (data) {
    var name = data.name;

    if (doesNameExist(name)) {
      console.log('client player ' + name + ' have name conflict');

      socket.emit('serverPlayerJoinedError', { error: 'This name already exists in the game.' });
    } else {
      console.log('client player ' + name + ' have joined the game');

      playerInfo = (0, _extends3.default)({}, data, { id: playerId++ });
      players.push(playerInfo);

      socket.emit('serverPlayerJoinedSuccess', {
        playerInfo: playerInfo,
        players: players,
        message: 'you have joined the game'
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        message: 'player ' + name + ' have joined the game'
      });
    }
  });

  socket.on('disconnect', function () {
    if (playerInfo) {
      console.log('client player ' + playerInfo.name + ' have left the game');

      removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        message: 'player ' + playerInfo.name + ' have left the game'
      });
    }
  });
};

exports.default = socketManager;