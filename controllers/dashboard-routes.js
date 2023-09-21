const router = require('express').Router();
const { Post, User, Reply } = require('../models'); // Ensure you import Reply
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        // Fetch all the posts by the logged-in user
        const postData = await Post.findAll({
            where: {
                user_id: req.session.userId
            },
            attributes: ['id', 'title', 'post_content', 'created_at'],
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));

        // Fetch all the posts for which the logged-in user has commented
        const postDataWithReplies = await Post.findAll({
            include: [
                {
                    model: Reply,
                    as: 'replies',
                    where: {
                        user_id: req.session.userId
                    },
                    attributes: ['replies_content', 'created_at', 'updated_at'],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                },
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const postsWithReplies = postDataWithReplies.map(post => post.get({ plain: true }));

        res.render('dashboard', {
            posts,
            postsWithReplies,
            loggedIn: req.session.loggedIn, 
            username: req.session.username 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
