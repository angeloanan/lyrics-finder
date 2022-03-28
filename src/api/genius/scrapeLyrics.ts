import 'dotenv/config'

import fetch from 'node-fetch'
import pRetry from 'p-retry'

// Goal: Genius URL => Lyrics
// Things that can go wrong: Lyrics is empty

// Genius scraping is very unreliable
// Sometimes, Genius doesn't display the selected tag
// Limiting this to 5 because 2 tries should be enough to get the lyrics

if (process.env.BACKEND_URL == null) throw new Error('Backend URL not supplied')

interface ScrapeSuccessResponse {
  lyrics: string
}

export function scrapeLyricsFromURL(url: string): Promise<string> {
  return pRetry(
    async () => {
      const backendUrl = process.env.BACKEND_URL as string

      const fetchRequest = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: url })
      })

      if (!fetchRequest.ok) throw 'Upstream not ok'
      const fetchData = (await fetchRequest.json()) as ScrapeSuccessResponse

      return fetchData.lyrics
    },
    {
      retries: 5
    }
  )
}
