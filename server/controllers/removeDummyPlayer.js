import { socketEmitAll } from '../utils';
import * as PlayerStore from '../data/player';

// ADMIN FEATURE
export default function controller(socket, data) {
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
}
