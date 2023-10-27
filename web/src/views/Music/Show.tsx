import React from 'react';
import axios from 'axios';
import { ViewHeader } from 'src/components/ViewHeader';
import { Show } from './Shows';
import { Link, useParams } from 'react-router-dom';

const ShowDetail: React.FC = ():React.ReactElement => {

  const { id } = useParams();
  const [show, setShow] = React.useState<Show>();

  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/music/shows/${id}`)
    .then(res => setShow(res.data))
    .catch((err) => console.log(err));
  }, [id])

  return (
    <>
      <ViewHeader>
        <div className='parent'>Shows</div>
        {show ? `${show.date} - ${show.venue.name}` : 'Error'}
      </ViewHeader>
      <ul>
        {show?.sets?.map(set => (
          <li>
            <Link to={`/music/artists/${set.artist.id}/`}>
              {set.artist.name}
            </Link>
          </li>
        )) || <li>No sets available.</li>}
      </ul>
    </>
  )
}

export default ShowDetail;