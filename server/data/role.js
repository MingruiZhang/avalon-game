import deepFreeze from 'deep-freeze';

export const SPECIALITY = deepFreeze({
  HAS_MAGIC: 1, // MERLIN and MIRGANA has magic
  DETECT_MAGIC: 2, // PERCIVAL can detect magic
  KILL_MERLIN: 3, // ASSASSIN can kill MERLIN end of game
  IS_HIDDEN: 4, // MORDRED is hidden from MERLIN
  BRAINLESS: 5, // OBERON doesn't know his teammates
  IS_MERLIN: 6 // MERLIN
});

// Bad side
const ASSASSIN = deepFreeze({
  name: 'Assassin',
  isEvil: true,
  specialities: [SPECIALITY.KILL_MERLIN],
  description: 'You can kill Merlin'
});
const MORGANA = deepFreeze({
  name: 'Morgana',
  isEvil: true,
  specialities: [SPECIALITY.HAS_MAGIC],
  description: 'You appears as Merlin'
});
const MORDRED = deepFreeze({
  name: 'Mordred',
  isEvil: true,
  specialities: [SPECIALITY.IS_HIDDEN],
  description: 'You are unknown to Merlin'
});
const OBERON = deepFreeze({
  name: 'Oberon',
  isEvil: true,
  specialities: [SPECIALITY.BRAINLESS],
  description: 'You are unknown to evil'
});
const BAD_1 = deepFreeze({
  name: 'Minion of Mordred',
  isEvil: true,
  specialities: [],
  description: 'You are plain evil'
});

// Good side
const MERLIN = deepFreeze({
  name: 'Merlin',
  isEvil: false,
  specialities: [SPECIALITY.IS_MERLIN, SPECIALITY.HAS_MAGIC],
  description: 'You know evil'
});
const PERCIVAL = deepFreeze({
  name: 'Percival',
  isEvil: false,
  specialities: [SPECIALITY.DETECT_MAGIC],
  description: 'You can detect people with magic'
});
const GOOD_1 = deepFreeze({
  name: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_2 = deepFreeze({
  name: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_3 = deepFreeze({
  name: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_4 = deepFreeze({
  name: 'Servant of Arthur',
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
