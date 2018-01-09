import React from 'react';
import ReactDOM from 'react-dom';

import Search from './Search.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    	searchInput: ''
    };
  }

  render() {
    return (
    	<div>
      	<div> Title Page </div>
      	<Search searchInput={this.props.searchInput} />
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('app'));
