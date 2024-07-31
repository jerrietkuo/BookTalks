const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchbar');

// Route for searching books
router.get('/search', searchController.searchBooks);

module.exports = router;