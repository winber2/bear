export default function give(match, message) {
  const args = match[2].trim().split(' ');
  const command = args[0].toLowerCase();
  const remainingArgs = args.slice(1);

  switch (command) {
    case 'ava':
      giveAvatar(remainingArgs, message);
      break;
    case 'bear':
      giveBear(message);
      break;
    default:
      return;
  }
}

function giveBear(message) {

}

function giveAvatar(args, message) {
  const users = [];
  message.mentions.users.forEach(user => users.push(user));
  args.forEach(user => {
    if (!user || !/^\w/.test(user[0])) return;
    users.push(user);
  })

  const ghosts = [];
  const losers = [];

  users.forEach(arg => {
    let user, userStr;
    if (typeof(arg) === 'string') {
      userStr = arg;
      const member = message.guild.members.find(member =>
        member.displayName.toLowerCase() === userStr.toLowerCase()
      );

      // Discord returns a member object which has basic 'user' properties nested inside
      user = member ? member.user : null;
    } else {
      user = arg;
      userStr = arg.username;
    }

    if (!user) {
      ghosts.push(userStr);
    } else {
      const { avatar, username, id } = user;
      if (!avatar) {
        losers.push(username);
        return;
      }
      message.channel.send('', {
        files: [ createAvatarURL({ id, avatar }) ]
      });
    }
  });

  const ghostMessage = createErrorMessage(ghosts, 'exist');
  const loserMessage = createErrorMessage(
    losers,
    `have an avatar. Fucking ${losers.length > 1 ? 'losers' : 'loser'}.`
  );

  if (ghostMessage) message.channel.send(ghostMessage);
  if (loserMessage) message.channel.send(loserMessage);
}

function createErrorMessage(users, verb) {
  let response = '';
  if (users.lenth > 2) {
    users.forEach((user, idx) => {
      if (idx !== 0) reponse + ', ';
      if (idx === users.length) response + 'and';
      reponse += user;
    })
  } else if (users.length === 2) {
    response = users.join(' and ');
  } else if (users.length === 1){
    response = users[0];
  }

  if (response) return(
    `${response} ${users.length > 1 ? 'do' : 'does'} not ${verb}`
  );
}

function createAvatarURL({ id, avatar }) {
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
}
