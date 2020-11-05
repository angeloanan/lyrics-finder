import { Client, MessageEmbed } from 'discord.js'

import { getTips } from '../utils'

const AboutLyricsFinderEmbed = (bot: Client): MessageEmbed => {
  return new MessageEmbed({
    author: { name: 'About Lyrics Finder', iconURL: bot.user?.displayAvatarURL() },
    hexColor: 'f3f3cf',

    description: `Lyrics Finder is a bot which searches for Lyrics and displays them in an Embed.
    It can search for your currently playing Spotify song lyrics automatically.
    Use the command \`~!help\` to see what the bot can do.
    Support the bot by voting for the bot by [voting for the bot](https://lyrics-finder.angeloanan.xyz/support)`,

    fields: [{
      name: '**Useful links**',
      value: `\`-\` [Invite Lyrics Finder](https://discord.com/oauth2/authorize?client_id=559265456008200222&permissions=314432&scope=bot)\n
      '\`-\` [Support Server](https://discord.gg/mFvDvHc)\n
      '\`-\` [Lyrics Finder Website / Docs](https://lyrics-finder.angeloanan.xyz)`
    }],

    footer: { text: 'Lyrics Finder is developed using discord.js' }
  })
}

const PrivacyPolicyEmbed = (): MessageEmbed => {
  return new MessageEmbed({
    title: 'Lyrics Finder Privacy Policy',
    description: 'Discord obliges every bots to have a [Privacy Policy](https://github.com/discord/discord-api-docs/blob/2c8f55422e5a53196eabf7db51957c3426fafe01/docs/Legal.md#a-implement-good-privacy-practices) as of August 15, 2020. Here is the [Lyrics Finder\'s Privacy Policy](https://lyrics-finder.angeloanan.xyz/privacy-policy).',

    fields: [{
      name: 'TL;DR',
      value: 'I do not collect any user info (i.e. Username, Discriminator or UserID). I only collect the search query, in form of logs, when someone has invoked a command. This includes the song title and the artist when using *Now Playing* or *Autosearch*. These logs are stored at [Datadog](https://www.datadoghq.com) and will be retained for 30 days.'
    }],

    footer: { text: 'You can contact me if you have any questions | Last updated at ' },
    timestamp: Date.parse('Aug 19 2020 03:45 GMT+7')
  })
}

const BarebonesLyricsEmbed = (): MessageEmbed => {
  return new MessageEmbed({
    title: '<a:loading:697741386199597156> Loading...',
    hexColor: 'FFFF64',
    footer: { text: `by Lyrics Finder | ${getTips()}` }
  })
}

export { AboutLyricsFinderEmbed, BarebonesLyricsEmbed, PrivacyPolicyEmbed }
