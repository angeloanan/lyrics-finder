import fetch from 'node-fetch'
import { Client } from 'discord.js'
require('dotenv').config()

const topggToken = process.env.TOPGG_TOKEN
const extremeListToken = process.env.EXTREMELIST_TOKEN
const discordBotListToken = process.env.DBL_TOKEN
const discordBotsGGToken = process.env.DISCORDBOTSGG_TOKEN
const glennBotListToken = process.env.GLENNBOTLIST_TOKEN

async function postTopGG (guildCount: number, botID: string): Promise<void> {
  if (!topggToken) return

  const topggBody = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    server_count: guildCount
  }

  fetch(`https://top.gg/api/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: topggToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topggBody)
  })
}

async function postExtremeList (guildCount: number, botID: string): Promise<void> {
  if (!extremeListToken) return

  const topggBody = {
    guildCount: guildCount
  }

  fetch(`https://api.discordextremelist.xyz/v1/bot/${botID}`, {
    method: 'POST',
    headers: {
      Authorization: extremeListToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topggBody)
  })
}

async function postDiscordBotList (guildCount: number, botID: string, userCount: number): Promise<void> {
  if (!discordBotListToken) return

  const discordBotListBody = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    voice_connections: 0,
    users: userCount,
    guilds: guildCount
  }

  fetch(`https://discordbotlist.com/api/v1/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: discordBotListToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordBotListBody)
  })
}

async function postDiscordBotsGG (guildCount: number, botID: string): Promise<void> {
  if (!discordBotsGGToken) return

  const discordBotsGGBody = {
    guildCount: guildCount
  }

  fetch(`https://discord.bots.gg/api/v1/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: discordBotsGGToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordBotsGGBody)
  })
}

async function postGlennBotList (guildCount: number, botID: string): Promise<void> {
  if (!glennBotListToken) return

  const glennBotListBody = {
    serverCount: guildCount
  }

  fetch(`https://glennbotlist.xyz/api/bot/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: glennBotListToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(glennBotListBody)
  })
}

export async function update (guildCount: number, bot: Client): Promise<void> {
  if (bot.user?.id !== '559265456008200222') return

  const botID = bot.user.id
  const userCount = bot.users.cache.size

  postTopGG(guildCount, botID)
  postExtremeList(guildCount, botID)
  postDiscordBotList(guildCount, botID, userCount)
  postDiscordBotsGG(guildCount, botID)
  postGlennBotList(guildCount, botID)

  console.log(`Guild count has been updated to ${guildCount}`)
}
