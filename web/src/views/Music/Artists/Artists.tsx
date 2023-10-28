import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ViewHeader, ViewHeaderSearchContainer } from 'src/components/ViewHeader';
import { THEME_SECONDARY } from 'src/constants/general';
import { Artist } from './interfaces';

const LIMIT = 36;

interface Props {
  showId?: number;
}

const Artists: React.FC<Props> = ({
  showId,
}):React.ReactElement => {

  const [searchValue, setSearchValue] = React.useState<string>();
  const [searchInput, setSearchInput] = React.useState<string>();

  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);

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
        sets__show__id: showId,
      }
    })
    .then(res => {
      setArtists(res.data.results);
      setTotalPages(Math.ceil(res.data.count / LIMIT));
    })
    .catch((err) => console.log(err));
  }, [showId, searchValue, page]);

  return (
    <>
      <ViewHeaderSearchContainer>
        <ViewHeader>Artists</ViewHeader>
        <div style={{ padding: '10px 0'}}>
          <input
            type="text"
            name="user"
            value={searchInput}
            onChange={handleSearchInputChanged}
            onKeyDown={handleSearchInputKeydown}
          />
          <button onClick={handleSearchSubmitted}>Search Artist</button>
        </div>
      </ViewHeaderSearchContainer>
      <ArtistList>
        {artists.length ? artists?.map(artist =>
            <ArtistItem key={artist.id}>
              <Link to={`/music/artists/${artist.id}`}>
                <div className="name">{artist.name}</div>
                {/* <div className="details">{artist.sets.length} {artist.sets.length === 1 ? 'Show' : 'Shows'}</div> */}
              </Link>
            </ArtistItem>
        ) : (<li>No artists currently.</li>)}
      </ArtistList>
      {totalPages > 1 && <Pagination
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />}
    </>
  )
}

const ArtistList = styled('ul')({
  listStyle: 'none',
  display: 'grid',
  gridTemplateColumns: '25% 25% 25% 25%',
  gridGap: '8px',
  margin: 0,
  padding: 0,
  width: '100%',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: '33% 33% 33%',
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: '50% 50%',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '100%',
  }
})

const ArtistItem = styled('li')({
  padding: '20px',
  textAlign: 'center',
  background: 'black',
  '& a': {
    textDecoration: 'none',
  },
  '& .name': {
    fontSize: '1.25rem',
    fontWeight: 700,
  },
  '& .details': {
    fontSize: '0.875rem',
    color: THEME_SECONDARY,
  }
})

export default Artists;