import { EmbedField, Util, SplitOptions } from 'discord.js'
import execall from 'execall'
import { regex as lyricsRegex } from '../config'

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
    name: name,
    value: value,
    inline: false
  }
}

/**
 * Trims text safely, taking care of `undefined`
 * @param text Text to trim safely
 * @param replacer Replaced text when undefined
 */
export function safeTrim (text: string | null | undefined, replacer: string): string {
  // Check if undefined or null
  if (typeof text === 'undefined') return replacer
  if (text === null) return replacer

  // Trim and check if empty (Newlines get trimmed)
  const trimmedText = text.trim()
  if (trimmedText === '') return replacer
  return trimmedText
}

/**
 * Forms an array of Lyrics Sections, consisting of their header and lyrics
 * @param lyrics Song Lyrics
 * @returns Lyrics Sections | Empty array if undefined
 */
export function makeSectionsArray (lyrics: string): string[][] | [] {
  // Output Result
  const sections: string[][] = []
  const sectionsRegex = execall(lyricsRegex, lyrics)

  for (const section of sectionsRegex) {
    sections.push(section.subMatches)
  }

  return sections
}

/**
 * Validates and cleans up embed
 * @param fields Embeds to validate
 */
export function validateEmbedField (fields: EmbedField[]): EmbedField[] {
  const validatedFields: EmbedField[] = []
  for (const field of fields) {
    if (typeof field.name === 'undefined') field.name = '{MISSING DATA}'
    if (typeof field.value === 'undefined') field.name = '{MISSING DATA}'
    validatedFields.push(field)
  }

  return validatedFields
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
