import axios from 'axios';
import fs from 'fs';

export default function add(match, message) {
  const args = match[2].trim().split(' ');
  const group = args[0];
  const data = args.slice(1);

  // Using json file as database because I am fucking lazy and
  // why would I even need a real database for this shit anyways
  const db = JSON.parse(fs.readFileSync(process.env.DATABASE_DIR));
  // const db = require(process.env.DATABASE_DIR)
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
            // success callback
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
      goodURLs.forEach(url => db[group].push(url));
      fs.writeFileSync(process.env.DATABASE_DIR, JSON.stringify(db), err => console.log(err));

      const warning = hasDuplicates ? '' : ', duplicates were discarded';
      message.channel.send(`Saved all sources to ${group}${warning}`);
    }, () => {
      const error = badURLs.length > 1 ? 'are not valid' : 'is not a valid';
      message.channel.send(`${badURLs.join(', ')} ${error} URLs`);
    })
  } else {
    message.channel.send(`Group ${group} does not exist`);
  }
}
