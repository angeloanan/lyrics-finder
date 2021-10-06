import { Event } from '../lib'

export class ReadyEvent extends Event {
  name = 'ready'

  async once() {
    this.client.user?.setPresence({
      status: 'online',
      afk: false,
      activities: [
        {
          type: 'WATCHING',
          name: `for ~!help | ${1}`
        }
      ]
    })
  }
}
