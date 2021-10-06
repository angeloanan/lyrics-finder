import { Command, Database } from '../../lib'
import { Collection } from 'discord.js'

declare module 'discord.js' {
  export interface Client {
    cmds: Collection<string, Command>
    db: Database
  }
}
