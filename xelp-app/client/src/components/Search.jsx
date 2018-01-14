import React from 'react';
import backgroundImage from '../assets/searchBackground.png';
import RaisedButton from 'material-ui/RaisedButton';
import xelpLogo from '../assets/xelp.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
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
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '175px',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    marginBottom: '30px',
  },
  searchChild: {
    textAlign: 'center',
  },
};

const Search = props => (
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
          <RaisedButton secondary style={styles.searchButton} label="Search" onClick={() => props.handleSearchButtonClick(false)} />
        </Link>
      </div>
    </div>
  </div>
);

export default Search;
