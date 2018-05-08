'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newGameState = exports.gameSetupByPlayers = exports.GameState = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _freeze = require('babel-runtime/core-js/object/freeze');

var _freeze2 = _interopRequireDefault(_freeze);

exports.default = reducer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var action = function action(name) {
  return 'gameData/' + name;
};

var GameState = exports.GameState = (0, _freeze2.default)({
  Prepare: 0,
  Starting: 1,
  Started: 2
});

var gameSetupByPlayers = exports.gameSetupByPlayers = {
  6: { rounds: [2, 3, 4, 3, 4], specialRound4: false },
  7: { rounds: [2, 3, 3, 4, 4], specialRound4: true },
  8: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  9: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  10: { rounds: [3, 4, 4, 5, 5], specialRound4: true }
};

var DEFAULT_STATE = {
  gameState: GameState.Prepare
};

/**
 * Reducer
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case NEW_GAME_STATE:
      {
        return (0, _extends3.default)({}, state, {
          gameState: action.payload
        });
      }
    default:
      return state;
  }
}

/**
 * Selectors
 */

/**
 * Actions and Action creators
 */

var NEW_GAME_STATE = action('CHANGE_GAME_STATE');
var newGameState = exports.newGameState = function newGameState(newState) {
  return { type: NEW_GAME_STATE, payload: newState };
};