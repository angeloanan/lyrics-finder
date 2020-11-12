import type { Client, Message } from 'discord.js'

import { InfoEmbed } from '../constants/embeds'

async function main (bot: Client, message: Message): Promise<void> {
  try {
    await message.channel.send(InfoEmbed(bot))
  } catch (e) {
    const stringifiedError = JSON.stringify(e, Object.getOwnPropertyNames(e))

    await message.channel.send(`I am not able to send Embeds!\nPlease recheck the bot's permission\n\`${stringifiedError}\``)
  }
}

exports.exec = main
