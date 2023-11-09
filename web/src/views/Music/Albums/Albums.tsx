import React from 'react';
import axios from 'axios';
import { Pagination } from '@mui/material';
import ViewHeader from '@/components/ViewHeader';
import { Album, AlbumContext } from './interfaces';
import AlbumGrid from './AlbumGrid';

const LIMIT = 30;

interface Props {
  artistId?: number;
  context?: AlbumContext;
}

const Albums: React.FC<Props> = ({
  artistId,
  context = 'list',
}):React.ReactElement => {

  const [albums, setAlbums] = React.useState<Album[]>([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [searchValue, setSearchValue] = React.useState<string>();

  React.useEffect(() => {
    axios.get('http://localhost:8000/music/albums/', {
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
      <ViewHeader onSearch={(value) => setSearchValue(value)}>Albums</ViewHeader>
      {albums.length ? 
        <>
          <AlbumGrid albums={albums} context={context}></AlbumGrid>
          {totalPages > 1 && <Pagination
            style={{ marginTop: '10px' }}
            count={totalPages}
            onChange={(event: any, value: number) => setPage(value)}
          />}
        </>
        : <div>No albums available.</div>
      }
      
    </>
  )
}

export default Albums;