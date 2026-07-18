const express = require('express');
const router = express.Router();

const exerciseRecommendationsController =
    require('../controllers/exerciseRecommendations');

const { requireAdmin } =
    require('../middleware/roleMiddleware');

const {
    validateRecommendation,
    validateRecommendationId
} = require('../validation/exerciseRecommendation');

// Anyone can view all recommendations
router.get(
    '/',
    exerciseRecommendationsController.getAll
);

// Anyone can view one recommendation
router.get(
    '/:id',
    exerciseRecommendationsController.getSingle
);

// Only admins can create recommendations
router.post(
    '/',
    requireAdmin,
    validateRecommendation,
    exerciseRecommendationsController.createRecommendation
);

// Only admins can delete recommendations
router.delete(
    '/:id',
    requireAdmin,
    exerciseRecommendationsController.deleteRecommendation
);

// Only admins can update recommendations
router.put(
    '/:id',
    requireAdmin,
    validateRecommendationId,
    validateRecommendation,
    exerciseRecommendationsController.updateRecommendation
);

module.exports = router;