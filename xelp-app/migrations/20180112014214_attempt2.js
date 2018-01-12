
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', (users) => {
    users.increments('uid').notNullable().primary();
    users.integer('google_id').unique();
    users.string('github_id').unique();
    users.integer('facebook_id').unique();
    users.string('username').notNullable();
    users.string('first_name');
    users.string('last_name');
    users.string('phone_number');
    users.string('email');
    users.timestamps(true, true);
  }),
  knex.schema.createTableIfNotExists('reviews', (reviews) => {
    reviews.increments('id').primary();
    reviews.string('review_text');
    reviews.float('avg_rating');
    reviews.string('image_url');
    reviews.integer('user_id').references('uid').inTable('users').onDelete('CASCADE');
    reviews.timestamps(true);
  }),
  knex.schema.createTableIfNotExists('restaurant_reviews', (restaurantReviews) => {
    restaurantReviews.increments('id').notNullable().primary();
    restaurantReviews.integer('review_id').references('id').inTable('reviews').onDelete('CASCADE');
    restaurantReviews.integer('restaurant_id').references('id').inTable('restaurants').onDelete('CASCADE');
  }),
  knex.schema.createTableIfNotExists('restaurants', (restaurants) => {
    restaurants.increments('id').notNullable().primary();
    restaurants.string('name');
    restaurants.string('image_url');
    restaurants.string('phone_number');
    restaurants.string('street_name');
    restaurants.string('city');
    restaurants.string('state');
    restaurants.string('zip_code');
    restaurants.string('price');
    restaurants.string('rating');
    restaurants.string('categories');
    restaurants.float('latitude');
    restaurants.float('longitude');
  }),
  knex.schema.createTableIfNotExists('users_restaurants_recently_viewed', (userRestaurants) => {
    userRestaurants.increments('id').notNullable().primary();
    userRestaurants.integer('user_id').references('uid').inTable('users').onDelete('CASCADE');
    userRestaurants.integer('restaurant_id').references('id').inTable('restaurants').onDelete('CASCADE');
    userRestaurants.timestamp('viewed_at').defaultTo(knex.fn.now());
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.table('reviews', (reviews) => {
    reviews.dropForeign('user_id');
  }),
  knex.schema.table('restaurant_reviews', (restaurantReviews) => {
    restaurantReviews.dropForeign('review_id');
  }),
  knex.schema.table('restaurant_reviews', (restaurantReviews) => {
    restaurantReviews.dropForeign('restaurant_id');
  }),
  knex.schema.table('users_restaurants_recently_viewed', (userRestaurants) => {
    userRestaurants.dropForeign('restaurant_id');
  }),
  knex.schema.table('users_restaurants_recently_viewed', (userRestaurants) => {
    userRestaurants.dropForeign('user_id');
  }),
  knex.schema.dropTableIfExists('users'),
  knex.schema.dropTableIfExists('reviews'),
  knex.schema.dropTableIfExists('restaurant_reviews'),
  knex.schema.dropTableIfExists('restaurants'),
  knex.schema.dropTableIfExists('users_restaurants_recently_viewed'),
]);

