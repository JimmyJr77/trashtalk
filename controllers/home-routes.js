const router = require('express').Router();
const { Post, User } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Fetch posts from the database along with their authors
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }]
    });
    // Render the 'home' template with the 'posts' data
    res.render('home', { posts });
    console.log(posts)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
