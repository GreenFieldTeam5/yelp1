import React from 'react';
import mapboxgl from 'mapbox-gl';

import GeoJsonMaker from '../../../database/GeoJsonMaker.js';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

class Map extends React.Component {

  constructor(props) {
    super(props);

    const startingLongitude = -122.2030;
    const startingLatitude = 37.7503;
    const startingZoom = 12;
    const geoJSON = GeoJsonMaker.convertRestaurantsToGeoJSON(props.restaurants);

    this.state = {
      longitude: startingLongitude,
      latitude: startingLatitude,
      zoom: startingZoom,
      geoData: geoJSON,
      restaurants: props.restaurants,
      map: undefined,
      mapLoaded: false,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.4195072, 37.7856923],
      zoom: 12,
    });

    const firstRestaurant = this.state.restaurants[0];

    console.log('geoData: ', this.state.geoData);

    console.log('geometry print out ', this.state.geoData.features[0].geometry)

    const layerObject = {
      "id": "points",
      "type": "symbol",
      "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": this.state.geoData.features,
          },
      },
      "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top",
      },
    };

    console.log('what is the layerObject: ', layerObject);

    map.on('load', () => {
      map.addLayer(layerObject);
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      this.setState({
        longitude: lng.toFixed(4), // toFixed(4) means to 4 decimal accuracy
        latitude: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  componentWillReceiveProps(newProps) {
    const isNewRestaurantData = JSON.stringify(newProps.restaurants) !== JSON.stringify(this.state.restaurants);
    if (isNewRestaurantData) {
      const localGeoJSON = GeoJsonMaker.convertRestaurantsToGeoJSON(newProps.restaurants);
      this.setState({
        restaurants: newProps.restaurants,
        geoData: localGeoJSON,
      });
    }
  }

  render() {
    const { longitude, latitude, zoom } = this.state;

    var divStyle = {
      position: 'relative',
      height: '400px',
      width: '400px',
    };

    return (
      <div>
        <div ref={el => this.mapContainer = el} style={divStyle} />
      </div>
    );
  }
}

export default Map;
