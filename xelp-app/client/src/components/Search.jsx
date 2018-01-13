import React from 'react';
import backgroundImage from '../assets/searchBackground.png';
import RaisedButton from 'material-ui/RaisedButton';
import xelpLogo from '../assets/xelp.png';
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
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '175px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
  },
  searchChild: {
    textAlign: 'center',
  },
  inputBox: {
    width: '500px',
    height: '50px',
    padding: '5px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'Snow',
    fontSize: '24px',
  },
  searchButton: {
    margin: '12px',
    borderRadius: '4px',
  },
};

const Search = (props) => {
  return (
    <div>
      <div style={styles.searchContainer}>
        <div style={styles.searchChild}>
          <div><img width="30%" height="15%" src={xelpLogo} /></div><input
            style={styles.inputBox}
            value={props.searchInput}
            onChange={props.handleSearchInputChange}
          />
        </div>
        <div style={styles.searchChild}>
          <Link to="/searchList">
            <RaisedButton primary style={styles.searchButton} label="Xelp it! (Yelp API)" onClick={() => props.handleSearchButtonClick(true)} />
            <RaisedButton secondary style={styles.searchButton} label="Xelp it! (Our Database)" onClick={() => props.handleSearchButtonClick(false)} />
          </Link>
        </div>
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
