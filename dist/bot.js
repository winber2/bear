'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _messages = require('./messages/messages.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var client = new _discord2.default.Client();

client.on('ready', function () {
  console.log('I am ready!');
});

client.on('message', function (autism) {
  return (0, _messages.produce)(autism);
});

client.login(process.env.TOKEN);