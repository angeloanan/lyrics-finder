import type { AutocompleteInteraction, CacheType, CommandInteraction } from 'discord.js'
import type { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v9'

import { apiSearch } from '../api/genius/searchAPI.js'
import type { CustomClient } from '../lib/index.js'
import { Command } from '../lib/index.js'

export class SearchCommand extends Command {
  config: RESTPostAPIApplicationCommandsJSONBody

  constructor(protected client: CustomClient) {
    super(client)

    this.config = {
      name: 'search',
      description: 'Searches a lyric on Genius',
      options: []
    }
  }

  async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
    const searchQuery = interaction.options.getString('url', false)
    if (searchQuery == null) return interaction.respond([])

    const search = await apiSearch(searchQuery)

    interaction.respond(
      search.response.hits
        .filter(h => h.type === 'song')
        .map(h => ({ name: h.result.full_title, value: h.result.url }))
    )
  }

  async run(interaction: CommandInteraction<CacheType>) {
    await interaction.deferReply({ ephemeral: true })

    // TODO: Complete
    await interaction.editReply({})
    return
  }
}
