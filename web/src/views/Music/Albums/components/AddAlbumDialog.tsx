import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Artist } from '../../Artists/interfaces';

type NewAlbum = {
  name: string;
  artist: number | undefined;
  cover_art?: string;
}

interface Props {
  artistId?: number;
  onAlbumAdded?: () => void;
}

const AddAlbumDialog: React.FC<Props> = ({
  artistId,
  onAlbumAdded,
}): React.ReactElement => {

  // const navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<NewAlbum>({
    name: '',
    artist: artistId,
    cover_art: '',
  });
  const [artistOptions, setArtistOptions] = React.useState<Artist[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setForm({
      name: '',
      artist: undefined,
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, id: string) => {
    setForm({
      ...form,
      [id]: event.target.value,
    });
  }

  const handleArtistChange = (artist: Artist) => {
    setForm({
      ...form,
      'artist': artist.id
    });
  }

  const handleArtistSearch = (event: any) => {
    axios.get<{ results: Artist[] }>('http://localhost:8000/music/artists/', {
      params: {
        limit: 100,
        name: event.target.value,
      }
    })
    .then(res => setArtistOptions(res.data.results))
  }
  
  const createAlbum = () => {
    const { name, artist, cover_art } = form;
    axios.post('http://localhost:8000/music/albums/', {
      name,
      artist,
      cover_art,
    }).then(res => {
      console.log(res);
      setOpen(false);
      if (onAlbumAdded) onAlbumAdded();
      // navigate(`/music/albums/${res.data.id}`)
    })
    .catch(err => {
      if (err.response.status === 409) {
        window.alert('Album already exists!');
      }
    });
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Create New Album</Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Create New Album</DialogTitle>
        <DialogContent>
          <TextField
            id="name"
            label="Album Name"
            variant="standard"
            fullWidth={true}
            value={form.name}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(event, 'name')}
          />
          <TextField
            id="cover_art"
            label="Cover Art"
            variant="standard"
            fullWidth={true}
            value={form.cover_art}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => handleChange(event, 'cover_art')}
          />
          {!!!artistId && <Autocomplete
            id="artist"
            options={artistOptions}
            onChange={(event: React.SyntheticEvent<Element, Event>, value: Artist) => handleArtistChange(value)}
            getOptionLabel={(option: Artist) => option.name}
            renderInput={params => (
              <TextField
                {...params}
                label="Search an artist..."
                onChange={handleArtistSearch}
              />
            )}
          />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createAlbum}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default AddAlbumDialog;