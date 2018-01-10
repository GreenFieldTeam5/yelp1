import React from 'react';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

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
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          {this.state.restaurants.map(restaurant => (
            <GridTile
              key={restaurant.id}
              title={restaurant.name}
              actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
              titleStyle={styles.titleStyle}
              titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            >
              <img src={restaurant.image_url} />
            </GridTile>
      ))}
        </GridList>
      </div>
    );
  }
  // <div>
  //   Recommended Restaurants:
  //   <ul>{ this.state.restaurants.map(restaurant =>
  //     <li key={restaurant.id}> {restaurant.name}
  //       <img src={restaurant.image_url}> </img>
  //     </li>)}
  //   </ul>
  // </div>
}
export default Main;

