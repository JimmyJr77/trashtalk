const router = require('express').Router();
const { Post, User, Reply } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Fetches posts from the database along with author usernames and replies
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Reply,
          attributes: ['replies_content', 'updated_at', 'id', 'user_id'],
          include: [
            {
              model: User, // Includes the User model to get 'username' for the reply
              attributes: ['username'],
            },
          ],
        },
      ],
    });

    // Serialize the data (flatten it) for better use in the template
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);

    // Send serialized data to the 'home' template
    res.render('home', { 
      posts,
      userId: req.session.userId,
      loggedIn: req.session.loggedIn, 
      username: req.session.username 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
