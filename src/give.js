const giveRgx = /^(give)(.*)$/i;

export function produce(message) {
  const match = extract(message);
  if (!match) return;

  const command = match[1].toLowerCase();
  const args = match[2].trim().split(' ');
  switch (command) {
    case 'give':
      give(args, message)
  }
}

function extract(message) {
  return (
    message.content.match(giveRgx)
  )
}

function give(args, message) {
  const userStr = args[0];
  const user = message.guild.members.find(member => member.displayName.toLowerCase() === userStr.toLowerCase());
  if (!user) {
    message.channel.send(`${userStr} does not exist`);
  } else {
    message.channel.send('', {
      files: [ createAvatarURL(user.user) ]
    });
  }
}

function createAvatarURL({ id, avatar }) {
  return `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
}
