const knex = require('./db');

const test = () => {
  knex.insert({
    google_id: 1,
    github_id: 1,
    facebook_id: 1,
    username: 'cat123',
    first_name: 'cat',
    last_name: 'herine',
    phone_number: '289232329',
    email: 'catsruletheworld@gmail.com',
  }).into('users')
    .then(() => console.log('sds'));
};

const addToRestaurants = (restaurants, cb) => {
  let completion = 0;
  restaurants.forEach(restaurant => {
    knex.insert({
      name: restaurant.name,
      image_url: restaurant.image_url,
      phone_number: restaurant.display_phone,
      street_name: `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`,
      city: restaurant.location.city,
      state: restaurant.location.state,
      zip_code: restaurant.location.zip_code,
      price: restaurant.price,
      latitude: restaurant.coordinates.latitude,
      longitude: restaurant.coordinates.longitude,
    }).into('restaurants')
      .then(() => {
        completion++;
        if (completion === restaurants.length) cb(restaurants)
      });
  });
};

module.exports = {
  test,
  addToRestaurants,
};