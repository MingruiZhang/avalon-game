'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = controller;

var _utils = require('../utils');

var _redux = require('../redux');

var _redux2 = _interopRequireDefault(_redux);

var _playerData = require('../redux/playerData');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function controller(socket) {
  _redux2.default.dispatch((0, _playerData.removeDummyPlayer)()).then(function (dummyName) {
    if (dummyName) {
      (0, _utils.socketEmitAll)(socket, 'serverUpdatePlayers', {
        players: _redux2.default.getState().playerData.players,
        log: {
          message: dummyName + ' left the game',
          type: 'normal'
        }
      });
    }
  });
} // ADMIN FEATURE