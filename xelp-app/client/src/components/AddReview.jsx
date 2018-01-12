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
    }
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleReviewChange = this.handleReviewChange.bind(this);
    this.submitReview = this.submitReview.bind(this);
  }
  handleRatingChange (e, i, o) {
    this.setState({
      rating: o,
    });
  } 
  handleReviewChange (event) {
    this.setState({
      review: event.target.value,
    });
  }   
  submitReview() {
  // submit post request to database with rating, review, and username
    axios.post('/review', {
      review_text: this.state.review,
      avg_rating: this.state.rating,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    return (
        <div>
        <div>
        <DropDownMenu
          value={undefined}
          onChange={this.handleRatingChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={undefined} primaryText='Rating'/>
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>
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