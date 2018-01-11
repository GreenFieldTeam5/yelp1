import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
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
      <button onClick={props.handleSearchButtonClick}>Xelp it! (Yelp API)</button>
      <button onClick={props.handleSearchButtonClickTesting}>Xelp it! (Our Database)</button>
      </Link>
      <div style={styles.container}>
        {['$', '$$', '$$$', '$$$$'].map(item => (
          <div key={item} onClick={() => props.handlePriceFilterClick(item)} style={{
            fontSize: '20px',
            margin: '5px',
            padding: '3px',
            border: 'solid black',
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
