/* eslint-disable quote-props */
// Goal: Genius URL => Lyrics
// Things that can go wrong: Lyrics is empty

import fetch from 'node-fetch'
import logger from '../../utils/logger'
require('dotenv').config()

// Genius scraping is very unreliable
// Sometimes, Genius doesn't display the selected tag
// Limiting this to 5 because 2 tries should be enough to get the lyrics

if (process.env.BACKEND_URL === undefined) throw new Error('Backend URL not supplied')
const backend = process.env.BACKEND_URL

export async function scrapeUntilSuccess (url: string): Promise<string> {
  return fetch(backend, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  }).then(res => res.text())
    .then(res => {
      // if (res.length <= 5) scrapeUntilSuccess(url)
      return res
    })
    .catch(err => {
      logger.fatal(err, 'Genius Scrape Error')
      return 'Unknown Error has occured!'
    })
}

/**
 * Scrapes lyrics out from a Genius URL
 * @param url Genius URL
 * @returns Lyrics in plain text
 */
export function scrapeLyricsFromURL (url: string): Promise<string> {
  return Promise.resolve(scrapeUntilSuccess(url))
}
