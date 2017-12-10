import dailyBear from './bear.js';
import give from './give.js';
import add from './add.js';

const dailyBearRgx = /^(daily bear)$/i;
const giveRgx = /^(give)(.*)$/i;
const addRgx = /^(add)(.*)$/i;
const pingRgx = /^(!ping)$/;

export default function produce(message) {
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
    case 'add':
      add(match, message);
      break;
    case 'daily bear':
      dailyBear(message);
      break;
    default:
      return;
  }
}

function extract(message) {
  return (
    message.content.match(pingRgx) ||
    message.content.match(giveRgx) ||
    message.content.match(dailyBearRgx) ||
    message.content.match(addRgx)
  )
}
