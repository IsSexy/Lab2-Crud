const router = require('express').Router();

//Our controllers
const PagesController = require('../Controllers/pagesController.js');

//Creating routes
router.get('/', PagesController.home);

module.exports = router;