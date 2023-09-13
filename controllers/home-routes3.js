const router = require('express').Router();
const { Post, Reply, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        // Fetch all posts and their associated replies and users
        const posts = await Post.findAll({
            include: [
                {
                    model: Reply,
                    attributes: ['replies_content', 'username', 'createdAt'],
                },
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        // Render the home.handlebars template with the retrieved data
        res.render('home', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to retrieve posts and replies' });
    }
});

router.get('/modal', async (req, res) => {
    try {
        res.render('modal', { loggedIn: req.session.loggedIn });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
