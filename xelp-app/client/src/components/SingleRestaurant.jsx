import React from 'react';
import {List, ListItem} from 'material-ui/List';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LocationOnIcon from 'material-ui/svg-icons/communication/location-on';
import ActionGradeIcon from 'material-ui/svg-icons/action/grade';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import WriteReviewIcon from 'material-ui/svg-icons/editor/mode-edit';
import CellPhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';

class SingleRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>{this.props.restaurant.name}</h1>
        <div>
          <List>
            <ListItem primaryText={`${this.props.restaurant.location.address1}, ${this.props.restaurant.location.city}, ${this.props.restaurant.location.state}, ${this.props.restaurant.location.zip_code}`} leftIcon={<LocationOnIcon />} />
            <ListItem primaryText={this.props.restaurant.rating} leftIcon={<ActionGradeIcon />} />
            <ListItem primaryText={this.props.restaurant.display_phone || 'None listed'} leftIcon={<PhoneIcon />} />
            <ListItem primaryText={this.props.restaurant.price} leftIcon={<MoneyIcon />} />
            <ListItem primaryText="Send via SMS" leftIcon={<CellPhoneIcon />} />
            <ListItem primaryText="Upload Photo" leftIcon={<AddPhotoIcon />} />
            <ListItem primaryText="Get Directions" leftIcon={<CarIcon />} />
            <Link to="restaurant/writeReview"> <ListItem primaryText="Write Review" leftIcon={<WriteReviewIcon />} /> </Link>
          </List>
        </div>
      </div>
    );
  }
}

export default SingleRestaurant;