import fetch from 'node-fetch'
import { LastFmUserRecentTracks } from './types/UserRecentTracks'
require('dotenv').config()

const apiKey = process.env.LASTFM_KEY

export function getRecentTracks (username: string): Promise<LastFmUserRecentTracks> {
  return new Promise((resolve, reject) => {
    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=${username}&api_key=${apiKey}&format=json`

    fetch(url)
      .then(res => res.json())
      .then(res => {
        if (res.error) reject(new Error(`${res.message}`))

        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
