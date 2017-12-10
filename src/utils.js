import fs from 'fs';

export function connectDB() {
  return JSON.parse(fs.readFileSync(process.env.DATABASE_DIR));
}

export function random(array) {
  return array[ Math.floor(Math.random() * array.length) ];
}
