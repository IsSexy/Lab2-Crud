const Movie = require ('../models/movie');

exports.new = (req, res) => {
    req.isAuthenticated();

    res.render('blogs/new', {
        title: 'New Blog Post'
    });
};

exports.index = (req, res) => {
    req.isAuthenticated();

    Blog.find({
        author: req.session.userId
    })
    .populate('author')
    .then(blogs => {
        res.render('blogs/index', {
            blogs: blogs,
            title: 'Archive'
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/');
    });
};

exports.show = (req, res) => {
    req.isAuthenticated();

    Blog.Blog.findOne({
        _id: req.params.id,
        author: req.session.userId
      })
    .then(blog => {
        res.render('blogs/show', {
            blog: blog,
            title: blog.title
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};

exports.create = (req, res) => {
    req.isAuthenticated();

    req.body.blog.author = req.session.userId;
    Blog.create(req.body.blog)
    .then(() => {
        req.flash('success', 'New blog created successfully!');
        res.redirect('/blogs');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('/new', {
            title: 'New Blog',
            blog: req.body.blog
        });
    });
};

exports.drafts = (req, res) => {
    req.isAuthenticated();

    Blog.find({
        author: req.session.userId
    })
    .drafts()
    .then(blogs => {
        res.render('blogs/drafts', {
            blogs: blogs,
            title: 'Drafts'
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};

exports.published = (req, res) => {
    req.isAuthenticated();

    Blog.find()
    .published()
    .then(blogs => {
        res.render('blogs/published', {
            blogs: blogs,
            title: 'Published'
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};

exports.edit = (req, res) => {
    req.isAuthenticated();

    Blog.findOne({
        _id: req.params.id,
        author: req.session.userId
    })
    .then(blog => {
        res.render('blogs/edit', {
            title: `Edit: ${blog.title}`,
            blog: blog
        });
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};

exports.update = (req, res) => {
    req.isAuthenticated();

    Blog.updateOne({
        _id: req.body.id
    }, req.body.blog, {
        runValidators: true
    })
    .then(() => {
        req.flash('success', 'Your blog was updated successfully!')
        res.redirect('/blogs');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.render('blogs/edit', {
            title: `Edit: ${req.body.blog.title}`,
            blog: req.body.blog
        });
    });
};

exports.delete = (req, res) => {
    req.isAuthenticated();

    Blog.deleteOne({
        _id: req.body.id,
        author: req.session.userId
    })
    .then(() => {
        req.flash('success', 'Blog deleted successfully!');
        res.redirect('/blogs');
    })
    .catch(err => {
        req.flash('error', `ERROR: ${err}`);
        res.redirect('/blogs');
    });
};