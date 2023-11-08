import React from 'react';
import styled from '@emotion/styled';
import { Album } from './interfaces';

interface Props {
  albums: Album[];
  hideArtistName?: boolean;
}

const AlbumGrid: React.FC<Props> = ({
  albums,
  hideArtistName = false,
}):React.ReactElement => {

  return (
    <AlbumList>
      {albums?.map(album =>
        <li key={album.id}>
          <img src={album.cover_art} alt={`${album.artist.name} - ${album.name}`}></img>
          <div className="text">{!hideArtistName && album.artist.name} "{album.name}"</div>
        </li>
      )}
    </AlbumList>
  )
}

const AlbumList = styled('ul')({
  display: 'grid',
  listStyle: 'none',
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
  '& li': {
    borderRadius: '5px',
    overflow: 'hidden',
    background: 'black',
  },
  '& .text': {
    padding: '6px 10px 10px',
  },
  '& img': {
    width: '100%',
  }
})

export default AlbumGrid;