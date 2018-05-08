import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import socketManager from './socketManager';

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// any routes not picked up by the server api will be handled by the react router
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);
app.set('port', PORT);

// Socket.io connection
io.on('connection', socketManager);

/* eslint-disable no-console */
server.listen(PORT, function() {
  console.log('Server listening at port %d', PORT);
});
/* eslint-enable no-console */
