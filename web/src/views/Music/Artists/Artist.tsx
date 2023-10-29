import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ViewHeader from 'src/components/ViewHeader';
import { Artist } from './interfaces';
import Shows from '../Shows/Shows';
import Albums from '../Albums/Albums';

const ArtistDetail: React.FC = ():React.ReactElement => {

  const { id } = useParams();
  const [artist, setArtist] = React.useState<Artist>();

  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/music/artists/${id}/`)
    .then(res => setArtist(res.data))
    .catch((err) => console.log(err));
  }, [id])

  return (
    <>
      <ViewHeader>
        <div className='parent'>Artists</div>
        {artist?.name || 'Error'}
      </ViewHeader>
      {artist && <Shows artistId={artist?.id} />}
      {artist && <Albums artistId={artist?.id} />}
    </>
  )
}

export default ArtistDetail;