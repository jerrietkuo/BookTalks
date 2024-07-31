const express = require('express');
const router = express.Router();

const discussionController = require('./discussionController');

router.get('/', discussionController.getAllDiscussions);
router.get('/new', (req, res) => res.render('discussions/new', { title: 'Create New Discussion' }));
router.post('/', discussionController.createDiscussion);
router.get('/:id', discussionController.getDiscussionById);
router.put('/:id', discussionController.updateDiscussion);
router.delete('/:id', discussionController.deleteDiscussion);

router.post('/:id/posts', discussionController.createPost);
router.get('/:id/posts', discussionController.getPostsByDiscussionId);

module.exports = router;
