import { EmbedField, Util, SplitOptions } from 'discord.js'
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
export function createEmbedField (name: string, value: string): EmbedField {
  return {
    name: name ?? '\u200B',
    value: value ?? '\u200B',
    inline: false
  }
}

/**
 * Forms an array of Lyrics Sections, consisting of their header and lyrics
 * @param lyrics Song Lyrics
 * @returns Lyrics Sections | Empty array if undefined
 */
export function makeSectionsArray (lyrics: string): string[][] {
  // Output Result
  const sections: string[][] = []
  const sectionsRegex = execall(lyricsRegex, lyrics)

  for (const section of sectionsRegex) {
    sections.push(section.subMatches)
  }

  return sections
}

export async function makeLyricsEmbedField (lyrics: string): Promise<EmbedField[]> {
  // Output variable
  const fields: EmbedField[] = []
  const sections = makeSectionsArray(lyrics)

  // Pattern found / following Genius Standard
  if (sections.length !== 0) {
    // Loop over sections
    for (const section of sections) {
      const sectionTitle = section[0]
      let sectionLyrics = section[1]

      // Safely trim section lyrics
      sectionLyrics = safeTrim(sectionLyrics, '\u200B')

      // Split lyrics every 1024 char by '\n' and pushes to output
      splitMessage(sectionLyrics, splitOptions)
        .forEach((lyric, index) => {
          if (index === 0) {
            fields.push(createEmbedField(sectionTitle, lyric))
          } else {
            fields.push(createEmbedField('\u200B', lyric))
          }
        })
    }
  } else { // Pattern not found / Not following Genius Standard
    // Splits lyrics directly every 1024 by '\n'
    const lyricsArray = splitMessage(lyrics, splitOptions)

    // Loops over lyricsArray & add lyrics to output
    lyricsArray.forEach((lyric, index) => {
      if (index === 0) {
        fields.push(createEmbedField('[Lyrics]', lyric))
      } else {
        fields.push(createEmbedField('\u200B', lyric))
      }
    })
  }

  return fields
}
