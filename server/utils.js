export const socketEmitAll = (socket, eventName, data) => {
  socket.broadcast.emit(eventName, data);
  socket.emit(eventName, data);
};

export const shuffleArray = array => {
  // Let keep a copy so we don't change the original array
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
