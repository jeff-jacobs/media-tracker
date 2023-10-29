import React, { ReactNode } from 'react';
import { styled } from '@mui/material';
import { THEME_SECONDARY } from 'src/constants/general';
import Search from './Search';

interface Props {
  children: ReactNode;
  onSearch?: (value: string) => void;
}
const ViewHeader: React.FC<Props> = ({
  children,
  onSearch,
}):React.ReactElement => {

  return (
    <div style={{
      marginBottom: '30px',
    }}>
      <ViewHeaderStyle>{children}</ViewHeaderStyle>
      {onSearch && <Search onSearch={(value) => onSearch(value) } />}
    </div>
  )
}

export const ViewHeaderStyle = styled('span')({
  fontSize: '2.5rem',
  fontWeight: 900,
  color: 'white',
  margin: '0 20px 0 0',
  '& .parent': {
    fontSize: '1rem',
    color: THEME_SECONDARY,
  }
})

export default ViewHeader;