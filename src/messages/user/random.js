import { connectDB, random } from '../../utils.js';

export default function randomPicture(message) {
  if (message.author.id === process.env.BEAR_ID) {
    return;
  }

  const db = connectDB();
  const { groups } = db;

  groups.forEach(group => {
    const rgx = new RegExp("\\b" + group + "\\b");
    if (rgx.test(message.content)) {
      const ostensibleAnimePicture = random(db[group]);
      message.channel.send('', {
        files: [ ostensibleAnimePicture ]
      })
    }
  });
}
