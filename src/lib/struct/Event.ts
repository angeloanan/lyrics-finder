import type { Client, ClientEvents } from 'discord.js'

export type EventName = keyof ClientEvents

export abstract class Event {
  abstract name: EventName

  constructor(protected client: Client) {}

  on?(...args: unknown[]): Promise<void>
  once?(...args: unknown[]): Promise<void>
}
