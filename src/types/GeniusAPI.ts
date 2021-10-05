/* eslint-disable */
export interface SearchResult {
  meta: Meta
  response: Response
}

export interface Meta {
  status: number
}

export interface Response {
  hits: Hit[]
}

export interface Hit {
  highlights: any[]
  index: Index
  type: Index
  result: Result
}

export enum Index {
  Song = 'song'
}

export interface Result {
  songArtImageURL: string
  annotation_count: number
  api_path: string
  full_title: string
  header_image_thumbnail_url: string
  header_image_url: string
  id: number
  lyrics_owner_id: number
  lyrics_state: LyricsState
  path: string
  pyongs_count: number | null
  song_art_image_thumbnail_url: string
  song_art_image_url: string
  song_art_primary_color: null
  song_art_secondary_color: null
  song_art_text_color: null
  stats: Stats
  title: string
  title_with_featured: string
  url: string
  primary_artist: PrimaryArtist
}

export enum LyricsState {
  Complete = 'complete',
  Unreleased = 'unreleased'
}

export interface PrimaryArtist {
  api_path: string
  header_image_url: string
  id: number
  image_url: string
  is_meme_verified: boolean
  is_verified: boolean
  name: string
  url: string
  iq?: number
}

export interface Stats {
  unreviewed_annotations: number
  concurrents?: number
  hot: boolean
  pageviews?: number
}
