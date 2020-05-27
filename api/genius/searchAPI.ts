import fetch from 'node-fetch'
import { geniusAPIBaseURL as APIBaseURL } from '../../config'
import { Convert as convert, SearchResult } from '../../types/GeniusAPI'
require('dotenv').config()

/**
 * Searches Genius for lyrics
 * @param query Search Query
 * @returns {Promise<SearchResult>} Genius search result
 */
export function searchAPI (query: string): Promise<SearchResult> {
  return new Promise((resolve, reject) => {
    if (!process.env.GENIUS_TOKEN) throw new Error('Genius Token not provided')

    const searchTermEncoded = encodeURI(query)

    const authHeader = 'Bearer ' + process.env.GENIUS_TOKEN
    const searchURL = APIBaseURL + '/search?q=' + searchTermEncoded

    fetch(searchURL, { headers: { Authorization: authHeader } })
      .then(res => res.text())
      .then(res => {
        const searchResult = convert.toSearchResult(res)
        if (searchResult.meta.status !== 200) reject(new Error('Genius Meta Status ' + searchResult.meta.status))
        resolve(searchResult)
      })
      .catch(err => reject(err))
  })
}

exports.searchAPI = searchAPI
