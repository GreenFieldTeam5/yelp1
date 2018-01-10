import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 
import SingleRestaurant from './components/SingleRestaurant.jsx';
import SearchList from './components/SearchList.jsx';


import Footer from './components/footer.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
  }

  handleSearchInputChange(e) {
    this.setState({ searchInput: e.target.value });
    console.log(e.target.value);
  }

  handleSearchButtonClick() {
    console.log(`doing axios call with search input: ${this.state.searchInput}`);
    axios.get(`/search/${this.state.searchInput}`)
    .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
    	    <div>
          	<div> Title Page </div>
            <TopNavbar/>
          	<Search searchInput={this.state.searchInput} handleSearchInputChange={this.handleSearchInputChange} 
      		  handleSearchButtonClick={this.handleSearchButtonClick} />
          </div>
          <Route exact={true} path="/" component={Main} />
          <Route path="/restaurant" component={SingleRestaurant} />
          <Route path="/searchList" component={SearchList} />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>
  , document.getElementById('app')
);
