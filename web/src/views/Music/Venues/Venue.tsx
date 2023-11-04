import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ViewHeader from 'src/components/ViewHeader';
import Shows from '../Shows/Shows';
import { Venue } from './interfaces';

const VenueDetail: React.FC = ():React.ReactElement => {

  const { id } = useParams();
  const [venue, setVenue] = React.useState<Venue>();

  React.useEffect(() => {
    axios.get(`http://localhost:8000/music/venues/${id}/`)
    .then(res => setVenue(res.data))
    .catch((err) => console.log(err));
  }, [id])

  return (
    <>
      <ViewHeader>
        <div className='parent'>Venues</div>
        {venue?.name || 'Error'}
      </ViewHeader>
      {venue && <Shows venueId={venue.id} />}
    </>
  )
}

export default VenueDetail;