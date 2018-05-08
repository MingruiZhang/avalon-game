'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameRoleSetByPlayers = exports.Speciality = undefined;

var _deepFreeze = require('deep-freeze');

var _deepFreeze2 = _interopRequireDefault(_deepFreeze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Speciality = exports.Speciality = (0, _deepFreeze2.default)({
  HAS_MAGIC: 1, // MERLIN and MIRGANA has magic
  DETECT_MAGIC: 2, // PERCIVAL can detect magic
  KILL_MERLIN: 3, // ASSASSIN can kill MERLIN end of game
  IS_HIDDEN: 4, // MORDRED is hidden from MERLIN
  BRAINLESS: 5, // OBERON doesn't know his teammates
  IS_MERLIN: 6 // MERLIN
});

// Bad side
var ASSASSIN = (0, _deepFreeze2.default)({
  roleName: 'Assassin',
  isEvil: true,
  specialities: [Speciality.KILL_MERLIN],
  description: 'You can kill Merlin, your teammates are'
});
var MORGANA = (0, _deepFreeze2.default)({
  roleName: 'Morgana',
  isEvil: true,
  specialities: [Speciality.HAS_MAGIC],
  description: 'You appears as Merlin, your teammates are'
});
var MORDRED = (0, _deepFreeze2.default)({
  roleName: 'Mordred',
  isEvil: true,
  specialities: [Speciality.IS_HIDDEN],
  description: 'You are unknown to Merlin, your teammates are'
});
var OBERON = (0, _deepFreeze2.default)({
  roleName: 'Oberon',
  isEvil: true,
  specialities: [Speciality.BRAINLESS],
  description: 'You know nothing :)'
});
var BAD_1 = (0, _deepFreeze2.default)({
  roleName: 'Minion of Mordred',
  isEvil: true,
  specialities: [],
  description: 'You are plain evil, your teammates are'
});

// Good side
var MERLIN = (0, _deepFreeze2.default)({
  roleName: 'Merlin',
  isEvil: false,
  specialities: [Speciality.IS_MERLIN, Speciality.HAS_MAGIC],
  description: 'You know evil, they are'
});
var PERCIVAL = (0, _deepFreeze2.default)({
  roleName: 'Percival',
  isEvil: false,
  specialities: [Speciality.DETECT_MAGIC],
  description: 'You can detect people with magic, they are'
});
var GOOD_1 = (0, _deepFreeze2.default)({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
var GOOD_2 = (0, _deepFreeze2.default)({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
var GOOD_3 = (0, _deepFreeze2.default)({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
var GOOD_4 = (0, _deepFreeze2.default)({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});

var GameRoleSetByPlayers = exports.GameRoleSetByPlayers = {
  // 4 Good + 2 Bad
  6: [MORGANA, ASSASSIN, MERLIN, GOOD_1, GOOD_2, GOOD_3],
  // 4 Good + 3 Bad
  7: [MORGANA, ASSASSIN, OBERON, MERLIN, PERCIVAL, GOOD_1, GOOD_2],
  // 5 Good + 3 Bad
  8: [MORGANA, ASSASSIN, MORDRED, MERLIN, PERCIVAL, GOOD_1, GOOD_2, GOOD_3],
  // 5 Good + 4 Bad
  9: [MORGANA, ASSASSIN, OBERON, BAD_1, MERLIN, PERCIVAL, GOOD_1, GOOD_2, GOOD_3],
  // 6 Good + 4 Bad
  10: [MORGANA, ASSASSIN, MORDRED, BAD_1, MERLIN, PERCIVAL, GOOD_1, GOOD_2, GOOD_3, GOOD_4]
};