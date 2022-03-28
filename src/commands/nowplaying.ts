import { CacheType, CommandInteraction } from 'discord.js'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'

import { Command, CustomClient } from '../lib/index.js'

export class NowPlayingCommand extends Command {
  config: RESTPostAPIApplicationCommandsJSONBody

  constructor(protected client: CustomClient) {
    super(client)

    this.config = {
      name: 'nowplaying',
      description: "Shows the lyrics to the music you're currently listening on Spotify!",
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
