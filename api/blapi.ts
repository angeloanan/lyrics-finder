// @ts-nocheck
import blapi from 'blapi'
require('dotenv').config()

const apiKeys = {
  'top.gg': process.env.TOPGG_TOKEN
}

export async function update (guildCount: number, botID: string): Promise<void> {
  blapi.manualPost(guildCount, botID, apiKeys)
}
