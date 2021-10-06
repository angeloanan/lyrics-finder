import type { CustomClient } from '.'

import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'
import type { CommandInteraction } from 'discord.js'

export abstract class Command {
  abstract config: RESTPostAPIApplicationCommandsJSONBody
  abstract run(interaction: CommandInteraction): Promise<void>

  constructor(protected client: CustomClient) {}
}
