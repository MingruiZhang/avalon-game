import io from 'socket.io-client';

/**
 * Check if you are dev or prod env
 */
export const isDevEnv = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

/**
 * Socket related util functions
 */
const socket = isDevEnv ? io('http://localhost:3001') : io();

export const createOnSocketCallBack = (eventName, cb) => {
  socket.on(eventName, payload => cb(payload));
};

export const createEmitSocket = (eventName, data) => {
  socket.emit(eventName, data);
};

/**
 * Avatars are stored locally, util function to its path
 */
export const fetchAvatar = avatarId => require(`./assets/avatars/avatar${avatarId}.png`);

/**
 * Deduplicate an array and join it
 * [A, B, C, C, C] => 'A, B, C × 3'
 */
export const deduplicateJoinArray = array => {
  const dict = {};
  const result = [];
  for (const el of array) {
    if (!dict[el]) {
      dict[el] = 1;
    } else {
      dict[el]++;
    }
  }
  for (const key in dict) {
    console.log('key: ', key);
    if (dict[key] > 1) {
      result.push(`${key} × ${dict[key]}`);
    } else {
      result.push(key);
    }
  }
  console.log('result: ', result);
  return result.join(', ');
};
