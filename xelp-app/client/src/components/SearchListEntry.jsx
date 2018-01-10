import React from 'react';

const SearchListEntry = (props) => {
  return (
    <div>
      <div onClick={() => props.handleSearchListClick(props.entry.name)}>
        {props.entry.name} ({props.entry.price})<br />
        Rating: {props.entry.rating} / 5<br />
        Address: {props.entry.location.address1}, {props.entry.location.city} {props.entry.location.zip_code}<br />
        Phone: {props.entry.display_phone.length > 0 && props.entry.display_phone}
        <br />
      </div>
      <img src={props.entry.image_url} height="25%" width="25%" /><br />
    </div>
  );
};

export default SearchListEntry;
