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
  res.send(data.businesses);
});
