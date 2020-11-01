// Goal: Genius URL => Lyrics
// Things that can go wrong: Lyrics is empty

import 'dotenv/config'

import fetch from 'node-fetch'
import logger from '../../utils/logger'
import { newError } from '../../utils'

// Genius scraping is very unreliable
// Sometimes, Genius doesn't display the selected tag
// Limiting this to 5 because 2 tries should be enough to get the lyrics

if (process.env.BACKEND_URL == null) throw new Error('Backend URL not supplied')

export async function scrapeLyricsFromURL (url: string, counter = 1): Promise<string> {
  try {
    const backendUrl = process.env.BACKEND_URL as string
    if (counter >= 5) throw new Error('recursive') // Recursive Counter

    const lyrics = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url: url })
    })

    return await lyrics.text()
  } catch (e) {
    if ((e as Error).message === 'recursive') { // Throw everything
      logger.error({ url }, 'Scrape function reached max depth of recursion')
      throw newError('recursive', 'Function has reached its max depth of recursion')
    } else { // Retry
      return await scrapeLyricsFromURL(url, counter + 1)
    }
  }
}

// export async function scrapeUntilSuccess (url: string): Promise<string> {
//   return await fetch(backend, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ url: url })
//   }).then(res => res.text())
//     .then(res => {
//       // if (res.length <= 5) scrapeUntilSuccess(url)
//       return res
//     })
//     .catch(err => {
//       logger.fatal(err, 'Genius Scrape Error')
//       return 'Unknown Error has occured!'
//     })
// }

// /**
//  * Scrapes lyrics out from a Genius URL
//  * @param url Genius URL
//  * @returns Lyrics in plain text
//  */
// export async function scrapeLyricsFromURL (url: string): Promise<string> {
//   return await Promise.resolve(scrapeUntilSuccess(url))
// }
