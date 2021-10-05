import { CommandInteraction } from 'discord.js'
import { Command } from '../lib/struct/Command'

export class PingCommand extends Command {
  config = {
    name: 'ping',
    description: 'Pong! Checks for the application latency.'
  }

  async run(interaction: CommandInteraction) {
    const oldDate = new Date().getTime()
    await interaction.reply({
      content: `Pong! (\`${
        oldDate - interaction.createdTimestamp
      }ms\` invocation)`,
      ephemeral: true
    })

    const timeDiff = new Date().getTime() - oldDate
    await interaction.editReply({
      content: `Pong! (\`${
        oldDate - interaction.createdTimestamp
      }ms\` invocation; \`${timeDiff}ms\` round-trip)`
    })
  }
}
