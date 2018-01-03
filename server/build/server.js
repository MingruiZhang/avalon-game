'use strict';

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _socketManager = require('./socketManager');

var _socketManager2 = _interopRequireDefault(_socketManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var PORT = process.env.PORT || 3001;

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// any routes not picked up by the server api will be handled by the react router
var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../client/build'));
app.use(staticFiles);
app.use('/*', staticFiles);
app.set('port', PORT);

// Socket.io connection
io.on('connection', _socketManager2.default);

server.listen(PORT, function () {
  console.log('Server listening at port %d', PORT);
});