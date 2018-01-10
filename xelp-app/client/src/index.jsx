import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <MuiThemeProvider>
      <div>
        <Main />
      </div> 
      </MuiThemeProvider>

    );
  }
}
ReactDOM.render(<App />, document.getElementById('app'));
