const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all posts for homepage
router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.finAll(req.session.user_id, {
            include: [
                {
                    model: Post,
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            logged_in: true,
        });
        } catch (err) {
            res.status(500).json(err);
        }
    });

     router.get('/new', (req, res) => {
        res.render('new-post', {
            logged_in: true,
        });
    });

module.exports = router;