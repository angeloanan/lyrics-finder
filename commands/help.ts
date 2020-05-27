import { Client, Message, EmbedField, MessageEmbed } from 'discord.js'

export async function exec (_: Client, message: Message): Promise<void> {
  const helpFields: EmbedField[] = [
    {
      name: '`search` - Basic Lyrics Search',
      value: `
        Searches your query for songs
        Also works if you write part of the lyrics

        **Usage**: \`~!search <song name>\`
        **Aliases**: \`s\`, \`lyrics\`
      `.trim(),
      inline: true
    }, {
      name: '`nowplaying` - Spotify Search',
      value: `
      Searches your currently playing Spotify song lyrics

      **Usage**: \`~!nowplaying\`
      **Aliases**: \`np\`
      `.trim(),
      inline: true
    }
  ]

  const embed = new MessageEmbed()
    .setTitle('Lyrics Finder Help')
    .addFields(helpFields)
    .setColor('2F3136')
    .setFooter('Not finding your lyrics? Consider adding it to Genius!')

  message.channel.send(embed)
}
