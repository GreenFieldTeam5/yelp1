import React from 'react';

const Search = (props) => {
  return (
    <div>
      Search: <input
        value={props.searchInput}
        onChange={props.handleSearchInputChange}
      />
      <button onClick={props.handleSearchButtonClick}>Xelp it!</button>
    </div>
  );
};

export default Search;
