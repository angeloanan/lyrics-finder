import { EmbedField, SplitOptions, Util } from 'discord.js'

import execall from 'execall'
import { regex as lyricsRegex } from '../config'
import { safeTrim } from './safeTrim'

const splitMessage = Util.splitMessage
const splitOptions: SplitOptions = {
  maxLength: 1024,
  char: '\n'
}

/**
 * Helper function to create Embed Field
 */
export const createEmbedField = (name?: string, value?: string): EmbedField => {
  return {
    name: name ?? '\u200B',
    value: value ?? '\u200B',
    inline: false
  }
}

export async function makeLyricsEmbedField (lyrics: string): Promise<EmbedField[]> {
  // Regex will match if lyrics is following Genius' standard
  const matches = execall(lyricsRegex, lyrics)

  // Pattern found / following Genius Standard
  if (matches.length !== 0) {
    return matches.flatMap((section) => {
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
      return index === 0
        ? createEmbedField('[Lyrics]', lyric)
        : createEmbedField('\u200B', lyric)
    })
  }
}
