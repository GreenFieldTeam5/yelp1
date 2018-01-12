require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const yelp = require('yelp-fusion');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

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
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}));

app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

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
      term: 'restaurants',
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
    // assign each result in the database a point value based on keyword matches
    // return the top 10 of them
    // below line is a strict search by exact string match to restaurant name.
    // const results = Array(10).fill(data.filter(item => item.name === req.params.searchInput)[0]);
    const results = dbHelpers.searchAlgorithm(data, req.params.searchInput);
    res.status(200).json(results);
  });
});

/* =================
     Signup/Login
   ================= */

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  },
);

/* Facebook Authentication -- Currently processing by Ben */
passport.use(new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: '/auth/facebook/callback',
    passReqToCallback: true,
  },
  (req, accessToken, refreshToken, profile, cb) => {
    // what to do with access token?
    if (!req.user) {
      const fbLoginId = dbHelpers.facebookLogin(profile);
      fbLoginId.then(user => console.log(user[0].facebook_id));
    } else { console.log('user has already logged in'); }

    return cb(null, profile);
  },
));

app.get('/getuserdata', (req, res) => {
  res.json(req.user);
});

/* Logout */
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
