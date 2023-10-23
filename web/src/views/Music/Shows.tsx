import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import ViewHeader from 'src/components/ViewHeader';
import { Artist } from './Artists';
import { Venue } from './Venues';

const LIMIT = 20;

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

const Shows: React.FC = ():React.ReactElement => {

  const [shows, setShows] = React.useState<Show[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/music/shows/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
      }
    })
    .then(res => {
      setShows(res.data.results)
      if (!totalPages) {
        setTotalPages(Math.ceil(res.data.count / LIMIT));
      }
    })
    .catch((err) => console.log(err));
  }, [page, totalPages])


  return (
    <>
      <ViewHeader>Shows</ViewHeader>
      <ul>
        {shows.length ? shows?.map(show =>
          <li key={show.id}>
            <Link to={`/music/shows/${show.id}`}>{show.date} - {show.venue.name} - {show.sets?.map(set => set.artist.name).join(', ')}</Link>
          </li>
        ) : (<li>No shows currently.</li>)}
      </ul>
      <Pagination
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />
    </>
  )
}

export default Shows;