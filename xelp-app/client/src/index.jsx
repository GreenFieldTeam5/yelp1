import React from 'react';
import ReactDOM from 'react-dom';
import TopNavbar from './components/TopNavbar.jsx';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div> 
        Title Page 
        <TopNavbar/>
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('app'));
