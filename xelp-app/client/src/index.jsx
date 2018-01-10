import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Search.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Main from './components/Main.jsx';
import TopNavbar from './components/TopNavbar.jsx';
import SearchList from './components/SearchList.jsx';


import Footer from './footer.jsx';


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
            <div> Title Page </div>
            <TopNavbar />
            <Search
              searchInput={this.state.searchInput}
              handleSearchInputChange={this.handleSearchInputChange}
              handleSearchButtonClick={this.handleSearchButtonClick}
            />
          </div>
          <SearchList
            tenSearchResults={this.state.tenSearchResults}
            handleSearchListClick={this.handleSearchListClick}
          />
          <div>
            <Main />
          </div>
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
