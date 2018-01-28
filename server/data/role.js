export const SPECIALITY = Object.freeze({
  HAS_MAGIC: 1, // MERLIN and MIRGANA has magic
  DETECT_MAGIC: 2, // PERCIVAL can detect magic
  KILL_MERLIN: 3, // ASSASSIN can kill MERLIN end of game
  IS_HIDDEN: 4, // MORDRED is hidden from MERLIN
  BRAINLESS: 5, // OBERON doesn't know his teammates
  IS_MERLIN: 6 // MERLIN
});

class roleClass {
  constructor({ name, isBad, specialities }) {
    this.name = name;
    this.isBad = isBad;
    this.specialities = specialities;
  }
}

// Bad side
const ASSASSIN = new roleClass({ name: 'Assassin', isBad: true, specialities: [SPECIALITY.KILL_MERLIN] });
const MORGANA = new roleClass({ name: 'Morgana', isBad: true, specialities: [SPECIALITY.HAS_MAGIC] });
const MORDRED = new roleClass({ name: 'Mordred', isBad: true, specialities: [SPECIALITY.IS_HIDDEN] });
const OBERON = new roleClass({ name: 'Oberon', isBad: true, specialities: [SPECIALITY.BRAINLESS] });
const BAD_1 = new roleClass({ name: 'Servant of Mordred', isBad: true, specialities: [] });

// Good side
const MERLIN = new roleClass({
  name: 'Merlin',
  isBad: false,
  specialities: [SPECIALITY.IS_MERLIN, SPECIALITY.HAS_MAGIC]
});
const PERCIVAL = new roleClass({ name: 'Percival', isBad: false, specialities: [SPECIALITY.DETECT_MAGIC] });
const GOOD_1 = new roleClass({ name: 'Servant of Arthur', isBad: false, specialities: [] });
const GOOD_2 = new roleClass({ name: 'Servant of Arthur', isBad: false, specialities: [] });
const GOOD_3 = new roleClass({ name: 'Servant of Arthur', isBad: false, specialities: [] });
const GOOD_4 = new roleClass({ name: 'Servant of Arthur', isBad: false, specialities: [] });

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
