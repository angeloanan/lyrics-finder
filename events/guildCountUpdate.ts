import { DiscordClient } from '../types/DiscordClient'
import type { Guild } from 'discord.js'
import { update } from '../api/botList'

// List your event handlers here.
async function main (bot: DiscordClient, _guild: Guild): Promise<void> {
  if (bot.user == null) return

  // Asynchronously update events
  await Promise.allSettled([
    update(bot.guilds.cache.size, bot)
  ])
}

exports.handle = main
