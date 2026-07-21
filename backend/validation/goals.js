const { body, validationResult } = require('express-validator');

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

const validateGoal = [
    body('userId')
        .notEmpty()
        .withMessage('User ID is required.')
        .isMongoId()
        .withMessage('User ID must be a valid MongoDB ID.'),

    body('goalName')
        .trim()
        .notEmpty()
        .withMessage('Goal name is required.')
        .isLength({ min: 3, max: 100 })
        .withMessage('Goal name must be between 3 and 100 characters.'),

    body('targetAmount')
        .notEmpty()
        .withMessage('Target amount is required.')
        .isFloat({ min: 0 })
        .withMessage('Target amount must be a number of 0 or greater.'),

    body('deadline')
        .notEmpty()
        .withMessage('Deadline is required.')
        .isISO8601()
        .withMessage('Deadline must be a valid date.'),

    body('status')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Status cannot be empty.'),

    handleValidationErrors
];

module.exports = {
    validateGoal
};