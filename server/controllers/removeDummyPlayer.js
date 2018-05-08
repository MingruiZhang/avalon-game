// ADMIN FEATURE
import { socketEmitAll } from '../utils';

import store from '../redux';
import { removeDummyPlayer } from '../redux/playerData';

export default function controller(socket) {
  store.dispatch(removeDummyPlayer()).then(dummyName => {
    if (dummyName) {
      socketEmitAll(socket, 'serverUpdatePlayers', {
        players: store.getState().playerData.players,
        log: {
          message: `${dummyName} left the game`,
          type: 'normal'
        }
      });
    }
  });
}
