export default function dailyBear(message) {
  message.channel.send('', {
    files: [ process.env.DAILY_BEAR ]
  })
}
