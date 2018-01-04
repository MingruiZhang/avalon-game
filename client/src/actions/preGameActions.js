import { createOnSocketCallBack, createEmitSocket } from '../utils';

export const joinGameAction = data => {
  return dispatch => {
    createOnSocketCallBack('serverPlayerJoinedSuccess', payload => {
      dispatch({ type: 'JOIN_GAME_SUCCESS', payload });
    });
    createOnSocketCallBack('serverPlayerJoinedError', payload => {
      dispatch({ type: 'JOIN_GAME_ERROR', payload });
    });
    createEmitSocket('clientPlayerJoinedGame', data);
  };
};

export const onPlayersUpdateAction = () => {
  return dispatch => {
    createOnSocketCallBack('serverUpdatePlayers', payload => {
      dispatch({ type: 'PLAYERS_UPDATED', payload });
    });
  };
};

export const toggledReadyStateAction = () => {
  return dispatch => {
    createEmitSocket('clientPlayerToggleReady');
    dispatch({ type: 'TOGGLE_READY_STATE' });
  };
};
