import { createOnSocketCallBack } from '../utils';

export const onGameUpdateAction = () => {
  return dispatch => {
    createOnSocketCallBack('serverGameUpdate', payload => {
      dispatch({ type: 'GAME_UPDATED', payload });
    });
  };
};
