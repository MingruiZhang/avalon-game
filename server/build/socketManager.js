'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// This is global scope
var playerId = 0;
var players = [];

var doesNameExist = function doesNameExist(name) {
  return players.some(function (player) {
    return player.name === name;
  });
};

var removePlayerIndexByName = function removePlayerIndexByName(name) {
  var index = players.findIndex(function (player) {
    return player.name === name;
  });
  players.splice(index, 1);
};

var socketManager = function socketManager(socket) {
  // This will be scoped to each individual socket(user)
  var playerInfo = undefined;

  socket.on('clientPlayerJoinedGame', function (data) {
    var name = data.name;

    if (!name.length) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Please enter your nickname'
      });
    } else if (doesNameExist(name)) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Nickname already taken in the game'
      });
    } else {
      playerInfo = (0, _extends3.default)({}, data, { playerId: playerId++, isReady: false });
      players.push(playerInfo);

      socket.emit('serverPlayerJoinedSuccess', {
        playerInfo: playerInfo,
        players: players,
        message: 'you joined the game'
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        message: name + ' joined the game'
      });
    }
  });

  socket.on('clientPlayerToggleReady', function () {
    playerInfo.isReady = !playerInfo.isReady;

    socket.broadcast.emit('serverUpdatePlayers', {
      playerInfo: playerInfo,
      players: players
    });
    socket.emit('serverUpdatePlayers', {
      playerInfo: playerInfo,
      players: players
    });
  });

  socket.on('disconnect', function () {
    if (playerInfo) {
      removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        message: playerInfo.name + ' left the game'
      });
    }
  });
};

exports.default = socketManager;