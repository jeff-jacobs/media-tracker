import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import styled from '@emotion/styled';
import { ViewHeader, ViewHeaderSearchContainer } from 'src/components/ViewHeader';
import { Album } from './interfaces';

const LIMIT = 30;

interface Props {
  artistId?: number;
}

const Albums: React.FC<Props> = ({
  artistId,
}):React.ReactElement => {

  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);

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
    axios.get('http://localhost:8000/api/music/albums/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        search: searchValue,
        artist__id: artistId,
      }
    })
    .then(res => {
      setAlbums(res.data.results);
      setTotalPages(Math.ceil(res.data.count / LIMIT));
    })
    .catch((err) => console.log(err));
  }, [artistId, searchValue, page])

  return (
    <>
      <ViewHeaderSearchContainer>
        <ViewHeader>Albums</ViewHeader>
        <div style={{ padding: '10px 0'}}>
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
      <AlbumList>
        {albums.length ? albums?.map(album =>
          <li key={album.id}>
            <img src={album.cover_art} alt={`${album.artist.name} - ${album.name}`}></img>
            {!artistId && album.artist.name} "{album.name}"
          </li>
        ) : (<li>No albums currently.</li>)}
      </AlbumList>
      {totalPages > 1 && <Pagination
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />}
    </>
  )
}

const AlbumList = styled('ul')({
  display: 'grid',
  listStyle: 'none',
  margin: '0',
  padding: '0',
  gridTemplateColumns: '15% 15% 15% 15% 15% 15%',
  gridGap: '10px',
  '& img': {
    width: '100%',
  }
})

export default Albums;