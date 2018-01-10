import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';
import LoginButton from 'material-ui/svg-icons/action/account-circle';

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
        primary
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary
        disabled
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <AppBar title="Xelp" onRightIconButtonClick={this.handleOpen} showMenuIconButton={false}
        iconElementRight={<FlatButton label="Login" />} 
        />
        {/* <RaisedButton label="Sign Up / Login" onClick={this.handleOpen} /> */}
        <Dialog
          title="Sign Up / Login"
          actions={actions}
          modal
          open={this.state.open}
        >
          <TextField
            hintText="Enter your Username"
            floatingLabelText="Username"
          />
          <br />
          <TextField
            type="password"
            hintText="Enter your Password"
            floatingLabelText="Password"
          />
        </Dialog>
      </div>
    );
  }
}

export default TopNavbar;
