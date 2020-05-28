// eslint-disable-next-line no-unused-vars
import type { ClientOptions } from 'discord.js'

export const regex = /(\[[^\]]+\])\n?([^[\]]+)?/gm

export const clientOpts: ClientOptions = {
  shards: 'auto',
  messageCacheMaxSize: 5,
  messageSweepInterval: 60,
  messageCacheLifetime: 20,
  disableMentions: 'everyone'
}

export const geniusAPIBaseURL = 'https://api.genius.com'

export const tips = [
  'Support server: https://discord.gg/mhUdNPZ', // Invite link for Footer https://discord.gg/mhUdNPZ
  'Use `~!np` to display your current Spotify song',
  'Lyrics not found? Add it to https://genius.com',
  'Found bugs or errors? Report it to the support server!',
  'Support the bot - https://lyrics-finder.angeloanan.xyz/support',
  'Changelog - https://lyrics-finder.angeloanan.xyz/changelog'
]
