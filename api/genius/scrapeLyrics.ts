/* eslint-disable quote-props */
// Goal: Genius URL => Lyrics
// Things that can go wrong: Lyrics is empty

import fetch from 'node-fetch'
import cheerio from 'cheerio'
require('dotenv').config()

// Genius scraping is very unreliable
// Sometimes, Genius doesn't display the selected tag
// Limiting this to 5 because 2 tries should be enough to get the lyrics
// Might wanna to move to a glitch.me API, using cheerio to get the lyrics
export async function scrapeUntilSuccess (url: string): Promise<string> {
  return fetch(url, {
    headers: {
      'Cookie': [
        `cf_clearance=${process.env.CF_CLEARANCE}`
      ].join('; '),
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36 Edg/83.0.478.64'
    }
  })
    .then(res => res.text())
    .then(async res => {
      // Using Cheerio to parse HTML, accessible using JQuery syntax
      // Loads the page HTML
      const $ = cheerio.load(res)

      // Selects <div class="lyrics"> and returns the text
      let lyrics = $('div[class=lyrics]').text()

      // Trims whitespaces
      lyrics.trim()

      // Recursive
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (lyrics === '') { lyrics = await scrapeLyricsFromURL(url) }
      return lyrics
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
