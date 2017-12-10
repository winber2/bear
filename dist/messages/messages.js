'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = produce;

var _bear = require('./bear.js');

var _bear2 = _interopRequireDefault(_bear);

var _give = require('./give.js');

var _give2 = _interopRequireDefault(_give);

var _add = require('./add.js');

var _add2 = _interopRequireDefault(_add);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dailyBearRgx = /^(daily bear)$/i;
var giveRgx = /^(give)(.*)$/i;
var addRgx = /^(add)(.*)$/i;
var pingRgx = /^(!ping)$/;

function produce(message) {
  var match = extract(message);
  if (!match) return;

  var command = match[1].toLowerCase();
  switch (command) {
    case '!ping':
      message.channel.send('I am alive');
      break;
    case 'give':
      (0, _give2.default)(match, message);
      break;
    case 'add':
      (0, _add2.default)(match, message);
      break;
    case 'daily bear':
      (0, _bear2.default)(message);
      break;
    default:
      return;
  }
}

function extract(message) {
  return message.content.match(pingRgx) || message.content.match(giveRgx) || message.content.match(dailyBearRgx) || message.content.match(addRgx);
}