import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material';
import { THEME_PRIMARY } from 'src/constants/general';

const Header: React.FC = (): React.ReactElement => {
  return (
    <HeaderContainer>
      <Link to="/">Home</Link>
      <Link to="/music/artists">Music</Link>
    </HeaderContainer>
  )
}

const HeaderContainer = styled('div')({
  textAlign: 'center',
  padding: '20px',
  background: '#ddd',
  fontFamily: 'Solway',
  fontWeight: 600,
  '& a': {
    marginRight: '5px',
    color: THEME_PRIMARY,
  }
});

export default Header;