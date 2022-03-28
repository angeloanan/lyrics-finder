import { Command, Database } from '../../lib'
import { Collection } from 'discord.js'

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, Command>
    db: Database
  }
}
