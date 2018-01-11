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
  restaurants.forEach((restaurant) => {
    knex.insert({
      name: restaurant.name,
      image_url: restaurant.image_url,
      phone_number: restaurant.display_phone,
      street_name: `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}`,
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

const searchAlgorithm = (restaurants, searchString) => {
  // assigns a point value to each index based on the search string.
  // exact title match: 4 points
  // partial title match: 3 points
  // exact category alias match: 2 points
  // partial category alias match: 1 point
  // then, all the elements for each point value are sorted based on rating.
  let points = []; // array of [restaurant, pointscore]
  let ret = [];
  let searchInput = searchString.toLowerCase();

  for (let i = 0; i < restaurants.length; i++) {
    let point = 0;
    const name = restaurants[i].name.toLowerCase();
    const categories = restaurants[i].categories.split('<AND>');
    if (name === searchInput) {
      point += 4;
      console.log('searchInput CHANGING TO: ', categories[0]);
      searchInput = categories[0] || searchInput;
    }
    if (name !== searchInput && name.includes(searchInput)) {
      point += 3;
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

  // points = points.sort((a, b) => (b[1] - a[1]));
  for (let i = 10; i >= 0; i--) {
    let sliver = points.filter(item => item[1] === i);
    sliver = sliver.sort((a, b) => (b[0].rating - a[0].rating)).map(item => item[0]);
    ret = ret.concat(sliver);
  }

  return ret.slice(0, 10);
};

module.exports = {
  test,
  addToRestaurants,
  getAllRestaurants,
  deleteAllRestaurants,
  searchAlgorithm,
};
