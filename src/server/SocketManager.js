import server from './server';
const io = server.io;

module.exports = function(socket) {
  io.on('connection', client => {
    client.on('subscribeToTimer', interval => {
      console.log('client is subscribing to timer with interval ', interval);
    });
  });
};
