
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTableIfNotExists('users', (table) => {
    table.increments('uid').notNullable().primary();
    table.string('google_id').unique();
    table.string('github_id').unique();
    table.string('facebook_id').unique();
    table.string('username').notNullable();
    table.string('first_name');
    table.string('last_name');
    table.string('phone_number');
    table.string('email');
    table.timestamps(true, true);
  }),
  // knex.schema.createTable('reviews', (table) => {
  //   table.increments('id').primary();
  //   table.string('review_text')
  // }),
  // knex.schema.createTable('restaurant_reviews)', (table) => {
  // }),
  // knex.schema.createTable('restaurants', (table) => {
  // }),
  // knex.schema.createTable('users_restaurants_recently_viewed', (table) => {
  // }),
]);

// table.bigInteger('AddressId').unsigned().index().references('id').inTable('Address')

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
]);
