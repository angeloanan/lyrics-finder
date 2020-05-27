import fetch from 'node-fetch'
import cheerio from 'cheerio'

export function scrapeLyrics (url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => res.text())
      .then(res => {
        try {
          // Using Cheerio to parse HTML
          // Loads the full page HTML
          const $ = cheerio.load(res)

          // Selects <div class="lyrics"> and converts it to text
          const lyrics = $('div[class=lyrics]').text()

          // Trims whitespaces from Lyrics
          lyrics.trim()

          resolve(lyrics)
        } catch (err) {
          // Cheerio Error
          reject(new Error('Cheerio Error ' + err))
        }
      })
      // Fetch error
      .catch(err => reject(new Error('Fetch Error ' + err)))
  })
}
