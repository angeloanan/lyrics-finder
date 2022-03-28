import { CacheType, CommandInteraction } from 'discord.js'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'

import { Command, CustomClient } from '../lib/index.js'

export class AutosearchCommand extends Command {
  config: RESTPostAPIApplicationCommandsJSONBody

  constructor(protected client: CustomClient) {
    super(client)

    this.config = {
      name: 'autosearch',
      description: 'Toggles auto-searching for every song you are listening on Spotify!',
      options: []
    }
  }

  async run(interaction: CommandInteraction<CacheType>): Promise<void> {
    await interaction.deferReply({ ephemeral: true })

    // TODO: Complete
    await interaction.editReply({})
    return
  }
}
