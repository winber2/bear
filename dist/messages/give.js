'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = give;

var _utils = require('../utils.js');

function give(match, message) {
  var args = match[2].trim().split(' ');
  var input = args[0].toLowerCase();
  var remainingArgs = args.slice(1);

  switch (input) {
    case 'ava':
      giveAvatar(remainingArgs, message);
      break;
    default:
      givePicture(input, message);
      return;
  }
}

function givePicture(group, message) {
  var db = (0, _utils.connectDB)();
  var ostensibleAnimePictures = db[group];

  if (ostensibleAnimePictures) {
    message.channel.send('', {
      files: [(0, _utils.random)(ostensibleAnimePictures)]
    });
  }
}

function giveAvatar(args, message) {
  var users = [];
  message.mentions.users.forEach(function (user) {
    return users.push(user);
  });
  args.forEach(function (user) {
    if (!user || !/^\w/.test(user[0])) return;
    users.push(user);
  });

  var ghosts = [];
  var losers = [];

  users.forEach(function (arg) {
    var user = void 0,
        userStr = void 0;
    if (typeof arg === 'string') {
      userStr = arg;
      var member = message.guild.members.find(function (member) {
        return member.displayName.toLowerCase() === userStr.toLowerCase();
      });

      // Discord returns a member object which has basic 'user' properties nested inside
      user = member ? member.user : null;
    } else {
      user = arg;
      userStr = arg.username;
    }

    if (!user) {
      ghosts.push(userStr);
    } else {
      var _user = user,
          avatar = _user.avatar,
          username = _user.username,
          id = _user.id;

      if (!avatar) {
        losers.push(username);
        return;
      }
      message.channel.send('', {
        files: [createAvatarURL({ id: id, avatar: avatar })]
      });
    }
  });

  var ghostMessage = createErrorMessage(ghosts, 'exist');
  var loserMessage = createErrorMessage(losers, 'have an avatar. Fucking ' + (losers.length > 1 ? 'losers' : 'loser') + '.');

  if (ghostMessage) message.channel.send(ghostMessage);
  if (loserMessage) message.channel.send(loserMessage);
}

function createErrorMessage(users, verb) {
  var response = '';
  if (users.lenth > 2) {
    users.forEach(function (user, idx) {
      if (idx !== 0) reponse + ', ';
      if (idx === users.length) response + 'and';
      reponse += user;
    });
  } else if (users.length === 2) {
    response = users.join(' and ');
  } else if (users.length === 1) {
    response = users[0];
  }

  if (response) return response + ' ' + (users.length > 1 ? 'do' : 'does') + ' not ' + verb;
}

function createAvatarURL(_ref) {
  var id = _ref.id,
      avatar = _ref.avatar;

  return 'https://cdn.discordapp.com/avatars/' + id + '/' + avatar + '.png';
}