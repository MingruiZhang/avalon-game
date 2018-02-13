import { socketEmitAll } from '../utils';
import * as PlayerStore from '../data/player';
import * as GameStore from '../data/game';

export const startGameCountDown = socket => {
  GameStore.gameStarting();
  let countDown = 5;

  const gameStartCountDown = setInterval(() => {
    // If someone cancel ready, stop game starting
    if (!GameStore.isGameStarting()) {
      clearInterval(gameStartCountDown);
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: PlayerStore.allPlayers(),
        log: { message: 'Starting game stopped. All players need to be ready', type: 'error' }
      });
    } else {
      // If count downa is 0, game started.
      if (countDown === 0) {
        GameStore.gameStarted();
        PlayerStore.assignRoles(() => {
          socketEmitAll(socket, 'serverGameStart', {
            players: PlayerStore.allPlayers(),
            gameSetup: GameStore.gameSetupByPlayers[PlayerStore.allPlayers().length]
          });
        });
        clearInterval(gameStartCountDown);
      } else {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          players: PlayerStore.allPlayers(),
          log: { message: `Starting game in ${countDown--}`, type: 'important' }
        });
      }
    }
  }, 1000);
};

export default function controller(socket, data) {
  const { playerInfo } = socket;
  // Toggle player ready state
  playerInfo.isReady = !playerInfo.isReady;
  // Emit player update socket
  if (playerInfo.isReady) {
    socket.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: 'You are ready', type: 'normal' }
    });
    socket.broadcast.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: `${playerInfo.name} is ready`, type: 'normal' }
    });
  } else {
    GameStore.gamePrepare();
    socket.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: 'You cancelled ready', type: 'normal' }
    });
    socket.broadcast.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: `${playerInfo.name} cancelled ready`, type: 'normal' }
    });
  }

  if (playerInfo.isReady && PlayerStore.allPlayersReady()) {
    // If the player is ready
    if (PlayerStore.allPlayers().length < 6 || PlayerStore.allPlayers().length > 10) {
      // If not enough player, show error message
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: PlayerStore.allPlayers(),
        log: { message: '6 to 10 players needed to start agame', type: 'error' }
      });
    } else {
      // If enough player, start game count down
      startGameCountDown(socket);
    }
  }
}
