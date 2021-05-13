import { makeLyricsEmbedField } from '../src/utils/embeds'

describe('Standard Lyrics', () => {
  test.concurrent('Single correct section', async () => {
    const lyrics = '[Section Head]\nThis is a lyrics'

    const embed = await makeLyricsEmbedField(lyrics)

    expect(embed[0]).toEqual({
      name: '[Section Head]',
      value: 'This is a lyrics',
      inline: false
    })
  })

  test.concurrent('Multiple correct section', async () => {
    const lyrics = '[Section 1]\nThis is the lyrics for section 1\n\n[Section 2]\nThis is the lyrics for section 2'

    const embed = await makeLyricsEmbedField(lyrics)

    expect(embed[0]).toEqual({
      name: '[Section 1]',
      value: 'This is the lyrics for section 1',
      inline: false
    })

    expect(embed[1]).toEqual({
      name: '[Section 2]',
      value: 'This is the lyrics for section 2',
      inline: false
    })
  })

  test.concurrent('Multiple correct section with linebreaks', async () => {
    const lyrics = '[Section 1]\nThis is the lyrics for section 1\nThis is the second line\n\n[Section 2]\nThis is the lyrics for section 2'

    const embed = await makeLyricsEmbedField(lyrics)

    expect(embed[0]).toEqual({
      name: '[Section 1]',
      value: 'This is the lyrics for section 1\nThis is the second line',
      inline: false
    })

    expect(embed[1]).toEqual({
      name: '[Section 2]',
      value: 'This is the lyrics for section 2',
      inline: false
    })
  })

  test.concurrent('Instrumental lyrics', async () => {
    const lyrics = '[Instrumental]'

    const embed = await makeLyricsEmbedField(lyrics)

    expect(embed[0]).toEqual({
      name: '[Instrumental]',
      value: '\u200B',
      inline: false
    })
  })
})

describe('Non-standard Lyrics', () => {
  test.concurrent('One-liners', async () => {
    const lyrics = 'Some lyrics here'
    const embed = await makeLyricsEmbedField(lyrics)

    expect(embed[0]).toEqual({
      name: '[Lyrics]',
      value: 'Some lyrics here',
      inline: false
    })
  })

  test.concurrent('Multiple lines', async () => {
    const lyrics = 'I\'ve seen the devil, yeah, I met him last night\nHad conversation, yeah, I think he\'s alright\nSeemed kinda funny, yeah, he kinda my type (Yeah, he\'s kinda my type)\nYeah, yeah, yeah\nI\'ve seen the devil, yeah, I met him last night\nOne conversation, now he\'s spendin\' the night\nI think I Iove him, though I know it ain\'t right'
    const embed = await makeLyricsEmbedField(lyrics)

    expect(embed[0]).toEqual({
      name: '[Lyrics]',
      value: 'I\'ve seen the devil, yeah, I met him last night\nHad conversation, yeah, I think he\'s alright\nSeemed kinda funny, yeah, he kinda my type (Yeah, he\'s kinda my type)\nYeah, yeah, yeah\nI\'ve seen the devil, yeah, I met him last night\nOne conversation, now he\'s spendin\' the night\nI think I Iove him, though I know it ain\'t right',
      inline: false
    })
  })
})
