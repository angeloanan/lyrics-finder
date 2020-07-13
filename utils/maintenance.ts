import { Client, Message, MessageEmbed } from 'discord.js'

export async function exec (bot: Client, message: Message): Promise<void> {
  const maintenanceMessage = new MessageEmbed()
    .setColor([255, 100, 100])
    .setAuthor('The bot is currently on maintenance!', bot.user?.displayAvatarURL())
    .setDescription('We are sorry for the inconvenience.\nPlease check the Lyrics Finder [support server](https://discord.gg/wmdvX8a) for updates!')
    .setFooter('Current ETA')
    .setTimestamp(new Date('Thursday, July 16, 2020 12:00:00 PM GMT+07:00'))

  message.channel.send(maintenanceMessage)
}
