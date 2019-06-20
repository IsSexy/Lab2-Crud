//Our dotenv environment
require('dotenv').config();

//Imported libraries
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Converting express to an app constant
const app = express();

//Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Our views path
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

//Our routes
const routes = require('./Routes/routes.js');
app.use('/', routes);

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on port ${port}`));