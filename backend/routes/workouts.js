const express = require('express');
const router = express.Router();
const workoutsController = require('../controllers/workouts');

// Route to get all workouts
router.get('/', workoutsController.getAllWorkouts);

// Route to get a specific workout by its MongoDB ID
router.get('/:id', workoutsController.getSingleWorkout);

// Route to create a new workout
router.post('/', workoutsController.createWorkout);

// Route to update a specific workout by ID
router.put('/:id', workoutsController.updateWorkout);

// Route to delete a specific workout by ID
router.delete('/:id', workoutsController.deleteWorkout);

module.exports = router;