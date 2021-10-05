import { Client, CommandInteraction, DMChannel, Message } from 'discord.js'

import { AutoSearchDBObject } from '../types/autoSearchDBObject'
import db from 'quick.db'
import { Command } from '../lib/struct/Command'

export class AutoSearchCommand extends Command {
  config = {
    name: 'autosearch',
    description: 'Enable or disables lyrics autosearch',
    options: [
      {
        type: 5,
        name: 'Switch',
        description:
          'Whether autosearch should be enabled or disabled (default toggles)',
        choices: [
          {
            name: 'On',
            value: 'true'
          },
          {
            name: 'Off',
            value: 'false'
          }
        ]
      }
    ]
  }

  async run(interaction: CommandInteraction) {
    interaction.deferReply({
      fetchReply: true
    })
    if (!interaction.inGuild()) {
      return await interaction.reply(
        'Toggling autosearch from Direct Messages is not currently supported!'
      )
    }

    const wantedState = interaction.options.getBoolean('Switch', false)

    const userId = interaction.user.id
    const dbKey = `autoSearchList.${userId}`
    const dbVal: AutoSearchDBObject = {
      guildID: interaction.guildId,
      channelID: interaction.channelId
    }
    const userOnDb = db.has(dbKey)

    if (wantedState === null) {
      if (userOnDb) {
        db.delete(dbKey)
        return await interaction.reply(
          '❌ You have disabled Spotify auto lyrics search'
        )
      } else {
        db.set(dbKey, dbVal)
        return await interaction.reply(
          '✅ You have turned on Spotify auto lyrics search'
        )
      }
    }

    if (wantedState === true) {
      if (userOnDb) {
        return await interaction.reply('You already have autosearch turned on!')
      } else {
        db.set(dbKey, dbVal)
        return await interaction.reply(
          '✅ You have turned on Spotify auto lyrics search'
        )
      }
    }

    if (wantedState === false) {
      db.delete(dbKey)
      if (userOnDb) {
        return await interaction.reply(
          '❌ You have disabled Spotify auto lyrics search'
        )
      } else {
        return await interaction.reply(
          'You already have autosearch turned off!'
        )
      }
    }
  }
}
