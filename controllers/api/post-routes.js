const express = require('express');
const router = express.Router();
const { User, Post, Reply } = require('../../models');

// // Route to retrieve posts and their associated replies with usernames
router.get('/posts', async (req, res) => {
  try {
    // Fetch posts from the database along with their authors' usernames and replies
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Reply,
          attributes: ['replies_content', 'updated_at'],
          include: [
            {
              model: User, // Includes the User model to get 'username' for the reply
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    // Serialize the data (flatten it) for better use in your template
    const posts = postData.map((post) => post.get({ plain: true }));

    // Send over the serialized data to the 'home' template
    // loggedIn: req.session.loggedIn,
    res.render('home', { posts });
    console.log(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Route to create a new post
router.post('/posts', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            post_content: req.body.post_content,
            // user_id: req.session.userId, // Assuming you have user authentication
        });
        res.status(201).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new post' });
    }
});

// Route to create a new reply for a post
router.post('/:post_id/replies', async (req, res) => {
    try {
        const newReply = await Reply.create({
            replies_content: req.body.replies_content,
            // user_id: req.session.userId, // assuming user authentication
            post_id: req.params.post_id,
        });

        res.status(201).json(newReply);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create a new reply' });
    }
});

// Route to update a post
router.put('/posts/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                post_content: req.body.post_content,
            },
            {
                where: {
                    id: req.params.id,
                    // user_id: req.session.userId, // Ensure the user owns the post
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
router.delete('/posts/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id,
                // user_id: req.session.userId, // Ensure the user owns the post
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