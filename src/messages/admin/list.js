import { connectDB } from '../../utils.js';

export default function list(match, message) {
  const group = match[2].toLowerCase().trim();
  const db = connectDB();

  // Disable image preview
  const memes = db[group].map((url, idx) => `**${idx}** <` + url + '>');

  if (memes) {
    message.channel.send(memes.join('\n'));
  } else {
    message.channel.send(`${group} does not exist`);
  }
}
