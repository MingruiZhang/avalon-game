"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shuffleArray = exports.socketEmitAll = exports.createSocketController = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create socket on listener on given event name using given controller
 */
var createSocketController = exports.createSocketController = function createSocketController(socket, eventName, controller) {
  return socket.on(eventName, function (data) {
    return controller(socket, data);
  });
};
/**
 * socket emit to everyone
 */
var socketEmitAll = exports.socketEmitAll = function socketEmitAll(socket, eventName, emitData) {
  socket.broadcast.emit(eventName, emitData);
  socket.emit(eventName, emitData);
};
/**
 * Shuffle array
 */
var shuffleArray = exports.shuffleArray = function shuffleArray(array) {
  // Let keep a copy so we don't change the original array
  var newArray = [].concat((0, _toConsumableArray3.default)(array));
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [newArray[j], newArray[i]];
    newArray[i] = _ref[0];
    newArray[j] = _ref[1];
  }
  return newArray;
};