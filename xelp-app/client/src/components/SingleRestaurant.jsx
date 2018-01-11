import React from 'react';
import {List, ListItem} from 'material-ui/List';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Phone from 'material-ui/svg-icons/communication/phone';
import Money from 'material-ui/svg-icons/editor/attach-money';
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import WriteReview from 'material-ui/svg-icons/editor/mode-edit';
import CellPhone from 'material-ui/svg-icons/hardware/phone-iphone';
import Car from 'material-ui/svg-icons/maps/directions-car';

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
            <ListItem primaryText={`${this.props.restaurant.location.address1}, ${this.props.restaurant.location.city}, ${this.props.restaurant.location.state}, ${this.props.restaurant.location.zip_code}`} leftIcon={<LocationOn />} />
            <ListItem primaryText={this.props.restaurant.rating} leftIcon={<ActionGrade />} />
            <ListItem primaryText={this.props.restaurant.display_phone || 'None listed'} leftIcon={<Phone />} />
            <ListItem primaryText={this.props.restaurant.price} leftIcon={<Money />} />
            <ListItem primaryText="Write Review" leftIcon={<WriteReview />} />
            <ListItem primaryText="Upload Photo" leftIcon={<AddPhoto />} />
            <ListItem primaryText="Get Directions" leftIcon={<Car />} />
          </List>
        </div>
      </div>
    );
  }
}

export default SingleRestaurant;