
/**
 * Create socket on listener on given event name using given controller
 */
export const createSocketController = (socket, eventName, controller) => {
  return socket.on(eventName, data => controller(socket, data));
}
/**
 * socket emit to everyone
 */
export const socketEmitAll = (socket, eventName, emitData) => {
  socket.broadcast.emit(eventName, emitData);
  socket.emit(eventName, emitData);
};
/**
 * Shuffle array
 */
export const shuffleArray = array => {
  // Let keep a copy so we don't change the original array
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
