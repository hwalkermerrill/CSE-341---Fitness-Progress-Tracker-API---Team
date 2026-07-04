const mongodb = require('../DB/connection');

const createGoal = async (req, res) => {
    try {
        const db = mongodb.getDb();

        const goal = {
            userId: req.body.userId,
            goalName: req.body.goalName,
            targetAmount: req.body.targetAmount,
            deadline: req.body.deadline,
            status: req.body.status || 'In Progress'
        };

        const result = await db.collection('goals').insertOne(goal);

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createGoal
};