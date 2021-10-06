import { Client, Presence, TextChannel, User } from 'discord.js'

import type { AutoSearchDBObject } from '../types/autoSearchDBObject'
import { BarebonesLyricsEmbed } from '../constants/embeds'
import { completeSearch } from '../commands/search'
import db from 'quick.db'
import { getSpotifySong } from '../utils/getSpotifySong'
import { Event } from '../lib/struct'

// Spotify auto lyrics search
export function deleteUserFromAutoSearchDB(userID: string): void {
  db.delete(`autoSearchList.${userID}`)
  db.delete(`currentSong.${userID}`)
}

export async function onPresenceUpdate(bot: Client, presence: Presence): Promise<void> {
  // Start sending messages etc
  const songQuery = getSpotifySong(presence)

  if (typeof songQuery === 'string') {
    // If presence were updated while still listening to the same song
    if (db.get(`currentSong.${userID}`) === songQuery) return

    const responseMessage = channel.send(`<@${userID}>, here are your lyrics`, {
      embed: BarebonesLyricsEmbed()
    })

    // Set currentSong table
    db.set(`currentSong.${userID}`, songQuery)

    await completeSearch(songQuery, responseMessage, 'autosearch')
  }
}

export class PresenceUpdateEvent extends Event {
  name = 'presenceUpdate'

  async on(oldPresence: Presence | null, newPresence: Presence) {
    if (newPresence.user == null) return

    const isAutosearchOn = await this.client.db.autosearch.userAutosearchStatus(newPresence.user)
    if (!isAutosearchOn) return

    const autosearchDetail = await this.client.db.autosearch.getUserAutosearchDetail(
      newPresence.user
    )
    if (
      this.client.guilds.resolve(autosearchDetail.guildID) == null ||
      this.client.channels.resolve(autosearchDetail.channelID) == null
    ) {
      this.client.db.autosearch.disableUserAutosearch(newPresence.user)
      return
    }

    const songQuery = getSpotifySong(newPresence)
    if (songQuery == null) {
      return
    }
  }
}
