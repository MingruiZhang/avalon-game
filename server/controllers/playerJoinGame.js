import * as GameStore from '../data/game';

import store from '../redux';
import { addPlayer } from '../redux/playerData';

export default function controller(socket, data) {
  const { name } = data;
  const allPlayers = store.getState().playerData.players;
  if (!name.length) {
    socket.emit('serverPlayerJoinedError', { error: 'Please enter your nickname' });
  } else if (allPlayers.find(player => player.name === name)) {
    socket.emit('serverPlayerJoinedError', { error: 'Nickname already taken in the game' });
  } else if (allPlayers.length >= 10) {
    socket.emit('serverPlayerJoinedError', { error: 'Too many players in game' });
  } else if (GameStore.isGameStarted()) {
    socket.emit('serverPlayerJoinedError', { error: 'A game have already started' });
  } else {
    GameStore.gamePrepare();
    store.dispatch(addPlayer(data)).then(newAllPlayers => {
      socket.emit('serverPlayerJoinedSuccess', {
        key: name,
        players: newAllPlayers,
        log: { message: 'You joined the game', type: 'normal' }
      });
      socket.broadcast.emit('serverUpdatePlayers', {
        players: newAllPlayers,
        log: { message: `${name} joined the game`, type: 'normal' }
      });
    });
  }
}
