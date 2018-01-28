const GAME_STATE = Object.freeze({
  PREPARE: 0,
  STARTING: 1,
  STARTED: 2
});

let GAME = GAME_STATE.PREPARE; // Indicate which state current game is

export const isGameStarting = () => GAME === GAME_STATE.STARTING;
export const isGameStarted = () => GAME === GAME_STATE.STARTED;

export const gameStarting = () => (GAME = GAME_STATE.STARTING);
export const gameStarted = () => (GAME = GAME_STATE.STARTED);
export const gamePrepare = () => (GAME = GAME_STATE.PREPARE);

export const gameSetupByPlayers = {
  6: { rounds: [2, 3, 4, 3, 4], specialRound4: false },
  7: { rounds: [2, 3, 3, 4, 4], specialRound4: true },
  8: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  9: { rounds: [3, 4, 4, 5, 5], specialRound4: true },
  10: { rounds: [3, 4, 4, 5, 5], specialRound4: true }
};
