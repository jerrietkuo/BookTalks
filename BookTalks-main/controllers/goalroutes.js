const express = require('express');
const router = express.Router();

const goalController = require('./goalController');

router.get('/', goalController.getAllGoals);
router.post('/', goalController.createGoal);
router.get('/:id', goalController.getGoalById);
router.put('/:id', goalController.updateGoal);
router.delete('/:id', goalController.deleteGoal);

module.exports = router;
