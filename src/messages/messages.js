import { give } from './give.js';

const pingRgx = /^(!ping)$/;
const giveRgx = /^(give)(.*)$/i;

export function produce(message) {
  const match = extract(message);
  if (!match) return;

  const command = match[1].toLowerCase();
  switch (command) {
    case '!ping':
      message.channel.send('I am alive');
      break;
    case 'give':
      give(match, message);
      break;
  }
}

function extract(message) {
  return (
    message.content.match(pingRgx) ||
    message.content.match(giveRgx)
  )
}
