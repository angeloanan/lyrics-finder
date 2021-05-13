import { Client, Message } from 'discord.js'

import { HelpEmbed } from '../constants/embeds'
import logger from '../utils/logger'

export async function exec (bot: Client, message: Message): Promise<void> {
  try {
    const helpMessage = HelpEmbed(bot)

    await message.channel.send(helpMessage)
  } catch (e) {
    try {
      const error = e as Error
      await message.channel.send(
        `I am not able to send Embeds!\nPlease recheck the bot's permission\n\`${error.message}\``
      )
    } catch (ee) {
      logger.error({ e, ee }, 'Unable to send help message')
    }
  }
}
