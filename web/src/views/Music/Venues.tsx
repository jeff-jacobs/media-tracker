import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ViewHeader from 'src/components/ViewHeader';

const LIMIT = 30;

export type Venue = {
  id: number;
  name: string;
}

const Venues: React.FC = ():React.ReactElement => {

  const [venues, setVenues] = React.useState<Venue[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | undefined>(undefined);
  const [searchValue, setSearchValue] = React.useState<string>();

  React.useEffect(() => {
    axios.get('http://localhost:8000/api/music/venues/', {
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
      <ViewHeader onSearch={(value) => setSearchValue(value)}>Venues</ViewHeader>
      <ul>
        {venues.length ? venues?.map(venue =>
          <li key={venue.id}>
            <Link to={`/music/venues/${venue.id}`}>{venue.name}</Link>
          </li>
        ) : (<li>No venues currently.</li>)}
      </ul>
      <Pagination
        style={{ marginTop: '10px' }}
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />
    </>
  )
}

export default Venues;