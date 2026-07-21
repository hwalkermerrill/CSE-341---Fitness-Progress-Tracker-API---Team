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

const validateWorkout = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required.')
        .isMongoId()
        .withMessage('User ID must be a valid MongoDB ID.'),

    body('workoutType')
        .trim()
        .notEmpty()
        .withMessage('Workout type is required.'),

    body('durationMinutes')
        .notEmpty()
        .withMessage('Duration is required.')
        .isInt({ min: 1 })
        .withMessage('Duration must be a whole number greater than 0.'),

    body('date')
        .optional()
        .isISO8601()
        .withMessage('Date must be a valid date.'),

    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Notes cannot be longer than 500 characters.'),

    body('caloriesBurned')
        .notEmpty()
        .withMessage('Calories burned is required.')
        .isFloat({ min: 0 })
        .withMessage('Calories burned must be a number of 0 or greater.'),

    body('intensity')
        .trim()
        .notEmpty()
        .withMessage('Intensity is required.'),

    handleValidationErrors
];

const validateWorkoutId = [
    param('id')
        .isMongoId()
        .withMessage('A valid workout ID is required.'),

    handleValidationErrors
];

module.exports = {
    validateWorkout,
    validateWorkoutId
};