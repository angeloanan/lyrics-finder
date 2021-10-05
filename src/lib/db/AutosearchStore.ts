import type { User } from 'discord.js'

export type AutosearchStoreKey = string
export type AutosearchStoreValue = {
  guildID: string
  channelID: string
}

// TODO: Complete this
// TODO: Sanity check this
// TODO: Generate a common database interface
export class AutosearchStore {
  private db: Map<AutosearchStoreKey, AutosearchStoreValue>

  constructor() {
    this.db = new Map()
  }

  /**
   * Checks whether user's autosearch status is on or off
   * @param user User
   * @returns {boolean} `true` when user is autosearching
   */
  async userAutosearchStatus(user: User): Promise<boolean> {
    return this.db.has(user.id)
  }

  async toggleUserAutosearch(user: User, details: AutosearchStoreValue) {
    if (await this.userAutosearchStatus(user)) {
      // TODO: Finish this monkaS
    }
  }

  async enableUserAutosearch(
    user: User,
    details: AutosearchStoreValue
  ): Promise<void> {
    this.db.set(user.id, details)
  }

  async stopUserAutosearch(user: User): Promise<void> {
    this.db.delete(user.id)
  }
}
