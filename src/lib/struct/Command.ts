import type { AutocompleteInteraction, CacheType, CommandInteraction } from 'discord.js'
import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'

import type { CustomClient } from '.'

export abstract class Command {
  abstract config: RESTPostAPIApplicationCommandsJSONBody
  abstract run(interaction: CommandInteraction<CacheType>): Promise<void>
  autocomplete?(interaction: AutocompleteInteraction<CacheType>): Promise<void>

  constructor(protected client: CustomClient) {}
}
