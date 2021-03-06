import 'dotenv/config'

import { Client, EmbedField, Message, MessageEmbed } from 'discord.js'
import { customEmotesRegex, twemojiRegex } from '../config'
import logger, { logSearches } from '../utils/logger'

import { BarebonesLyricsEmbed } from '../constants/embeds'
import { DiscordClient } from '../types/DiscordClient'
import { LoadingEmoji } from '../constants/emojis'
import { Result } from '../types/GeniusAPI'
import { searchAPI as geniusSearch } from '../api/genius/searchAPI'
import { getSpotifySong } from '../utils/getSpotifySong'
import { makeLyricsEmbedField } from '../utils/formLyricsFields'
import { scrapeLyricsFromURL as scrape } from '../api/genius/scrapeLyrics'

const embedTooLongMessage: EmbedField[] = [{
  name: 'Lyrics is too long!',
  value: 'I can\'t display the lyrics of this song as it is too long.\nYou can click on the song title to view the lyrics on your Browser!',
  inline: false
}]

/**
 * Edits the message with a preloaded embed
 * @param message Barebone Preload Embed
 * @param song Genius Song Result
 */
async function fillBarebonesEmbed (message: Message, song: Result): Promise<void> {
  // Create a copy of Embed Barebones and fill in the blanks
  const preloadedSongEmbed = new MessageEmbed(BarebonesLyricsEmbed())
  preloadedSongEmbed
    .setTitle(song.title)
    .setDescription(`*by ${song.primaryArtist.name ?? 'MISSING DATA'}*`)
    .setURL(song.url ?? 'MISSING DATA')
    .setThumbnail(song.songArtImageUrl ?? 'MISSING DATA')
    .addField(LoadingEmoji + ' Lyrics Loading...', '\u200B')

  await message.edit(preloadedSongEmbed)
}

export async function completeSearch (searchTerm: string, message: Promise<Message>, invokeMethod: 'search' | 'nowplaying' | 'autosearch'): Promise<void> {
  const searchResult = geniusSearch(searchTerm)
  const response = await message

  // Waits until the message is sent and search result came back
  searchResult.then(async (searchResult) => { // Gets the song
    if (searchResult.response.hits.length === 0) { // If search results came out empty
      response.delete()
      response.channel.send('I didn\'t find any song matching the query! Maybe, consider adding it to <https://genius.com>!')
      logger.info({ query: searchTerm }, `${invokeMethod} not found`)
      return
    }

    // Gets the first search result
    const song = searchResult.response.hits[0].result
    const scraper = scrape(song.url) // Concurrency

    fillBarebonesEmbed(response, song)

    scraper.then(async lyrics => {
      // Doesn't complete the search if lyrics is too long.
      if (lyrics.length >= 5800) { response.edit(response.embeds[0].spliceFields(0, 1, embedTooLongMessage)); return }

      const finalEmbedFields = await makeLyricsEmbedField(lyrics)
      const finalSongEmbed = response.embeds[0]

      finalSongEmbed.spliceFields(0, 1, finalEmbedFields)

      response.edit(finalSongEmbed)

      // Logging
      logSearches({
        tags: {
          status: 'success',
          method: invokeMethod
        },
        fields: {
          query: searchTerm,
          songTitle: song.title,
          songArtist: song.primaryArtist.name,
          totalTime: (Date.now() - response.createdTimestamp)
        }
      })
    })
  }).catch(err => {
    logSearches({
      tags: {
        status: 'failed',
        method: invokeMethod
      },
      fields: {
        query: searchTerm
      },
      message: err
    })
    response.channel.send(
      new MessageEmbed()
        .setColor('FF6464')
        .addField('<:botwarning:722031167532171346> | Uncaught Error!', `I'm not able to send this message because of an unknown error. This incident has been reported!\n\`\`\`apache\n${err}\`\`\`\n\nJoin the [Support Server](https://discord.gg/qDX9rua) to learn more about this error!`)
    )
  })
}

export async function search (_bot: DiscordClient, message: Message): Promise<void> {
  // Sends the embed
  const msg = message.content.substring(1) // FIXME: Don't hardcode prefix length
  const searchTerm = msg.split(' ').splice(1).join(' ')

  if (searchTerm === '') { message.channel.send('You did not enter any search term!'); return }
  if (searchTerm.includes('.com')) { message.channel.send('Searches may not include URL'); return }
  if (twemojiRegex.test(searchTerm)) { message.channel.send('Searches may not include emotes!'); return }
  if (customEmotesRegex.test(searchTerm)) { message.channel.send('Searches may not include emotes!'); return }

  if (message.mentions.everyone) { message.channel.send('Searches may not include mentions'); return }
  if (message.mentions.users.size > 0) { message.channel.send('Searches may not include mentions'); return }
  if (message.mentions.channels.size > 0) { message.channel.send('Searches may not include mentions'); return }

  const responseMessage = message.channel.send(BarebonesLyricsEmbed())

  // Catch permission error
  responseMessage.catch((err) => {
    message.channel.send(`I am not able to send embeds here!\nPlease recheck the permission of the bot!\n\`${err}\``)
  })

  completeSearch(searchTerm, responseMessage, 'search')
}

export async function nowPlaying (_bot: Client, message: Message): Promise<void> {
  const responseMessage = message.channel.send(BarebonesLyricsEmbed())

  responseMessage.catch((err) => {
    message.channel.send(`I am not able to send embeds here!\nPlease recheck the permission of the bot!\`${err}\``)
  })

  getSpotifySong(message.author.presence)
    .then(searchTerm => {
      completeSearch(searchTerm, responseMessage, 'nowplaying')
    })
    .catch(async () => {
      // FIXME: Typescript Reject type error
      (await responseMessage).edit('You are not listening to any Spotify song or you didn\'t display them to your profile!', { embed: null })
    })
}
