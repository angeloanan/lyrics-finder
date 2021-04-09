import { DMChannel, Message } from 'discord.js'

import { AutoSearchDBObject } from '../types/autoSearchDBObject'
import { DiscordClient } from '../types/DiscordClient'
import db from 'quick.db'

const userIDRegex = /(\d{17,19})/

export async function exec (_bot: DiscordClient, message: Message): Promise<void> {
  const allowed =
    (message.member?.hasPermission('MANAGE_GUILD') ?? false) ||
    (message.member?.hasPermission('MANAGE_MESSAGES') ?? false)

  if (message.channel instanceof DMChannel || message.guild == null) {
    return void message.channel.send('This command is not available in DMs!')
  }

  if (!allowed) {
    return void (await message.channel.send("You don't have the permissions to do that!"))
  }
  if (!userIDRegex.test(message.content)) {
    return void (await message.channel.send("❌ You didn't mention anyone"))
  }

  const targetUserID = userIDRegex.exec(message.content)?.[0] as string
  const guildID = message.guild.id.toString()

  const userOnDB = db.has(`autoSearchList.${targetUserID}`)

  if (userOnDB) {
    const dbObject = db.get(`autoSearchList.${targetUserID}`) as AutoSearchDBObject
    if (dbObject.guildID === guildID) {
      db.delete(`autoSearchList.${targetUserID}`)
      await message.react('👍')
      return
    }
  }

  // Catch all
  await message.channel.send('❌ That user is not using autosearch in this server')
}
