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
import AddReview from './components/AddReview.jsx';
import ReviewList from './components/ReviewList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      searchingYelpAPI: true,
      page: 1,
      locationInput: 'San Francisco, CA',
      cities: ['San Francisco', 'New York', 'San Jose', 'Chicago', 'Palo Alto', 'Oakland'],
      tenSearchResults: [],
      restaurant: [],
      showDatabaseButtons: false,
      priceFilterOne: true,
      priceFilterTwo: true,
      priceFilterThree: true,
      priceFilterFour: true,
      user: null,
    };

    this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
    this.handleSearchButtonClick = this.handleSearchButtonClick.bind(this);
    this.handleSearchListClick = this.handleSearchListClick.bind(this);
    this.selectRestaurant = this.selectRestaurant.bind(this);
    this.handlePriceFilterClick = this.handlePriceFilterClick.bind(this);
    this.getAllRestaurants = this.getAllRestaurants.bind(this);
    this.wipeRestaurantDB = this.wipeRestaurantDB.bind(this);
    this.populateRestaurants = this.populateRestaurants.bind(this);
    this.toggleDatabaseButtons = this.toggleDatabaseButtons.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  componentDidMount() {
    this.getAllRestaurants((response) => {
      if (response.data.length === 0) {
        console.log('detected restaurant database is empty. filling it up...');
        this.populateRestaurants((response) => {
          console.log('finished populating restaurant database. ');
        });
      } else {
        console.log('detected restaurant database has data, not adding any more data. ');
      }
    });

    axios.get('/getuserdata')
      .then((userData) => {
        this.setState({
          user: userData.data,
        });
      });
  }

  handleSearchInputChange(e) {
    this.setState({ searchInput: e.target.value });
    console.log(e.target.value);
  }

  handleSearchButtonClick(searchingYelpAPI) {
    const _this = this;
    let prices = [
      this.state.priceFilterOne ? '1' : '',
      this.state.priceFilterTwo ? '2' : '',
      this.state.priceFilterThree ? '3' : '',
      this.state.priceFilterFour ? '4' : '',
    ].filter(item => item !== '').join(', ');
    prices = prices === '' ? '1, 2, 3, 4' : prices;

    console.log(`doing axios call with search input: ${this.state.searchInput} and prices ${prices}`);

    if (searchingYelpAPI) {
      this.setState({ searchingYelpAPI: true });
      axios.get(`/search/${this.state.searchInput}/${prices}`)
        .then((response) => {
          _this.setState({ tenSearchResults: response.data });
          console.log('the top 10 search results: ', _this.state.tenSearchResults);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({ searchingYelpAPI: false });
      axios.get(`/test/search/${this.state.searchInput}/${prices}/${this.state.page}`)
        .then((response) => {
          _this.setState({ tenSearchResults: response.data.slice(0, 10) });
          console.log('the top 10 search results: ', _this.state.tenSearchResults);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handleSearchListClick(entry) {
    console.log('you just clicked ', entry);
    this.setState({
      restaurant: entry,
    });
  }

  selectRestaurant(restaurant) {
    console.log('selected: ', restaurant);
    this.setState({
      restaurant,
    });
  }

  handlePriceFilterClick(price) {
    if (price === '$') { this.setState({ priceFilterOne: !this.state.priceFilterOne }, () => this.handleSearchButtonClick(this.state.searchingYelpAPI)); }
    if (price === '$$') { this.setState({ priceFilterTwo: !this.state.priceFilterTwo }, () => this.handleSearchButtonClick(this.state.searchingYelpAPI)); }
    if (price === '$$$') { this.setState({ priceFilterThree: !this.state.priceFilterThree }, () => this.handleSearchButtonClick(this.state.searchingYelpAPI)); }
    if (price === '$$$$') { this.setState({ priceFilterFour: !this.state.priceFilterFour }, () => this.handleSearchButtonClick(this.state.searchingYelpAPI)); }
  }

  toggleDatabaseButtons() {
    this.setState({ showDatabaseButtons: !this.state.showDatabaseButtons });
  }

  getAllRestaurants(cb) {
    console.log('doing axios call to /cat-get');
    axios.get('/cat-get')
      .then((response) => {
        console.log('got GET response: ', response);
        if (cb) cb(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  wipeRestaurantDB(cb) {
    console.log('doing axios call to /cat-wipe');
    axios.get('/cat-wipe')
      .then((response) => {
        console.log('got GET response: ', response);
        if (cb) cb(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  populateRestaurants(cb) {
    console.log(`doing axios call to /populate/${this.state.locationInput}`);
    axios.post(`/populate/${this.state.locationInput}`, {
      data: '',
    })
      .then((response) => {
        console.log('got POST response:: ', response);
        if (cb) cb(response);
      })
      .catch((error) => {
        console.log(error);
        if (cb) cb(error);
      });
  }

  handlePageClick(page) {
    let newPage = this.state.page;
    if (page === 'Prev' && this.state.page > 1) {
      newPage = this.state.page - 1;
    } else if (page === 'Next' && this.state.page < 9) {
      newPage = this.state.page + 1;
    } else if (typeof page === 'number') {
      newPage = page;
    }
    this.setState({page: newPage}, () => this.handleSearchButtonClick(this.state.searchingYelpAPI));
  }

  handleLocationChange(e) {
    const _this = this;
    e.persist();
    this.wipeRestaurantDB(() => {
      _this.setState({locationInput: e.target.value}, () => {
        _this.populateRestaurants(() => {  
          // note: for unknown reasons, sometimes populateRestaurants will get stuck and never execute this callback
          // but the data will still be correctly populated. 
          console.log('populated restaurants with location: ', _this.state.locationInput);
          _this.handleSearchButtonClick(_this.state.searchingYelpAPI);
        });
      });
    });  
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <TopNavbar user={this.state.user} />
          </div>
          <button onClick={this.toggleDatabaseButtons}>
            Toggle Database Testing Buttons
          </button>
          {this.state.showDatabaseButtons &&
            <div>
              <button onClick={() => this.getAllRestaurants()}>
                Get all restaurants in database
              </button>
              <button onClick={() => this.wipeRestaurantDB()}>
                Wipe the restaurant table
              </button>
              <button onClick={() => this.populateRestaurants()}>
                Add 1000 restaurants from San Francisco, CA to database (20 API calls)
              </button>
            </div>
          }
          <Route
            path="/"
            render={() => (
              <Search
                searchInput={this.state.searchInput}
                priceFilterOne={this.state.priceFilterOne}
                priceFilterTwo={this.state.priceFilterTwo}
                priceFilterThree={this.state.priceFilterThree}
                priceFilterFour={this.state.priceFilterFour}
                handleSearchInputChange={this.handleSearchInputChange}
                handleSearchButtonClick={this.handleSearchButtonClick}
                handlePriceFilterClick={this.handlePriceFilterClick}
                cities={this.state.cities}
                handleLocationChange={this.handleLocationChange}
              />
          )}
          />
          <Route exact path="/" render={() => <Main selectRestaurant={this.selectRestaurant} />} />
          <Route path="/restaurant" render={() => <SingleRestaurant restaurant={this.state.restaurant} />} />
          <Route path="/searchList" render={() => <SearchList
            tenSearchResults={this.state.tenSearchResults}
            handleSearchListClick={this.handleSearchListClick}
            handlePageClick={this.handlePageClick}
            page={this.state.page} />} 
          />
          <Route path="/restaurant/writeReview" render={() => <AddReview />} />
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
  , document.getElementById('app'),
);
