import { APIGuildMember } from 'discord-api-types'
import { CommandInteraction, GuildMember } from 'discord.js'
import { BarebonesLyricsEmbed } from '../constants/embeds'
import { Command } from '../lib/struct/Command'
import { getSpotifySong } from '../utils/getSpotifySong'

export class SearchCommand extends Command {
  config = {
    name: 'nowplaying',
    description: 'Search the lyrics to your currently playing Spotify music',
    options: [
      {
        type: 5,
        name: 'SelfDisplay',
        description:
          'Whether lyrics should be displayed only to you (default: `true`)',
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
    if (interaction.member == null) {
      return await interaction.reply('You must do this command from a guild!')
    }

    const guildMember = interaction.member as GuildMember
    const searchQuery = getSpotifySong(guildMember.presence)
    const ephemeral =
      interaction.options.getBoolean('SelfDisplay', false) ?? true

    if (searchQuery == null) {
      // TODO: Improve message
      return await interaction.reply(
        "**No music is currently detected playing!**\nIs your status online? Did you enable `Display Spotify as your status` under Spotify's connection settings?"
      )
    }

    await interaction.reply({
      embeds: [BarebonesLyricsEmbed()],
      ephemeral
    })

    // TODO: Complete Search
  }
}
