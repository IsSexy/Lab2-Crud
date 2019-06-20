const router = require('express').Router();

//Our controllers
const BlogsController = require('../Controllers/blogsController.js');

//Creating routes
router.get('/', BlogsController.index);
router.get('/drafts', BlogsController.drafts);
router.get('/published', BlogsController.published);
router.get('/new', BlogsController.new);
router.get('/:id', BlogsController.show);
router.post('/', BlogsController.create);
router.get('/edit/:id', BlogsController.edit);
router.post('/update', BlogsController.update);
router.post('/delete', BlogsController.delete);

module.exports = router;