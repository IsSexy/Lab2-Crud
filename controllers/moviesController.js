const Movie = require ('../models/movie.js');

exports.new = (req, res) => {
    res.render('movies/new', {
        title: 'New Movie'
    });
};

exports.index = (req, res) => {
    Movie.find()
    .then(movies => {
        res.render('movies/index', {
            movies: movies,
            title: 'Our Movies'
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
    });
};

exports.show = (req, res) => {
    Movie.findOne({
        _id: req.params.id
      })
    .then(movie => {
        res.render('movies/show', {
            movie: movie,
            title: movie.title
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/movies');
    });
};

exports.create = (req, res) => {
    Movie.create(req.body.movie)
    .then(() => {
        req.flash('success', 'New movie created successfully!');
        res.redirect('/movies');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('/new', {
            title: 'New Movie',
            movie: req.body.movie
        });
    });
};

exports.edit = (req, res) => {
    Movie.findOne({
        _id: req.params.id
    })
    .then(movie => {
        res.render('movies/edit', {
            title: `Edit: ${movie.title}`,
            movie: movie
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/movies');
    });
};

exports.update = (req, res) => {
    Movie.updateOne({
        _id: req.body.id
    }, req.body.movie, {
        runValidators: true
    })
    .then(() => {
        req.flash('success', 'Your movie was updated successfully!')
        res.redirect('/movies');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('movies/edit', {
            title: `Edit: ${req.body.movie.title}`,
            movie: req.body.movie
        });
    });
};

exports.delete = (req, res) => {
    Movie.deleteOne({
        _id: req.body.id
    })
    .then(() => {
        req.flash('success', 'Movie deleted successfully!');
        res.redirect('/movies');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/movies');
    });
};