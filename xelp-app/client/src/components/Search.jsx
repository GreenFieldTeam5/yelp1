import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    border: 'solid black',
    borderLeft: 'none',
    width: '400px',
    margin: '10px',
    cursor: 'default',
  },
};

const Search = (props) => {
  return (
    <div>
      Search: <input
        value={props.searchInput}
        onChange={props.handleSearchInputChange}
      />
      <Link to="/searchList">
        <button onClick={() => props.handleSearchButtonClick(true)}>Xelp it! (Yelp API)</button>
        <button onClick={() => props.handleSearchButtonClick(false)}>Xelp it! (Our Database)</button>
      </Link>
      <div>
        Location: 
        <select value={props.locationInput} onChange={props.handleLocationChange}>
          {props.cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      <div style={styles.container}>
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
            (item === '$$$$' && props.priceFilterFour) ? 'green' : 'transparent',
          }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
