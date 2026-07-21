const express = require('express');
const router = express.Router();

const { validateGoal } = require('../validation/goals');
const {
	getAllGoals,
	getGoalById,
	createGoal,
	updateGoal,
	deleteGoal
} = require('../controllers/goals');

router.get('/', (req, res) => {
	res.send('Goals route working');
});

router.post(
	'/',
	validateGoal,
	createGoal
);
// Base Routes
router.get('/', getAllGoals);
router.post('/', createGoal);

// ID Routes
router.get('/:id', getGoalById);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

module.exports = router;