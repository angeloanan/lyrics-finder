import type { Presence } from 'discord.js'
import { newError } from '.'

/**
 * Gets an user's currently playing Spotify song
 * @param userPresence User's Presence
 * @returns {string} Song Title and Artist: `<Song Name> - <Song Artist>`
 */
export async function getSpotifySong (userPresence: Presence): Promise<string> {
  try {
    const presences = userPresence.activities

    const spotifyPresence = await Promise.any([
      ...presences.map(async (presence) => {
        if (presence.name === 'Spotify' && presence.applicationID === null) {
          // Spotify - Presence#state = Artists, seperated by `;`
          // Spotify - Presence#details = Song Title

          const songArtist = presence.state ?? ''
          const songPrimaryArtist = songArtist.split(';')[0] ?? songArtist // Only takes the first artist

          const songTitle = presence.details ?? ''
          const songTitleCleanBrackets = songTitle.split('(')[0] // Cleans anything brackets
          const songTitleCleanDash = songTitleCleanBrackets.split('-')[0] // Cleans anything brackets

          const cleanSongTitle = songTitleCleanDash
          return `${cleanSongTitle} ${songPrimaryArtist}`
        }

        throw new Error('Not found')
      })
    ])

    return spotifyPresence
  } catch (e) {
    const error = e as Error

    switch (error.name) {
      case 'AggregateError':
        throw newError('Not found', 'Spotify song not found')
      default:
        throw e
    }
  }
}
