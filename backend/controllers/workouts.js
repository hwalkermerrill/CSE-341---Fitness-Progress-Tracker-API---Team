const mongodb = require('../DB/connection');
const { ObjectId } = require('mongodb');

// 1.GET all workouts
const getAllWorkouts = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('workouts').find();
        const lists = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving workouts.' });
    }
};

// 2.GET a workout by ID
const getSingleWorkout = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid workout id to find a workout.');
        }
        const workoutId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('workouts').find({ _id: workoutId });
        const lists = await result.toArray();

        if (lists.length === 0) {
            return res.status(404).json({ message: 'Workout not found.' });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the workout.' });
    }
};

// 3.POST a new workout
const createWorkout = async (req, res) => {
    try {
        const workout = {
            userId: new ObjectId(req.body.userId), // Good practice to cast to ObjectId if provided
            workoutType: req.body.workoutType,
            durationMinutes: Number(req.body.durationMinutes),
            date: req.body.date ? new Date(req.body.date) : new Date(),
            notes: req.body.notes,
            caloriesBurned: Number(req.body.caloriesBurned),
            intensity: req.body.intensity
        };

        const response = await mongodb.getDb().collection('workouts').insertOne(workout);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json('Some error occurred while creating the workout.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the workout.' });
    }
};

// 4.PUT an existing workout by ID
const updateWorkout = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid workout id to update a workout.');
        }
        const workoutId = new ObjectId(req.params.id);
        const workout = {
            userId: new ObjectId(req.body.userId),
            workoutType: req.body.workoutType,
            durationMinutes: Number(req.body.durationMinutes),
            date: req.body.date ? new Date(req.body.date) : new Date(),
            notes: req.body.notes,
            caloriesBurned: Number(req.body.caloriesBurned),
            intensity: req.body.intensity
        };

        const response = await mongodb.getDb().collection('workouts').replaceOne({ _id: workoutId }, workout);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json('Some error occurred while updating the workout.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the workout.' });
    }
};

// 5.DELETE a workout by ID
const deleteWorkout = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json('Must use a valid workout id to delete a workout.');
        }
        const workoutId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('workouts').deleteOne({ _id: workoutId });

        if (response.deletedCount > 0) {
            res.status(200).json({ message: 'Workout deleted successfully.' });
        } else {
            res.status(404).json({ message: 'Workout not found to delete.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the workout.' });
    }
};

module.exports = {
    getAllWorkouts,
    getSingleWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
};