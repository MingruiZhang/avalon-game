// ADMIN FEATURE
import { socketEmitAll } from '../utils';

import store from '../redux';
import { addDummyPlayer } from '../redux/playerData';

export default function controller(socket) {
  store.dispatch(addDummyPlayer()).then(dummyName => {
    if (dummyName) {
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: store.getState().playerData.players,
        log: {
          message: `${dummyName} joined the game`,
          type: 'normal'
        }
      });
    }
  });
}
