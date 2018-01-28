'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require('./utils');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// This is global scope
var playerId = 0;
var players = [];

var doesNameExist = function doesNameExist(name) {
  return players.some(function(player) {
    return player.name === name;
  });
};

var removePlayerIndexByName = function removePlayerIndexByName(name) {
  var index = players.findIndex(function(player) {
    return player.name === name;
  });
  players.splice(index, 1);
};

var allPlayersReady = function allPlayersReady() {
  return players.every(function(player) {
    return player.isReady;
  });
};

var socketEmitAll = function socketEmitAll(socket, eventName, data) {
  socket.broadcast.emit(eventName, data);
  socket.emit(eventName, data);
};

var socketManager = function socketManager(socket) {
  // This will be scoped to each individual socket(user)
  var playerInfo = undefined;

  socket.on('clientPlayerJoinedGame', function(data) {
    var name = data.name;

    if (!name.length) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Please enter your nickname'
      });
    } else if (doesNameExist(name)) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Nickname already taken in the game'
      });
    } else if (players.length >= 10) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Too many players in game'
      });
    } else {
      /**
       * Join success: Create new player info
       */
      playerInfo = (0, _extends3.default)({}, data, {
        key: playerId++,
        isReady: false,
        isAdmin: name === 'Ming' || name === 'Naixin'
      });
      players.push(playerInfo);
      /**
       * Emit sockets
       */
      socket.emit('serverPlayerJoinedSuccess', {
        playerInfo: playerInfo,
        players: players,
        log: {
          message: 'you joined the game',
          type: 'normal'
        }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        log: {
          message: name + ' joined the game',
          type: 'normal'
        }
      });
    }
  });

  socket.on('clientPlayerToggleReady', function() {
    /**
     * Toggle ready state
     */
    playerInfo.isReady = !playerInfo.isReady;
    /**
     * If all players are ready, check if game can start
     */
    if (playerInfo.isReady && allPlayersReady()) {
      if (players.length < 6) {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          players: players,
          log: {
            message: '6+ players needed to start agame',
            type: 'error'
          }
        });
      } else {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          players: players,
          log: {
            message: 'Starting game in 5',
            type: 'important'
          }
        });
      }
    } else {
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: players
      });
    }
  });

  socket.on('disconnect', function() {
    if (playerInfo) {
      removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        log: {
          message: playerInfo.name + ' left the game',
          type: 'normal'
        }
      });
    }
  });

  /**
   * ADMIN FEATURES:
   */
  socket.on('clientAddDummyPlayers', function() {
    var randomName = (0, _utils.getRandomDummyName)() + ('-' + playerId++);
    var dummyPlayer = {
      name: randomName,
      avatarId: (0, _utils.getRandomAvatarId)(),
      isReady: true,
      isDummy: true
    };
    players.push(dummyPlayer);
    socketEmitAll(socket, 'serverUpdatePlayers', {
      players: players,
      log: {
        message: randomName + ' joined the game',
        type: 'normal'
      }
    });
  });
};

exports.default = socketManager;
