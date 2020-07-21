import type { Guild } from 'discord.js'
import { update } from '../api/botList'
import { DiscordClient } from '../types/DiscordClient'

// List your event handlers here.
async function main (bot: DiscordClient, _guild: Guild): Promise<void> {
  if (!bot.user) return
  update(bot.guilds.cache.size, bot)
}

exports.handle = main
