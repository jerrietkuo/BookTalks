const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

const bookRoutes = require('./bookroutes');
const goalRoutes = require('./goalroutes');

router.use('/books', bookRoutes);
router.use('/goals', goalRoutes);

module.exports = router;