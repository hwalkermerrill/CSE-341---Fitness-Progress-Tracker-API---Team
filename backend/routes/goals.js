const express = require('express');
const router = express.Router();

const { createGoal } = require('../controllers/goals');
const { validateGoal } = require('../validation/goals');

router.get('/', (req, res) => {
    res.send('Goals route working');
});

router.post(
    '/',
    validateGoal,
    createGoal
);

module.exports = router;