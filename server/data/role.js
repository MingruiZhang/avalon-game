export const SPECIALITY = Object.freeze({
  HAS_MAGIC: 1, // MERLIN and MIRGANA has magic
  DETECT_MAGIC: 2, // PERCIVAL can detect magic
  KILL_MERLIN: 3, // ASSASSIN can kill MERLIN end of game
  IS_HIDDEN: 4, // MORDRED is hidden from MERLIN
  BRAINLESS: 5, // OBERON doesn't know his teammates
  IS_MERLIN: 6 // MERLIN
});

class roleClass {
  constructor({ name, isEvil, specialities, description }) {
    this.name = name;
    this.isEvil = isEvil;
    this.specialities = specialities;
    this.description = description;
  }
}

// Bad side
const ASSASSIN = new roleClass({
  name: 'Assassin',
  isEvil: true,
  specialities: [SPECIALITY.KILL_MERLIN],
  description: 'You can kill Merlin'
});
const MORGANA = new roleClass({
  name: 'Morgana',
  isEvil: true,
  specialities: [SPECIALITY.HAS_MAGIC],
  description: 'You appears as Merlin'
});
const MORDRED = new roleClass({
  name: 'Mordred',
  isEvil: true,
  specialities: [SPECIALITY.IS_HIDDEN],
  description: 'You are unknown to Merlin'
});
const OBERON = new roleClass({
  name: 'Oberon',
  isEvil: true,
  specialities: [SPECIALITY.BRAINLESS],
  description: 'You are unknown to evil'
});
const BAD_1 = new roleClass({
  name: 'Minion of Mordred',
  isEvil: true,
  specialities: [],
  description: 'You are plain evil'
});

// Good side
const MERLIN = new roleClass({
  name: 'Merlin',
  isEvil: false,
  specialities: [SPECIALITY.IS_MERLIN, SPECIALITY.HAS_MAGIC],
  description: 'You know evil'
});
const PERCIVAL = new roleClass({
  name: 'Percival',
  isEvil: false,
  specialities: [SPECIALITY.DETECT_MAGIC],
  description: 'You can detect people with magic'
});
const GOOD_1 = new roleClass({
  name: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_2 = new roleClass({
  name: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_3 = new roleClass({
  name: 'Servant of Arthur',
  isEvil: false,
  specialities: [],
  description: 'You know nothing :)'
});
const GOOD_4 = new roleClass({
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
