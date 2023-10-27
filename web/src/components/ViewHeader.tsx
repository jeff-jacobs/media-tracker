import { styled } from '@mui/material';
import { THEME_SECONDARY } from 'src/constants/general';

export const ViewHeader = styled('div')({
  fontSize: '2.5rem',
  fontWeight: 900,
  color: 'white',
  marginBottom: '30px',
  '& .parent': {
    fontSize: '1rem',
    color: THEME_SECONDARY,
  }
})

export const ViewHeaderSearchContainer = styled('div')({
  display: 'flex',
  '*': {
    flex: 1,
  },
  '& *:last-child': {
    textAlign: 'right',
  }
})
