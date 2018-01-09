import React from 'react';
import axios from 'axios';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
    this.getRestaurants = this.getRestaurants.bind(this);
  }

  componentDidMount() {
    this.getRestaurants();
  }

  getRestaurants() {
    axios.get('/3restaurants')
      .then((response) => {
        this.setState({
          restaurants: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        Recommended Restaurants:
        <ul>{ this.state.restaurants.map(restaurant =>
          <li key={restaurant.id}> {restaurant.name}
            <img src={restaurant.image_url}> </img>
          </li>)}
        </ul>
      </div>
    );
  }
}
export default Main;
