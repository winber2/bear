// Most important function of the bot
export default function dailyBear(message) {
  message.channel.send('', {
    files: [ process.env.DAILY_BEAR ]
  })
}
