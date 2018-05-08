'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeDummyPlayer = exports.addDummyPlayer = exports.allPlayersReady = exports.removePlayerIndexByName = exports.doesNameExist = exports.assignRoles = exports.addPlayer = exports.allPlayers = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = require('../utils');

var _role = require('./role');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PLAYERS = []; // All players in the game

var incPlayerId = 0;

var PlayerClass = function PlayerClass(_ref) {
  var avatarId = _ref.avatarId,
      name = _ref.name,
      isReady = _ref.isReady,
      isDummy = _ref.isDummy;
  (0, _classCallCheck3.default)(this, PlayerClass);

  this.avatarId = avatarId;
  this.name = name;
  this.isReady = !!isReady;
  this.isDummy = !!isDummy;
  this.isAdmin = name === 'Admin' || name === '张明睿';
  this.key = 'player-' + incPlayerId++;
};

var allPlayers = exports.allPlayers = function allPlayers() {
  return [].concat(PLAYERS);
}; // I want to make PLAYERS immutable to outside, to prevent side effects
var addPlayer = exports.addPlayer = function addPlayer(data) {
  var newPlayer = new PlayerClass(data);
  PLAYERS.push(newPlayer);
  return newPlayer;
};
var assignRoles = exports.assignRoles = function assignRoles(cb) {
  var shuffledRoles = (0, _utils.shuffleArray)(_role.GameRoleSetByPlayers[PLAYERS.length]);
  var overviewInfo = {
    goodList: _role.GameRoleSetByPlayers[PLAYERS.length].filter(function (role) {
      return !role.isEvil;
    }).map(function (role) {
      return role.name;
    }),
    evilList: _role.GameRoleSetByPlayers[PLAYERS.length].filter(function (role) {
      return role.isEvil;
    }).map(function (role) {
      return role.name;
    })
  };
  // Assign shuffled roles to each player
  PLAYERS.forEach(function (player, index) {
    player.role = shuffledRoles[index];
  });
  // Additional information
  var evilPlayers = PLAYERS.filter(function (player) {
    return player.role.isEvil;
  });
  var merlinKnow = evilPlayers.filter(function (player) {
    return !player.role.specialities.includes(_role.SPECIALITY.IS_HIDDEN);
  });
  var evilKnow = evilPlayers.filter(function (player) {
    return !player.role.specialities.includes(_role.SPECIALITY.BRAINLESS);
  });
  var percivalKnow = PLAYERS.filter(function (player) {
    return player.role.specialities.includes(_role.SPECIALITY.HAS_MAGIC);
  });
  // Give additional information to each player
  PLAYERS.forEach(function (you) {
    var yourInfo = {
      roleIsEvil: you.role.isEvil,
      roleName: you.role.name
    };

    if (evilKnow.includes(you)) {
      // If you are evil, you know your teammates (apart from Oberon)
      yourInfo.knowMessage = you.role.description + ', your teammates are';
      yourInfo.knowPlayers = evilKnow.filter(function (player) {
        return player.key !== you.key;
      }).map(function (player) {
        return player.key;
      }); // filter yourself
    } else if (you.role.specialities.includes(_role.SPECIALITY.IS_MERLIN)) {
      // If you are Merlin, you know evil players (apart from Mordred)
      yourInfo.knowMessage = you.role.description + ', they are';
      yourInfo.knowPlayers = merlinKnow.map(function (player) {
        return player.key;
      });
    } else if (you.role.specialities.includes(_role.SPECIALITY.DETECT_MAGIC)) {
      // If you are Merlin, you know evil players (apart from Mordred)
      yourInfo.knowMessage = you.role.description + ', they are';
      yourInfo.knowPlayers = percivalKnow.map(function (player) {
        return player.key;
      });
    } else {
      yourInfo.knowMessage = you.role.description;
    }

    you.info = { yourInfo: yourInfo, overviewInfo: overviewInfo };
  });

  cb();
};

/**
 * Players utils
 */
var doesNameExist = exports.doesNameExist = function doesNameExist(name) {
  return PLAYERS.some(function (player) {
    return player.name === name;
  });
};
var removePlayerIndexByName = exports.removePlayerIndexByName = function removePlayerIndexByName(name) {
  var index = PLAYERS.findIndex(function (player) {
    return player.name === name;
  });
  PLAYERS.splice(index, 1);
};
var allPlayersReady = exports.allPlayersReady = function allPlayersReady() {
  return PLAYERS.every(function (player) {
    return player.isReady;
  });
};

/**
 * Dummy Player utils
 */
// Export a random dummy name
var getRandomDummyName = function getRandomDummyName() {
  var dummyNames = ['BruoMars', 'Hello', '笑笑', '奇葩', '道长'];
  return dummyNames[Math.floor(Math.random() * dummyNames.length)];
};
// Give a random avatar id
var getRandomAvatarId = function getRandomAvatarId() {
  return Math.floor(Math.random() * 12) + 1;
};

var addDummyPlayer = exports.addDummyPlayer = function addDummyPlayer() {
  if (PLAYERS.length >= 10) {
    return null;
  }
  var newDummyPlayer = new PlayerClass({
    name: getRandomDummyName() + ('-' + incPlayerId),
    avatarId: getRandomAvatarId(),
    isReady: true,
    isDummy: true
  });
  PLAYERS.push(newDummyPlayer);
  return newDummyPlayer.name;
};

var removeDummyPlayer = exports.removeDummyPlayer = function removeDummyPlayer() {
  var DummyIndex = PLAYERS.findIndex(function (player) {
    return player.isDummy;
  });
  if (DummyIndex >= 0) {
    var DummyName = PLAYERS[DummyIndex].name;
    removePlayerIndexByName(DummyName);
    return DummyName;
  } else {
    return null;
  }
};