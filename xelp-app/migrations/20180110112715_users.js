
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', (users) => {
    users.increments('uid').notNullable().primary();
    users.integer('google_id').unique();
    users.integer('github_id').unique();
    users.integer('facebook_id').unique();
    users.string('username').notNullable();
    users.string('first_name');
    users.string('last_name');
    users.string('phone_number');
    users.string('email');
    users.timestamps(true, true);
  }),
  knex.schema.createTable('reviews', (reviews) => {
    reviews.increments('id').primary();
    reviews.string('review_text');
    reviews.float('avg_rating');
    reviews.string('image_url');
    reviews.integer('user_id').references('uid').inTable('users');
    reviews.timestamps(true);
  }),
  knex.schema.createTable('restaurant_reviews)', (restaurantReviews) => {
    restaurantReviews.increments('id').notNullable().primary();
    restaurantReviews.integer('review_id').references('id').inTable('reviews');
    restaurantReviews.integer('restaurant_id').references('id').inTable('restaurants');
  }),
  knex.schema.createTable('restaurants', (restaurants) => {
    restaurants.increments('id').notNullable().primary();
    restaurants.string('name');
    restaurants.string('image_url');
    restaurants.string('phone_number');
    restaurants.string('street_name');
    restaurants.string('city');
    restaurants.string('zip_code');
    restaurants.string('price');
    restaurants.float('longitude');
    restaurants.float('latitude');
  }),
  knex.schema.createTable('users_restaurants_recently_viewed', (userRestaurants) => {
    userRestaurants.increments('id').notNullable().primary();
    userRestaurants.integer('user_id').references('uid').inTable('users');
    userRestaurants.integer('restaurant_id').references('id').inTable('restaurants');
    userRestaurants.timestamp('viewed_at').defaultTo(knex.fn.now());
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
]);
