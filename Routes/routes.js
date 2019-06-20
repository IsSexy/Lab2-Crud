const express = require('express');

const app = express();

//Import our page routes
const movieRoutes = require('./movies.js');

//Register our Page Routes with our app
app.use('/', pageRoutes);
app.use('/blogs', blogRoutes);
app.use('/authors', authorRoutes);
app.use('/', sessionsRoutes);

//Export changes
module.exports = app;