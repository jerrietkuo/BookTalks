const Discussion = require('../models/discussion_board_models');
const Post = require('../models/post');

exports.getAllDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.findAll();
    res.render('discussions/index', { 
      title: 'All Discussions', 
      discussions 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDiscussion = async (req, res) => {
  try {
    const newDiscussion = await Discussion.create({
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
    });
    res.redirect('/discussion_board_models');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id, {
      include: [Post],
    });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.render('discussions/show', { 
      title: discussion.title, 
      ...discussion.dataValues 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    discussion.title = req.body.title || discussion.title;
    discussion.content = req.body.content || discussion.content;
    discussion.author = req.body.author || discussion.author;
    await discussion.save();
    res.redirect(`/discussions/${req.params.id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    await discussion.destroy();
    res.redirect('/discussion_board_models');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createPost = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id);
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    const post = await Post.create({
      content: req.body.content,
      author: req.body.author,
      discussionId: discussion.id,
    });
    res.redirect(`/discussion_board_models/${req.params.id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getPostsByDiscussionId = async (req, res) => {
  try {
    const discussion = await Discussion.findByPk(req.params.id, {
      include: [Post],
    });
    if (!discussion) {
      return res.status(404).json({ message: 'Discussion not found' });
    }
    res.render('discussions/show', { 
      title: discussion.title, 
      ...discussion.dataValues 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

