const mongodb = require('../DB/connection');

// GET ALL GOALS
const getAllGoals = async (req, res) => {
	try {
		const result = await mongodb
			.getDb()
			.collection('goals')
			.find();

		const goals = await result.toArray();

		res.status(200).json(goals);
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving goals',
			error: error.message
		});
	}
};

// GET SINGLE GOAL BY ID
const getGoalById = async (req, res) => {
	let goalId;

	try {
		goalId = new ObjectId(req.params.id);
	} catch {
		return res.status(400).json({ message: 'Invalid goal ID format' });
	}

	try {
		const goal = await mongodb
			.getDb()
			.collection('goals')
			.findOne({ _id: goalId });

		if (!goal) {
			return res.status(404).json({ message: 'Goal not found' });
		}

		res.status(200).json(goal);
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving goal',
			error: error.message
		});
	}
};

// CREATE GOAL
const createGoal = async (req, res) => {
	try {
		const db = mongodb.getDb();
		const now = new Date();

		const goal = {
			userId: req.body.userId,
			goalName: req.body.goalName,
			targetAmount: req.body.targetAmount,
			deadline: req.body.deadline,
			status: req.body.status || 'In Progress',
			createdAt: now,
			updatedAt: now
		};

		const result = await db.collection('goals').insertOne(goal);

		res.status(201).json({
			message: 'Goal created successfully',
			id: result.insertedId
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error creating goal',
			error: error.message
		});
	}
};

// UPDATE GOAL
const updateGoal = async (req, res) => {
	let goalId;

	try {
		goalId = new ObjectId(req.params.id);
	} catch {
		return res.status(400).json({ message: 'Invalid goal ID format' });
	}

	try {
		const updatedFields = {
			userId: req.body.userId,
			goalName: req.body.goalName,
			targetAmount: req.body.targetAmount,
			deadline: req.body.deadline,
			status: req.body.status,
			updatedAt: new Date()
		};

		const result = await mongodb
			.getDb()
			.collection('goals')
			.updateOne(
				{ _id: goalId },
				{ $set: updatedFields }
			);

		if (result.modifiedCount > 0) {
			res.status(200).json({ message: 'Goal updated successfully' });
		} else {
			res.status(404).json({ message: 'Goal not found' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'Error updating goal',
			error: error.message
		});
	}
};

// DELETE GOAL
const deleteGoal = async (req, res) => {
	let goalId;

	try {
		goalId = new ObjectId(req.params.id);
	} catch {
		return res.status(400).json({ message: 'Invalid goal ID format' });
	}

	try {
		const result = await mongodb
			.getDb()
			.collection('goals')
			.deleteOne({ _id: goalId });

		if (result.deletedCount > 0) {
			res.status(200).json({ message: 'Goal deleted successfully' });
		} else {
			res.status(404).json({ message: 'Goal not found' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting goal',
			error: error.message
		});
	}
};

module.exports = {
	getAllGoals,
	getGoalById,
	createGoal,
	updateGoal,
	deleteGoal
};