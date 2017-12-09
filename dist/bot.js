'use strict';

var _discord = require('discord.js');

var _discord2 = _interopRequireDefault(_discord);

var _logger = require('logger');

var _logger2 = _interopRequireDefault(_logger);

var _give = require('./give.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _logger2.default.createLogger('./dev.log');
var client = new _discord2.default.Client();

client.on('ready', function () {
  console.log('I am ready!');
});

client.on('message', function (autism) {
  return (0, _give.produce)(autism);
});

client.login('Mzg5MDEzNDYyNzM2NDM3MjQ5.DQ3dew.9NVs94BVEBzK107Wst09I5RnoU8');