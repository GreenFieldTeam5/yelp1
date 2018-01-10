require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const yelp = require('yelp-fusion');

const db = require('../database/db');
const data = require('../data.json');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}, ${req.status}, ${req.body}`);
  next();
});
app.use(express.static(path.join(__dirname, '../client/dist')));

console.log('what is the process.env.PORT', process.env.PORT);

app.listen(process.env.PORT);

/* =================
        Search 
   ================= */
app.get('/search/:searchInput', (req, res) => {
  console.log(`doing GET -> /search/${req.params.searchInput}`);

  const searchRequest = {
    term: req.params.searchInput,
    location: 'san francisco, ca',
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
app.post('/createUser', (req, res) => {

});

