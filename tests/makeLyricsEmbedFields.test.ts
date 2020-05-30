import { makeLyricsEmbedField } from '../utils/formLyricsFields'

test('1 Correct Section', async () => {
  const lyrics = '[Section Head]\nThis is a lyrics'

  const embed = await makeLyricsEmbedField(lyrics)

  expect(embed[0]).toEqual({
    name: '[Section Head]',
    value: 'This is a lyrics',
    inline: false
  })
})
