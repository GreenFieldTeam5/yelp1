import React from 'react';

const SearchListEntry = (props) => {
  return (
    <div>
      <div onClick={() => props.handleSearchListClick(props.entry.name)}>
        {props.entry.name}
      </div>
      <img src={props.entry.image_url} height="25%" width="25%" />
    </div>
  );
};

export default SearchListEntry;
