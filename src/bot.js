import Discord from 'discord.js';
import Logger from 'logger';
import { produce } from './messages/messages.js';

const logger = Logger.createLogger('./dev.log');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});

client.on('message', autism => produce(autism));

client.login('Mzg5MDEzNDYyNzM2NDM3MjQ5.DQ3dew.9NVs94BVEBzK107Wst09I5RnoU8');
