const express = require('express');
const router = express.Router();

const {
	getAllGoals,
	getGoalById,
	createGoal,
	updateGoal,
	deleteGoal
} = require('../controllers/goals');

// Base Routes
router.get('/', getAllGoals);
router.post('/', createGoal);

// ID Routes
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;