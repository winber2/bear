import fs from 'fs';

// Using json file as database because I am fucking lazy and
// why would I even need a real database for this shit anyways
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

export function isAdmin(message) {
  const db = connectDB();
  return isSuperAdmin(message) || db.admins[message.author.id] || false;
}

export function isSuperAdmin(message) {
  const db = connectDB();
  return (
    message.author.id === process.env.SUPERADMIN ||
    message.author.id === process.env.BEAR_ID
  )
}
