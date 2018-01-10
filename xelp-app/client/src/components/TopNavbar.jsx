import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
class TopNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);

    this.state = {
      open: false,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}/>,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Sign Up / Login" onClick={this.handleOpen} />
        <Dialog
          title="Sign Up / Login"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
            onChange={(event.newValue) => this.setState({username: newValue})}
      />
   <br/>
      <TextField
        type="password"
        hintText="Enter your Password"
        floatingLabelText="Password"
        onChange = {(event,newValue) => this.setState({password:newValue})}
        />
      </Dialog>
      </div>
    )
  }
};

export default TopNavbar
