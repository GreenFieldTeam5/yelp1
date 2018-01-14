import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Carousel from './components/Carousel.jsx';
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
      tenSearchResults: [],
      restaurant: [],
      showDatabaseButtons: false,
      priceFilterOne: true,
      priceFilterTwo: true,
      priceFilterThree: true,
      priceFilterFour: true,
      user: null,
      reviewRating: 1,
      reviewText: '',
      writeReview: false,
      restaurantReviews: [],
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
    this.clearSearchResults = this.clearSearchResults.bind(this);
    this.handleWriteReviewClick = this.handleWriteReviewClick.bind(this);
    this.handleReviewTextChange = this.handleReviewTextChange.bind(this);
    this.submitReview = this.submitReview.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.getReviewsForRestaurant = this.getReviewsForRestaurant.bind(this);
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
    }, () => this.getReviewsForRestaurant(restaurant));
  }

  getReviewsForRestaurant(restaurant) {
    axios.get(`/getReviewsForRestaurant/${restaurant.id}`)
      .then((response) => {
        console.log('got GET reviewwww responseeeesponse: ', response);
        this.setState({ restaurantReviews: response.data.rows });
      })
      .catch((error) => {
        console.log(error);
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
        console.log('got POST response: ', response);
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
    this.setState({ page: newPage }, () => this.handleSearchButtonClick(this.state.searchingYelpAPI));
  }

  clearSearchResults() {
    this.setState({ tenSearchResults: [] });
  }

  handleWriteReviewClick() {
    console.log('lets load write review fields');
    this.setState({ writeReview: !this.state.writeReview });
  }

  handleReviewTextChange(e) {
    this.setState({ reviewText: e.target.value }, () => console.log(this.state.reviewText));
  }

  submitReview() {
    console.log('submitting a review: ');
    console.log('text: ', this.state.reviewText);
    console.log('rating: ', this.state.reviewRating);
    console.log('user: ', this.state.user.id || 'guest');
    axios.post('/createReview', {
      data: {
        review_text: this.state.reviewText,
        rating: this.state.reviewRating,
        facebook_id: this.state.user.id || 'guest',
        restaurant_id: this.state.restaurant.id,
        image_url: this.state.restaurant.image_url,
      },
    })
      .then((response) => {
        console.log('got POST response: ', response);
        this.setState({
          writeReview: false,
        }, () => this.getReviewsForRestaurant(this.state.restaurant));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRatingChange(event, index, value) {
    console.log(value);
    this.setState({ reviewRating: value });
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <div>
            <TopNavbar
              user={this.state.user}
              clearSearchResults={this.clearSearchResults}
            />
          </div>
          <Route
            exact
            path="/"
            render={() => (
              <Search
                searchInput={this.state.searchInput}
                tenSearchResults={this.state.tenSearchResults}
                handleSearchInputChange={this.handleSearchInputChange}
                handleSearchButtonClick={this.handleSearchButtonClick}
                cities={this.state.cities}
              />
          )}
          />
          <Route exact path="/" render={() => <Carousel selectRestaurant={this.selectRestaurant} />} />
          <Route
            path="/restaurant"
            render={() => (
              <SingleRestaurant
                restaurant={this.state.restaurant}
                handleWriteReviewClick={this.handleWriteReviewClick}
                reviewRating={this.state.reviewRating}
                reviewText={this.state.reviewText}
                writeReview={this.state.writeReview}
                handleReviewTextChange={this.handleReviewTextChange}
                submitReview={this.submitReview}
                handleRatingChange={this.handleRatingChange}
                restaurantReviews={this.state.restaurantReviews}
                user={this.state.user}
              />)}

          />
          <Route
            path="/searchList"
            render={() => (<SearchList
              priceFilterOne={this.state.priceFilterOne}
              priceFilterTwo={this.state.priceFilterTwo}
              priceFilterThree={this.state.priceFilterThree}
              priceFilterFour={this.state.priceFilterFour}
              handlePriceFilterClick={this.handlePriceFilterClick}
              tenSearchResults={this.state.tenSearchResults}
              handleSearchListClick={this.handleSearchListClick}
              handlePageClick={this.handlePageClick}
              page={this.state.page}
            />)}
          />
          <Route path="/restaurant/writeReview" render={() => <AddReview />} />
          <Footer />
          <div style={{ display: 'none' }}>
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
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(
  <HashRouter>
    <App />
  </HashRouter>
  , document.getElementById('app'),
);
