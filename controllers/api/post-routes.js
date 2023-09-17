const express = require('express');
const router = express.Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to retrieve all posts 
router.get('/', async (req, res) => {
    try {
        // Fetch posts from the database
        const postData = await Post.findAll();
        const posts = postData.map((post) => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to create a new post with authentication
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            user_id: req.session.userId, // Uses the user id from session
        });
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new post' });
    }
});

// Route to update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                post_content: req.body.post_content,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.userId, // Uses the user id from session
                },
            }
        );

        if (updatedPost[0] === 0) {
            res.status(404).json({ error: 'Post not found or unauthorized' });
        } else {
            res.status(200).json(updatedPost);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update the post' });
    }
});

// Route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId, // Use the user id from session
            },
        });

        if (!deletedPost) {
            res.status(404).json({ error: 'Post not found or unauthorized' });
        } else {
            res.status(204).end();
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete the post' });
    }
});

module.exports = router;
