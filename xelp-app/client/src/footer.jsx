import React from 'react';


class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <table className="footer-table">
          <tbody>
            <tr>
              <td className="footer mui-container mui--text-center mui--align-middle">
                  Copyright © 2018 Xelp Inc.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Footer;
