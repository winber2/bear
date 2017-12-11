import { connectDB } from '../../utils.js';

export default function remove(match, message) {
  const args = match[2].split(' ');
  const group = args[0].toLowerCase().trim();
  const idx = args[1].toLowerCase().trim();
  const db = connectDB();

  if (idx && db[group] && idx < db[group].length) {
    db[group].splice(idx, 1);
    writeDB(db);
  }
}
