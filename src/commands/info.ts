import type { CommandInteraction } from 'discord.js'

import { InfoEmbed } from '../constants/embeds'
import { Command } from '../lib/struct/Command'

export class InfoCommand extends Command {
  config = {
    name: 'info',
    description: "Shows the bot's detailed information"
  }

  async run(interaction: CommandInteraction) {
    await interaction.reply({
      embeds: [InfoEmbed(interaction.client)],
      ephemeral: true
    })
  }
}
