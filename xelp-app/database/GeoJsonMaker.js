const convertRestaurantsToGeoJSON = (jsonRestaurants) => {
  const geoJSON = {};
  geoJSON.type = 'FeatureCollection';
  geoJSON.features = [];
  for (let i = 0; i < jsonRestaurants.length; i += 1) {
    const jsonRestaurant = jsonRestaurants[i];
    const newGeoRestObj = {};
    newGeoRestObj.type = 'Feature';

    const propertiesSubObject = {};
    propertiesSubObject.title = jsonRestaurant.name;
    propertiesSubObject.icon = 'monument';
    newGeoRestObj.properties = propertiesSubObject;

    const geometrySubObject = {};
    geometrySubObject.type = 'Point';
    const coords = jsonRestaurant.coordinates;
    geometrySubObject.coordinates = [coords.longitude, coords.latitude];
    newGeoRestObj.geometry = geometrySubObject;

    geoJSON.features.push(newGeoRestObj);
  }
  return geoJSON;
};

module.exports = { convertRestaurantsToGeoJSON };
