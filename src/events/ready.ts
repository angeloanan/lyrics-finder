import type { Client } from 'discord.js'

import { Event, EventName } from '../lib'

export class ReadyEvent extends Event {
  name: EventName

  constructor(protected client: Client) {
    super(client)
    this.name = 'ready'
  }

  async once() {
    console.log('Bot is up and running!')

    this.client.user?.setPresence({
      status: 'online',
      afk: false,
      activities: [
        {
          type: 'WATCHING',
          name: `for /search `
        }
      ]
    })
  }
}
