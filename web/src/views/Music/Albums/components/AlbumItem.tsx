import React from 'react';
import { Album, AlbumContext } from '../interfaces';
import styled from '@emotion/styled';

interface Props {
  album: Album;
  context?: AlbumContext;
}

const AlbumItem: React.FC<Props> = ({
  album,
  context,
}):React.ReactElement => {
  return (
    <AlbumItemWrapper key={album.id}>
      <img src={album.cover_art} alt={`${album.artist.name} - ${album.name}`}></img>
      {context === 'list' &&
        <div className="text">
          <div>{album.artist.name}</div>
          <div>"{album.name}"</div>
        </div>
      }
      {context === 'artist' &&
        <div className="text">
          <div>"{album.name}"</div>
          <div>{album.release}</div>
        </div>
      }
    </AlbumItemWrapper>
  )
}

const AlbumItemWrapper = styled('div')({
  borderRadius: '5px',
  overflow: 'hidden',
  background: 'black',
  '& .text': {
    padding: '6px 10px 10px',
  },
  '& img': {
    width: '100%',
  }
})

export default AlbumItem;