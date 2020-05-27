import Discord from 'discord.js'
require('dotenv').config()

const bot = new Discord.Client()

bot.on('message', async (message) => {
  if (message.author.bot) return // Bot user
  if (!message.content.startsWith('~!')) return // Command prefix
  if (message.content.length <= 2) return // Prefix only

  const msg = message.content.substring(2).trim()
  const cmd = msg.split(' ')[0]

  // Add commands here
  switch (cmd) {
    case 'info':
      require('./commands/info').exec(bot, message)
      break
    case 'invite':
      message.channel.send('**Invite Link**: https://lyrics-finder.angeloanan.xyz/invite')
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
  if (bot.user == null) return
  console.log('---')
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator}`)
  console.log(`Serving ${bot.users.cache.size - 1} users in ${bot.guilds.cache.size} guilds`)
  console.log(`Admin invite link: ${await bot.generateInvite(['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'])}`)
  console.log('---')
})

bot.on('presenceUpdate', (_, presence) => {
  require('./events/presenceUpdate').onPresenceUpdate(bot, presence)
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
