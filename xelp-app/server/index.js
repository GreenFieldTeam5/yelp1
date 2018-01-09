const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const db = require('../database');

const path = require('path');

const data = require('../data.json');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000);


app.get('/3restaurants', (req, res) => {
  const featured = data.businesses.slice(0, 3);
  res.send(featured);
});
