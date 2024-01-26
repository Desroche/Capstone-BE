const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateEmailUpdate, validateNameUpdate, validatePasswordChange, validateDietaryRestrictions } = require('../middleware/validation');

router.get('/user/profile', authMiddleware, userController.getUserProfile);
router.put('/user/profile/updateEmail', authMiddleware, validateEmailUpdate, userController.editUserProfileEmail);
router.put('/user/profile/updateName', authMiddleware, validateNameUpdate, userController.editUserProfileName);
router.put('/user/profile/changePassword', authMiddleware, validatePasswordChange, userController.changeUserPassword);
router.delete('/user/profile/delete', authMiddleware, userController.deleteUserAccount);



router.put('/user/profile/addRestriction', authMiddleware, validateDietaryRestrictions, userController.addDietaryRestriction);
router.put('/user/profile/removeRestriction', authMiddleware, validateDietaryRestrictions, userController.removeDietaryRestriction);
router.put('/user/profile/clearRestriction', authMiddleware, userController.clearDietaryRestriction);


module.exports = router;
