import React from 'react';
import SearchListEntry from './SearchListEntry.jsx';
import Map from './Map.jsx';

const styles = {
  everything: {
    display: 'flex',
    width: '1000px',
  },
  map: {
    width: '300px',
    position: 'relative',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '700px',
  },
  pageContainer: {
    display: 'flex',
    borderRight: 'solid black',
    borderLeft: 'none',
    width: '500px',
    margin: '10px',
    cursor: 'default',
    marginLeft: '60px',
  },
  showing: {
    marginBottom: '5px',
    marginLeft: '60px',
  },
  priceFiltersContainer: {
    display: 'flex',
    border: 'solid black',
    borderLeft: 'none',
    width: '400px',
    margin: '10px',
    cursor: 'default',
    marginLeft: '150px',
  },
};

const SearchList = (props) => {
  const tenSearchResults = props.tenSearchResults;
  return (
    <div>
      <div style={styles.priceFiltersContainer}>
        {['$', '$$', '$$$', '$$$$'].map(item => (
          <div key={item} onClick={() => props.handlePriceFilterClick(item)} style={{
            fontSize: '20px',
            width: '25%',
            height: '35px',
            padding: '3px',
            borderLeft: 'solid black',
            textAlign: 'center',
            backgroundColor:
            (item === '$' && props.priceFilterOne) ||
            (item === '$$' && props.priceFilterTwo) ||
            (item === '$$$' && props.priceFilterThree) ||
            (item === '$$$$' && props.priceFilterFour) ? '#1fbcd3' : 'transparent',
          }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={styles.everything}>
        <div style={styles.container}>
          {props.tenSearchResults.length !== 0 && props.tenSearchResults.map((item, index) => (
            <SearchListEntry
              key={item.id}
              indexNumber={index}
              page={props.page}
              entry={item}
              handleSearchListClick={props.handleSearchListClick}
            />
          ))}
        </div>
        <div style={styles.map}>
          {tenSearchResults.length > 0 &&
            <Map restaurants={props.tenSearchResults} />
          }
        </div>
      </div>
      <div style={styles.showing}>
        Showing {props.page * 10 - 9}-{props.page * 10} of 90
      </div>
      <div style={styles.pageContainer}>
        {['Prev', 1, 2, 3, 4, 5, 6, 7, 8, 9, 'Next'].map(item => (
          <div key={item} onClick={() => props.handlePageClick(item)} style={{
            fontSize: '20px',
            width: '10%',
            height: '35px',
            padding: '3px',
            borderLeft: 'solid black',
            textAlign: 'center',
            backgroundColor: item === props.page ? '#1fbcd3' : 'transparent',
          }}
          >
            {item.toString()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchList;
