const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database/db');
const path = require('path');
const axios = require('axios');
const data = require('../data.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(3000);

app.get('/search/:searchInput', (req, res) => {
  console.log(`doing GET -> /search/${req.params.searchInput}`);
  // db.getAllLines((err, data) => {
  // 	if (err) console.error(err);
  // 	console.log('success GET -> /api/lines', data);
  // 	res.status(200).json(data);
  // });
  axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: 'Bearer RjDRgv8bBA1Sk5ybA-JT_L2eEQQY7qVO5yepc2FBXDOwJAthQz7mtjLxqAaW2U-QYWdUUETuHzBaeTuV4AD-GTq-YwpUX5Ucu3r4aodS5kLVolyUlAqoGb5Q1XtUWnYx',
    },
    params: {
      term: req.params.searchInput,
    },
  })
    .then((response) => {
      console.log(response);
      res.status(200).json(data);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get('/3restaurants', (req, res) => {
  res.send(data.businesses);
});
