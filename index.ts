import 'dotenv/config'

import Discord from 'discord.js'
import { DiscordClient } from './src/types/DiscordClient'
import { PrivacyPolicyEmbed } from './src/constants/embeds'
import { clientOpts } from './config'
import logger from './src/utils/logger'

const bot = new Discord.Client(clientOpts) as DiscordClient
bot.logger = logger

bot.on('message', async (message) => {
  if (message.author.bot) return
  if (message.cleanContent.startsWith('@Lyrics Finder')) {
    return void await message.channel.send(
      "Mentions are not supported anymore!\nThe bot's prefix is now `~!`. Try `~!help`!"
    )
  }
  if (!message.content.startsWith('~!')) return
  if (message.content.length <= 2) return

  // If message starts with a mention. Delete this after some time

  const msg = message.content.substring(2).trim()
  const cmd = msg.split(' ')[0].toLowerCase()

  // Add commands here
  switch (cmd) {
    case 'about':
      require('./commands/about').exec(bot, message)
      break
    case 'info':
    case 'status':
    case 'stats':
      require('./commands/info').exec(bot, message)
      break
    case 'invite':
      message.channel.send('**Invite Link**: https://lyrics-finder.angeloanan.xyz')
      break
    case 'ping':
      message.channel.send(`Pong! *${Math.round(bot.ws.ping)}ms*`)
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
      require('./commands/nowplaying').nowPlaying(bot, message)
      break
    case 'autosearch':
    case 'auto':
      require('./commands/autosearch').exec(bot, message)
      break
    case 'support':
      message.channel.send(
        '**Support the bot (and the creator) here**: https://lyrics-finder.angeloanan.xyz/support'
      )
      break
    case 'privacy':
    case 'privacypolicy':
    case 'policy':
      message.channel.send(PrivacyPolicyEmbed())
      break
    case 'stopautosearch':
    case 'stopauto':
      require('./commands/stopautosearch').exec(bot, message)
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
  bot.logger.fatal(err, 'DiscordJS Error')
  bot.destroy()
  process.exit(1)
})

process.on('SIGINT', () => {
  bot.logger.warn('Process SIGINT')
  bot.destroy()
  process.exit(0)
})

process.on('SIGTERM', () => {
  bot.logger.warn('Process SIGTERM')
  bot.destroy()
  process.exit(0)
})

bot.login(process.env.BOT_TOKEN)
