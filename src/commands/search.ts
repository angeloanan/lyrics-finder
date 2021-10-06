import 'dotenv/config'

import { BarebonesLyricsEmbed, embedTooLongField } from '../constants/embeds'
import { CommandInteraction, Message, MessageEmbed } from 'discord.js'
import { customEmotesRegex, twemojiRegex } from '../../config'
import { fillBarebonesEmbed, makeLyricsEmbedField } from '../utils/embeds'
import logger, { logSearches } from '../utils/logger'

import { DiscordClient } from '../types/DiscordClient'
import { searchAPI as geniusSearch } from '../api/genius/searchAPI'
import { scrapeLyricsFromURL as scrape } from '../api/genius/scrapeLyrics'
import { Command } from '../lib/struct/Command'

export async function completeSearch(
  searchTerm: string,
  message: Promise<Message>,
  invokeMethod: 'search' | 'nowplaying' | 'autosearch'
): Promise<void> {
  const searchResult = geniusSearch(searchTerm)
  const response = await message

  // Waits until the message is sent and search result came back
  searchResult
    .then(async searchResult => {
      // Gets the song
      if (searchResult.response.hits.length === 0) {
        void response.delete()
        void response.channel.send(
          "I didn't find any song matching the query! Consider adding it to <https://genius.com>!"
        )
        return logger.info({ query: searchTerm }, `${invokeMethod} not found`)
      }

      // Gets the first search result
      const song = searchResult.response.hits[0].result
      const scraper = scrape(song.url) // Concurrency

      await fillBarebonesEmbed(response, song)

      return await scraper.then(async lyrics => {
        // Doesn't complete the search if lyrics is too long.
        if (lyrics.length >= 5800) {
          return void (await response.edit(
            response.embeds[0].spliceFields(0, 1, embedTooLongField)
          ))
        }

        const finalEmbedFields = await makeLyricsEmbedField(lyrics)
        const finalSongEmbed = response.embeds[0]
        finalSongEmbed.spliceFields(0, 1, finalEmbedFields)

        await response.edit(finalSongEmbed)

        void logSearches({
          tags: {
            status: 'success',
            method: invokeMethod
          },
          fields: {
            query: searchTerm,
            songTitle: song.title,
            songArtist: song.primary_artist.name,
            totalTime: Date.now() - response.createdTimestamp
          }
        })
      })
    })
    .catch(err => {
      void response.channel.send(
        new MessageEmbed()
          .setColor('FF6464')
          .addField(
            '<:botwarning:722031167532171346> | Uncaught Error!',
            `I'm not able to send this message because of an unknown error. This incident has been reported!\n\`\`\`apache\n${JSON.stringify(
              err
            )}\`\`\`\n\nJoin the [Support Server](https://discord.gg/qDX9rua) to learn more about this error!`
          )
      )
      void logSearches({
        tags: {
          status: 'failed',
          method: invokeMethod
        },
        fields: {
          query: searchTerm
        },
        message: err
      })
    })
}

export async function search(_bot: DiscordClient, message: Message): Promise<void> {
  const msg = message.content.substring(1) // FIXME: Don't hardcode prefix length
  const searchTerm = msg.split(' ').splice(1).join(' ')

  if (searchTerm === '') {
    return void (await message.channel.send('You did not enter any search term!'))
  }
  if (searchTerm.includes('.com')) {
    return void (await message.channel.send('Searches may not include URL'))
  }
  if (twemojiRegex.test(searchTerm)) {
    return void (await message.channel.send('Searches may not include emotes!'))
  }
  if (customEmotesRegex.test(searchTerm)) {
    return void (await message.channel.send('Searches may not include emotes!'))
  }

  if (message.mentions.everyone) {
    return void (await message.channel.send('Searches may not include mentions'))
  }
  if (message.mentions.users.size > 0) {
    return void (await message.channel.send('Searches may not include mentions'))
  }
  if (message.mentions.channels.size > 0) {
    return void (await message.channel.send('Searches may not include mentions'))
  }

  const responseMessage = message.channel.send(BarebonesLyricsEmbed())

  // Catch permission error
  responseMessage.catch(async err => {
    void message.channel.send(
      `I am not able to send embeds here!\nPlease recheck the permission of the bot!\n\`\`\`${JSON.stringify(
        err
      )}\`\`\``
    )
  })

  await completeSearch(searchTerm, responseMessage, 'search')
}
