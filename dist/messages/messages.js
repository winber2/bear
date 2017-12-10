'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.produce = produce;

var _give = require('./give.js');

var pingRgx = /^(!ping)$/;
var giveRgx = /^(give)(.*)$/i;

function produce(message) {
  var match = extract(message);
  if (!match) return;

  var command = match[1].toLowerCase();
  switch (command) {
    case '!ping':
      message.channel.send('I am alive');
      break;
    case 'give':
      (0, _give.give)(match, message);
      break;
  }
}

function extract(message) {
  return message.content.match(pingRgx) || message.content.match(giveRgx);
}