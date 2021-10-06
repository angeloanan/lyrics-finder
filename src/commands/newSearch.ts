import { CommandInteraction } from 'discord.js'
import { customEmotesRegex, twemojiRegex } from '../../config'
import { BarebonesLyricsEmbed } from '../constants/embeds'
import { Command } from '../lib'

export class SearchCommand extends Command {
  config = {
    name: 'search',
    description: 'Search a lyrics of a song',
    options: [
      {
        type: 3,
        name: 'Query',
        description: 'The song name or part of the lyrics to search from',
        required: true,
        choices: []
      },
      {
        type: 5,
        name: 'SelfDisplay',
        description: 'Whether lyrics should be displayed only to you (default: `false`)',
        choices: [
          {
            name: 'Yes',
            value: 'true'
          },
          {
            name: 'No',
            value: 'false'
          }
        ]
      }
    ]
  }

  async run(interaction: CommandInteraction) {
    const searchQuery = interaction.options.getString('Query', true)
    const ephemeral = interaction.options.getBoolean('SelfDisplay', false) ?? false

    // Guards
    if (searchQuery.includes('.com')) {
      return await interaction.reply('Searches may not include URLs!')
    }
    if (twemojiRegex.test(searchQuery) || customEmotesRegex.test(searchQuery)) {
      return await interaction.reply('Searches may not include emotes!')
    }

    await interaction.reply({
      embeds: [BarebonesLyricsEmbed()],
      ephemeral
    })

    // TODO: Complete Search
  }
}
