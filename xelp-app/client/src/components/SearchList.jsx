import React from 'react';
import SearchListEntry from './SearchListEntry.jsx';
import Map from './Map.jsx';

const SearchList = (props) => {
  return (
    <div>
      {props.tenSearchResults.length === 0 &&
        <div>
          This is the SearchList component. Please search something!
        </div>
      }
      <Map />
      {props.tenSearchResults.length !== 0 && props.tenSearchResults.map(item => (
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
