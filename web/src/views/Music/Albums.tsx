import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import { ViewHeader, ViewHeaderSearchContainer } from 'src/components/ViewHeader';
import { Artist } from './Artists';

const LIMIT = 30;

type Album = {
  id: number;
  name: string;
  release: string;
  artist: Artist;
}

const Albums: React.FC = ():React.ReactElement => {

  const [albums, setAlbums] = React.useState<Album[]>([]);
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
    axios.get('http://localhost:8000/api/music/albums/', {
      params: {
        offset: (page - 1) * LIMIT,
        limit: LIMIT,
        search: searchValue
      }
    })
    .then(res => {
      setAlbums(res.data.results);
      if (!totalPages) {
        setTotalPages(Math.ceil(res.data.count / LIMIT));
      }
    })
    .catch((err) => console.log(err));
  }, [searchValue, page])

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
      <ul>
        {albums.length ? albums?.map(album =>
          <li key={album.id}>
            {album.artist.name} "{album.name}"
          </li>
        ) : (<li>No albums currently.</li>)}
      </ul>
      <Pagination
        count={totalPages}
        onChange={(event: any, value: number) => setPage(value)}
      />
    </>
  )
}

export default Albums;