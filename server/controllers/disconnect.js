import { socketEmitAll } from '../utils';
import * as PlayerStore from '../data/player';
import * as GameStore from '../data/game';

const tooLessPlayers  = () => PlayerStore.allPlayers().length < 4;
const noRealPlayer = () => PlayerStore.allPlayers().findIndex(player => player.isDummy) >= 0;

export default function controller(socket) {
  const { playerInfo } = socket;
  if (playerInfo) {
    PlayerStore.removePlayerIndexByName(playerInfo.name);

    socket.broadcast.emit('serverUpdatePlayers', {
      players: PlayerStore.allPlayers(),
      log: { message: `${playerInfo.name} left the game`, type: 'normal' }
    });
  }

  if (tooLessPlayers() || noRealPlayer()) {
    GameStore.gamePrepare();
    socketEmitAll(socket, 'serverGameEnd', {
      players: []
    });
  }
}
