const { body } = require('express-validator');

const allowedDietaryRestrictions = [
    'Gluten Free', 'Ketogenic', 'Vegetarian', 
    'Pescetarian', 'Vegan', 'Paleo', 'Low FODMAP', 'Whole30'
];

exports.validateEmailUpdate = [
    body('email').isEmail().withMessage('Invalid email format').normalizeEmail()
];

exports.validateNameUpdate = [
    body('name').trim().notEmpty().withMessage('Name is required')
];

exports.validatePasswordChange = [
    body('oldPassword')
        .notEmpty().withMessage('Old password is required'),

    body('newPassword')
        .isLength({ min: 8, max: 128 }).withMessage('Password must be between 8 and 128 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character')
        .not().isIn(['password', '12345678', 'qwerty']).withMessage('Do not use a common password')
];

exports.validateAdminSubmission = [
    body('userEmail').isEmail().withMessage('Invalid email format').normalizeEmail(),

    body('newPassword')
        .isLength({ min: 8, max: 128 }).withMessage('Password must be between 8 and 128 characters')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/).withMessage('Password must contain at least one number')
        .matches(/[\W_]/).withMessage('Password must contain at least one special character')
        .not().isIn(['password', '12345678', 'qwerty']).withMessage('Do not use a common password')
];

exports.validateDietaryRestrictions = [
    body('dietaryRestrictions')
        .isArray().withMessage('Dietary restrictions should be an array')
        .custom((restrictions) => {
            return restrictions.every(restriction => 
                dietaryRestrictionsList.includes(restriction));
        }).withMessage('Invalid dietary restriction(s) provided')
];