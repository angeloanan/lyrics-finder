import type { Client, Guild } from 'discord.js'
import { update } from '../api/botList'

// List your event handlers here.
async function main (bot: Client, _guild: Guild): Promise<void> {
  if (!bot.user) return
  update(bot.guilds.cache.size, bot.user.id)
}

exports.handle = main
