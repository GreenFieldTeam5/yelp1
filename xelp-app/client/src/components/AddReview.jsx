import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import TextField from 'material-ui/TextField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange (event) {
    console.log(event)
    this.setState({
      rating: value,
    });
  } 
  render() {
    return (
        <div>
        <div>
        <DropDownMenu
          value={this.state.rating || "Rating"}
          onChange={() => this.handleChange()}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="1" />
          <MenuItem value={2} primaryText="2" />
          <MenuItem value={3} primaryText="3" />
          <MenuItem value={4} primaryText="4" />
          <MenuItem value={5} primaryText="5" />
        </DropDownMenu>
      </div>
  <div>
    <Divider />
    <TextField hintText="Review" style={style} underlineShow={false} />
    <Divider />
    <div>
      <RaisedButton label="Submit" primary={true} style={buttonStyle} />
    </div>
  </div>
  </div>
    );
  }
}

export default AddReview;