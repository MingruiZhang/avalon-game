import { socketEmitAll } from '../utils';
import * as PlayerStore from '../data/player';

// ADMIN FEATURE
export default function controller(socket, data) {
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
}
