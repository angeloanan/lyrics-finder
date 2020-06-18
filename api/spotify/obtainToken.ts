import fetch from 'node-fetch'
import { TokenInfo } from './types/TokenInfo'

/**
 * Obtains Spotify token using Client Credentials Flow
 * @param clientID Application ID
 * @param clientSecret Application Secret
 */
export function obtainToken (clientID: string, clientSecret: string): Promise<TokenInfo> {
  return new Promise((resolve, reject) => {
    const credential = `${clientID}:${clientSecret}`
    const encodedCredential = Buffer.from(credential).toString('base64')

    fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${encodedCredential}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeURIComponent('grant_type=client_credentials')
    })
      .then(res => res.json())
      .then(res => {
        resolve(res as TokenInfo)
      })
      .catch(err => {
        reject(new Error('Spotify API Token Obtaining Error: ' + err))
      })
  })
}
