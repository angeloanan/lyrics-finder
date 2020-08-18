import { MessageEmbed } from 'discord.js'

const embed = new MessageEmbed()

embed.setTitle('Lyrics Finder Privacy Policy')
embed.setDescription(`
Discord obliges every bots to have a [Privacy Policy](https://github.com/discord/discord-api-docs/blob/2c8f55422e5a53196eabf7db51957c3426fafe01/docs/Legal.md#a-implement-good-privacy-practices) as of August 15, 2020. Here is the [Lyrics Finder's Privacy Policy](https://lyrics-finder.angeloanan.xyz/privacy-policy).
`.trim())

embed.addField('TL;DR', `
I do not collect any user info (i.e. Username, Discriminator or UserID). I only collect the search query, in form of logs, when someone has invoked a command. This includes the song title and the artist when using *Now Playing* or *Autosearch*. These logs are stored at [Datadog](https://www.datadoghq.com) and will be retained for 30 days.
`.trim())

embed.setFooter('You can contact me if you have any questions | Last updated at ')
embed.setTimestamp(Date.parse('Aug 19 2020 03:45 GMT+7'))

export default embed
