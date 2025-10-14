const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// -------- Login Route --------
router.post('/', (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) 
    return res.status(400).json({ message: 'Please provide email and password' });

  // Check if user exists in DB
  User.findByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ message: 'DB Error: ' + err.message });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];

    // Compare password with hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Incorrect password' });

    // Generate JWT token
    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send success response with token
    res.status(200).json({ message: 'Login successful', token });
  });
});

module.exports = router;
