import { getRandomDummyName, getRandomAvatarId } from './utils';

// This is global scope
let playerId = 0;
const players = [];

const doesNameExist = name => players.some(player => player.name === name);

const removePlayerIndexByName = name => {
  const index = players.findIndex(player => player.name === name);
  players.splice(index, 1);
};

const allPlayersReady = () => players.every(player => player.isReady);

const socketEmitAll = (socket, eventName, data) => {
  socket.broadcast.emit(eventName, data);
  socket.emit(eventName, data);
};

const socketManager = socket => {
  // This will be scoped to each individual socket(user)
  let playerInfo = undefined;

  socket.on('clientPlayerJoinedGame', data => {
    const { name } = data;
    if (!name.length) {
      /**
       * Join error: Name can't be empty
       */
      socket.emit('serverPlayerJoinedError', {
        error: 'Please enter your nickname'
      });
    } else if (doesNameExist(name)) {
      /**
       * Join error: Name conflict with exist player
       */
      socket.emit('serverPlayerJoinedError', {
        error: 'Nickname already taken in the game'
      });
    } else if (players.length >= 10) {
      /**
       * Join error: Already 10 players in game
       */
      socket.emit('serverPlayerJoinedError', {
        error: 'Too many players in game'
      });
    } else {
      /**
       * Join success: Create new player info
       */
      playerInfo = {
        ...data,
        key: playerId++,
        isReady: false,
        isDummy: false,
        isAdmin: name === 'Admin' || 'Admin-Ming' || name === 'Admin-Naixin'
      };
      players.push(playerInfo);
      /**
       * Emit sockets
       */
      socket.emit('serverPlayerJoinedSuccess', {
        playerInfo,
        players,
        log: {
          message: 'you joined the game',
          type: 'normal'
        }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players,
        log: {
          message: `${name} joined the game`,
          type: 'normal'
        }
      });
    }
  });

  socket.on('clientPlayerToggleReady', () => {
    /**
     * Toggle ready state
     */
    playerInfo.isReady = !playerInfo.isReady;
    /**
     * If all players are ready, check if game can start
     */
    if (playerInfo.isReady && allPlayersReady()) {
      if (players.length < 6) {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          playerInfo,
          players,
          log: {
            message: '6+ players needed to start agame',
            type: 'error'
          }
        });
      } else {
        socketEmitAll(socket, 'serverUpdatePlayers', {
          playerInfo,
          players,
          log: {
            message: 'Starting game in 5',
            type: 'important'
          }
        });
      }
    } else {
      socketEmitAll(socket, 'serverUpdatePlayers', { playerInfo, players });
    }
  });

  socket.on('disconnect', () => {
    if (playerInfo) {
      removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players,
        log: {
          message: `${playerInfo.name} left the game`,
          type: 'normal'
        }
      });
    }
  });

  /**
   * ADMIN FEATURES:
   */
  socket.on('clientAddDummyPlayer', () => {
    const randomName = getRandomDummyName() + `-${playerId++}`;
    const dummyPlayer = {
      key: playerId,
      name: randomName,
      avatarId: getRandomAvatarId(),
      isReady: true,
      isDummy: true
    };
    players.push(dummyPlayer);
    socketEmitAll(socket, 'serverUpdatePlayers', {
      players,
      log: {
        message: `${randomName} joined the game`,
        type: 'normal'
      }
    });
  });

  socket.on('clientRemoveDummyPlayer', () => {
    const DummyIndex = players.findIndex(player => player.isDummy);

    if (DummyIndex >= 0) {
      const DummyName = players[DummyIndex].name;
      removePlayerIndexByName(DummyName);
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players,
        log: {
          message: `${DummyName} left the game`,
          type: 'normal'
        }
      });
    }
  });
};

export default socketManager;
