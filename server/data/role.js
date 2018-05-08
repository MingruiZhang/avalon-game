import deepFreeze from 'deep-freeze';

export const Speciality = deepFreeze({
  HAS_MAGIC: 1, // MERLIN and MIRGANA has magic
  DETECT_MAGIC: 2, // PERCIVAL can detect magic
  KILL_MERLIN: 3, // ASSASSIN can kill MERLIN end of game
  IS_HIDDEN: 4, // MORDRED is hidden from MERLIN
  BRAINLESS: 5, // OBERON doesn't know his teammates
  IS_MERLIN: 6 // MERLIN
});

// Bad side
const ASSASSIN = deepFreeze({
  roleName: 'Assassin',
  isEvil: true,
  specialities: [Speciality.KILL_MERLIN],
  description: 'You can kill Merlin, your teammates are'
});
const MORGANA = deepFreeze({
  roleName: 'Morgana',
  isEvil: true,
  specialities: [Speciality.HAS_MAGIC],
  description: 'You appears as Merlin, your teammates are'
});
const MORDRED = deepFreeze({
  roleName: 'Mordred',
  isEvil: true,
  specialities: [Speciality.IS_HIDDEN],
  description: 'You are unknown to Merlin, your teammates are'
});
const OBERON = deepFreeze({
  roleName: 'Oberon',
  isEvil: true,
  specialities: [Speciality.BRAINLESS],
  description: 'You know nothing :)'
});
const BAD_1 = deepFreeze({
  roleName: 'Minion of Mordred',
  isEvil: true,
  specialities: [],
  description: 'You are plain evil, your teammates are'
});

// Good side
const MERLIN = deepFreeze({
  roleName: 'Merlin',
  isEvil: false,
  specialities: [Speciality.IS_MERLIN, Speciality.HAS_MAGIC],
  description: 'You know evil, they are'
});
const PERCIVAL = deepFreeze({
  roleName: 'Percival',
  isEvil: false,
  specialities: [Speciality.DETECT_MAGIC],
  description: 'You can detect people with magic, they are'
});
const GOOD_1 = deepFreeze({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_2 = deepFreeze({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_3 = deepFreeze({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_4 = deepFreeze({
  roleName: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});

export const GameRoleSetByPlayers = {
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
