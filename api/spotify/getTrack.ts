import type { SpotifyTrack } from './types/SpotifyTrack'
import fetch from 'node-fetch'
import { SpotifyAPIBaseURL } from '../../config'

export function getTrack (trackID: string, accessToken: string): Promise<SpotifyTrack> {
  return new Promise((resolve, reject) => {
    fetch(SpotifyAPIBaseURL + `tracks/${trackID}`, {
      headers: {
        Authorization: accessToken
      }
    })
      .then(res => {
        if (res.status !== 200) reject(new Error('HTTP Error ' + res.status))
        return res.json()
      })
      .then(res => {
        return resolve(res as SpotifyTrack)
      })
      .catch(err => {
        reject(new Error(err))
      })
  })
}
