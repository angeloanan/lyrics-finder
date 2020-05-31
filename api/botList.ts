import fetch from 'node-fetch'
require('dotenv').config()

const topggToken = process.env.TOPGG_TOKEN

async function postTopGG (guildCount: number, botID: string): Promise<void> {
  if (!topggToken) return

  const topggBody = {
    // eslint-disable-next-line @typescript-eslint/camelcase
    server_count: guildCount
  }

  fetch(`https://top.gg/api/bots/${botID}/stats`, {
    method: 'POST',
    headers: {
      Authorization: topggToken
    },
    body: JSON.stringify(topggBody)
  })
}

export async function update (guildCount: number, botID: string): Promise<void> {
  postTopGG(guildCount, botID)
}
