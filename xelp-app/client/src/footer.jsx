import React from 'react';
import { Button } from 'reactstrap';

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="footer">
        <Button color="danger">Danger!</Button>
        <div className="footer-text">
          Copyright © 2018 Xelp Inc.
        </div>
      </div>
    );
  }
}

export default Footer;
