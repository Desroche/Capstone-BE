const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dbUser = require('../models/users');

const router = express.Router();

router.post('/api/signup', [
  // Validation and sanitization
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?/]+/).withMessage('Password must contain a special character'),
  body('confirm_password').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password and Confirmed Password do not match');
    }
    return true;
  }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      const existingUser = await dbUser.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        if (existingUser.username === username && existingUser.email === email) {
          return res.status(400).json({ error: 'Username and email are already in use' });
        } else if (existingUser.username === username) {
          return res.status(400).json({ error: 'Username taken' });
        } else if (existingUser.email === email) {
          return res.status(400).json({ error: 'Email taken' });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new dbUser({
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      await newUser.save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '12h' });

      res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
      console.error('Error registering user: ', error);
      res.status(500).json({ error: 'Error registering user. Please try again later.' });
    }
  }
]);

module.exports = router;
