const knex = require('./db');
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();
console.log('connect successful!');
// client.query('SELECT * FROM restaurants;', (err, res) => {
// if (err) throw err;
// for (const row of res.rows) {
// console.log(JSON.stringify(row));
// }
// client.end();
// });

const facebookLogin = (profile) => {
  knex.insert({
    facebook_id: profile.id,
    username: profile.displayName,
  }).into('users').then(() => console.log('facebook_id inserted!'));

  return knex('users').where({
    facebook_id: profile.id,
  }).select('facebook_id')
    .then(user => user);
};

const addToRestaurants = (restaurants, cb) => {
  let completion = 0;
  restaurants.forEach((restaurant) => {
    getAllRestaurants((data) => {
      if (!data.map(item => item.name).includes(restaurant.name)) {
        knex.insert({
          name: restaurant.name,
          image_url: restaurant.image_url,
          display_phone: restaurant.display_phone,
          address1: restaurant.location.address1,
          city: restaurant.location.city,
          state: restaurant.location.state,
          zip_code: restaurant.location.zip_code,
          price: restaurant.price,
          rating: restaurant.rating,
          categories: restaurant.categories.map(item => item.alias).join('<AND>'),
          latitude: restaurant.coordinates.latitude,
          longitude: restaurant.coordinates.longitude,
        }).into('restaurants')
          .then(() => {
            completion++;
            if (completion === restaurants.length) cb(restaurants);
          });
      }
    });
  });
};

const getAllRestaurants = (cb) => {
  knex.select().table('restaurants')
    .then((data) => {
      cb(data);
    });
};

const deleteAllRestaurants = (cb) => {
  knex('restaurants').where('id', '>', 0).del()
    .then((data) => {
      cb(data);
    });
};

const searchAlgorithm = (restaurants, searchString, pricesString) => {
  // assigns a point value to each index based on the search string.
  // exact title match: 4 points
  // partial title match: 3 points
  // exact category alias match: 2 points
  // partial category alias match: 1 point
  // then, all the elements for each point value are sorted based on rating.
  const points = []; // array of [restaurant, pointscore]
  let ret = [];
  let searchInput = searchString.toLowerCase();
  let pricesInput = pricesString.split(', ').map(price => parseInt(price));

  for (let i = 0; i < restaurants.length; i++) {
    let point = 0;
    const name = restaurants[i].name.toLowerCase();
    const categories = restaurants[i].categories.split('<AND>');
    if (name === searchInput) {
      point += 4;
      // if exact name match is found, populate rest based on foremost category of matched restaurant
      // the observation is that the first category is usually the most relevant. observation may be incorrect. 
      console.log('searchInput CHANGING TO: ', categories[0]);
      searchInput = categories[0] || searchInput;
    }
    if (name !== searchInput && name.includes(searchInput)) {
      point += 3;
      // if partial name match is found, populate rest on foremost category of matched restaurant
      console.log('searchInput CHANGING TO: ', categories[0]);
      searchInput = categories[0] || searchInput;
    }
    if (categories.includes(searchInput)) {
      point += 2;
    }
    if (!categories.includes(searchInput) && categories.join('').includes(searchInput)) {
      point += 1;
    }
    points.push([restaurants[i], point]);
  }

  for (let i = 10; i >= 0; i--) {
    let sliver = points.filter(item => item[1] === i);
    sliver = sliver.sort((a, b) => (b[0].rating - a[0].rating)).map(item => item[0]);
    ret = ret.concat(sliver);
  }

  return ret.filter(item => item.price !== null).filter(item => pricesInput.includes(item.price.length)).slice(0, 10);
};

module.exports = {
  facebookLogin,
  addToRestaurants,
  getAllRestaurants,
  deleteAllRestaurants,
  searchAlgorithm,
};
