import axios from 'axios';
import fs from 'fs';
import { connectDB, writeDB, isAdmin, isSuperAdmin } from '../../utils.js';

export default function add(match, message) {
  if (!isAdmin(message)) return;

  const args = match[2].trim().split(' ');
  const input = args[0];
  const data = args.slice(1);

  switch (input) {
    case 'group':
      createGroup(data[0].toLowerCase(), message);
      break;
    case 'admin':
      addAdmin(message);
      break;
    default:
      addToGroup(input, data, message);
  }
}

// add new admin user
function addAdmin(message) {
  const db = connectDB();
  message.mentions.users.forEach(user => {
    db.admins[user.id] = true;
  })
  writeDB(db);
}

// Create new collection of pictures
function createGroup(group, message) {
  const db = connectDB();

  // Check if group can be created
  if (db.groups.includes(group)) {
    message.channel.send(`${group} already exists`);
    return;
  } else if (db.keywords.includes(group)) {
    message.channel.send(`${group} is a keyword`);
    return;
  }

  db.groups.push(group);
  db[group] = [];

  writeDB(db);
  message.channel.send(`Group ${group} created`)
}

function addToGroup(group, data, message) {
  const db = connectDB();
  const { groups: validGroups } = db;

  const goodURLs = [];
  const badURLs = [];
  let hasDuplicates = false;

  if (validGroups.includes(group.toLowerCase())) {
    const requests = [];
    data.forEach(url => {
      requests.push(
        // axios.all requires each request to be an isolated promise, otherwise
        // the success callback will always be run
        new Promise((resolve, reject) =>
          axios.get(url).then(
            // check if URL is valid
            () => {
              if (db[group].includes(url)) hasDuplicates = true;
              resolve(goodURLs.push(url));
            },

            // error callback
            () => reject(badURLs.push(url))
          )
        )
      );
    });

    axios.all(requests).then(() => {
      // modify .json database
      goodURLs.forEach(url => db[group].push(url));
      writeDB(db);

      const warning = hasDuplicates ? ', duplicates were discarded' : '';
      message.channel.send(`Saved all sources to ${group}${warning}`);
    }, () => {
      const error = badURLs.length > 1 ? 'are not valid' : 'is not a valid';
      message.channel.send(`${badURLs.join(', ')} ${error} URLs`);
    })
  } else {
    message.channel.send(`Group ${group} does not exist`);
  }
}
