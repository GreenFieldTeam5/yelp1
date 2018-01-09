const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const db         = require('../database');
const path       = require('path');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.listen(3000);
