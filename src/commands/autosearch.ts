import { Client, DMChannel, Message } from 'discord.js'

import { AutoSearchDBObject } from '../types/autoSearchDBObject'
import db from 'quick.db'

export async function exec (_bot: Client, message: Message): Promise<void> {
  if (message.channel instanceof DMChannel) {
    return void (await message.channel.send("I don't support Direct Messages yet!"))
  }

  if (message.guild == null) return
  const userID = message.author.id.toString()
  const guildID = message.guild?.id.toString()
  const channelID = message.channel.id.toString()

  const userOnDB = db.has(`autoSearchList.${userID}`)

  if (!userOnDB) {
    const userDetail: AutoSearchDBObject = {
      guildID: guildID,
      channelID: channelID
    }
    db.set(`autoSearchList.${userID}`, userDetail)
    await message.channel.send('✅ You have turned on Spotify auto lyrics search')
  } else {
    db.delete(`autoSearchList.${userID}`)
    await message.channel.send('❌ You have disabled Spotify auto lyrics search')
  }
}
