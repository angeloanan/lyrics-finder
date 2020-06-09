import { getRecentTracks } from '../../../api/lastfm/getUserRecentTracks'

test('Getting a valid user\'s recent tracks', async () => {
  const tracks = await getRecentTracks('angeloanan')

  expect(tracks).not.toBeUndefined()
  expect(tracks).not.toBeNull()
})

test('Getting an invalid user\'s recent tracks', async () => {
  const tracks = getRecentTracks('hceoruhoceuraotensaou')

  return expect(tracks).rejects.toStrictEqual(new Error('User not found'))
})
