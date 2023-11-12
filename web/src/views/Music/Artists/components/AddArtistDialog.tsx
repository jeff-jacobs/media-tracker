import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const AddArtistDialog: React.FC = (): React.ReactElement => {

  const [open, setOpen] = React.useState(false);
  const [artistNameInput, setArtistNameInput] = React.useState<string>('');
  const navigate = useNavigate()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setArtistNameInput('');
  };

  const handleChange = (event: any) => {
    setArtistNameInput(event.target.value);
  }
  
  const createArtist = () => {
    axios.post('http://localhost:8000/music/artists/', {
      name: artistNameInput,
    }).then(res => {
      navigate(`/music/artists/${res.data.id}`)
    })
    .catch(err => {
      if (err.response.status === 409) {
        window.alert('Artist already exists!');
      }
    });
  }

  return (
    <>
      <Button onClick={handleClickOpen}>Create New Artist</Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Create New Artist</DialogTitle>
        <DialogContent>
          <TextField id="artist-name" label="Artist Name" variant="standard"
            value={artistNameInput}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={createArtist}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  )
};

export default AddArtistDialog;