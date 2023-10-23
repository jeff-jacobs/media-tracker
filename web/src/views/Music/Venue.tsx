import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ViewHeader from 'src/components/ViewHeader';
import { Venue } from './Venues';

const VenueDetail: React.FC = ():React.ReactElement => {

  const { id } = useParams();
  const [venue, setVenue] = React.useState<Venue>();

  React.useEffect(() => {
    axios.get(`http://localhost:8000/api/music/venues/${id}/`)
    .then(res => setVenue(res.data))
    .catch((err) => console.log(err));
  }, [id])

  return (
    <>
      <ViewHeader>{venue?.name || 'Error'}</ViewHeader>
    </>
  )
}

export default VenueDetail;