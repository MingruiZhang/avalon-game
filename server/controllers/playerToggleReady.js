import { socketEmitAll } from '../utils';
// import * as PlayerStore from '../data/player';
// import * as GameStore from '../data/game';

import store from '../redux';
import { assignRoles,toggleReady } from '../redux/playerData';
import { newGameState, gameSetupByPlayers, GameState } from '../redux/gameData';

export const startGameCountDown = socket => {
  let countDown = 1;
  const gameStartCountDown = setInterval(() => {
    const gameState = store.getState().gameData.gameState;
    const allPlayers = store.getState().playerData.players;
    // If someone cancel ready, stop game starting
    if (gameState !== GameState.Starting) {
      clearInterval(gameStartCountDown);
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: allPlayers,
        log: { message: 'Starting game stopped. All players need to be ready', type: 'error' }
      });
    } else {
      // If count downa is 0, game started.
      if (countDown === 0) {
        store.dispatch(newGameState(GameState.Started));
        store.dispatch(assignRoles()).then(newAllPlayers => {
          socketEmitAll(socket, 'serverGameStart', {
            players: newAllPlayers,
            gameSetup: gameSetupByPlayers[newAllPlayers.length]
          });
        });
        clearInterval(gameStartCountDown);
      } else {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          players: allPlayers,
          log: { message: `Starting game in ${countDown--}`, type: 'important' }
        });
      }
    }
  }, 1000);
};

export default function controller(socket, data) {
  const { isReady, playerName } = data;
  // Toggle player ready state
  store.dispatch(toggleReady({ isReady, playerName })).then(() => {
    const { players, isAllReady } = store.getState().playerData;
    // Emit player update socket
    if (isReady) {
      socket.emit('serverUpdatePlayers', {
        players: players,
        log: { message: 'You are ready', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        log: { message: `${playerName} is ready`, type: 'normal' }
      });
    } else {
      socket.emit('serverUpdatePlayers', {
        players: players,
        log: { message: 'You cancelled ready', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: players,
        log: { message: `${playerName} cancelled ready`, type: 'normal' }
      });
    }
    // Start game if everyone is ready
    if (isAllReady) {
      if (players.length < 6 || players.length > 10) {
        // If not enough player, show error message
        socketEmitAll(socket, 'serverUpdatePlayers', {
          players: players,
          log: { message: '6 to 10 players needed to start agame', type: 'error' }
        });
      } else {
        store.dispatch(newGameState(GameState.Starting));
        // If enough player, start game count down
        startGameCountDown(socket);
      }
    } else {
      store.dispatch(newGameState(GameState.Prepare));
    }
  });
}
