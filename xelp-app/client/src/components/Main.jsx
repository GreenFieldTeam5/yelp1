import React from 'react';
import axios from 'axios';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
              <Link to="/restaurant">
              <img onClick={() => this.props.selectRestaurant(restaurant)} src={restaurant.image_url} width="300px" />
              </Link>
            </GridTile>
      ))}
        </GridList>
      </div>
    );
  }
}
export default Main;

