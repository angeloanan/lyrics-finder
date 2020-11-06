import { Client, Message } from 'discord.js'

import { AboutLyricsFinderEmbed } from '../constants/embeds'

export async function exec (bot: Client, message: Message): Promise<void> {
  try {
    if (bot.user == null) return

    await message.channel.send(AboutLyricsFinderEmbed(bot))
  } catch (e) {
    const err = e as Error

    // TODO: Actually handle the error properly
    await message.channel.send(`I am not able to send Embeds!
    Please recheck the bot's permission
    \`${err.message ?? err.name ?? 'Unknown Error!'}\``)
  }
}
