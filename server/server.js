import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

console.log('process.env.PORT: ', process.env.PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// any routes not picked up by the server api will be handled by the react router
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);
app.set('port', PORT);

// Socket.io connection
io.on('connection', client => {
  client.on('subscribeToTimer', interval => {
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});

server.listen(PORT, function() {
  console.log('Server listening at port %d', PORT);
});
