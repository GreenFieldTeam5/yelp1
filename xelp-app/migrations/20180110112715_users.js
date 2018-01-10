
exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('users', (table) => {
    table.increments('uid').primary();
    table.string('google_id');
    table.string('username');
    table.string('first_name');
    table.string('last_name');
    table.string('phone_number');
    table.string('email');
    table.timestamps();
  }),
]);

exports.down = (knex, Promise) => Promise.all([
  knex.schema.dropTable('users'),
]);
