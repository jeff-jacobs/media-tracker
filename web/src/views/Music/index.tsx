import React from "react";
import styled from "@emotion/styled";
import { NavLink, Outlet } from "react-router-dom";
import { THEME_PRIMARY } from "src/constants/general";

const Music: React.FC = ():React.ReactElement => {
  return (
    <>
      <HeaderContainer>
        <NavLink to="/music/artists">Artists</NavLink>
        <NavLink to="/music/albums">Albums</NavLink>
        <NavLink to="/music/shows">Shows</NavLink>
        <NavLink to="/music/venues">Venues</NavLink>
        <NavLink to="/music/setlistfm">SetlistFM</NavLink>
      </HeaderContainer>
      <Outlet></Outlet>
    </>
  )
}

const HeaderContainer = styled('div')({
  textAlign: 'center',
  padding: '20px',
  marginBottom: '20px',
  fontFamily: 'Solway',
  fontWeight: 600,
  '& a': {
    marginRight: '5px',
    color: THEME_PRIMARY,
  }
});


export default Music;