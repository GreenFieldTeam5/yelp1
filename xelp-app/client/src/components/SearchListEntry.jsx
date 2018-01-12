import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const SearchListEntry = (props) => {
  return (
    <div>
      <Link to="/restaurant">
        <div onClick={() => props.handleSearchListClick(props.entry)}>
          {props.entry.name} ({props.entry.price})<br />
          Rating: {props.entry.rating} / 5<br />
          Address: {props.entry.street_name}<br />
          Phone: {props.entry.phone_number.length > 0 && props.entry.phone_number}
        </div>
      </Link>
      <img src={props.entry.image_url} height="25%" width="25%" /><br />
    </div>
  );
};

export default SearchListEntry;
