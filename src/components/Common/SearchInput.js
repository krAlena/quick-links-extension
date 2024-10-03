import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import "./SearchInput.sass";
import SearchSvgIcon from '../Icons/SearchSvgIcon';

const SearchInput = ({searchAction}) => {
  const [strSearch, setStrSearch] = useState('');

  const handleInputChange = (e) => {
    const searchValue = e.target.value;

    //clear search
    if (searchValue === ''){
      if (typeof(searchAction) === "function"){
        searchAction(searchValue)
      }
    }
    setStrSearch(searchValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (typeof(searchAction) === "function"){
        searchAction(strSearch)
      }
    }
  };

  const handleSearchIconClick = () => {
    if (typeof(searchAction) === "function"){
      searchAction(strSearch)
    }
  };

  const handleClearSearch = () => {
    setStrSearch('')
  }

  return (
    <Input
      icon={
        <SearchSvgIcon className={(strSearch !== '') ? 'icon search' : 'icon search gray'} onClick={handleSearchIconClick}/>
      }
      placeholder='Search...'
      size='small'
      value={strSearch}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress} // Handle Enter key press
    />
  );
};

export default SearchInput;