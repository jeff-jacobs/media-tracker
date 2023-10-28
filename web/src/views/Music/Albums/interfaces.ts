import { Artist } from "../Artists/interfaces";

export type Album = {
  id: number;
  name: string;
  release: string;
  artist: Artist;
  cover_art: string;
}