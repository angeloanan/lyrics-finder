import type { Presence } from 'discord.js'

import { CustomClient, Event, EventName } from '../lib/struct'
import { getSpotifySong } from '../utils/getSpotifySong'

export class PresenceUpdateEvent extends Event {
  name: EventName

  constructor(protected client: CustomClient) {
    super(client)
    this.name = 'presenceUpdate'
  }

  async on(_oldPresence: Presence | null, newPresence: Presence) {
    if (newPresence.user == null) return

    const isAutosearchOn = await this.client.db.autosearch.userAutosearchStatus(newPresence.user)
    // Early return when user doesn't have autosearch on
    if (!isAutosearchOn) return

    const autosearchDetail = await this.client.db.autosearch.getUserAutosearchDetail(
      newPresence.user
    )

    // Edge-case: Disable user's autosearch if their guilds / channel has been removed
    if (
      this.client.guilds.resolve(autosearchDetail.guildID) == null ||
      this.client.channels.resolve(autosearchDetail.channelID) == null
    ) {
      this.client.db.autosearch.disableUserAutosearch(newPresence.user)
      return
    }

    // TODO: Complete
    const songQuery = getSpotifySong(newPresence)
    if (songQuery == null) {
      return
    }
  }
}
