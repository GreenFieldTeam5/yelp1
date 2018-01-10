const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const db = require('../database');

const path = require('path');
const axios = require('axios');
const yelp = require('yelp-fusion');

const data = require('../data.json');

const apiKey = 'RjDRgv8bBA1Sk5ybA-JT_L2eEQQY7qVO5yepc2FBXDOwJAthQz7mtjLxqAaW2U-QYWdUUETuHzBaeTuV4AD-GTq-YwpUX5Ucu3r4aodS5kLVolyUlAqoGb5Q1XtUWnYx';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.listen(3000);


app.get('/search/:searchInput', (req, res) => {
  console.log(`doing GET -> /search/${req.params.searchInput}`);

  const searchRequest = {
    term:'Four Barrel Coffee',
    location: 'san francisco, ca',
  };
  const client = yelp.client(apiKey);

  client.search(searchRequest)
    .then((response) => {
      const firstResult = response.jsonBody.businesses[0];
      const prettyJson = JSON.stringify(firstResult, null, 4);
      console.log('got first result: ', prettyJson);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log('caught error', err);
    });

  // axios.get('https://api.yelp.com/v3/businesses/search', {
  //   headers: {
  //     Authorization: `Bearer ${apiKey}`,
  //   },
  //   // params: {
  //   //   term: req.params.searchInput,
  //   // },
  // })
  //   .then((response) => {
  //     console.log('got response', response);
  //     res.status(200).json(data);
  //   })
  //   .catch((error) => {
  //     console.log('caught error', error);
  //   });
});

app.get('/3restaurants', (req, res) => {
  res.send(data.businesses);
});
