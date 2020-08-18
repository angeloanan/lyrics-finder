import type { Presence, Client, TextChannel } from 'discord.js'
import type { AutoSearchDBObject } from '../types/autoSearchDBObject'
import db from 'quick.db'
import { getSpotifySong } from '../utils/getSpotifySong'
import { lyricsEmbedBarebones } from '../utils/embedPreload'
import { completeSearch } from '../commands/search'

// Spotify auto lyrics search

export function deleteUserFromAutoSearchDB (userID: string): void {
  db.delete(`autoSearchList.${userID}`)
  db.delete(`currentSong.${userID}`)
}

export async function onPresenceUpdate (bot: Client, presence: Presence): Promise<void> {
  // If user doesn't have presence
  if (presence.user == null) return
  // If user isn't on Database
  if (!db.has(`autoSearchList.${presence.user.id}`)) return

  const userID = presence.user.id

  // Get database entry to know which channel to respond
  const dbEntry: AutoSearchDBObject = db.get(`autoSearchList.${userID}`)
  const guildID = dbEntry.guildID
  const channelID = dbEntry.channelID

  const guild = bot.guilds.cache.get(guildID)

  // If Guild were deleted, unavailable or the bot was kicked
  if (typeof guild === 'undefined' || !guild.available) { return deleteUserFromAutoSearchDB(userID) }

  const channel = bot.channels.cache.get(channelID) as TextChannel | undefined

  // If channel were deleted
  if (typeof channel === 'undefined') { return deleteUserFromAutoSearchDB(userID) }

  // Start sending messages etc
  getSpotifySong(presence)
    .then(songQuery => {
      // If presence were updated while still listening to the same song
      if (db.get(`currentSong.${userID}`) === songQuery) return

      const responseMessage = channel.send(`<@${userID}>, here are your lyrics`, { embed: lyricsEmbedBarebones })

      // Set currentSong table
      db.set(`currentSong.${userID}`, songQuery)

      completeSearch(songQuery, responseMessage, 'autosearch')
    })
    .catch(err => {
      if ((err as Error).message === 'Spotify Song Not Found') { } else { console.error('Presence Update Error', err) }
    })
}
