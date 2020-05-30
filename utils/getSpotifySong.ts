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
        return resolve(`${presence.state} ${presence.details}`)
      }
    }

    reject(new Error('Spotify Song Not Found'))
  })
}
