'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startGameCountDown = undefined;
exports.default = controller;

var _utils = require('../utils');

var _redux = require('../redux');

var _redux2 = _interopRequireDefault(_redux);

var _playerData = require('../redux/playerData');

var _gameData = require('../redux/gameData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startGameCountDown = exports.startGameCountDown = function startGameCountDown(socket) {
  var countDown = 1;
  var gameStartCountDown = setInterval(function () {
    var gameState = _redux2.default.getState().gameData.gameState;
    var allPlayers = _redux2.default.getState().playerData.players;
    // If someone cancel ready, stop game starting
    if (gameState !== _gameData.GameState.Starting) {
      clearInterval(gameStartCountDown);
      (0, _utils.socketEmitAll)(socket, 'serverUpdatePlayers', {
        players: allPlayers,
        log: { message: 'Starting game stopped. All players need to be ready', type: 'error' }
      });
    } else {
      // If count downa is 0, game started.
      if (countDown === 0) {
        _redux2.default.dispatch((0, _gameData.newGameState)(_gameData.GameState.Started));
        _redux2.default.dispatch((0, _playerData.assignRoles)()).then(function (newAllPlayers) {
          (0, _utils.socketEmitAll)(socket, 'serverGameStart', {
            players: newAllPlayers,
            gameSetup: _gameData.gameSetupByPlayers[newAllPlayers.length]
          });
        });
        clearInterval(gameStartCountDown);
      } else {
        (0, _utils.socketEmitAll)(socket, 'serverUpdatePlayers', {
          players: allPlayers,
          log: { message: 'Starting game in ' + countDown--, type: 'important' }
        });
      }
    }
  }, 1000);
};
// import * as PlayerStore from '../data/player';
// import * as GameStore from '../data/game';

function controller(socket, data) {
  var isReady = data.isReady,
      playerName = data.playerName;
  // Toggle player ready state

  _redux2.default.dispatch((0, _playerData.toggleReady)({ isReady: isReady, playerName: playerName })).then(function () {
    var _store$getState$playe = _redux2.default.getState().playerData,
        players = _store$getState$playe.players,
        isAllReady = _store$getState$playe.isAllReady;
    // Emit player update socket


    if (isReady) {
      socket.emit('serverUpdatePlayers', {
        players: players,
        log: { message: 'You are ready', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        log: { message: playerName + ' is ready', type: 'normal' }
      });
    } else {
      socket.emit('serverUpdatePlayers', {
        players: players,
        log: { message: 'You cancelled ready', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        log: { message: playerName + ' cancelled ready', type: 'normal' }
      });
    }
    // Start game if everyone is ready
    if (isAllReady) {
      if (players.length < 6 || players.length > 10) {
        // If not enough player, show error message
        (0, _utils.socketEmitAll)(socket, 'serverUpdatePlayers', {
          players: players,
          log: { message: '6 to 10 players needed to start agame', type: 'error' }
        });
      } else {
        _redux2.default.dispatch((0, _gameData.newGameState)(_gameData.GameState.Starting));
        // If enough player, start game count down
        startGameCountDown(socket);
      }
    } else {
      _redux2.default.dispatch((0, _gameData.newGameState)(_gameData.GameState.Prepare));
    }
  });
}