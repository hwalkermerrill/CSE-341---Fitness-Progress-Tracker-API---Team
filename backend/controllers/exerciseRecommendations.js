const mongodb = require('../DB/connection');
const { ObjectId } = require('mongodb');

// GET REQUEST FOR ALL
const getAll = async(req, res) => {
    try {
        const result = await mongodb
        .getDb()
        .collection('ExerciseRecommendations')
        .find();

        const recommendations = await result.toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recommendations);
    } catch (error) {
        res.status(500).json({
            message: 'Error getting exercise recommendations', 
            error: error.message
        });
    }
};

// GET REQUEST FOR SINGLE WITH PARAMETER
const getSingle = async(req, res) => {
    const recommendationId = new ObjectId(req.params.id);

    try {
        const recommendation = await mongodb
        .getDb()
        .collection('ExerciseRecommendations')
        .findOne({_id: recommendationId});

        if(!recommendation) {
            return res.status(404).json({
                message: 'Exercise recommendation not found'
            });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(recommendation);
    } catch(error) {
        res.status(500).json({
            message: 'Error getting exercise recommendations', 
            error: error.message
        });
    }
}

// POST REQUEST FOR ADDING (WILL BE MANAGER BASED)
const createRecommendation = async (req, res) => {
    try{
        const recommendation = {
            exerciseName: req.body.exerciseName,
            category: req.body.category,
            muscleGroup: req.body.muscleGroup,
            difficulty: req.body.difficulty,
            equipment: req.body.equipment,
            description: req.body.description,
            estimatedDuration: req.body.estimatedDuration,
            createdBy: req.body.createdBy || null,
            createdAt: new Date()
        };

        const result = await mongodb
        .getDb()
        .collection('ExerciseRecommendations')
        .insertOne(recommendation);

        res.status(201).json({
            message: 'Exercise recommendation created successfully',
            id: result.insertId
        });

    } catch (error) {
        res.status(500).json(error);
    }

};


// PUT REQUEST FOR MANAGERS TO UPDATE
const updateRecommendation = async (req, res) => {
    const recommendationId = new ObjectId(req.params.id);

    try {
        const recommendation = {
            exerciseName: req.body.exerciseName,
            category: req.body.category,
            muscleGroup: req.body.muscleGroup,
            difficulty: req.body.difficulty,
            equipment: req.body.equipment,
            description: req.body.description,
            estimatedDuration: req.body.estimatedDuration,
            createdBy: req.body.createdBy
        };

        const result = await mongodb
            .getDb()
            .collection('ExerciseRecommendations')
            .replaceOne({ _id: recommendationId }, recommendation);

        if (result.modifiedCount > 0) {
            res.status(200).json({
                  message: 'Exercise recommendation updated successfully.'
            });
        } else { 
            res.status(404).json({
                message: 'Exercise recommenation not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error updating exercise recommendation',
            error: error.message
        });
    }
}

// DELETE REQUEST IN ORDER TO DELETE
const deleteRecommendation = async (req, res) => {
    const recommendationId = new ObjectId(req.params.id);

    try {
        const result = await mongodb
            .getDb()
            .collection('ExerciseRecommendations')
            .deleteOne({ _id: recommendationId });

        if (result.deletedCount > 0) {
            res.status(200).json({
                message: 'Exercise recommendation deleted.'
            });
        } else {
            res.status(404).json({
                message: 'Exercise recommendation not found!'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting exercise recommendation.',
            error: error.message
        });
    }
};

module.exports = {
    getAll, getSingle, createRecommendation, deleteRecommendation, updateRecommendation
};