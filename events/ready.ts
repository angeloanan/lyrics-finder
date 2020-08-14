import { PresenceData } from 'discord.js'
import { version } from '../package.json'
import { DiscordClient } from '../types/DiscordClient'

const presenceData: PresenceData = {
  status: 'online',
  afk: false,
  activity: {
    type: 'WATCHING',
    name: `for ~!help | ${version}`
  }
}

export async function handle (bot: DiscordClient): Promise<void> {
  if (bot.user === null) return
  bot.logger.info('DiscordJS Ready')
  bot.logger.info({ guildCount: bot.guilds.cache.size, user: bot.users.cache.size }, 'Guild Count Update')

  // Set presence
  bot.user.setPresence(presenceData)

  // Every 10 minutes, update presence
  setInterval(() => {
    if (bot.user === null) return
    bot.user.setPresence(presenceData)
  }, 600000)
}
