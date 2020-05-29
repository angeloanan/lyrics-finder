import { Client, Message, MessageEmbed, EmbedField } from 'discord.js'
import { searchAPI as geniusSearch } from '../api/genius/searchAPI'
import { scrapeLyricsFromURL as scrape } from '../api/genius/scrapeLyricsRewrite'
import { lyricsEmbedBarebones, loadingEmoji } from '../utils/embedPreload'
import { Result } from '../types/GeniusAPI'
import { getSpotifySong } from '../utils/getSpotifySong'
import { makeLyricsEmbedField } from '../utils/formLyricsFields'

require('dotenv').config()

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
  const preloadedSongEmbed = new MessageEmbed(lyricsEmbedBarebones)
  preloadedSongEmbed
    .setTitle(song.title)
    .setDescription(`*by ${song.primaryArtist.name ?? 'MISSING DATA'}*`)
    .setURL(song.url ?? 'MISSING DATA')
    .setThumbnail(song.songArtImageUrl ?? 'MISSING DATA')
    .addField(loadingEmoji + ' Lyrics Loading...', '\u200B')

  message.edit(preloadedSongEmbed)
}

export async function completeSearch (searchTerm: string, message: Promise<Message>): Promise<void> {
  const searchResult = geniusSearch(searchTerm)
  const response = await message

  // Waits until the message is sent and search result came back
  searchResult.then(async (searchResult) => { // Gets the song
    if (searchResult.response.hits.length === 0) { // If search results came out empty
      response.edit('I didn\'t find any song matching the query! Maybe, consider adding it to https://genius.com!')
      return
    }

    // Gets the first search result
    const song = searchResult.response.hits[0].result
    const scraper = scrape(song.url) // Concurrency

    fillBarebonesEmbed(response, song)

    scraper.then(async lyrics => {
      // Doesn't complete the search if lyrics is too long.
      if (lyrics.length >= 5800) { response.embeds[0].spliceFields(0, 1, embedTooLongMessage); return }

      const finalEmbedFields = await makeLyricsEmbedField(lyrics)
      const finalSongEmbed = response.embeds[0]

      finalSongEmbed.spliceFields(0, 1, finalEmbedFields)

      response.edit(finalSongEmbed)
    })
  }).catch(err => {
    response.channel.send('Error\n' + err.toString())
  })
}

export async function search (bot: Client, message: Message): Promise<void> {
  // Sends the embed
  const msg = message.content.substring(1) // FIXME: Don't hardcode prefix length
  const searchTerm = msg.split(' ').splice(1).join(' ')

  if (searchTerm === '') { message.channel.send('You did not enter any search term!'); return }
  if (searchTerm.includes('.com')) { message.channel.send('Searches may not include URL'); return }

  if (message.mentions.everyone) { message.channel.send('Searches may not include mentions'); return }
  if (message.mentions.users.size > 0) { message.channel.send('Searches may not include mentions'); return }
  if (message.mentions.channels.size > 0) { message.channel.send('Searches may not include mentions'); return }

  const responseMessage = message.channel.send(lyricsEmbedBarebones)
  completeSearch(searchTerm, responseMessage)
}

export async function nowPlaying (bot: Client, message: Message): Promise<void> {
  const responseMessage = message.channel.send(lyricsEmbedBarebones)
  getSpotifySong(message.author.presence)
    .then(searchTerm => {
      completeSearch(searchTerm, responseMessage)
    })
    .catch(async () => {
      // FIXME: Typescript Reject type error
      (await responseMessage).edit('You are not listening to any Spotify song or you didn\'t display them to your profile!', { embed: null })
    })
}
