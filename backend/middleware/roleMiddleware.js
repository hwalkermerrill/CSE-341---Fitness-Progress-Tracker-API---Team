const express = require('express');
const router = express.Router();

const exerciseRecommendationController = require('../controllers/exerciseRecommendations');
const { requireAdmin } = require('../middleware/roleMiddleware');

router.get('/', exerciseRecommendationController.getAll);
router.get('/:id', exerciseRecommendationController.getSingle);

router.post(
    '/',
    requireAdmin,
    exerciseRecommendationController.createRecommendation
);

router.put(
    '/:id',
    requireAdmin,
    exerciseRecommendationController.updateRecommendation
);

router.delete(
    '/:id',
    requireAdmin,
    exerciseRecommendationController.deleteRecommendation
);

module.exports = router;

const requireAdmin = (req, res, next) => {
    const role = req.headers['x-user-role'];

    if (!role) {
        return res.status(401).json({
            message: 'A user role is required.'
        });
    }

    if (role.toLowerCase() !== 'admin') {
        return res.status(403).json({
            message: 'Admin access is required.'
        });
    }

    next();
};

module.exports = {
    requireAdmin
};