const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

console.log(process.env.DATABASE_URL);

client.connect();

const abc = client.query('INSERT INTO users (facebook_id, username) VALUES (12312323, $1)', ['abc'], (err, result) => {
  if (err) throw err;
  else {
    console.log(result);
  }
});

module.exports = {
  abc,
};
