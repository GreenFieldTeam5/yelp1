import React from 'react';
import {List, ListItem} from 'material-ui/List';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

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
            <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
            <ListItem primaryText="Inbox" leftIcon={<LocationOn />} />
          </List>
        </div>
      </div>
    );
  }
}

export default SingleRestaurant;