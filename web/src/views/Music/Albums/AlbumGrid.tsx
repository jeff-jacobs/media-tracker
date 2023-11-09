import React from 'react';
import styled from '@emotion/styled';
import { Album, AlbumContext } from './interfaces';
import AlbumItem from './components/AlbumItem';

interface Props {
  albums: Album[];
  context: AlbumContext;
}

const AlbumGrid: React.FC<Props> = ({
  albums,
  context = 'simple',
}):React.ReactElement => {

  return (
    <AlbumGridWrapper>
      {albums?.map(album =>
        <AlbumItem key={album.id} album={album} context={context} />
      )}
    </AlbumGridWrapper>
  )
}

export const AlbumGridWrapper = styled('div')({
  display: 'grid',
  margin: '0 0 20px',
  padding: '0',
  gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
  gridGap: '10px',
  '@media (max-width: 1200px)': {
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  },
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr 1fr 1fr',
  },
  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr 1fr',
  },
  '@media (max-width: 400px)': {
    gridTemplateColumns: '1fr',
  },
})

export default AlbumGrid;