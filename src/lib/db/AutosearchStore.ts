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
  userAutosearchStatus(user: User): boolean {
    return this.db.has(user.id)
  }

  enableUserAutosearch(user: User, details: AutosearchStoreValue): void {
    this.db.set(user.id, details)
  }

  disableUserAutosearch(user: User): void {
    this.db.delete(user.id)
  }

  getUserAutosearchDetail(user: User): AutosearchStoreValue {
    const data = this.db.get(user.id)
    if (data == null) {
      throw new Error('User does not have their autosearch on')
    } else {
      return data
    }
  }

  toggleUserAutosearch(user: User, details: AutosearchStoreValue) {
    if (this.userAutosearchStatus(user)) {
      this.disableUserAutosearch(user)
    } else {
      this.enableUserAutosearch(user, details)
    }
  }

  autosearchTotal(): number {
    return this.db.size
  }
}
