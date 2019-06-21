//Our dotenv environment
require('dotenv').config();

//Imported libraries
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

//Assigning express to an app constant
const app = express();

//Connect to db
mongoose.connect(process.env.DB_URI, {
    auth: {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD
    },
    useNewUrlParser: true
}).catch(err => console.log(`ERROR: ${err}`));

//Flash support
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(session({
    secret: (process.env.secret || 'i-am-a-salty-boy'),
    cookie: {
        max: 10800000
    },
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use((req, res, next) => {
    res.locals.flash = res.locals.flash || {};
    res.locals.flash.success = req.flash('success') || null;
    res.locals.flash.error = req.flash('error') || null;
    
    next();
});

//Body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//Assets
app.use('/css', express.static('./assets/stylesheets'));

//Our views path
app.set('Views', path.join(__dirname, 'Views'));
app.set('view engine', 'pug');

//Our routes
const routes = require('./Routes/routes.js');
app.use('/', routes);

const port = (process.env.PORT || 4000);
app.listen(port, () => console.log(`Listening on port ${port}`));