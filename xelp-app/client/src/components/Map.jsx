import React from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

class Map extends React.Component {

  constructor(props) {
    super(props);
    console.log()
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

    map.on('load', function () {
      map.addLayer({
        "id": "points",
        "type": "symbol",
        "source": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-77.03238901390978, 38.913188059745586]
                    },
                    "properties": {
                        "title": "Mapbox DC",
                        "icon": "monument"
                    }
                }, {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [-122.414, 37.776]
                    },
                    "properties": {
                        "title": "Mapbox SF",
                        "icon": "harbor"
                    }
                }]
            }
        },
        "layout": {
          "icon-image": "{icon}-15",
          "text-field": "{title}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.6],
          "text-anchor": "top"
        },
      });
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
