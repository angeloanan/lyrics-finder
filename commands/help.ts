import { Client, Message, EmbedField, MessageEmbed } from 'discord.js'

export function wrapInCodeblocks (str: string[]): string {
  let out = '```\n'
  for (const s of str) {
    out += s + '\n'
  }
  out += '```'

  return out
}

const helpFields: EmbedField[] = [
  {
    name: '🎶 • Lyrics (**3**)',
    value: wrapInCodeblocks([
      'search',
      'nowplaying',
      'autosearch'
    ]),
    inline: true
  },
  {
    name: '⛏ • Admin Commands (**1**)',
    value: wrapInCodeblocks([
      'stopautosearch'
    ]),
    inline: true
  },
  {
    name: '💬 • Bot Info (**5**)',
    value: wrapInCodeblocks([
      'help',
      'ping',
      'invite',
      'stats',
      'privacypolicy'
    ]),
    inline: true
  }
]

export async function exec (bot: Client, message: Message): Promise<void> {
  const query = message.content.split(' ')[1] ?? ''
  const embed = new MessageEmbed()
    .setColor('2F3136')

  switch (query) {
    default:
      embed.setAuthor('Lyrics Finder Help | Commands', bot.user?.displayAvatarURL())
      embed.setDescription('Here is the bot\'s available commands.\nJust add the prefix `~!` before one of the commands')
      embed.setFooter('Something doesn\'t work or need help? Join the support server!')
      embed.addFields(helpFields)
      break
  }

  message.channel.send(embed)
    .catch(err => {
      message.channel.send(`I am not able to send Embeds!\nPlease recheck the bot's permission\n\`${err}\``)
    })
}
