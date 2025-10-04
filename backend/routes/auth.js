const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  // Dummy login
  res.json({ message: 'Login successful' });
});

router.post('/signup', (req, res) => {
  // Dummy signup
  res.json({ message: 'Signup successful' });
});

module.exports = router;
