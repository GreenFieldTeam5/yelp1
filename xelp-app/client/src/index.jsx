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
        <TopNavbar/>
        Title Page 
      </div>
    )
  }
}

ReactDOM.render( <App />, document.getElementById('app'));
