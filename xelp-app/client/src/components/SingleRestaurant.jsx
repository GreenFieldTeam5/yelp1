import React from 'react';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import LocationOnIcon from 'material-ui/svg-icons/communication/location-on';
import ActionGradeIcon from 'material-ui/svg-icons/action/grade';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import MoneyIcon from 'material-ui/svg-icons/editor/attach-money';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import WriteReviewIcon from 'material-ui/svg-icons/editor/mode-edit';
import CellPhoneIcon from 'material-ui/svg-icons/hardware/phone-iphone';
import CarIcon from 'material-ui/svg-icons/maps/directions-car';

const buttonStyle = {
  margin: 12,
};

const style = {
  marginLeft: 20,
};
const styles = {
  customWidth: {
    width: 200,
  },
  reviews: {
    border: '1px 1px blue',
    fontSize: '16px',
    margin: '5px',
  },
};

class SingleRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>{this.props.restaurant.name}</h1>
        <div className="container">
          <div>
            <List>
              <ListItem primaryText={this.props.restaurant.street_name} leftIcon={<LocationOnIcon />} />
              <ListItem primaryText={this.props.restaurant.rating} leftIcon={<ActionGradeIcon />} />
              <ListItem primaryText={this.props.restaurant.display_phone || 'None listed'} leftIcon={<PhoneIcon />} />
              <ListItem primaryText={this.props.restaurant.price} leftIcon={<MoneyIcon />} />
              <ListItem primaryText="Send via SMS" leftIcon={<CellPhoneIcon />} />
              <ListItem primaryText="Upload Photo" leftIcon={<AddPhotoIcon />} />
              <ListItem primaryText="Get Directions" leftIcon={<CarIcon />} />
              <ListItem onClick={this.props.handleWriteReviewClick} primaryText="Write Review" leftIcon={<WriteReviewIcon />} />
            </List>
          </div>
          <div>
            <img src={this.props.restaurant.image_url} width="300px" height="300px" />
          </div>
          <div>
            {this.props.restaurantReviews.map(item => (
              <div key={item.id} style={styles.reviews}>
                {item.user_id || 'Anonymous'} says:<br />
                {item.review_text}
              </div>
            ))}
          </div>
        </div>
        {this.props.writeReview &&
          <div>
            <DropDownMenu
              value={this.props.reviewRating}
              onChange={this.props.handleRatingChange}
              style={styles.customWidth}
              autoWidth={false}
            >
              {['Rating', 1, 2, 3, 4, 5].map(item => (
                <MenuItem value={item} primaryText={item} key={item} />
              ))}
            </DropDownMenu>
            Write Review:<br />
            <TextField
              onChange={this.props.handleReviewTextChange}
              floatingLabelText="Review"
              multiLine
              rows={5}
            />
            <br />
            <RaisedButton onClick={this.props.submitReview} label="Submit" primary style={buttonStyle} />
          </div>
        }
      </div>
    );
  }
}

export default SingleRestaurant;
