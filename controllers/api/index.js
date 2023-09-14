const router = require('express').Router();

const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');
// const replyRoutes = require('./reply-routes.js')

router.use('/postroute', postRoutes);
router.use('/userroute', userRoutes);
router.use('/posts', postRoutes);
// router.use('/users', userRoutes);
// router.use('/replies', replyRoutes);

module.exports = router;