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
const styles = {
  everything: {
    width: '800px',
  },
  container: {
    display: 'flex',
  },
  customWidth: {
    width: 200,
  },
  reviews: {
    border: '1px blue',
    fontSize: '16px',
    margin: '5px',
  },
  child: {
    margin: '5px',
    padding: '3px',
    width: '33%',
  },
  title: {
    fontSize: '25px',
    margin: '5px',
    padding: '3px',
    width: '800px',
    marginLeft: '20px',
  },
  image: {
    width: '250px',
    height: '250px',
  },
};

class SingleRestaurant extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={styles.everything}>
        <div style={styles.title}>{this.props.restaurant.name}</div>
        <div style={styles.container}>
          <div style={styles.child}>
            <List>
              <ListItem primaryText={this.props.restaurant.address1 + ', ' + this.props.restaurant.city + ', ' + this.props.restaurant.state + ' ' + this.props.restaurant.zip_code} leftIcon={<LocationOnIcon />} />
              <ListItem primaryText={this.props.restaurant.rating + ' / 5'} leftIcon={<ActionGradeIcon />} />
              <ListItem primaryText={this.props.restaurant.display_phone || 'None listed'} leftIcon={<PhoneIcon />} />
              <ListItem primaryText={this.props.restaurant.price} leftIcon={<MoneyIcon />} />
              <ListItem primaryText="Send via SMS" leftIcon={<CellPhoneIcon />} />
              <ListItem primaryText="Upload Photo" leftIcon={<AddPhotoIcon />} />
              <ListItem primaryText="Get Directions" leftIcon={<CarIcon />} />
              {this.props.user &&
                <ListItem onClick={this.props.handleWriteReviewClick} primaryText="Write Review" leftIcon={<WriteReviewIcon />} />
              }
            </List>
          </div>
          <div style={styles.child}>
            <img src={this.props.restaurant.image_url} style={styles.image}/>
          </div>
          <div style={styles.child}>
            {this.props.restaurantReviews.map(item => (
              <div key={item.id} style={styles.reviews}>
                {item.username || 'Anonymous'} says:<br />
                {item.review_text}
              </div>
            ))}
          </div>
        </div>
        {this.props.writeReview && this.props.user &&
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
