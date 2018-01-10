import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Search = (props) => {
  return (
    <div>
      Search: <input value={props.searchInput} onChange={props.handleSearchInputChange} />
      <Link to="/searchList">
      <button onClick={props.handleSearchButtonClick}>Xelp it!</button>
      </Link>
    </div>
  );
}

export default Search;