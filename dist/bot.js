'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _index = require('./messages/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var client = new _discord2.default.Client();

client.on('ready', function () {
  console.log('I am ready!');
});

client.on('message', function (autism) {
  return (0, _index2.default)(autism);
});

client.login(process.env.TOKEN);