import { CommandInteraction } from 'discord.js'

import { AboutLyricsFinderEmbed } from '../constants/embeds'
import { Command } from '../lib/struct/Command'

export class AboutCommand extends Command {
  config = {
    name: 'About',
    description: 'Sends information regarding Lyrics Finder'
  }

  async run(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
      embeds: [AboutLyricsFinderEmbed(interaction.client)],
      ephemeral: true
    })
  }
}
