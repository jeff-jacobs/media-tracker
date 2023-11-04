import axios from 'axios';
import React from 'react';
import { Album, RankedAlbumList } from './interfaces';

interface Props {
  listId: number;
}

interface RankedAlbum {
  album: Album;
  id: number;
  order: number;
  rank: 'A' | 'B' | 'C' | 'D' | 'F' | undefined;
}

type RankedLists = {
  none: RankedAlbum[];
  A: RankedAlbum[];
  B: RankedAlbum[];
  C: RankedAlbum[];
  D: RankedAlbum[];
  F: RankedAlbum[];
}

const RankedAlbumListDetail: React.FC<Props> = ({
  listId
}):React.ReactElement => {

  const [listName, setListName] = React.useState<RankedAlbumList>();
  const [lists, setLists] = React.useState<RankedLists>({
    none: [],
    A: [],
    B: [],
    C: [],
    D: [],
    F: [],
  })

  const sortLists = (rankedAlbums: RankedAlbum[]): RankedLists => {
    return rankedAlbums.reduce((accumulatedLists: RankedLists, album: RankedAlbum) => {
      accumulatedLists[album.rank || 'none'] = [
        ...accumulatedLists[album.rank || 'none'],
        album,
      ];
      return accumulatedLists;
    }, {
      none: [],
      A: [],
      B: [],
      C: [],
      D: [],
      F: [],
    });
  }

  React.useEffect(() => {
    axios.get(`http://localhost:8000/music/ranked-album-lists/${listId}`)
    .then(res => {
      setListName(res.data.name);
      setLists(sortLists(res.data.albums));
    })
    .catch((err) => console.log(err));
  }, [listId])

  return (
    <>
      {listName}
      {Object.entries(lists).map(([key, value]) => (
        <div key={key}>
          {key}: {' '}
          {value.map((rankedAlbum: RankedAlbum) => rankedAlbum.album.name).join(', ')}
        </div>
      ))}
    </>
  )
}

export default RankedAlbumListDetail;