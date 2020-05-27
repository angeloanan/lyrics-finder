import { Client, Message, DMChannel } from 'discord.js'
import db from 'quick.db'

export async function exec (bot: Client, message: Message): Promise<void> {
  if (message.channel instanceof DMChannel) { message.channel.send('I don\'t support Direct Messages yet!'); return }

  const userID = message.author.id.toString()
  const guildID = message.guild?.id.toString()
  const channelID = message.channel.id.toString()

  const userOnDB = db.has(`autoSearchList.${userID}`)

  if (!userOnDB) { // Add user on DB
    db.set(`autoSearchList.${userID}`, { guildID: guildID, channelID: channelID })
    message.channel.send('✅ You have turned on Spotify auto lyrics search')
  } else { // Deletes user on DB
    db.delete(`autoSearchList.${userID}`)
    message.channel.send('❌ You have disabled Spotify auto lyrics search')
  }
}
