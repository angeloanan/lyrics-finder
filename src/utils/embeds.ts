import { EmbedField, Message, MessageEmbed, SplitOptions, Util } from 'discord.js'
import execall from 'execall'

import { LyricsRegex as lyricsRegex } from '../config'
import { BarebonesLyricsEmbed } from '../constants/embeds'
import { LoadingEmoji } from '../constants/emojis'
import type { Result } from '../types/GeniusAPI'
import { safeTrim } from './safeTrim'

const splitMessage = Util.splitMessage
const splitOptions: SplitOptions = {
  maxLength: 1024,
  char: '\n'
}

/**
 * Edits the message with a preloaded embed
 * @param message Barebone Preload Embed
 * @param song Genius Song Result
 */
export const fillBarebonesEmbed = async (message: Message, song: Result): Promise<void> => {
  // Create a copy of Embed Barebones and fill in the blanks
  const preloadedSongEmbed = new MessageEmbed(BarebonesLyricsEmbed())
  preloadedSongEmbed
    .setTitle(song.title)
    .setDescription(`*by ${song.primary_artist.name ?? 'MISSING DATA'}*`)
    .setURL(song.url ?? 'https://genius.com')
    .setThumbnail(song.song_art_image_url ?? 'https://genius.com')
    .addField(LoadingEmoji + ' Lyrics Loading...', '\u200B')

  await message.edit({ embeds: [preloadedSongEmbed] })
}

/**
 * Helper function to create Embed Field
 */
export const createEmbedField = (name: string | null, value: string | null): EmbedField => {
  return {
    name: !name ? '\u200B' : name,
    value: !value ? '\u200B' : value,
    inline: false
  }
}

export async function makeLyricsEmbedField(lyrics: string): Promise<EmbedField[]> {
  // Regex will match if lyrics is following Genius' standard
  const matches = execall(lyricsRegex, lyrics)

  // Pattern found / following Genius Standard
  if (matches.length !== 0) {
    return matches.flatMap(section => {
      const sectionTitle = section.subMatches[0]
      const sectionLyrics = safeTrim(section.subMatches[1], '\u200B')

      // Split lyrics every 1024 char by '\n' and pushes to output
      return splitMessage(sectionLyrics, splitOptions).map((lyric, index) => {
        return index === 0
          ? createEmbedField(sectionTitle, lyric)
          : createEmbedField('\u200B', lyric)
      })
    })
  } else {
    return splitMessage(lyrics, splitOptions).map((lyric, index) => {
      return index === 0 ? createEmbedField('[Lyrics]', lyric) : createEmbedField('\u200B', lyric)
    })
  }
}
