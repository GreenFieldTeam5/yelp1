const knex = require('./db');

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

const getThreeRestaurants = () =>
  new Promise((resolve, reject) => {
    knex.select().table('restaurants').limit(20)
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch(err => reject(err));
  });
  // .then((data) => {
  //   cb(data);
  // });

const deleteAllRestaurants = (cb) => {
  knex('restaurants').where('id', '>', 0).del()
    .then((data) => {
      cb(data);
    });
};

const searchAlgorithm = (restaurants, searchString, pricesString, page) => {
  // assigns a point value to each index based on the search string.
  // exact title match: 4 points
  // partial title match: 3 points
  // exact category alias match: 2 points
  // partial category alias match: 1 point
  // then, all the elements for each point value are sorted based on rating.
  const points = []; // array of [restaurant, pointscore]
  let ret = [];
  let searchInput = searchString.toLowerCase();
  const pricesInput = pricesString.split(', ').map(price => parseInt(price));

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

  return ret
    .filter(item => item.price !== null)
    .filter(item => pricesInput.includes(item.price.length))
    .slice(page * 10 - 10, page * 10);
};

const userVisitedRestaurantPage = (userId, restaurantId) => new Promise((resolve, reject) => {
  knex.insert({
    user_id: userId,
    restaurant_id: restaurantId,
  }).into('users_restaurants_recently_viewed')
    .then(() => {
      resolve();
    })
    .catch((error) => {
      console.log('error inserting user visit to restaurant page: ', error);
      reject(error);
    });
});

const userAddsReviewToRestaurant = (userReviewObject) => {
  const {
    review_text, user_id, restaurant_id, rating, image_url,
  } = userReviewObject;

  return new Promise((resolve, reject) => {
    knex.insert({
      user_id,
      restaurant_id,
      rating,
      image_url,
      review_text,
    }).into('reviews')
      .then(() => {
        console.log('Saved review into db');
        resolve();
      })
      .catch((error) => {
        console.log('Error inserting review into db: ', error);
        reject(error);
      });
  });
};

module.exports = {
  facebookLogin,
  addToRestaurants,
  getAllRestaurants,
  deleteAllRestaurants,
  searchAlgorithm,
  getThreeRestaurants,
  userVisitedRestaurantPage,
  userAddsReviewToRestaurant,
};
