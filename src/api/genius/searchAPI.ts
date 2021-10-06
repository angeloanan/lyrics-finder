import 'dotenv/config'

import { geniusAPIBaseURL as APIBaseURL } from '../../../config'
import { SearchResult } from '../../types/GeniusAPI'
import fetch from 'node-fetch'
import logger from '../../utils/logger'
import { newError } from '../../utils'

/**
 * Searches Genius for lyrics
 * @param query Search Query
 * @returns {Promise<SearchResult>} Genius search result
 * @throws {genius/token} Genius token is not provided
 * @throws {genius/status} Genius meta is not 200
 */
export async function searchAPI(query: string): Promise<SearchResult> {
  try {
    if (process.env.GENIUS_TOKEN == null)
      throw newError('genius/token', 'Genius token not provided')

    const authHeader = `Bearer ${process.env.GENIUS_TOKEN}`
    const searchURL = `${APIBaseURL}/search?q=${encodeURI(query)}`

    const fetchRequest = await fetch(searchURL, {
      headers: { Authorization: authHeader }
    })
    const fetchData = await fetchRequest.json()
    const searchResult = fetchData as SearchResult

    if (searchResult.meta.status !== 200) {
      logger.warn(
        { query, searchResult },
        `Upstream Error: Genius Meta Status ${searchResult.meta.status}`
      )
      throw newError('genius/status', `Genius meta status ${searchResult.meta.status}`)
    }

    return searchResult
  } catch (e) {
    const error = e as Error

    switch (error.name) {
      case 'genius/status':
        throw e
      case 'genius/token':
        throw new Error('Something went horribly wrong upstream')
      default:
        throw e
    }
  }
}
