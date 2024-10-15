import React, { useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import "./SearchInput.sass";
import SearchSvgIcon from '../Icons/SearchSvgIcon';
import CloseSvgIcon from '../Icons/CloseSvgIcon';

const SearchInput = ({searchAction}) => {
  const [strSearch, setStrSearch] = useState('');
  const [isSearchComletedInput, setIsSearchComletedInput] = useState(false);

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
      setIsSearchComletedInput(true)
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
    let searchValue = '';
    setStrSearch(searchValue);
    setIsSearchComletedInput(false);

    if (typeof(searchAction) === "function"){
      searchAction(searchValue)
    }
  }

  return (
    <>
      <Input
        icon={
          <SearchSvgIcon className={(strSearch !== '') ? 'icon search' : 'icon search gray'} onClick={handleSearchIconClick}/>
        }
        placeholder='Search...'
        size='small'
        value={strSearch}
        disabled={isSearchComletedInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress} // Handle Enter key press
      />
      {
        isSearchComletedInput
          ? <div className="tags-list">
              <div className='active tag with-del'>
                <div className="tag__text">
                  {strSearch}
                </div>
                <div className="tag__del btn"
                    onClick={handleClearSearch}
                >
                  <CloseSvgIcon className="icon btn close hover-red small"/>
                </div>
              </div>
            </div>
          : null
      }
    </>

  );
};

export default SearchInput;