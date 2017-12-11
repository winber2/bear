import { connectDB, isAdmin, writeDB } from '../../utils.js';

export default function remove(match, message) {
  if (!isAdmin(message)) return;

  const args = match[2].trim().split(' ');
  const group = args[0].toLowerCase();
  const idx = args[1].toLowerCase().trim();
  const db = connectDB();

  if (idx && db[group] && idx < db[group].length) {
    message.channel.send(`Removed ${db[group][idx]}`);
    db[group].splice(idx, 1);
    writeDB(db);
  }
}
