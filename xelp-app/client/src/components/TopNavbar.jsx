import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

    return (
      <div>
        <AppBar
          title="Xelp"
          onRightIconButtonClick={this.handleOpen}
          showMenuIconButton={false}
          iconElementRight={<FlatButton label="Login" />}
        />
        <Dialog
          title="Sign Up / Login"
          titleStyle={{textAlign: "center"}}
          modal={false}
          onRequestClose={this.handleClose}
          autoDetectWindowHeight={false}
          autoScrollBodyContent={false}
          contentStyle={{maxWidth: 300}}
          open={this.state.open}
        >
          <RaisedButton
            className="signin-oauth github"
            target="_blank"
            label="Github"
            secondary
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
          <br/>
          <RaisedButton
            className="signin-oauth facebook"
            target="_blank"
            label="Facebook"
            primary
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
          <br/>
          <RaisedButton
            className="signin-oauth google"
            target="_blank"
            label="Google"
            icon={<FontIcon className="muidocs-icon-custom-github" />}
          />
        </Dialog>
      </div>
    );
  }
}

export default TopNavbar;
