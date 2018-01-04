import io from 'socket.io-client';

export const isDevEnv =
  process.env.NODE_ENV && process.env.NODE_ENV === 'development';

/*
 * Socket related util functions
 */
const socket = isDevEnv ? io('http://localhost:3001') : io();

export const createOnSocketCallBack = (eventName, cb) => {
  socket.on(eventName, payload => cb(payload));
};

export const createEmitSocket = (eventName, data) => {
  socket.emit(eventName, data);
};
/*
 * Avatars are stored locally, util function to its path
 */
export const fetchAvatar = avatarId =>
  require(`./assets/avatars/avatar${avatarId}.png`);
