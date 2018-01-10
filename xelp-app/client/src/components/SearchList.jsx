import React from 'react';
import SearchListEntry from './SearchListEntry.jsx';

const SearchList = (props) => {
  return (
    <div>
      {props.tenSearchResults.map(item => (
        <SearchListEntry
          key={item.id}
          entry={item}
          handleSearchListClick={props.handleSearchListClick}
        />
      ))}
    </div>
  );
};

export default SearchList;
