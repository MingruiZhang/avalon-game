import { createSocketController } from './utils';

// All controllers
import playerJoinGameController from './controllers/playerJoinGame'
import playerToggleReadyController from './controllers/playerToggleReady'
import disconnectController from './controllers/disconnect'
import addDummyPlayerController from './controllers/addDummyPlayer'
import removeDummyPlayerController from './controllers/removeDummyPlayer'


export default socket => {
  // When a player join game
  createSocketController(socket, 'clientPlayerJoinGame', playerJoinGameController);
  // When a player toggles his ready state
  createSocketController(socket, 'clientPlayerToggleReady', playerToggleReadyController);
  // ADMIN FEATURE: Add a fake player to store
  createSocketController(socket, 'clientAddDummyPlayer', addDummyPlayerController)
  // ADMIN FEATURE: Remove a fake player from store
  createSocketController(socket, 'clientRemoveDummyPlayer', removeDummyPlayerController)
  // When a player disconnect from game
  createSocketController(socket, 'disconnect', disconnectController);
};
