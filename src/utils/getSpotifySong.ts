import type { Presence } from 'discord.js'

/**
 * Gets an user's currently playing Spotify song
 * @param userPresence User's Presence
 * @returns {string} Song Title and Artist: `<Song Name> - <Song Artist>`
 */
export function getSpotifySong(userPresence: Presence | null): string | null {
  if (userPresence == null) return null
  const presences = userPresence.activities

  presences.forEach(presence => {
    if (presence.name === 'Spotify' && presence.applicationId === null) {
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
  })

  return null
}
