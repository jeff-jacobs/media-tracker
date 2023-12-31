import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ViewHeader from '@/components/ViewHeader';
import { Venue } from './interfaces';

const LIMIT = 30;

const Venues: React.FC = ():React.ReactElement => {

  const [venues, setVenues] = React.useState<Venue[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | undefined>(undefined);
  const [searchValue, setSearchValue] = React.useState<string>();

  React.useEffect(() => {
    axios.get('http://localhost:8000/music/venues/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        search: searchValue
      }
    })
    .then(res => {
      setVenues(res.data.results);
      setTotalPages(Math.ceil(res.data.count / LIMIT));
    })
    .catch((err) => console.log(err));
  }, [searchValue, page])

  return (
    <>
      <ViewHeader onSearch={(value: string) => setSearchValue(value)}>Venues</ViewHeader>
      {venues.length ? 
        <>
          <ul>
            {venues?.map(venue =>
              <li key={venue.id}>
                <Link to={`/music/venues/${venue.id}`}>{venue.name}</Link>
              </li>
            )}
          </ul>
          <Pagination
            style={{ marginTop: '10px' }}
            count={totalPages}
            onChange={(event: any, value: number) => setPage(value)}
          />
        </>
      : (<li>No venues available.</li>)}
    </>
  )
}

export default Venues;