const router = require('express').Router();
const { Post } = require('../models');

router.get('/', async (req, res) => {
  try {
    // Fetch posts from the database
    const posts = await Post.findAll();
    console.log(posts)

    // Render the 'home' template with the 'posts' data
    res.render('home', { posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;