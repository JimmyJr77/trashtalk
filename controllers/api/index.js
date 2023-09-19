const router = require('express').Router();
const withAuth = require('../../utils/auth');
const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');
const replyRoutes = require('./reply-routes.js')

router.use('/posts', postRoutes);
router.use('/users', userRoutes);
router.use('/replies', replyRoutes);


router.get('/check-auth', withAuth, (req, res) => {
    res.json({ authenticated: true });
});



module.exports = router;