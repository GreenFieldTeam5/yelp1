import React from 'react';
import SearchListEntry from './SearchListEntry.jsx';
import Map from './Map.jsx';

const SearchList = (props) => {
  return (
    <div>
      <div style={{position: 'relative'}} >
        <Map restaurants={props.tenSearchResults} />
      </div>
      {props.tenSearchResults.length === 0 &&
        <div >
          This is the SearchList component. Please search something!
        </div>
      }
      {props.tenSearchResults.length !== 0 && props.tenSearchResults.map(item => (
        <SearchListEntry
          key={Math.random()}
          entry={item}
          handleSearchListClick={props.handleSearchListClick}
        />
      ))}
    </div>
  );
};

export default SearchList;
