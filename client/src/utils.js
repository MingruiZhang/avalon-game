import io from 'socket.io-client';

/**
 * Check if you are dev or prod env
 */
export const isDevEnv = process.env.NODE_ENV && process.env.NODE_ENV === 'development';

/**
 * Socket related util functions
 */
export const socket = isDevEnv ? io('http://localhost:3001') : io();

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
    if (dict[key] > 1) {
      result.push(`${key} × ${dict[key]}`);
    } else {
      result.push(key);
    }
  }
  return result.join(', ');
};
