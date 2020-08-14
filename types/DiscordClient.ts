import { Client } from 'discord.js'
import { Logger } from 'pino'

export interface DiscordClient extends Client {
  logger: Logger;
}
