import React from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material';
import { THEME_PRIMARY } from 'src/constants/general';

const MenuLink = styled(NavLink)({
  textDecoration: 'none',
  textTransform: 'uppercase',
  fontWeight: 700,
  fontSize: '1.25rem',
  padding: '5px 0',
  '&:not(:last-child)': {
    marginRight: '20px',
  },
  '&.app-name': {
    marginRight: '30px',
    fontWeight: 900,
    color: THEME_PRIMARY,
  },
  '& i': {
    marginRight: '6px',
    transform: 'scale(0.9)',
  },
  '&:not(.app-name).active': {
    fontWeight: 700,
    borderBottom: `2px ${THEME_PRIMARY} solid`,
    color: 'white',
  },
  '&.disabled': {
    color: '#888',
    pointerEvents: 'none',
  }
})

export default MenuLink;