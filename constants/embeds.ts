import type { Client, EmbedField } from 'discord.js'
import { getTips, wrapInCodeblocks } from '../utils'

import { LoadingEmoji } from './emojis'
import { MessageEmbed } from 'discord.js'
import prettyms from 'pretty-ms'

const AboutLyricsFinderEmbed = (bot: Client): MessageEmbed => {
  return new MessageEmbed({
    author: { name: 'About Lyrics Finder', iconURL: bot.user?.displayAvatarURL() },
    hexColor: 'f3f3cf',

    description: 'Lyrics Finder is a bot which searches for Lyrics and displays them in an Embed. It can search for your currently playing Spotify song lyrics automatically. Use the command `~!help` to see what the bot can do. Support the bot by voting for the bot by [voting for the bot](https://lyrics-finder.angeloanan.xyz/support)',

    fields: [{
      name: '**Useful links**',
      value: '`-` [Invite Lyrics Finder](https://discord.com/oauth2/authorize?client_id=559265456008200222&permissions=314432&scope=bot)\n`-` [Support Server](https://discord.gg/mFvDvHc)\n`-` [Lyrics Finder Website / Docs](https://lyrics-finder.angeloanan.xyz)'
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

const HelpEmbed = (bot: Client): MessageEmbed => {
  return new MessageEmbed({
    author: { name: 'Lyrics Finder Help | Commands', icon_url: bot.user?.displayAvatarURL() },
    description: 'Here is the bot\'s available commands.\nJust add the prefix `~!` before one of the commands',
    hexColor: '2F3136',

    fields: [{
      name: '🎶 • Lyrics (**3**)',
      value: wrapInCodeblocks([
        'search',
        'nowplaying',
        'autosearch'
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
    },
    {
      name: '⛏ • Admin Commands (**1**)',
      value: wrapInCodeblocks([
        'stopautosearch'
      ]),
      inline: true
    }],

    footer: { text: 'Need help or something doesn\'t work? Join the support server!' }
  })
}

const InfoEmbed = (bot: Client): MessageEmbed => {
  const avatar = bot.user?.displayAvatarURL()
  const uptime = prettyms(bot.uptime ?? 0, { verbose: true, unitCount: 2, secondsDecimalDigits: 0 })

  return new MessageEmbed({
    title: 'Lyrics Finder Information',
    hexColor: '36393E',
    thumbnail: { url: avatar },

    fields: [{
      name: 'Bot Information',
      value: `
      **Node Version**: ${process.version}
      **Framework**: DiscordJS 12
      **Developer**: <@189769721653100546>
      `.trim(),
      inline: true
    }, {
      name: 'Live Statistics',
      value: `
      Serving ${bot.users.cache.size - 1} users in ${bot.guilds.cache.size} guilds
      Has been online for ${uptime}
      Using ${Math.round(process.memoryUsage().rss / 1000 / 1000)}MB of memory
      Average ping is around ${Math.round(bot.ws.ping)}ms
      `.trim(),
      inline: true
    }, {
      name: 'Links and URLs',
      value: `
      **Bot's Website **: https://lyrics-finder.angeloanan.xyz
      **Support the bot**: https://lyrics-finder.angeloanan.xyz/support
      `.trim(),
      inline: false
    }, {
      name: 'Disclaimers',
      value: `
      **Data Collection**
      I don't store anything except for search terms.
      These terms are anonymous; I can't tell what's whos.
      These are stored for ~30 days for bugfixing.
      `.trim(),
      inline: false
    }],

    footer: { text: 'Found any bugs? Report it at https://discord.gg/qDX9rua' }
  })
}

const BarebonesLyricsEmbed = new MessageEmbed({
  title: `${LoadingEmoji} Loading...`,
  color: '#FFFF64',
  footer: { text: `by Lyrics Finder | ${getTips()}` }
})

export const embedTooLongField: EmbedField[] = [{
  name: 'Lyrics is too long!',
  value: 'I can\'t display the lyrics of this song as it is too long.\nYou can click on the song title to view the lyrics on your Browser!',
  inline: false
}]

export { AboutLyricsFinderEmbed, BarebonesLyricsEmbed, PrivacyPolicyEmbed, HelpEmbed, InfoEmbed }
