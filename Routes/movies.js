const router = require('express').Router();

//Our controllers
const MoviesController = require('../Controllers/moviesController.js');

//Creating routes
router.get('/', MoviesController.index);
router.get('/new', MoviesController.new);
router.get('/:id', MoviesController.show);
router.post('/', MoviesController.create);
router.get('/edit/:id', MoviesController.edit);
router.post('/update', MoviesController.update);
router.post('/delete', MoviesController.delete);

module.exports = router;