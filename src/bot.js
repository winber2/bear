import Discord from 'discord.js';
import { produce } from './messages/messages.js';
require('dotenv').config();

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', autism => produce(autism));

client.login(process.env.TOKEN);
