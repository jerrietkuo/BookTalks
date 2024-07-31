// routes/discussionRoutes.js
const express = require('express');
const router = express.Router();

const discussionController = require('../controllers/discussionController');

// Discussion routes
router.get('/', discussionController.getAllDiscussions);
router.post('/', discussionController.createDiscussion);
router.get('/:id', discussionController.getDiscussionById);
router.put('/:id', discussionController.updateDiscussion);
router.delete('/:id', discussionController.deleteDiscussion);

// Post routes within discussions
router.post('/:id/posts', discussionController.createPost);
router.get('/:id/posts', discussionController.getPostsByDiscussionId);

module.exports = router;
