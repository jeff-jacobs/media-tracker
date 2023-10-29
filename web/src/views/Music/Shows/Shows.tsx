import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Pagination } from '@mui/material';
import { Show } from './interfaces';
import ViewHeader from 'src/components/ViewHeader';

const LIMIT = 20;

interface Props {
  artistId?: number;
  venueId?: number;
}

const Shows: React.FC<Props> = ({
  artistId,
  venueId,
}):React.ReactElement => {

  const [shows, setShows] = React.useState<Show[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);

  React.useEffect(() => {
    console.log(artistId);
    axios.get('http://localhost:8000/api/music/shows/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        sets__artist__id: artistId,
        venue__id: venueId,
      }
    })
    .then(res => {
      setShows(res.data.results)
      setTotalPages(Math.ceil(res.data.count / LIMIT));
    })
    .catch((err) => console.log(err));
  }, [artistId, venueId, page])


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
      {totalPages > 1 && (
        <Pagination
          style={{ marginTop: '10px' }}
          count={totalPages}
          onChange={(event: any, value: number) => setPage(value)}
        />
      )}
    </>
  )
}

export default Shows;