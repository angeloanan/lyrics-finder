import type { User } from 'discord.js'

export type AutosearchStoreKey = string
export type AutosearchStoreValue = {
  guildID: string
  channelID: string
}

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

  async enableUserAutosearch(user: User, details: AutosearchStoreValue): Promise<void> {
    this.db.set(user.id, details)
  }

  async disableUserAutosearch(user: User): Promise<void> {
    this.db.delete(user.id)
  }

  async getUserAutosearchDetail(user: User): Promise<AutosearchStoreValue> {
    const data = this.db.get(user.id)
    if (data == null) {
      throw new Error('User does not have their autosearch on')
    } else {
      return data
    }
  }

  async toggleUserAutosearch(user: User, details: AutosearchStoreValue) {
    if (await this.userAutosearchStatus(user)) {
      this.disableUserAutosearch(user)
    } else {
      this.enableUserAutosearch(user, details)
    }
  }

  async autosearchTotal(): Promise<number> {
    return this.db.size
  }
}
