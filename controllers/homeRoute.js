const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', async (req, res) => {
    try {
        // Get all posts and JOIN with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ],
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass serialized data and session flag into template
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET one post
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route for login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// GET route for signup page
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

// GET route for homepage
router.get('/homepage', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                },
            ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
        posts,
        logged_in: req.session.logged_in,
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;