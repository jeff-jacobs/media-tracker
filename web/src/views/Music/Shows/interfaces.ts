import { Artist } from '../Artists/interfaces';
import { Venue } from '../Venues';

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