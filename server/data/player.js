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
    this.isAdmin = name === 'Admin' || name === 'Admin-Ming' || name === 'Admin-Naixin';
    this.key = `player-${incPlayerId++}`;
  }
}

export const allPlayers = () => [...PLAYERS]; // I want to make PLAYERS immutable to outside, to prevent side effects
export const addPlayer = data => {
  const newPlayer = new PlayerClass(data);
  PLAYERS.push(newPlayer);
  return newPlayer;
};
export const assignRoles = () => {
  const shuffledRoles = shuffleArray(GameRoleSetByPlayers[PLAYERS.length]);
  // Assign shuffled roles to each player
  PLAYERS.forEach((player, index) => {
    player.role = shuffledRoles[index];
  });
  // Additional information
  const badPlayers = PLAYERS.filter(player => player.role.isBad);
  const merlinKnow = badPlayers.filter(player => !player.role.specialities.includes(SPECIALITY.IS_HIDDEN));
  const badKnow = badPlayers.filter(player => !player.role.specialities.includes(SPECIALITY.BRAINLESS));
  const percivalKnow = PLAYERS.filter(player => player.role.specialities.includes(SPECIALITY.HAS_MAGIC));
  // Give additional information to each player
  PLAYERS.forEach(you => {
    const yourMessage = [];
    // If you are bad, you know your teammates (apart from Oberon)
    if (you.role.isBad) {
      const youKnow = badKnow
        .filter(bad => bad.name !== you.name) // filter yourself
        .map(bad => bad.name)
        .join();
      yourMessage.push(`your teammates are ${youKnow}`);
    }
    // If you are Merlin, you know bad players (apart from Mordred)
    if (you.role.specialities.includes(SPECIALITY.IS_MERLIN)) {
      const youKnow = merlinKnow.map(bad => bad.name).join();
      yourMessage.push(`bads are ${youKnow}`);
    }
    // If you are Percival, you know who has magic (Merlin and Morgana)
    if (you.role.specialities.includes(SPECIALITY.DETECT_MAGIC)) {
      const youKnow = percivalKnow.map(magic => magic.name).join();
      yourMessage.push(`magic people ${youKnow}`);
    }

    you.role.message = yourMessage;
    console.log(`${you.name}: ${you.role.name}: ${you.role.isBad}: ${yourMessage.join()} `);
  });
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
