import { MessageEmbed } from 'discord.js'
import { tips } from '../config'

export const loadingEmoji = '<a:loading:697741386199597156>'

/**
 * Gets a random whole number.
 * @param min Minimum number (Inclusive)
 * @param max Maximum number (Inclusive)
 */
function getRandomInt (min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function getTips (): string {
  const max = tips.length - 1 // Zero based index

  const randomIndex = getRandomInt(0, max)
  return tips[randomIndex]
}

/**
 * The barebones of a Lyrics embed
 */
export const lyricsEmbedBarebones = new MessageEmbed()
  .setTitle(`${loadingEmoji} Loading...`)
  .setColor('FFFF64')
  .setFooter('by Lyrics Finder | ' + getTips())
