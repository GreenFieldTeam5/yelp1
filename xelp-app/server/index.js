require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const yelp = require('yelp-fusion');
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;

const db = require('../database/db');
const dbHelpers = require('../database/index');
const data = require('../data.json');

const app = express();
const client = yelp.client(process.env.YELP_API_KEY);

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}, ${req.status}, ${JSON.stringify(req.body)}`);
  next();
});
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(process.env.PORT || 3000);

/* =================
        Search
   ================= */
app.get('/search/:searchInput/:prices', (req, res) => {
  console.log(`doing GET -> /search/${req.params.searchInput}/${req.params.prices}`);

  const searchRequest = {
    term: req.params.searchInput,
    location: 'san francisco, ca',
    price: req.params.prices,
  };

  client.search(searchRequest)
    .then((response) => {
      const topTen = response.jsonBody.businesses.slice(0, 10);
      topTen.forEach((business) => {
        console.log('got ', business.name);
      });
      res.status(200).json(topTen);
    })
    .catch((err) => {
      console.log('caught error', err);
    });
});

app.get('/3restaurants', (req, res) => {
  res.send(data.businesses);
});

/* =================
    Database Testing
   ================= */

app.get('/cat-get', (req, res) => {
  console.log('doing GET -> /cat-get');
  dbHelpers.getAllRestaurants((data) => {
    res.status(200).json(data);
  });
});
app.get('/cat-wipe', (req, res) => {
  console.log('doing GET -> /cat-wipe');
  dbHelpers.deleteAllRestaurants((data) => {
    res.status(200).json(data);
  });
});
app.post('/populate', (req, res) => {
  for (let i = 0; i <= 1000; i += 50) {
    const searchRequest = {
      location: 'san francisco, ca',
      limit: 50,
      offset: i,
    };

    client.search(searchRequest)
      .then((response) => {
        const results = response.jsonBody.businesses;
        dbHelpers.addToRestaurants(results, () => {
          if (i === 1000) {
            res.status(201).json('POSTing finished, 1000 results. ');
          }
        });
      })
      .catch((err) => {
        console.log('caught error', err);
      });
  }
});
app.get('/test/search/:searchInput/:prices', (req, res) => {
  console.log(`doing GET -> /test/search/${req.params.searchInput}/${req.params.prices}`);
  dbHelpers.getAllRestaurants((data) => {
    console.log('testing search function got data: ', data);
    //const results = data.filter(item => item.name === req.params.searchInput);
    res.status(200).json(data);
  });
});

app.get('/testinghere', (req, res) => {
  dbHelpers.test();
});

/* =================
     Signup/Login
   ================= */
/* Github Authentication */
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

passport.use(new GithubStrategy({
  clientID: 'abc',
  clientSecret: 'def',
  callbackURL: '/auth/github/callback',
}, (accessToken, refreshToken, profile, cb) => cb(null, profile)));

/* Google Authentication */

/* Facebook Authentication */
