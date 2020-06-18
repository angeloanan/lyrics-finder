import { SpotifyAlbum } from './SpotifyAlbum'
import { SpotifyArtistSimplified } from './SpotifyArtist'

export interface SpotifyExternalID {
  isrc?: string;
  ean?: string;
  upc?: string;
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtistSimplified;
  available_market: string;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: SpotifyExternalID;
  external_urls: {spotify: string};
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: 'track';
  uri: string;
}
