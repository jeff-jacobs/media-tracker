import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ViewHeader from 'src/components/ViewHeader';
import { Show } from './interfaces';
import Artists from '../Artists/Artists';

const ShowDetail: React.FC = ():React.ReactElement => {

  const { id } = useParams();
  const [show, setShow] = React.useState<Show>();

  React.useEffect(() => {
    axios.get(`http://localhost:8000/music/shows/${id}`)
    .then(res => setShow(res.data))
    .catch((err) => console.log(err));
  }, [id])

  return (
    <>
      <ViewHeader>
        <div className='parent'>Shows</div>
        {show ? `${show.date} - ${show.venue.name}` : 'Error'}
      </ViewHeader>
      {show && <Artists showId={show?.id}></Artists>}
    </>
  )
}

export default ShowDetail;