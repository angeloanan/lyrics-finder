import { Client, PresenceData } from 'discord.js'
import { version } from '../package.json'

const presenceData: PresenceData = {
  status: 'dnd',
  afk: false,
  activity: {
    type: 'PLAYING',
    name: 'Maintenance mode'
  }
}

export async function handle (bot: Client): Promise<void> {
  if (bot.user === null) return
  console.log('---')
  console.log(`Logged in as ${bot.user.username}#${bot.user.discriminator} at ${new Date()}`)
  console.log(`Serving ${bot.users.cache.size - 1} users in ${bot.guilds.cache.size} guilds`)
  console.log(`Admin invite link: ${await bot.generateInvite(['SEND_MESSAGES', 'EMBED_LINKS', 'USE_EXTERNAL_EMOJIS'])}`)
  console.log('---')

  // Set presence
  bot.user.setPresence(presenceData)

  // Every 10 minutes, update presence
  setInterval(() => {
    if (bot.user === null) return
    bot.user.setPresence(presenceData)
  }, 600000)
}
