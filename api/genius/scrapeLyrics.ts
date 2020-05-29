// Goal: Genius URL => Lyrics
// Things that can go wrong: Lyrics is empty

import fetch from 'node-fetch'
import cheerio from 'cheerio'

// Genius scraping is very unreliable
// Sometimes, Genius doesn't display the selected tag
// Limiting this to 5 because 2 tries should be enough to get the lyrics
// Might wanna to move to a glitch.me API, using cheerio to get the lyrics
export async function scrapeUntilSuccess (url: string): Promise<string> {
  return fetch(url)
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
