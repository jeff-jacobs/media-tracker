import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import ViewHeader from '@/components/ViewHeader';
import { THEME_SECONDARY } from '@/constants/general';
import { Artist } from './interfaces';
import AddArtistDialog from './components/AddArtistDialog';

const LIMIT = 36;

interface Props {
  showId?: number;
}

const Artists: React.FC<Props> = ({
  showId,
}):React.ReactElement => {

  const [artists, setArtists] = React.useState<Artist[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>();
  
  React.useEffect(() => {
    axios.get('http://localhost:8000/music/artists/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        name: searchValue,
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
      <ViewHeader onSearch={(value: string) => setSearchValue(value)}>Artists</ViewHeader>
      <AddArtistDialog />
      {artists.length ?
        <>
          <ArtistList>
          {artists?.map(artist =>
            <ArtistItem key={artist.id}>
              <Link to={`/music/artists/${artist.id}`}>
                <div className="name">{artist.name}</div>
                {/* <div className="details">{artist.sets.length} {artist.sets.length === 1 ? 'Show' : 'Shows'}</div> */}
              </Link>
            </ArtistItem>
          )}
        </ArtistList>
        {totalPages > 1 && <Pagination
          style={{ marginTop: '10px' }}
          count={totalPages}
          onChange={(event: any, value: number) => setPage(value)}
        />}
      </>
      : (<div>No artists available.</div>)
      }
    </>
  )
}

const ArtistList = styled('ul')({
  listStyle: 'none',
  display: 'grid',
  margin: '0',
  padding: '0',
  width: '100%',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
  gridGap: '10px',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  }
})

const ArtistItem = styled('li')({
  textAlign: 'center',
  background: 'black',
  '& a': {
    display: 'block',
    padding: '20px',
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