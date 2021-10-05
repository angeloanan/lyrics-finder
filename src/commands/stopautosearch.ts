import { CommandInteraction } from 'discord.js'

import type { AutoSearchDBObject } from '../types/autoSearchDBObject'
import { Command } from '../lib/struct/Command'
import db from 'quick.db'

const userIDRegex = /(\d{17,19})/

export class AdminCommands extends Command {
  config = {
    name: 'admin',
    description: 'Admin commands',
    options: [
      {
        type: 1,
        name: 'stopAutosearch',
        description: "Forcibly stops user's autosearch",
        options: [
          {
            type: 6,
            name: 'stopAutosearchUser',
            description: 'Which user to stop their autosearch',
            required: true,
            choices: []
          }
        ]
      }
    ]
  }

  // TODO: Sanity check this
  async run(interaction: CommandInteraction) {
    if (!interaction.inGuild()) {
      return await interaction.reply('This command works in servers only!')
    }

    const allowed =
      interaction.memberPermissions?.has('MANAGE_GUILD') ||
      interaction.memberPermissions?.has('MANAGE_MESSAGES')
    const subcommand = interaction.options.getSubcommand(true)

    if (!allowed) {
      return await interaction.reply(
        'You do not have the permissions to use admin commands!\n You need to have `MANAGE_GUILD` or `MANAGE_MESSAGES` permission!'
      )
    }

    switch (subcommand) {
      case 'stopautosearch': {
        const targetUser = interaction.options.getUser(
          'stopAutosearchUser',
          true
        )
        const targetUserId = targetUser.id
        const guildId = interaction.guildId
        const dbKey = `autoSearchList.${targetUserId}`

        if (db.has(dbKey)) {
          const dbObject = db.get(dbKey) as AutoSearchDBObject
          if (dbObject.guildID === guildId) {
            db.delete(`autoSearchList.${targetUserId}`)
            return await interaction.reply(
              `<@${targetUserId}>'s autosearch has been stopped successfully!`
            )
          }
        } else {
          return await interaction.reply(
            '❌ That user is not using autosearch in this server'
          )
        }
      }

      default: {
        return await interaction.reply('Invalid command!')
      }
    }
  }
}

// export async function exec(
//   _bot: DiscordClient,
//   message: Message
// ): Promise<void> {
//   const allowed =
//     (message.member?.hasPermission('MANAGE_GUILD') ?? false) ||
//     (message.member?.hasPermission('MANAGE_MESSAGES') ?? false)

//   if (message.channel instanceof DMChannel || message.guild == null) {
//     return void message.channel.send('This command is not available in DMs!')
//   }

//   if (!allowed) {
//     return void (await message.channel.send(
//       "You don't have the permissions to do that!"
//     ))
//   }
//   if (!userIDRegex.test(message.content)) {
//     return void (await message.channel.send("❌ You didn't mention anyone"))
//   }

//   const targetUserID = userIDRegex.exec(message.content)?.[0] as string
//   const guildID = message.guild.id.toString()

//   const userOnDB = db.has(`autoSearchList.${targetUserID}`)

//   if (userOnDB) {
//     const dbObject = db.get(
//       `autoSearchList.${targetUserID}`
//     ) as AutoSearchDBObject
//     if (dbObject.guildID === guildID) {
//       db.delete(`autoSearchList.${targetUserID}`)
//       await message.react('👍')
//     }
//   } else {
//     await message.channel.send(
//       '❌ That user is not using autosearch in this server'
//     )
//   }
// }
