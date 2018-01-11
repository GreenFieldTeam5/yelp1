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
  .then( () => console.log('sds'));
};

module.exports = {
  test,
};
