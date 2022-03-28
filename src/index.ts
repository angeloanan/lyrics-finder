import 'dotenv/config'

import { CustomClient } from './lib/index.js'

const client = new CustomClient()
client.init().then(client => client.login(process.env.BOT_TOKEN))

// Handle graceful exit
process.on('SIGUSR2', () => {
  console.log('[nodemon] restarting process, shutting down gracefully')
  client.destroy()
})

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully')
  client.destroy()
})

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  client.destroy()
})
