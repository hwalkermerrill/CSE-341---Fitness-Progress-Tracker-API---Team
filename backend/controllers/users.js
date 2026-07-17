const mongodb = require('../DB/connection');
const { ObjectId } = require('mongodb');

// GET ALL USERS
const getAllUsers = async (req, res) => {
	try {
		const result = await mongodb
			.getDb()
			.collection('users')
			.find();

		const users = await result.toArray();

		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving users',
			error: error.message
		});
	}
};

// GET SINGLE USER BY ID
const getUserById = async (req, res) => {
	let userId;

	try {
		userId = new ObjectId(req.params.id);
	} catch {
		return res.status(400).json({ message: 'Invalid user ID format' });
	}

	try {
		const user = await mongodb
			.getDb()
			.collection('users')
			.findOne({ _id: userId });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving user',
			error: error.message
		});
	}
};

// CREATE USER
const createUser = async (req, res) => {
	try {
		const now = new Date();

		const user = {
			name: req.body.name,
			email: req.body.email,
			role: req.body.role || 'user',
			oauthProvider: req.body.oauthProvider || null,
			createdAt: now,
			updatedAt: now
		};

		const result = await mongodb
			.getDb()
			.collection('users')
			.insertOne(user);

		res.status(201).json({
			message: 'User created successfully',
			id: result.insertedId
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error creating user',
			error: error.message
		});
	}
};

// UPDATE USER
const updateUser = async (req, res) => {
	let userId;

	try {
		userId = new ObjectId(req.params.id);
	} catch {
		return res.status(400).json({ message: 'Invalid user ID format' });
	}

	try {
		const updatedFields = {
			name: req.body.name,
			email: req.body.email,
			role: req.body.role,
			oauthProvider: req.body.oauthProvider,
			updatedAt: new Date()
		};

		const result = await mongodb
			.getDb()
			.collection('users')
			.updateOne(
				{ _id: userId },
				{ $set: updatedFields }
			);

		if (result.modifiedCount > 0) {
			res.status(200).json({ message: 'User updated successfully' });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'Error updating user',
			error: error.message
		});
	}
};

// DELETE USER
const deleteUser = async (req, res) => {
	let userId;

	try {
		userId = new ObjectId(req.params.id);
	} catch {
		return res.status(400).json({ message: 'Invalid user ID format' });
	}

	try {
		const result = await mongodb
			.getDb()
			.collection('users')
			.deleteOne({ _id: userId });

		if (result.deletedCount > 0) {
			res.status(200).json({ message: 'User deleted successfully' });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting user',
			error: error.message
		});
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser
};