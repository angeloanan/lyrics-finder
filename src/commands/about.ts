import { Client, Message } from 'discord.js'

import { AboutLyricsFinderEmbed } from '../constants/embeds'
import { LyricsFinderError } from '../types/ErrorCode'
import logger from '../utils/logger'

export async function exec (bot: Client, message: Message): Promise<void> {
  try {
    if (bot.user == null) return

    await message.channel.send(AboutLyricsFinderEmbed(bot))
  } catch (e) {
    const err = e as Error

    void message.channel.send(
      `Something went wrong! Please recheck the bot's permission\n\`\`\`js\n${
        err.message ?? err.name ?? 'Unknown Error!'
      }\`\`\``
    )

    logger.error(e, LyricsFinderError.COMMAND_ABOUT)
  }
}
