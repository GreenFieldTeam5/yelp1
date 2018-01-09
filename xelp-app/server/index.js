const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('../database');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000);

app.get('/item1', (req, res) => {});
app.post('/item1', (req, res) => {});
