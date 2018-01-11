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
  const client = yelp.client(process.env.YELP_API_KEY);

  client.search(searchRequest)
    .then((response) => {
      const topTen = response.jsonBody.businesses.slice(0, 10);
      // topTen.forEach((business) => {
      //   if (business.display_phone === '') {
      //     business.display_phone = 'No Phone Number';
      //   }
      // });
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

app.post('/cat-add', (req, res) => {
  console.log('doing POST -> /cat-add. got data: ');
  console.log(req.body.data);
  dbHelpers.addToRestaurants(req.body.data, (post) => {
    res.status(201).json(post);
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
