require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const yelp = require('yelp-fusion');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-facebook').Strategy;

const db = require('../database/db');
const data = require('../data.json');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(process.env);
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
     Signup/Login
   ================= */

/* Github Authentication */
app.get('/auth/github', passport.authenticate('github'));
app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/'); },
);
passport.use(new GitHubStrategy(
  {
    clientID: 'abc' || process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    // do database things here
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
    return cb(null, profile);
  },
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/'); },
);

/* Facebook Authentication -- Currently processing by Ben */
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    // do database things here
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
    return cb(null, profile);
  },
));


/* Google Authentication */
app.get('/auth/google', passport.authenticate('google'));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => { res.redirect('/'); }
);

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: '/auth/google/callback',
  },
  (accessToken, refreshToken, profile, cb) => {
    // do database things here
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
    return cb(null, profile);
  },
));
