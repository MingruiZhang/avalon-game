// This is global scope
let playerId = 0;
const players = [];

const doesNameExist = name => players.some(player => player.name === name);

const removePlayerIndexByName = name => {
  const index = players.findIndex(player => player.name === name);
  players.splice(index, 1);
};

const socketManager = socket => {
  // This will be scoped to each individual socket(user)
  let playerInfo = undefined;

  socket.on('clientPlayerJoinedGame', data => {
    const { name } = data;
    if (!name.length) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Please enter your nickname'
      });
    } else if (doesNameExist(name)) {
      socket.emit('serverPlayerJoinedError', {
        error: 'Nickname already taken in the game'
      });
    } else {
      playerInfo = { ...data, playerId: playerId++, isReady: false };
      players.push(playerInfo);

      socket.emit('serverPlayerJoinedSuccess', {
        playerInfo,
        players,
        message: `you joined the game`
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players,
        message: `${name} joined the game`
      });
    }
  });

  socket.on('clientPlayerToggleReady', () => {
    playerInfo.isReady = !playerInfo.isReady;

    socket.broadcast.emit('serverUpdatePlayers', {
      playerInfo,
      players
    });
    socket.emit('serverUpdatePlayers', {
      playerInfo,
      players
    });
  });

  socket.on('disconnect', () => {
    if (playerInfo) {
      removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players,
        message: `${playerInfo.name} left the game`
      });
    }
  });
};

export default socketManager;
