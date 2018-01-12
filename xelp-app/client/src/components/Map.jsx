import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

class Map extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      longitude: 5,
      latitude: 34,
      zoom: 1.5
    };
  }

  componentDidMount() {
    const { longitude, latitude, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [longitude, latitude],
      zoom
    });

    map.on('move', () => {

      const { lng, lat } = map.getCenter();

      this.setState({
        longitude: lng.toFixed(4), // toFixed(4) means to 4 decimal accuracy
        latitude: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
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
