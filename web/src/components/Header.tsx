import React from 'react';
import { styled } from '@mui/material';
import MenuLink from './MenuLink';

const Header: React.FC = (): React.ReactElement => {
  return (
    <HeaderContainer>
      <div className='container'>
        {/* <MenuLink to='/' className='app-name'>MEDIA TRACKER</MenuLink> */}
        <MenuLink to='/music'>
          <i className='fa-solid fa-music'></i>
          Music
        </MenuLink>
        <MenuLink to='/movies' className='disabled'>
          <i className='fa-solid fa-film'></i>
          Movies
        </MenuLink>
        <MenuLink to='/games' className='disabled'>
          <i className='fa-solid fa-gamepad'></i>
          Games
        </MenuLink>
        <MenuLink to='/books' className='disabled'>
          <i className='fa-solid fa-book'></i>
          Books
        </MenuLink>
      </div>
    </HeaderContainer>
  )
}

const HeaderContainer = styled('div')({
  padding: '20px 0',
  background: '#333',
});

export default Header;