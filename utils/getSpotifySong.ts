import type { Presence } from 'discord.js'

/**
 * Gets an user's currently playing Spotify song
 * @param presence User's Presence
 * @returns {string} Song Title and Artist: `<Song Name> - <Song Artist>`
 */
export function getSpotifySong (presence: Presence): Promise<string> {
  return new Promise((resolve, reject) => {
    const presences = presence.activities

    for (const presence of presences) {
      if (presence.name === 'Spotify' && presence.applicationID === null) {
        // Spotify - Presence#state = Artists, seperated by `;`
        // Spotify - Presence#details = Song Title

        const songArtist = presence.state || ''
        const songPrimaryArtist = songArtist.split(';')[0] || songArtist // Only takes the first artist

        const songTitle = presence.details || ''
        const songTitleClean = songTitle.split('(')[0] // Cleans anything brackets

        return resolve(`${songTitleClean} ${songPrimaryArtist}`)
      }
    }
    reject(new Error('Spotify Song Not Found'))
  })
}
