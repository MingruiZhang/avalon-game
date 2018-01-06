'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Export a random dummy name
var getRandomDummyName = exports.getRandomDummyName = function getRandomDummyName() {
  var dummyNames = ['Percival', 'H', '☺', '梅林', '莫德雷德'];
  return dummyNames[Math.floor(Math.random() * dummyNames.length)];
};

var getRandomAvatarId = exports.getRandomAvatarId = function getRandomAvatarId() {
  return Math.floor(Math.random() * 12) + 1;
};