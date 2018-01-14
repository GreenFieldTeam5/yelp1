
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', (users) => {
    users.increments('uid').notNullable().primary();
    users.biginteger('facebook_id').unique();
    users.string('username').notNullable();
    users.timestamp('created_at').defaultTo(knex.fn.now());
  }),
  knex.schema.createTableIfNotExists('reviews', (reviews) => {
    reviews.increments('id').primary();
    reviews.biginteger('user_id').references('uid').inTable('users').onDelete('CASCADE');
    reviews.integer('restaurant_id').references('id').inTable('restaurants').onDelete('CASCADE');
    reviews.float('rating');
    reviews.string('review_text');
    reviews.string('image_url');
    reviews.timestamp('created_at').defaultTo(knex.fn.now());
  }),
  knex.schema.createTableIfNotExists('restaurants', (restaurants) => {
    restaurants.increments('id').notNullable().primary();
    restaurants.string('name');
    restaurants.string('image_url');
    restaurants.string('display_phone');
    restaurants.string('address1');
    restaurants.string('city');
    restaurants.string('state');
    restaurants.string('zip_code');
    restaurants.string('price');
    restaurants.string('categories');
    restaurants.float('rating');
    restaurants.float('longitude');
    restaurants.float('latitude');
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
  knex.schema.table('reviews', (reviews) => {
    reviews.dropForeign('restaurant_id');
  }),
  knex.schema.table('users_restaurants_recently_viewed', (userRestaurants) => {
    userRestaurants.dropForeign('restaurant_id');
  }),
  knex.schema.table('users_restaurants_recently_viewed', (userRestaurants) => {
    userRestaurants.dropForeign('user_id');
  }),
  knex.schema.dropTableIfExists('users'),
  knex.schema.dropTableIfExists('reviews'),
  knex.schema.dropTableIfExists('restaurants'),
  knex.schema.dropTableIfExists('users_restaurants_recently_viewed'),
]);

