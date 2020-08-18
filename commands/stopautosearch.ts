import { DiscordClient } from '../types/DiscordClient'
import { Message, DMChannel } from 'discord.js'
import db from 'quick.db'
import { AutoSearchDBObject } from '../types/autoSearchDBObject'

const userIDRegex = /(\d{17,19})/

export async function exec (_bot: DiscordClient, message: Message): Promise<void> {
  const allowed = (message.member?.hasPermission('MANAGE_GUILD') || message.member?.hasPermission('MANAGE_MESSAGES')) ?? false

  if (message.channel instanceof DMChannel) { message.channel.send('This command is not available in DMs!'); return }
  if (!message.guild) { message.channel.send('This command is not available in DMs!'); return }
  if (!allowed) { message.channel.send('You don\'t have the permissions to do it') }
  if (!userIDRegex.test(message.content)) { message.channel.send('❌ You didn\'t mention anyone'); return }

  const targetUserID = userIDRegex.exec(message.content)?.[0]
  const guildID = message.guild.id.toString()

  const userOnDB = db.has(`autoSearchList.${targetUserID}`)

  if (userOnDB) {
    const dbObject = db.get(`autoSearchList.${targetUserID}`) as AutoSearchDBObject
    if (dbObject.guildID === guildID) {
      db.delete(`autoSearchList.${targetUserID}`)
      message.react('👍')
      return
    }
  }

  // Catch all
  message.channel.send('❌ That user is not using autosearch in this server')
}
