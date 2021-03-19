import { Client, Message } from 'discord.js'

import { BarebonesLyricsEmbed } from '../constants/embeds'
import { completeSearch } from './search'
import { getSpotifySong } from '../utils/getSpotifySong'

export async function nowPlaying (_bot: Client, message: Message): Promise<void> {
  const responseMessage = message.channel.send(BarebonesLyricsEmbed())
  const messageAuthor = await message.author.fetch()

  responseMessage.catch((err) => {
    message.channel.send(`I am not able to send embeds here!\nPlease recheck the permission of the bot!\`${err}\``)
  })

  getSpotifySong(messageAuthor.presence)
    .then(searchTerm => {
      completeSearch(searchTerm, responseMessage, 'nowplaying')
    })
    .catch(async () => {
      (await responseMessage).edit('You are not listening to any Spotify song or you didn\'t display them to your profile!', { embed: null })
    })
}
