let playerId = 0;
const players = [];

const doesNameExist = name =>
  players.some(player => {
    player.name === name;
  });

const removePlayerIndexByName = name => {
  const index = players.findIndex(player => player.name === name);
  players.splice(index, 1);
};

const socketManager = socket => {
  let playerInfo = undefined;

  socket.on('clientPlayerJoined', data => {
    const { name } = data;
    if (doesNameExist(name)) {
      console.log(`client player ${name} have name conflict`);

      socket.emit('serverPlayerJoinedError', { error: 'This name already exists in the game.' });
    } else {
      console.log(`client player ${name} have joined the game`);

      playerInfo = { ...data, id: playerId++ };
      players.push(playerInfo);

      socket.emit('serverPlayerJoinedSuccess', {
        playerInfo,
        players,
        message: `you have joined the game`
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players,
        message: `player ${name} have joined the game`
      });
    }
  });

  socket.on('disconnect', () => {
    if (playerInfo) {
      console.log(`client player ${playerInfo.name} have left the game`);

      removePlayerIndexByName(playerInfo.name);

      socket.broadcast.emit('serverUpdatePlayers', {
        players,
        message: `player ${playerInfo.name} have left the game`
      });
    }
  });
};

export default socketManager;
