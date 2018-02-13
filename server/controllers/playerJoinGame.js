import * as PlayerStore from '../data/player';
import * as GameStore from '../data/game';

export default function controller(socket, data) {
  const { name } = data;
  if (!name.length) {
    socket.emit('serverPlayerJoinedError', { error: 'Please enter your nickname' });
  } else if (PlayerStore.doesNameExist(name)) {
    socket.emit('serverPlayerJoinedError', { error: 'Nickname already taken in the game' });
  } else if (PlayerStore.allPlayers().length >= 10) {
    socket.emit('serverPlayerJoinedError', { error: 'Too many players in game' });
  } else if (GameStore.isGameStarted()) {
    socket.emit('serverPlayerJoinedError', { error: 'A game have already started' });
  } else {
    GameStore.gamePrepare();
    // Create new playerInfo
    const newPlayer = PlayerStore.addPlayer(data);

    socket.emit('serverPlayerJoinedSuccess', {
      key: newPlayer.key,
      players: PlayerStore.allPlayers(),
      log: { message: 'You joined the game', type: 'normal' }
    });
    socket.broadcast.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: `${name} joined the game`, type: 'normal' }
    });

    socket.playerInfo = newPlayer;
  }
};
