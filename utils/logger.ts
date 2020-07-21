import pino from 'pino'
require('dotenv').config()

const logger = pino()

export default logger

export interface SearchEntry {
  tags: {
    status: 'success' | 'failed';
    method: 'search' | 'nowplaying' | 'autosearch';
  };
  fields: {
    query?: string;
    songTitle?: string;
    songArtist?: string;
    totalTime?: number;
  };
  message?: string;
}

export const log = logger.info

export async function logSearches (data: SearchEntry): Promise<void> {
  const { query, songTitle, songArtist, totalTime } = data.fields
  logger.info({ query, songTitle, songArtist, totalTime }, data.message ?? `${data.tags.method} ${data.tags.status}`)
}
