'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignRoles = exports.toggleReady = exports.removeDummyPlayer = exports.removePlayer = exports.addDummyPlayer = exports.addPlayer = exports.selectAllPlayers = undefined;

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = reducer;

var _core = require('lodash/core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('../utils');

var _role = require('../data/role');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var action = function action(name) {
  return 'playerData/' + name;
};

var DEFAULT_STATE = {
  players: [],
  isallReady: false
};

var initNewPlayer = function initNewPlayer(_ref) {
  var avatarId = _ref.avatarId,
      name = _ref.name,
      isDummy = _ref.isDummy;
  return {
    avatarId: avatarId,
    name: name,
    isReady: !!isDummy, // Dummy players init with ready
    isDummy: !!isDummy,
    isAdmin: name === 'Admin' || name === '张明睿'
  };
};

/**
 * Reducer
 */

function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  var action = arguments[1];

  switch (action.type) {
    case ADD_PLAYER:
      {
        var newPlayer = initNewPlayer(action.payload);
        var newAllPlayers = [].concat((0, _toConsumableArray3.default)(state.players), [newPlayer]);
        return (0, _extends3.default)({}, state, {
          players: newAllPlayers,
          isAllReady: calcAllReady(newAllPlayers)
        });
      }
    case UPDATE_PLAYERS:
      {
        return (0, _extends3.default)({}, state, {
          players: action.payload,
          isAllReady: calcAllReady(action.payload)
        });
      }
    case REMOVE_PLAYER:
      {
        var _newAllPlayers = state.players.filter(function (player) {
          return player.name !== action.payload;
        });
        return (0, _extends3.default)({}, state, {
          players: _newAllPlayers,
          isAllReady: calcAllReady(_newAllPlayers)
        });
      }
    default:
      return state;
  }
}

var calcAllReady = function calcAllReady(allPlayers) {
  return allPlayers.every(function (player) {
    return player.isReady;
  });
};

/**
 * Selectors
 */

var selectAllPlayers = exports.selectAllPlayers = function selectAllPlayers(state) {
  return state.playerData.players;
};

/**
 * Actions and Action creators
 */
// ADD_PLAYER
var ADD_PLAYER = action('ADD_PLAYER');

var addPlayer = exports.addPlayer = function addPlayer(playerInfo) {
  return function (dispatch, getState) {
    dispatch({ type: ADD_PLAYER, payload: playerInfo });
    return _promise2.default.resolve(selectAllPlayers(getState()));
  };
};

var addDummyPlayer = exports.addDummyPlayer = function addDummyPlayer() {
  return function (dispatch, getState) {
    if (selectAllPlayers(getState()).length >= 10) {
      return _promise2.default.resolve(null);
    } else {
      // Export a random dummy name
      var getRandomDummyName = function getRandomDummyName() {
        var dummyNames = ['BruoMars', 'Hello', '笑笑', '奇葩', '道长'];
        var randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
        var randomCount = Math.floor(Math.random() * 1000);
        return randomName + '-' + randomCount;
      };
      // Give a random avatar id
      var getRandomAvatarId = function getRandomAvatarId() {
        return Math.floor(Math.random() * 12) + 1;
      };
      var dummyName = getRandomDummyName();

      dispatch({
        type: ADD_PLAYER,
        payload: { name: dummyName, avatarId: getRandomAvatarId(), isDummy: true }
      });

      return _promise2.default.resolve(dummyName);
    }
  };
};

// REMOVE_PLAYER
var REMOVE_PLAYER = action('REMOVE_PLAYER');

var removePlayer = exports.removePlayer = function removePlayer(name) {
  return { type: REMOVE_PLAYER, payload: name };
};

var removeDummyPlayer = exports.removeDummyPlayer = function removeDummyPlayer() {
  return function (dispatch, getState) {
    var allPlayers = selectAllPlayers(getState());
    var firstDummy = _core2.default.find(allPlayers, 'isDummy');
    if (firstDummy) {
      var dummyName = firstDummy.name;
      dispatch({ type: REMOVE_PLAYER, payload: dummyName });
      return _promise2.default.resolve(dummyName);
    } else {
      return _promise2.default.resolve(null);
    }
  };
};

// UPDATE_PLAYERS
var UPDATE_PLAYERS = action('UPDATE_PLYAERS');

var toggleReady = exports.toggleReady = function toggleReady(data) {
  return function (dispatch, getState) {
    var allPlayers = selectAllPlayers(getState());
    var isReady = data.isReady,
        playerName = data.playerName;

    var index = allPlayers.findIndex(function (player) {
      return player.name === playerName;
    });
    var newAllPlayers = [].concat((0, _toConsumableArray3.default)(allPlayers.slice(0, index)), [(0, _extends3.default)({}, allPlayers[index], { isReady: isReady })], (0, _toConsumableArray3.default)(allPlayers.slice(index + 1)));
    dispatch({ type: UPDATE_PLAYERS, payload: newAllPlayers });
    return _promise2.default.resolve();
  };
};

var assignRoles = exports.assignRoles = function assignRoles() {
  return function (dispatch, getState) {
    var allPlayers = selectAllPlayers(getState());
    var shuffledRoles = (0, _utils.shuffleArray)(_role.GameRoleSetByPlayers[allPlayers.length]);
    var overviewInfo = {
      goodList: _role.GameRoleSetByPlayers[allPlayers.length].filter(function (role) {
        return !role.isEvil;
      }).map(function (role) {
        return role.roleName;
      }),
      evilList: _role.GameRoleSetByPlayers[allPlayers.length].filter(function (role) {
        return role.isEvil;
      }).map(function (role) {
        return role.roleName;
      })
    };
    // Additional information
    var evilPlayers = allPlayers.filter(function (player, playerIndex) {
      return shuffledRoles[playerIndex].isEvil;
    });
    var merlinKnow = evilPlayers.filter(function (player, playerIndex) {
      return !shuffledRoles[playerIndex].specialities.includes(_role.Speciality.IS_HIDDEN);
    });
    var evilKnow = evilPlayers.filter(function (player, playerIndex) {
      return !shuffledRoles[playerIndex].specialities.includes(_role.Speciality.BRAINLESS);
    });
    var percivalKnow = allPlayers.filter(function (player, playerIndex) {
      return shuffledRoles[playerIndex].specialities.includes(_role.Speciality.HAS_MAGIC);
    });
    // Give additional information to each player
    var shuffledRolesWithKnowns = shuffledRoles.map(function (role, roleIndex) {
      if (evilKnow.includes(allPlayers[roleIndex])) {
        // If you are evil, you know your teammates (apart from Oberon)
        return (0, _extends3.default)({}, role, {
          knowPlayers: evilKnow.map(function (player) {
            return player.name;
          }).filter(function (evilName) {
            return evilName !== allPlayers[roleIndex].name;
          }) // filter yourself
        });
      } else if (role.specialities.includes(_role.Speciality.IS_MERLIN)) {
        // If you are Merlin, you know evil players (apart from Mordred)
        return (0, _extends3.default)({}, role, { knowPlayers: merlinKnow.map(function (player) {
            return player.name;
          }) });
      } else if (role.specialities.includes(_role.Speciality.DETECT_MAGIC)) {
        // If you are Merlin, you know evil players (apart from Mordred)
        return (0, _extends3.default)({}, role, { knowPlayers: percivalKnow.map(function (player) {
            return player.name;
          }) });
      } else {
        return (0, _extends3.default)({}, role);
      }
    });

    var newPlayerData = allPlayers.map(function (playerInfo, index) {
      return (0, _extends3.default)({}, playerInfo, {
        roleInfo: (0, _extends3.default)({}, shuffledRolesWithKnowns[index], { overviewInfo: overviewInfo })
      });
    });

    dispatch({ type: UPDATE_PLAYERS, payload: newPlayerData });

    return _promise2.default.resolve(newPlayerData);
  };
};