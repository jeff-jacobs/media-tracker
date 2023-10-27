import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { ViewHeader, ViewHeaderSearchContainer } from 'src/components/ViewHeader';

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
  const [searchInput, setSearchInput] = React.useState<string>();

  const handleSearchInputChanged = (event: any) => {
    setSearchInput(event.target.value);
  }

  const handleSearchInputKeydown = (event: any) => {
    if (event.keyCode === 13) {
      handleSearchSubmitted();
    }
  }

  const handleSearchSubmitted = () => {
    setSearchValue(searchInput);
  }


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
      <ViewHeaderSearchContainer>
        <ViewHeader>Venues</ViewHeader>
        <div style={{ padding: '10px 0' }}>
          <input
            type="text"
            name="user"
            value={searchInput}
            onChange={handleSearchInputChanged}
            onKeyDown={handleSearchInputKeydown}
          />
          <button onClick={handleSearchSubmitted}>Search Album</button>
        </div>
      </ViewHeaderSearchContainer>
      <ul>
        {venues.length ? venues?.map(venue =>
          <li key={venue.id}>
            <Link to={`/music/venues/${venue.id}`}>{venue.name}</Link>
          </li>
        ) : (<li>No venues currently.</li>)}
      </ul>
      <Pagination
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />
    </>
  )
}

export default Venues;