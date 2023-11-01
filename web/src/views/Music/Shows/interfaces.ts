import { Venue } from 'src/views/Music/Venues/interfaces';
import { Artist } from '../Artists/interfaces';

export type Show = {
  id: number;
  date: string;
  sets: Set[];
  venue: Venue;
}

export type Set = {
  id: number;
  artist: Artist;
}