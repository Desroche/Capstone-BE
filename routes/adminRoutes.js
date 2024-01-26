const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const { validateAdminSubmission } = require('../middleware/validation');


router.put('/user/profile/changeUserPasswordAdmin', adminAuthMiddleware, validateAdminSubmission, adminController.changeUserPasswordByAdmin);


module.exports = router;