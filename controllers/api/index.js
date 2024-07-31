const router = require('express').Router();

const userRoutes = require('./user-routes');
const chatRoutes = require('./chat-routes');
const searchRoutes = require('./searchbar-routes');
const discussionRoutes = require('./Discussion_Board_routes');

router.use('/users', userRoutes);
router.use('/chat', chatRoutes);
router.use('/search', searchRoutes);
router.use('/discussion', discussionRoutes);

module.exports = router;
