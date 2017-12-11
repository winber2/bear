import dailyBear from './user/bear.js';
import ava from './user/ava.js';
import add from './admin/add.js';
import list from './admin/list.js';
import remove from './admin/remove.js';
import randomPicture from './user/random.js';

const dailyBearRgx = /^(daily bear)$/i;
const avaRgx = /^(!avatar)(.*)$/i;
const addRgx = /^(!add)(.*)$/i;
const listRgx = /^(!list)(.*)$/i;
const rmRgx = /^(!rm)(.*)$/i;

export default function produce(message) {
  const match = extract(message);
  if (match) {
    const command = match[1].toLowerCase();
    switch (command) {
      case '!avatar':
        ava(match, message);
        break;
      case '!add':
        add(match, message);
        break;
      case '!list':
        list(match, message);
        break;
      case '!rm':
        remove(match, message);
        break;
      case 'daily bear':
        dailyBear(message);
        break;
    }
  } else {
    randomPicture(message);
  }
}

function extract({ content }) {
  return (
    content.match(dailyBearRgx) ||
    content.match(avaRgx) ||
    content.match(addRgx) ||
    content.match(listRgx) ||
    content.match(rmRgx)
  )
}
