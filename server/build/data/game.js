"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gameSetupByPlayers = exports.gamePrepare = exports.gameStarted = exports.gameStarting = exports.isGameStarted = exports.isGameStarting = undefined;

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GAME_STATE = (0, _freeze2.default)({
  PREPARE: 0,
  STARTING: 1,
  STARTED: 2
});

var GAME = GAME_STATE.PREPARE; // Indicate which state current game is

var isGameStarting = exports.isGameStarting = function isGameStarting() {
  return GAME === GAME_STATE.STARTING;
};
var isGameStarted = exports.isGameStarted = function isGameStarted() {
  return GAME === GAME_STATE.STARTED;
};

var gameStarting = exports.gameStarting = function gameStarting() {
  return GAME = GAME_STATE.STARTING;
};
var gameStarted = exports.gameStarted = function gameStarted() {
  return GAME = GAME_STATE.STARTED;
};
var gamePrepare = exports.gamePrepare = function gamePrepare() {
  return GAME = GAME_STATE.PREPARE;
};

var gameSetupByPlayers = exports.gameSetupByPlayers = {
  6: { rounds: [2, 3, 4, 3, 4], specialRound4: false },
  7: { rounds: [2, 3, 3, 4, 4], specialRound4: true },
  8: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  9: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  10: { rounds: [3, 4, 4, 5, 5], specialRound4: true }
};