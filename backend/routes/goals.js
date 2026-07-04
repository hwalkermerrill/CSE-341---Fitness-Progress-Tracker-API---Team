const express = require('express');
const router = express.Router();

const { createGoal } = require('../controllers/goals');

router.get('/', (req, res) => {
    res.send('Goals route working');
});

router.post('/', createGoal);

module.exports = router;