import React from "react";
import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import MenuLink from "src/components/MenuLink";

const Music: React.FC = ():React.ReactElement => {
  return (
    <>
      <HeaderContainer>
        <MenuLink to="/music/artists">Artists</MenuLink>
        <MenuLink to="/music/albums">Albums</MenuLink>
        <MenuLink to="/music/shows">Shows</MenuLink>
        <MenuLink to="/music/venues">Venues</MenuLink>
        <MenuLink to="/music/setlistfm">SetlistFM</MenuLink>
      </HeaderContainer>
      <Outlet></Outlet>
    </>
  )
}

const HeaderContainer = styled('div')({
  padding: '20px 0 40px',
  '& a': {
    fontSize: '1.125rem',
    fontWeight: 400,
  }
});


export default Music;