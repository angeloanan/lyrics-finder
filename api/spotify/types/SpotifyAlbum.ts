import { SpotifyArtistSimplified } from './SpotifyArtist'

export interface SpotifyAlbum {
  album_group?: 'album' | 'single' | 'compilation' | 'appears_on';
  album_type: 'album' | 'single' | 'compilation';
  artists: SpotifyArtistSimplified[];
  available_markets: string[];
  external_urls: object;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string | '';
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  restriction: object;
  type: 'album';
  uri: string;
}

export interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}
