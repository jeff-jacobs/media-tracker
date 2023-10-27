import { styled } from '@mui/material';
import { THEME_SECONDARY } from 'src/constants/general';

export const ViewHeader = styled('div')({
  fontSize: '2rem',
  fontWeight: 900,
  color: 'white',
  '& .parent': {
    // fontWeight: 400,
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
