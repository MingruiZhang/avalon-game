import { socketEmitAll } from './utils';
import * as PlayerStore from './data/player';
import * as GameStore from './data/game';

export const startGameCountDown = socket => {
  GameStore.gameStarting();
  let countDown = 1;

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
        PlayerStore.assignRoles();
        socketEmitAll(socket, 'serverGameStart', {
          players: PlayerStore.allPlayers(),
          gameSetup: GameStore.gameSetupByPlayers[PlayerStore.allPlayers().length]
        });
      } else {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          players: PlayerStore.allPlayers(),
          log: { message: `Starting game in ${countDown--}`, type: 'important' }
        });
      }
    }
  }, 1000);
};

export default socket => {
  // This will be scoped to each individual socket(user)
  let playerInfo = undefined;

  socket.on('clientPlayerJoinedGame', data => {
    const { name } = data;
    if (!name.length) {
      socket.emit('serverPlayerJoinedError', { error: 'Please enter your nickname' });
    } else if (PlayerStore.doesNameExist(name)) {
      socket.emit('serverPlayerJoinedError', { error: 'Nickname already taken in the game' });
    } else if (PlayerStore.allPlayers().length >= 10) {
      socket.emit('serverPlayerJoinedError', { error: 'Too many players in game' });
    } else {
      GameStore.gamePrepare();
      // Create new playerInfo
      playerInfo = PlayerStore.addPlayer(data);

      socket.emit('serverPlayerJoinedSuccess', {
        key: playerInfo.key,
        players: PlayerStore.allPlayers(),
        log: { message: 'You joined the game', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: PlayerStore.allPlayers(),
        log: { message: `${name} joined the game`, type: 'normal' }
      });
    }
  });

  socket.on('clientPlayerToggleReady', () => {
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
  });

  socket.on('disconnect', () => {
    if (playerInfo) {
      PlayerStore.removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players: PlayerStore.allPlayers(),
        log: { message: `${playerInfo.name} left the game`, type: 'normal' }
      });
    }
  });

  /**
   * ADMIN FEATURES:
   */
  socket.on('clientAddDummyPlayer', () => {
    const newDummy = PlayerStore.addDummyPlayer();
    if (newDummy) {
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: PlayerStore.allPlayers(),
        log: {
          message: `${newDummy} joined the game`,
          type: 'normal'
        }
      });
    }
  });

  socket.on('clientRemoveDummyPlayer', () => {
    const removedDummy = PlayerStore.removeDummyPlayer();
    if (removedDummy) {
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: PlayerStore.allPlayers(),
        log: {
          message: `${removedDummy} left the game`,
          type: 'normal'
        }
      });
    }
  });
};
