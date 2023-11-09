import { Artist } from "../Artists/interfaces";

export interface Album {
  id: number;
  name: string;
  release: string;
  artist: Artist;
  cover_art: string;
}

export interface RankedAlbumList {
  id: number;
  name: string;
  albums: Album[];
}

export type AlbumContext = 'simple' | 'list' | 'artist';