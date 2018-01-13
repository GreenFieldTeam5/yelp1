const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

const insertFacebookLogin = (profile) => {
  return Promise((reject, resolve) => {
    client.query('INSERT INTO users(facebook_id, username) VALUES($1, $2) ON CONFLICT DO NOTHING', [profile.id, profile.displayName], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

const abc = client.query('INSERT INTO users (facebook_id, username) VALUES (12312323, $1) ON CONFLICT DO NOTHING;', ['abc'], (err, result) => {
  if (err) throw err;
  else {
    console.log(result);
  }
});

module.exports = {
  insertFacebookLogin,
};
