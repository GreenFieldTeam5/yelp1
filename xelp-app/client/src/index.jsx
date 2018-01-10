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
      tenSearchResults: [],
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSearchListClick = this.handleSearchListClick.bind(this);
  }

  handleSearchInputChange(e) {
    this.setState({ searchInput: e.target.value });
    console.log(e.target.value);
  }

  handleSearchButtonClick() {
    const _this = this;
    console.log(`doing axios call with search input: ${this.state.searchInput}`);
    axios.get(`/search/${this.state.searchInput}`)
      .then((response) => {
        _this.setState({ tenSearchResults: response.data });
        console.log('the top 10 search results: ', _this.state.tenSearchResults);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSearchListClick(name) {
    console.log('you just clicked ', name);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <TopNavbar />
            <Search
              searchInput={this.state.searchInput}
              handleSearchInputChange={this.handleSearchInputChange}
              handleSearchButtonClick={this.handleSearchButtonClick}
            />
          </div>
          <Route exact={true} path="/" component={Main} />
          <Route path="/restaurant" component={SingleRestaurant} />
          <Route path="/searchList" render={() => <SearchList tenSearchResults={this.state.tenSearchResults} handleSearchListClick={this.handleSearchListClick}/>}/>
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
