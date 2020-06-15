import { Client, Message, MessageEmbed } from 'discord.js'

let botDescription = ''
botDescription += 'Lyrics Finder is a bot which searches for Lyrics and displays them in an Embed. '
botDescription += 'It can search for your currently playing Spotify song lyrics automatically. '
botDescription += 'Use the command `~!help` to see what the bot can do. '
botDescription += 'Support the bot by voting for the bot by [voting for the bot](https://lyrics-finder.angeloanan.xyz/support)'

let usefulLinks = ''
usefulLinks += '`-` [Invite Lyrics Finder](https://discord.com/oauth2/authorize?client_id=559265456008200222&permissions=314432&scope=bot)\n'
usefulLinks += '`-` [Support Server](https://discord.gg/mFvDvHc)\n'
usefulLinks += '`-` [Lyrics Finder Website / Docs](https://lyrics-finder.angeloanan.xyz)'

export async function exec (bot: Client, message: Message): Promise<void> {
  if (!bot.user) return
  const aboutMessage = new MessageEmbed()
  aboutMessage.setAuthor('About Lyrics Finder', bot.user.displayAvatarURL())
  aboutMessage.setDescription(botDescription)
  aboutMessage.setColor('f3f3cf')

  aboutMessage.addField('**Useful links**', usefulLinks)
  aboutMessage.setFooter('Lyrics Finder is developed using discord.js')

  message.channel.send(aboutMessage)
    .catch(err => {
      message.channel.send(`I am not able to send Embeds!\nPlease recheck the bot's permission\n\`${err}\``)
    })
}
