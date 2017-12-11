import fs from 'fs';

export function connectDB() {
  return JSON.parse(fs.readFileSync(process.env.DATABASE_DIR));
}

export function writeDB(db) {
  fs.writeFileSync(
    process.env.DATABASE_DIR,
    JSON.stringify(db),
    err => console.log(err)
  );
}

export function random(array) {
  return array[ Math.floor(Math.random() * array.length) ];
}
