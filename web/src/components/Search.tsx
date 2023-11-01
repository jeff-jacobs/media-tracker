import { TextField } from '@mui/material';
import React from 'react'

interface Props {
  onSearch: (value: string) => void;
}

const Search: React.FC<Props> = ({
  onSearch,
}):React.ReactElement => {

  const [searchInput, setSearchInput] = React.useState<string>('');

  const handleChange = (event: any) => {
    setSearchInput(event.target.value);
  }

  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13) {
      handleSearchSubmitted();
    }
  }

  const handleSearchSubmitted = () => {
    onSearch(searchInput);
  }

  const handleBlur = (event: any) => {
    if (event.target.value === '') {
      handleSearchSubmitted();
    }
  }

  return (
    <TextField id="search" label="Search" size="small" variant="standard"
      value={searchInput}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}

export default Search;