import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

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
};

class AddReview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 'Rating',
      review: '',
    };
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }
  handleRatingChange(event, index, object) {
    this.setState({
      rating: object,
    });
  }
  handleReviewChange(event) {
    this.setState({
      review: event.target.value,
    });
  }  
  submitReview() {
  // submit post request to database with rating, review, and username
    axios.post('/review', {
      review_text: this.state.review,
      avg_rating: this.state.rating,
      // add restaurant id to link review to restaurant
      // add username to link review to a user
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <div>
          
      </div>
  <div>
    <Divider />
        <TextField
      onChange={this.handleReviewChange}
      floatingLabelText="Review"
      multiLine={true}
      rows={5}
    /><br />
    <Divider />
    <div>
      <RaisedButton onClick={this.submitReview} label="Submit" primary={true} style={buttonStyle} />
    </div>
  </div>
  </div>
    );
  }
}

export default AddReview;
