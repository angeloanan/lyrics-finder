import { obtainToken } from './obtainToken'
import { getTrack } from './getTrack'
import { SpotifyTrack } from './types/SpotifyTrack'

export class SpotifyAPI {
  private accessToken: string | undefined
  private clientID: string
  private clientSecret: string

  constructor (clientID: string, clientSecret: string) {
    if (typeof clientID === 'undefined' || typeof clientSecret === 'undefined') throw new Error('Spotify API ClientID or ClientSecret is missing!')

    this.clientID = clientID
    this.clientSecret = clientSecret
  }

  // TODO: Figure out a way to refresh access token when its invalid
  private obtainTokenLoop (intervalID?: number): void {
    if (intervalID) { clearInterval(intervalID) }

    obtainToken(this.clientID, this.clientSecret)
      .then(tokenInfo => {
        console.log('[SpotifyAPI] Token Info', tokenInfo)
        this.accessToken = tokenInfo.access_token

        setInterval(() => { this.obtainTokenLoop() }, tokenInfo.expires_in)
      })
  }

  public getTrackInfo (url: string): Promise<SpotifyTrack> {
    return new Promise((resolve, reject) => {
      if (typeof this.accessToken === 'undefined') return reject(new Error('Spotify Access Token Missing! Did you supply wrong client details?'))

      resolve(getTrack(url, this.accessToken))
    })
  }
}
