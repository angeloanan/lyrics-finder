import type { Client, ClientEvents } from 'discord.js'

type EventName = keyof ClientEvents | string

export abstract class Event {
  constructor(protected client: Client) {}

  abstract name: EventName

  on?(...args: unknown[]): Promise<void>
  once?(...args: unknown[]): Promise<void>
}
