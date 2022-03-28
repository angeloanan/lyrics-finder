import exe from 'execall'

import { LyricsRegex } from '../src/config'

test('Simple Section Head + Body', () => {
  const lyrics = '[Section Head]\nThis is a lyrics'.trim()

  const processedLyrics = exe(LyricsRegex, lyrics)[0].subMatches

  expect(processedLyrics[0]).toEqual('[Section Head]')
  expect(processedLyrics[1]).toEqual('This is a lyrics')
})

test('Section Head + Empty Body', () => {
  const lyrics = '[Section Head]\n'

  const processedLyrics = exe(LyricsRegex, lyrics)[0].subMatches

  expect(processedLyrics[0]).toEqual('[Section Head]')
  expect(processedLyrics[1]).toBeUndefined()
})

test('2 Section Heads + 2 Bodies', () => {
  const lyrics =
    '[Section Head 1]\nThis should be a lyric\n\n[Section Head 2]\nAnother lyrics is here'

  const processedLyrics = exe(LyricsRegex, lyrics)

  expect(processedLyrics[0].subMatches[0]).toEqual('[Section Head 1]')
  expect(processedLyrics[0].subMatches[1]).toEqual('This should be a lyric\n\n')
  expect(processedLyrics[1].subMatches[0]).toEqual('[Section Head 2]')
  expect(processedLyrics[1].subMatches[1]).toEqual('Another lyrics is here')
})

test('Instrumental Lyrics', () => {
  const lyrics = '[Instrumental]'

  const processedLyrics = exe(LyricsRegex, lyrics)[0].subMatches

  expect(processedLyrics[0]).toEqual('[Instrumental]')
  expect(processedLyrics[1]).toBeUndefined()
})
