const express = require('express');
const router = express.Router();
const loginRoutes = require('./loginRoutes');
const logoutRoutes = require('./logoutRoutes');
const signupRoutes = require('./signupRoutes');
const profileRoute = require('./profileRoute');


router.use(loginRoutes);
router.use(logoutRoutes);
router.use(signupRoutes);
router.use(profileRoute);

module.exports = router;