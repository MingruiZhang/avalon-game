import socket from '../socket';

export const joinGameAction = playerData => {
  return dispatch => {
    socket.on('serverPlayerJoinedSuccess', payload => {
      dispatch({ type: 'JOIN_GAME_SUCCESS', payload });
    });
    socket.on('serverPlayerJoinedError', payload => {
      dispatch({ type: 'JOIN_GAME_ERROR', payload });
    });
    socket.emit('clientPlayerJoined', playerData);
  };
};

export const onPlayersUpdateAction = () => {
  return dispatch => {
    socket.on('serverUpdatePlayers', payload => {
      dispatch({ type: 'PLAYERS_UPDATED', payload });
    });
  };
};
