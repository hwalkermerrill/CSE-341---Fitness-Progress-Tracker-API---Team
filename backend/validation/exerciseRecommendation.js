const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    next();
};

const validateRecommendation = [
    body('exerciseName')
        .trim()
        .notEmpty()
        .withMessage('Exercise name is required.'),

    body('category')
        .trim()
        .notEmpty()
        .withMessage('Category is required.'),

    body('muscleGroup')
        .trim()
        .notEmpty()
        .withMessage('Muscle group is required.'),

    body('difficulty')
        .trim()
        .notEmpty()
        .withMessage('Difficulty is required.'),

    body('equipment')
        .trim()
        .notEmpty()
        .withMessage('Equipment is required.'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Description is required.')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters.'),

    body('estimatedDuration')
        .notEmpty()
        .withMessage('Estimated duration is required.')
        .isFloat({ min: 1 })
        .withMessage('Estimated duration must be a number greater than 0.'),

    body('createdBy')
        .optional({ nullable: true, checkFalsy: true })
        .isMongoId()
        .withMessage('Created by must be a valid MongoDB ID.'),

    handleValidationErrors
];

const validateRecommendationId = [
    param('id')
        .isMongoId()
        .withMessage('A valid recommendation ID is required.'),

    handleValidationErrors
];

module.exports = {
    validateRecommendation,
    validateRecommendationId
};