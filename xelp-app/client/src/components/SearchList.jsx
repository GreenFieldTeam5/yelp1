import React from 'react';
import SearchListEntry from './SearchListEntry.jsx';
import Map from './Map.jsx';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    display: 'block',
    margin: 'auto',
    width: '1000px',
  },
};

const SearchList = (props) => {
  return (
    <div>
      {props.tenSearchResults.length === 0 &&
        <div>
          This is the SearchList component. Please search something!
          <Map className="mapping" />
        </div>
      }
      <div style={styles.container}>
        {props.tenSearchResults.length !== 0 && props.tenSearchResults.map(item => (
          <SearchListEntry
            key={item.id}
            entry={item}
            handleSearchListClick={props.handleSearchListClick}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchList;
