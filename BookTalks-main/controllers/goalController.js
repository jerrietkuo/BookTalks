const Goal = require('../models/Goal');
const Book = require('../models/Book');

exports.getAllGoals = async (req, res) => {
  try {
    const goals = await Goal.findAll({
      include: [Book],
    });
    res.render('goals/index', { 
      title: 'Reading Goals', 
      goals 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createGoal = async (req, res) => {
  try {
    const { year, targetBooks } = req.body;
    const goal = await Goal.create({ year, targetBooks });
    res.redirect('/goals');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id, {
      include: [Book],
    });
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.render('goals/show', { 
      title: `Goal for ${goal.year}`, 
      ...goal.dataValues 
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    goal.year = req.body.year || goal.year;
    goal.targetBooks = req.body.targetBooks || goal.targetBooks;
    goal.booksRead = req.body.booksRead || goal.booksRead;
    await goal.save();
    res.redirect(`/goals/${req.params.id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByPk(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    await goal.destroy();
    res.redirect('/goals');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
