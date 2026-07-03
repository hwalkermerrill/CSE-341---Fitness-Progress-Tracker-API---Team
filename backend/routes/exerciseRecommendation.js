const express = require('express');
const router = express.Router();

const exerciseRecommendationsController = require('../controllers/exerciseRecommendations');

// GET REQUEST FOR ALL EXERCISE RECOMMENDATIONS
router.get('/', exerciseRecommendationsController.getAll);

// GET REQUEST FOR EXERCISE BASED ON ID
router.get('/:id', exerciseRecommendationsController.getSingle);

// POST REQUEST FOR ADDING EXERCISE RECOMMENDATIONS
router.post('/', exerciseRecommendationsController.createRecommendation);

// DELETE REQUEST FOR DELETING EXERCISE RECOMMENDATIONS
router.delete('/:id', exerciseRecommendationsController.deleteRecommendation)

// PUT REQUEST FOR UPDATING EXISTING EXERCISE
router.put('/:id', exerciseRecommendationsController.updateRecommendation);
module.exports = router;