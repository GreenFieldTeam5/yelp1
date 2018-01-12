import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const styles = {
  container: {
    display: 'flex',
    width: '1000px',
  },
  title: {
    fontSize: '25px',
  },
  pic: {
    width: '20%',
    height: "150px",
  },
  item: {
    width: '50%',
    height: "150px",
    padding: '10px',
  },
  address: {
    width: '30%',
    height: "150px",
    padding: '10px',
  },
  link: {
    cursor: 'default',
    textDecoration: 'none',
  },
  image: {
    borderRadius: '50%',
    display: 'block',
    margin: 'auto',
    height: '140px',
    width: '140px',
  },
};

const SearchListEntry = (props) => {
  return (
    <div style={styles.container}>
      <div style={styles.pic}>
        <Link to="/restaurant">
          <div onClick={() => props.handleSearchListClick(props.entry)}>
            <img style={styles.image} src={props.entry.image_url} height="100%" width="100%" /><br />
          </div>
        </Link>
      </div>
      <div style={styles.item}>
        <Link to="/restaurant"><div style={styles.title} onClick={() => props.handleSearchListClick(props.entry)}>{props.entry.name}</div></Link><br />
        Rating: {props.entry.rating} / 5<br />
        ({props.entry.price}) | {props.entry.categories.split('<AND>').map(item => item[0].toUpperCase() + item.slice(1, item.length)).join(', ').split('_').map(item => item[0].toUpperCase() + item.slice(1, item.length)).join(' ')}
      </div>
      <div style={styles.address}>
        {props.entry.address1}<br />
        {props.entry.city}, {props.entry.state} {props.entry.zip_code}<br />
        {props.entry.display_phone.length > 0 && props.entry.display_phone}
      </div>
    </div>
  );
};

export default SearchListEntry;
