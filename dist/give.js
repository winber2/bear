'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.produce = produce;
var giveRgx = /^(give)(.*)$/i;

function produce(message) {
  var match = extract(message);
  if (!match) return;

  var command = match[1].toLowerCase();
  var args = match[2].trim().split(' ');
  switch (command) {
    case 'give':
      give(args, message);
  }
}

function extract(message) {
  return message.content.match(giveRgx);
}

function give(args, message) {
  var userStr = args[0];
  var user = message.guild.members.find(function (member) {
    return member.displayName.toLowerCase() === userStr.toLowerCase();
  });
  if (!user) {
    message.channel.send(userStr + ' does not exist');
  } else {
    message.channel.send('', {
      files: [createAvatarURL(user.user)]
    });
  }
}

function createAvatarURL(_ref) {
  var id = _ref.id,
      avatar = _ref.avatar;

  return 'https://cdn.discordapp.com/avatars/' + id + '/' + avatar + '.png';
}