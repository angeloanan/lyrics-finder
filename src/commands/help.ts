import { Command } from '../lib'
import { CommandInteraction } from 'discord.js'

import { HelpEmbed } from '../constants/embeds'

// TODO: Better help interaction

export class HelpCommand extends Command {
  config = {
    name: 'help',
    description: 'Shows the help message',
    options: [
      {
        type: 3,
        name: 'Category',
        description: 'Specifies the category of help message (optional)',
        choices: [{}, {}, {}]
      }
    ]
  }

  async run(interaction: CommandInteraction) {
    // TODO: Better help interaction using buttons etc.
    await interaction.reply({
      embeds: [HelpEmbed(interaction.client)],
      ephemeral: true
    })
  }
}
