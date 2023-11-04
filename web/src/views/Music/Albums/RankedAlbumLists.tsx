import React from 'react';
import axios from 'axios';
import ViewHeader from 'src/components/ViewHeader';
import { RankedAlbumList } from './interfaces';
import RankedAlbumListDetail from './RankedAlbumList';

interface Props {
  artistId: number;
}

const RankedAlbumLists: React.FC<Props> = ({
  artistId
}):React.ReactElement => {

  const [rankedAlbumLists, setRankedAlbumLists] = React.useState<RankedAlbumList[]>([]);

  React.useEffect(() => {
    axios.get(`http://localhost:8000/music/ranked-album-lists`, {
      params: {
        artist__id: artistId,
      }
    })
    .then(res => setRankedAlbumLists(res.data.results))
    .catch((err) => console.log(err));
  }, [artistId])

  return (
    <>
      <ViewHeader>
        Ranked Albums
      </ViewHeader>
      {rankedAlbumLists.length ? rankedAlbumLists.map((list: RankedAlbumList) => {
        return <RankedAlbumListDetail listId={list.id} key={list.id} />
      }) : 'No ranked albums available.'}
    </>
  )
}

export default RankedAlbumLists;