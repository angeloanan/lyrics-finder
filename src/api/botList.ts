import 'dotenv/config'

import { DiscordClient } from '../types/DiscordClient'
import fetch from 'node-fetch'
import logger from '../utils/logger'

const topggToken = process.env.TOPGG_TOKEN
const extremeListToken = process.env.EXTREMELIST_TOKEN
const discordBotListToken = process.env.DBL_TOKEN
const discordBotsGGToken = process.env.DISCORDBOTSGG_TOKEN
const discordBoatsToken = process.env.DISCORDBOATS_TOKEN
const discordBotlistSpaceToken = process.env.BOTLISTSPACE_TOKEN

async function postTopGG(guildCount: number, botID: string): Promise<void> {
  if (topggToken == null) return

  const topggBody = {
    server_count: guildCount
  }

  await fetch(`https://top.gg/api/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: topggToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topggBody)
  })
}

async function postExtremeList(guildCount: number, botID: string): Promise<void> {
  if (extremeListToken == null) return

  const topggBody = {
    guildCount: guildCount
  }

  await fetch(`https://api.discordextremelist.xyz/v2/bot/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: extremeListToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(topggBody)
  })
}

async function postDiscordBotList(
  guildCount: number,
  botID: string,
  userCount: number
): Promise<void> {
  if (discordBotListToken == null) return

  const discordBotListBody = {
    voice_connections: 0,
    users: userCount,
    guilds: guildCount
  }

  await fetch(`https://discordbotlist.com/api/v1/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: discordBotListToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordBotListBody)
  })
}

async function postDiscordBotsGG(guildCount: number, botID: string): Promise<void> {
  if (discordBotsGGToken == null) return

  const discordBotsGGBody = {
    guildCount: guildCount
  }

  await fetch(`https://discord.bots.gg/api/v1/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: discordBotsGGToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordBotsGGBody)
  })
}

async function postDiscordBoats(guildCount: number, botID: string): Promise<void> {
  if (discordBoatsToken == null) return

  const discordBoatsBody = {
    server_count: guildCount
  }

  await fetch(`https://discord.boats/api/bot/${botID}`, {
    method: 'POST',
    headers: {
      Authorization: discordBoatsToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordBoatsBody)
  })
}

async function postBotlistSpace(guildCount: number, botID: string): Promise<void> {
  if (discordBotlistSpaceToken == null) return

  const discordBotlistSpaceBody = {
    server_count: guildCount
  }

  await fetch(`https://api.botlist.space/v1/bots/${botID}`, {
    method: 'POST',
    headers: {
      Authorization: discordBotlistSpaceToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(discordBotlistSpaceBody)
  })
}

export async function update(guildCount: number, bot: DiscordClient): Promise<void> {
  const botID = bot.user?.id
  const userCount = bot.users.cache.size

  // Disallow duplicate of bots to submit details to
  if (botID == null || bot.user?.id !== '559265456008200222') return

  const fetching = await Promise.allSettled([
    postTopGG(guildCount, botID),
    postExtremeList(guildCount, botID),
    postDiscordBotList(guildCount, botID, userCount),
    postDiscordBotsGG(guildCount, botID),
    postDiscordBoats(guildCount, botID),
    postBotlistSpace(guildCount, botID)
  ])

  let allSucess = true

  fetching.forEach(promiseRes => {
    if (promiseRes.status === 'rejected') {
      logger.error(promiseRes.reason)
      allSucess = false
    }
  })

  bot.logger.info({ guildCount, userCount, success: allSucess }, 'Guild count update')
}
