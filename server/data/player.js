import { shuffleArray } from '../utils';
import { GameRoleSetByPlayers, SPECIALITY } from './role';

const PLAYERS = []; // All players in the game

let incPlayerId = 0;

class PlayerClass {
  constructor({ avatarId, name, isReady, isDummy }) {
    this.avatarId = avatarId;
    this.name = name;
    this.isReady = !!isReady;
    this.isDummy = !!isDummy;
    this.isAdmin = name === 'Admin' || name === '张明睿';
    this.key = `player-${incPlayerId++}`;
  }
}

export const allPlayers = () => [...PLAYERS]; // I want to make PLAYERS immutable to outside, to prevent side effects
export const addPlayer = data => {
  const newPlayer = new PlayerClass(data);
  PLAYERS.push(newPlayer);
  return newPlayer;
};
export const assignRoles = cb => {
  const shuffledRoles = shuffleArray(GameRoleSetByPlayers[PLAYERS.length]);
  const overviewInfo = {
    goodList: GameRoleSetByPlayers[PLAYERS.length].filter(role => !role.isEvil).map(role => role.name),
    evilList: GameRoleSetByPlayers[PLAYERS.length].filter(role => role.isEvil).map(role => role.name)
  };
  // Assign shuffled roles to each player
  PLAYERS.forEach((player, index) => {
    player.role = shuffledRoles[index];
  });
  // Additional information
  const evilPlayers = PLAYERS.filter(player => player.role.isEvil);
  const merlinKnow = evilPlayers.filter(player => !player.role.specialities.includes(SPECIALITY.IS_HIDDEN));
  const evilKnow = evilPlayers.filter(player => !player.role.specialities.includes(SPECIALITY.BRAINLESS));
  const percivalKnow = PLAYERS.filter(player => player.role.specialities.includes(SPECIALITY.HAS_MAGIC));
  // Give additional information to each player
  PLAYERS.forEach(you => {
    const yourInfo = {
      roleIsEvil: you.role.isEvil,
      roleName: you.role.name
    };

    if (evilKnow.includes(you)) {
      // If you are evil, you know your teammates (apart from Oberon)
      yourInfo.knowMessage = you.role.description + ', your teammates are';
      yourInfo.knowPlayers = evilKnow.filter(player => player.key !== you.key).map(player => player.key); // filter yourself
    } else if (you.role.specialities.includes(SPECIALITY.IS_MERLIN)) {
      // If you are Merlin, you know evil players (apart from Mordred)
      yourInfo.knowMessage = you.role.description + ', they are';
      yourInfo.knowPlayers = merlinKnow.map(player => player.key);
    } else if (you.role.specialities.includes(SPECIALITY.DETECT_MAGIC)) {
      // If you are Merlin, you know evil players (apart from Mordred)
      yourInfo.knowMessage = you.role.description + ', they are';
      yourInfo.knowPlayers = percivalKnow.map(player => player.key);
    } else {
      yourInfo.knowMessage = you.role.description;
    }

    you.info = { yourInfo, overviewInfo };
  });

  cb();
};

/**
 * Players utils
 */
export const doesNameExist = name => PLAYERS.some(player => player.name === name);
export const removePlayerIndexByName = name => {
  const index = PLAYERS.findIndex(player => player.name === name);
  PLAYERS.splice(index, 1);
};
export const allPlayersReady = () => PLAYERS.every(player => player.isReady);

/**
 * Dummy Player utils
 */
// Export a random dummy name
const getRandomDummyName = () => {
  const dummyNames = ['BruoMars', 'Hello', '笑笑', '奇葩', '道长'];
  return dummyNames[Math.floor(Math.random() * dummyNames.length)];
};
// Give a random avatar id
const getRandomAvatarId = () => {
  return Math.floor(Math.random() * 12) + 1;
};

export const addDummyPlayer = () => {
  if (PLAYERS.length >= 10) {
    return null;
  }
  const newDummyPlayer = new PlayerClass({
    name: getRandomDummyName() + `-${incPlayerId}`,
    avatarId: getRandomAvatarId(),
    isReady: true,
    isDummy: true
  });
  PLAYERS.push(newDummyPlayer);
  return newDummyPlayer.name;
};

export const removeDummyPlayer = () => {
  const DummyIndex = PLAYERS.findIndex(player => player.isDummy);
  if (DummyIndex >= 0) {
    const DummyName = PLAYERS[DummyIndex].name;
    removePlayerIndexByName(DummyName);
    return DummyName;
  } else {
    return null;
  }
};
