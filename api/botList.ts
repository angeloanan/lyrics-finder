import fetch from 'node-fetch'
require('dotenv').config()

const topggToken = process.env.TOPGG_TOKEN
const extremeListToken = process.env.EXTREMELIST_TOKEN

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
    // eslint-disable-next-line @typescript-eslint/camelcase
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

export async function update (guildCount: number, botID: string): Promise<void> {
  postTopGG(guildCount, botID)
  postExtremeList(guildCount, botID)
  console.log(`Guild count has been updated to ${guildCount}`)
}
