const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const yelp = require('yelp-fusion');

const db = require('../database/db');
const config = require('../client/src/config.js');
const data = require('../data.json');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}, ${req.status}, ${req.body}`);
  next();
});
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(3000);

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
  const client = yelp.client(config.apiKey);

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

