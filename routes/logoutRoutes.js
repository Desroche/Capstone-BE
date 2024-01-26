const express = require('express');
const router = express.Router();

router.post('/api/logout', (req, res) => {
  try {
    res.json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout: ', error);
    res.status(500).json({ error: 'Error during logout. Please try again later.' });
  }
});

module.exports = router;
