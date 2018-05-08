import _ from 'lodash/core';
import { shuffleArray } from '../utils';
import { GameRoleSetByPlayers, Speciality } from '../data/role';

const action = name => `playerData/${name}`;

const DEFAULT_STATE = {
  players: [],
  isallReady: false
};

const initNewPlayer = ({ avatarId, name, isDummy }) => ({
  avatarId,
  name,
  isReady: !!isDummy, // Dummy players init with ready
  isDummy: !!isDummy,
  isAdmin: name === 'Admin' || name === '张明睿'
});

/**
 * Reducer
 */

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ADD_PLAYER: {
      const newPlayer = initNewPlayer(action.payload);
      const newAllPlayers = [...state.players, newPlayer];
      return {
        ...state,
        players: newAllPlayers,
        isAllReady: calcAllReady(newAllPlayers)
      };
    }
    case UPDATE_PLAYERS: {
      return {
        ...state,
        players: action.payload,
        isAllReady: calcAllReady(action.payload)
      };
    }
    case REMOVE_PLAYER: {
      const newAllPlayers = state.players.filter(player => player.name !== action.payload);
      return {
        ...state,
        players: newAllPlayers,
        isAllReady: calcAllReady(newAllPlayers)
      };
    }
    default:
      return state;
  }
}

const calcAllReady = allPlayers => allPlayers.every(player => player.isReady);

/**
 * Selectors
 */

export const selectAllPlayers = state => state.playerData.players;

/**
 * Actions and Action creators
 */
// ADD_PLAYER
const ADD_PLAYER = action('ADD_PLAYER');

export const addPlayer = playerInfo => (dispatch, getState) => {
  dispatch({ type: ADD_PLAYER, payload: playerInfo });
  return Promise.resolve(selectAllPlayers(getState()));
};

export const addDummyPlayer = () => (dispatch, getState) => {
  if (selectAllPlayers(getState()).length >= 10) {
    return Promise.resolve(null);
  } else {
    // Export a random dummy name
    const getRandomDummyName = () => {
      const dummyNames = ['BruoMars', 'Hello', '笑笑', '奇葩', '道长'];
      const randomName = dummyNames[Math.floor(Math.random() * dummyNames.length)];
      const randomCount = Math.floor(Math.random() * 1000);
      return `${randomName}-${randomCount}`;
    };
    // Give a random avatar id
    const getRandomAvatarId = () => Math.floor(Math.random() * 12) + 1;
    const dummyName = getRandomDummyName();

    dispatch({
      type: ADD_PLAYER,
      payload: { name: dummyName, avatarId: getRandomAvatarId(), isDummy: true }
    });

    return Promise.resolve(dummyName);
  }
};

// REMOVE_PLAYER
const REMOVE_PLAYER = action('REMOVE_PLAYER');

export const removePlayer = name => ({ type: REMOVE_PLAYER, payload: name });

export const removeDummyPlayer = () => (dispatch, getState) => {
  const allPlayers = selectAllPlayers(getState());
  const firstDummy = _.find(allPlayers, 'isDummy');
  if (firstDummy) {
    const dummyName = firstDummy.name;
    dispatch({ type: REMOVE_PLAYER, payload: dummyName });
    return Promise.resolve(dummyName);
  } else {
    return Promise.resolve(null);
  }
};

// UPDATE_PLAYERS
const UPDATE_PLAYERS = action('UPDATE_PLYAERS');

export const toggleReady = data => (dispatch, getState) => {
  const allPlayers = selectAllPlayers(getState());
  const { isReady, playerName } = data;
  const index = allPlayers.findIndex(player => player.name === playerName);
  const newAllPlayers = [
    ...allPlayers.slice(0, index),
    { ...allPlayers[index], isReady },
    ...allPlayers.slice(index + 1)
  ];
  dispatch({ type: UPDATE_PLAYERS, payload: newAllPlayers });
  return Promise.resolve();
};

export const assignRoles = () => (dispatch, getState) => {
  const allPlayers = selectAllPlayers(getState());
  const shuffledRoles = shuffleArray(GameRoleSetByPlayers[allPlayers.length]);
  const overviewInfo = {
    goodList: GameRoleSetByPlayers[allPlayers.length].filter(role => !role.isEvil).map(role => role.roleName),
    evilList: GameRoleSetByPlayers[allPlayers.length].filter(role => role.isEvil).map(role => role.roleName)
  };
  // Additional information
  const evilPlayers = allPlayers.filter((player, playerIndex) => shuffledRoles[playerIndex].isEvil);
  const merlinKnow = evilPlayers.filter(
    (player, playerIndex) => !shuffledRoles[playerIndex].specialities.includes(Speciality.IS_HIDDEN)
  );
  const evilKnow = evilPlayers.filter(
    (player, playerIndex) => !shuffledRoles[playerIndex].specialities.includes(Speciality.BRAINLESS)
  );
  const percivalKnow = allPlayers.filter((player, playerIndex) =>
    shuffledRoles[playerIndex].specialities.includes(Speciality.HAS_MAGIC)
  );
  // Give additional information to each player
  const shuffledRolesWithKnowns = shuffledRoles.map((role, roleIndex) => {
    if (evilKnow.includes(allPlayers[roleIndex])) {
      // If you are evil, you know your teammates (apart from Oberon)
      return {
        ...role,
        knowPlayers: evilKnow.map(player => player.name).filter(evilName => evilName !== allPlayers[roleIndex].name) // filter yourself
      };
    } else if (role.specialities.includes(Speciality.IS_MERLIN)) {
      // If you are Merlin, you know evil players (apart from Mordred)
      return { ...role, knowPlayers: merlinKnow.map(player => player.name) };
    } else if (role.specialities.includes(Speciality.DETECT_MAGIC)) {
      // If you are Merlin, you know evil players (apart from Mordred)
      return { ...role, knowPlayers: percivalKnow.map(player => player.name) };
    } else {
      return { ...role };
    }
  });

  const newPlayerData = allPlayers.map((playerInfo, index) => ({
    ...playerInfo,
    roleInfo: { ...shuffledRolesWithKnowns[index], overviewInfo }
  }));

  dispatch({ type: UPDATE_PLAYERS, payload: newPlayerData });

  return Promise.resolve(newPlayerData);
};
