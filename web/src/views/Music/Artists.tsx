import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import ViewHeader from 'src/components/ViewHeader';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const LIMIT = 30;

export type Artist = {
  id: number;
  name: string;
  sets: number[];
}

const Artists: React.FC = ():React.ReactElement => {

  const [searchValue, setSearchValue] = React.useState<string>();
  const [searchInput, setSearchInput] = React.useState<string>();

  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number | undefined>(undefined);

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
    axios.get('http://localhost:8000/api/music/artists/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        search: searchValue,
      }
    })
    .then(res => {
      setArtists(res.data.results);
      setTotalPages(Math.ceil(res.data.count / LIMIT));
    })
    .catch((err) => console.log(err));
  }, [searchValue, page, totalPages])

  return (
    <>
      <ViewHeader>Artists</ViewHeader>
      <div style={{marginBottom: '10px'}}>
        <input
          type="text"
          name="user"
          value={searchInput}
          onChange={handleSearchInputChanged}
          onKeyDown={handleSearchInputKeydown}
        />
        <button onClick={handleSearchSubmitted}>Search Artist</button>
      </div>
      <ArtistList>
        {artists.length ? artists?.map(artist =>
            <ArtistItem key={artist.id}>
              <Link to={`/music/artists/${artist.id}`}>
                {artist.name}
                <div>{artist.sets.length}</div>
              </Link>
            </ArtistItem>
        ) : (<li>No artists currently.</li>)}
      </ArtistList>
      <Pagination
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />
    </>
  )
}

const ArtistList = styled('ul')({
  listStyle: 'none',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  margin: 0,
  padding: 0,
  width: '100%'
})

const ArtistItem = styled('li')({
  flex: '0 0 250px',
  border: '1px gray solid',
  padding: '20px',
  textAlign: 'center',
})

export default Artists;