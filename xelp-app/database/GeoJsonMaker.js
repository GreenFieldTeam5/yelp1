const convertRestaurantsToGeoJSON = (restaurants, isYelpAPI) => {

  console.log('restaurants convertRestaurantsToGeoJSON:', restaurants);

  const geoJSON = {};
  geoJSON.type = 'FeatureCollection';
  geoJSON.features = [];
  for (let i = 0; i < restaurants.length; i += 1) {
    const restaurant = restaurants[i];
    const newGeoRestObj = {};
    newGeoRestObj.type = 'Feature';

    const propertiesSubObject = {};
    propertiesSubObject.title = restaurant.name;
    propertiesSubObject.icon = 'monument';
    newGeoRestObj.properties = propertiesSubObject;

    const geometrySubObject = {};
    geometrySubObject.type = 'Point';
    if (isYelpAPI) {
      const coords = restaurant.coordinates;
      geometrySubObject.coordinates = [coords.longitude, coords.latitude];
      newGeoRestObj.geometry = geometrySubObject;
    } else {
      geometrySubObject.coordinates = [restaurant.longitude, restaurant.latitude];
      newGeoRestObj.geometry = geometrySubObject;
    }
    geoJSON.features.push(newGeoRestObj);
  }
  return geoJSON;
};

module.exports = { convertRestaurantsToGeoJSON };
