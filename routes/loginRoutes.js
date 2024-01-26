const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbUser = require('../models/users');

const router = express.Router();

router.post('/api/login', [
    // Validation
    body('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .exists().withMessage('Password is required'),

    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const user = await dbUser.findOne({ $or: [{ username: email }, { email: email }] });

            if (!user) {
                return res.status(401).json({ error: 'Username or Email does not exist' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });
            res.json({ message: 'Login successful', token, username: user.username, userRole: user.role });
        } catch (error) {
            console.error('Error logging in: ', error);
            res.status(500).json({ error: 'Error logging in. Please try again later.' });
        }
    }
]);

module.exports = router;




/*

const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbUser = require('../models/users');

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

router.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Missing username or password' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await dbUser.findOne({ $or: [{ username: email }, { email: email }] });

    if (!user) {
      return res.status(401).json({ error: 'Username or Email does not exist' });
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    

    const token = jwt.sign({ userId: user._id, userRole: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });

    res.json({ message: 'Login successful', token, username: user.username, userRole: user.role });
  } catch (error) {
    console.error('Error logging in: ', error);
    res.status(500).json({ error: 'Error logging in. Please try again later.' });
  }
});

module.exports = router;

*/