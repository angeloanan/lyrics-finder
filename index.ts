import Discord from 'discord.js'
require('dotenv').config()

const bot = new Discord.Client()

bot.on('message', async (message) => {
  if (message.author.bot) return // Bot user
  if (message.cleanContent.startsWith('@Lyrics Finder')) return message.channel.send('Mentions are not supported anymore!\nThe bot\'s prefix is now `~!`. Try `~!help`!')
  if (!message.content.startsWith('~!')) return // Command prefix
  if (message.content.length <= 2) return // Prefix only

  // If message starts with a mention. Delete this after some time

  const msg = message.content.substring(2).trim()
  const cmd = msg.split(' ')[0]

  // Add commands here
  switch (cmd) {
    case 'info':
    case 'status':
      require('./commands/info').exec(bot, message)
      break
    case 'invite':
      message.channel.send('**Invite Link**: https://lyrics-finder.angeloanan.xyz')
      break
    case 'help':
      require('./commands/help').exec(bot, message)
      break
    case 's':
    case 'search':
    case 'lyrics':
      require('./commands/search').search(bot, message)
      break
    case 'np':
    case 'nowplaying':
      require('./commands/search').nowPlaying(bot, message)
      break
    case 'autosearch':
    case 'auto':
      require('./commands/autosearch').exec(bot, message)
      break
    case 'support':
      message.channel.send('**Support the bot (and the creator) here**: https://lyrics-finder.angeloanan.xyz/support')
      break
  }
})

/*
  Events below should have a handler on ./events
*/
bot.on('guildCreate', async (guild) => {
  require('./events/guildCountUpdate').handle(bot, guild)
})

bot.on('guildDelete', async (guild) => {
  require('./events/guildCountUpdate').handle(bot, guild)
})

bot.on('ready', async () => {
  require('./events/ready').handle(bot)
})

bot.on('presenceUpdate', (_, presence) => {
  require('./events/presenceUpdate').onPresenceUpdate(bot, presence)
})

bot.on('error', (err) => {
  console.log('Bot Error', err)
  bot.destroy()
  process.exit(1)
})

process.on('SIGINT', () => {
  console.log('SIGINT Detected')
  bot.destroy()
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('SIGTERM Detected')
  bot.destroy()
  process.exit(0)
})

bot.login(process.env.BOT_TOKEN)
