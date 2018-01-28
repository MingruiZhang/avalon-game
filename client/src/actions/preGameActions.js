import { createOnSocketCallBack } from '../utils';

export const onJoinGameAction = data => {
  return dispatch => {
    createOnSocketCallBack('serverPlayerJoinedSuccess', payload => {
      dispatch({ type: 'JOIN_GAME_SUCCESS', payload });
    });
    createOnSocketCallBack('serverPlayerJoinedError', payload => {
      dispatch({ type: 'JOIN_GAME_ERROR', payload });
    });
  };
};

export const onPlayersUpdateAction = () => {
  return dispatch => {
    createOnSocketCallBack('serverUpdatePlayers', payload => {
      dispatch({ type: 'PLAYERS_UPDATED', payload });
    });
  };
};

export const onGameStartAction = () => {
  return dispatch => {
    createOnSocketCallBack('serverGameStart', payload => {
      dispatch({ type: 'GAME_STARTED', payload });
    });
  };
};
