import { Client, Message, MessageEmbed, EmbedFieldData } from 'discord.js'
import prettyms from 'pretty-ms'

async function main (bot: Client, message: Message): Promise<void> {
  const infoFields: EmbedFieldData[] = [{
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
    Has been online for ${prettyms(bot.uptime || 0, { verbose: true, unitCount: 2, secondsDecimalDigits: 0 })}
    Using ${Math.round(process.memoryUsage().rss / 1000 / 1000)}MB of memory
    Average ping is around ${bot.ws.ping}ms
    `.trim(),
    inline: true
  }, {
    name: 'Links and URLs',
    value: `
    **Bot's Website**: https://lyrics-finder.angeloanan.xyz
    **Invite Link**: https://lyrics-finder.angeloanan.xyz/invite
    **top.gg Page**: https://top.gg/bot/559265456008200222
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
  }]

  const messageEmbed = new MessageEmbed()
    .setTitle('Lyrics Finder Information')
    .setThumbnail(bot.user?.displayAvatarURL({ size: 128 }) || '')
    .setColor([54, 57, 62])
    .setFooter('Found any bugs? Report it at https://discord.gg/qDX9rua')
    .addFields(infoFields)

  message.channel.send(messageEmbed)
}

exports.exec = main
