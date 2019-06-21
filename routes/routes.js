const express = require('express');

const app = express();

//Import our routes
const pageRoutes = require('./pages.js');
const movieRoutes = require('./movies.js');

//Register our routes within our app
app.use('/', pageRoutes);
app.use('/movies', movieRoutes);

//Export changes
module.exports = app;